#!/usr/bin/env node
'use strict';
// Founder Repo Check: zero-dependency scan for AI coding guardrail files.
// Usage: npx github:suppelabs/founder-repo-os-community [path] [--json] [--min <score>]

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
if (args.includes('-h') || args.includes('--help')) {
  console.log(`Founder Repo Check: scores a repo for AI coding guardrails.

Usage: founder-repo-check [path] [--json] [--min <score>] [--no-color]
       founder-repo-check init [path]   copy the kit files into a repo (never overwrites)

  path          repository root (default: current directory)
  --json        print machine-readable JSON
  --min <n>     exit with code 1 if score < n (for CI)
  --no-color    disable colors`);
  process.exit(0);
}
if (args[0] === 'init') {
  const target = path.resolve(args[1] || '.');
  const kitRoot = path.join(__dirname, '..');
  const files = ['AGENTS.md', 'CLAUDE.md', 'AI_AGENT_RULES.md', '.cursor/rules/guardrails.mdc',
    '.cursor/rules/pull-requests.mdc', '.github/copilot-instructions.md', '.github/pull_request_template.md',
    'docs/DECISIONS.md', 'docs/REVIEW_CHECKLIST.md'];
  if (!fs.existsSync(target)) { console.error(`Not a directory: ${target}`); process.exit(2); }
  console.log(`\nCopying AI guardrail files into ${target}\n`);
  for (const f of files) {
    const dest = path.join(target, f);
    if (fs.existsSync(dest)) { console.log(`  skip    ${f} (already exists, merge by hand)`); continue; }
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(path.join(kitRoot, f), dest);
    console.log(`  added   ${f}`);
  }
  console.log(`\nNext: fill in "Project context" in AGENTS.md, commit on a branch, open a PR.\n`);
  process.exit(0);
}
const json = args.includes('--json');
let min = null;
const minIdx = args.indexOf('--min');
if (minIdx !== -1) {
  min = Number(args[minIdx + 1]);
  if (!Number.isFinite(min)) { console.error('--min needs a number'); process.exit(2); }
}
const positional = args.filter((a, i) => !a.startsWith('--') && !(minIdx !== -1 && i === minIdx + 1));
const root = path.resolve(positional[0] || '.');
if (!fs.existsSync(root) || !fs.statSync(root).isDirectory()) {
  console.error(`Not a directory: ${root}`); process.exit(2);
}

const color = !json && process.stdout.isTTY && !args.includes('--no-color') && !process.env.NO_COLOR;
const c = (code, s) => (color ? `\x1b[${code}m${s}\x1b[0m` : s);
const green = (s) => c(32, s), red = (s) => c(31, s), yellow = (s) => c(33, s), dim = (s) => c(2, s), bold = (s) => c(1, s);

const p = (rel) => path.join(root, rel);
const exists = (rel) => fs.existsSync(p(rel));
const firstExisting = (list) => list.find(exists) || null;
const read = (rel) => { try { return fs.readFileSync(p(rel), 'utf8'); } catch { return ''; } };
const listDir = (rel) => { try { return fs.readdirSync(p(rel)); } catch { return []; } };

const agentsFile = firstExisting(['AGENTS.md', 'agents.md']);
const rulesFile = firstExisting(['AI_AGENT_RULES.md', 'docs/AI_AGENT_RULES.md']);
const cursorRules = listDir('.cursor/rules').filter((f) => f.endsWith('.mdc') || f.endsWith('.md'));
const prTemplate = firstExisting([
  '.github/pull_request_template.md', '.github/PULL_REQUEST_TEMPLATE.md',
  'pull_request_template.md', 'PULL_REQUEST_TEMPLATE.md',
  'docs/pull_request_template.md', 'docs/PULL_REQUEST_TEMPLATE.md',
]) || (listDir('.github/PULL_REQUEST_TEMPLATE').length ? '.github/PULL_REQUEST_TEMPLATE/' : null);
const decisions = firstExisting(['docs/DECISIONS.md', 'DECISIONS.md', 'docs/adr', 'docs/decisions', 'adr']);
const readme = firstExisting(['README.md', 'readme.md', 'README']);
const gitignore = read('.gitignore');

const ruleText = [agentsFile, rulesFile, 'CLAUDE.md', '.github/copilot-instructions.md', '.cursorrules']
  .filter(Boolean).map(read).join('\n') + cursorRules.map((f) => read('.cursor/rules/' + f)).join('\n');

const agentsText = agentsFile ? read(agentsFile) : '';
const contextFilled = agentsFile && agentsText.length > 200 && !/<one sentence|<e\.g\./i.test(agentsText);

const checks = [
  { id: 'agents', label: 'AGENTS.md', desc: 'project context + rules for agents', pts: 10, ok: !!agentsFile,
    fix: 'Add AGENTS.md (read by Codex, Cursor, Copilot and most agents).' },
  { id: 'context', label: 'AGENTS.md context filled', desc: 'stack, run & test commands', pts: 5, ok: !!contextFilled,
    fix: 'Fill in the "Project context" placeholders in AGENTS.md.' },
  { id: 'claude', label: 'CLAUDE.md', desc: 'Claude Code instructions', pts: 5, ok: exists('CLAUDE.md') || exists('.claude/CLAUDE.md'),
    fix: 'Add CLAUDE.md that imports AGENTS.md (@AGENTS.md).' },
  { id: 'cursor', label: '.cursor/rules/*.mdc', desc: 'Cursor rules', pts: 5, ok: cursorRules.length > 0 || exists('.cursorrules'),
    fix: 'Add .cursor/rules/guardrails.mdc with alwaysApply: true.' },
  { id: 'copilot', label: '.github/copilot-instructions.md', desc: 'GitHub Copilot instructions', pts: 5, ok: exists('.github/copilot-instructions.md'),
    fix: 'Add .github/copilot-instructions.md.' },
  { id: 'rules', label: 'AI_AGENT_RULES.md', desc: 'scope, git & secrets rules', pts: 10, ok: !!rulesFile,
    fix: 'Add AI_AGENT_RULES.md as single source of truth for agent rules.' },
  { id: 'mainrule', label: 'No-direct-write-to-main rule', desc: 'agents told never to push to main', pts: 5,
    ok: /(never|do not|don't|no)[^\n]{0,60}(push|commit|write)[^\n]{0,40}`?(main|master)`?/i.test(ruleText),
    fix: 'State explicitly in your rules: never commit or push to main.' },
  { id: 'pr', label: 'Pull request template', desc: 'review gates for AI PRs', pts: 15, ok: !!prTemplate,
    fix: 'Add .github/pull_request_template.md with scope + testing checks.' },
  { id: 'decisions', label: 'Decision log', desc: 'docs/DECISIONS.md or ADRs', pts: 10, ok: !!decisions,
    fix: 'Add docs/DECISIONS.md so agents stop re-litigating choices.' },
  { id: 'checklist', label: 'Review checklist', desc: 'docs/REVIEW_CHECKLIST.md', pts: 5,
    ok: !!firstExisting(['docs/REVIEW_CHECKLIST.md', 'REVIEW_CHECKLIST.md', '.github/REVIEW_CHECKLIST.md']),
    fix: 'Add docs/REVIEW_CHECKLIST.md for merging AI code.' },
  { id: 'readme', label: 'README.md', desc: 'what it is, how to run it', pts: 10, ok: !!readme && read(readme).trim().length > 100,
    fix: 'Write a README with purpose, setup and run instructions.' },
  { id: 'gitignore', label: '.gitignore covers .env', desc: 'secrets stay out of git', pts: 10, ok: /^\s*\/?\.env(\*|\..*)?\s*$/m.test(gitignore),
    fix: 'Add ".env" and ".env.*" to .gitignore.' },
  { id: 'envexample', label: '.env.example', desc: 'documented env var names', pts: 5, ok: exists('.env.example') || exists('.env.sample') || exists('.env.template'),
    fix: 'Add .env.example listing variable names (no values).' },
];

const warnings = [];
if (exists('.env') && !checks.find((x) => x.id === 'gitignore').ok) warnings.push('.env file present but not covered by .gitignore. Risk of committing secrets.');
if (!exists('.git')) warnings.push('No .git directory found. Is this the repository root?');

const score = checks.reduce((s, x) => s + (x.ok ? x.pts : 0), 0);
const grade = score >= 80 ? 'SOLID' : score >= 50 ? 'NEEDS WORK' : 'AT RISK';
const KIT = 'https://github.com/suppelabs/founder-repo-os-community';
const SCORECARD = 'https://www.founderrepoos.com/scorecard?utm_source=cli&utm_medium=cli&utm_campaign=kit';

if (json) {
  console.log(JSON.stringify({ root, score, max: 100, grade,
    checks: checks.map(({ id, label, pts, ok, fix }) => ({ id, label, points: pts, ok, fix: ok ? undefined : fix })),
    warnings }, null, 2));
} else {
  console.log(`\n${bold('Founder Repo Check')}  ${dim('· ' + root)}\n`);
  for (const x of checks) {
    const mark = x.ok ? green('✔') : red('✘');
    console.log(`  ${mark} ${x.label.padEnd(33)} ${dim(x.desc)}`);
  }
  for (const w of warnings) console.log(`\n  ${yellow('⚠')} ${w}`);
  const g = score >= 80 ? green(grade) : score >= 50 ? yellow(grade) : red(grade);
  console.log(`\n  ${bold(`Score: ${score}/100`)}  ·  ${g}`);
  const missing = checks.filter((x) => !x.ok).sort((a, b) => b.pts - a.pts).slice(0, 3);
  if (missing.length) {
    console.log(`\n  ${bold('Next fixes:')}`);
    for (const x of missing) console.log(`   ${dim(`+${x.pts}`.padStart(3))}  ${x.fix}`);
    console.log(`\n  Free rule files: ${KIT}`);
  }
  console.log(`  Deeper check (15 questions, runs in your browser): ${SCORECARD}\n`);
}

if (min !== null && score < min) process.exit(1);
