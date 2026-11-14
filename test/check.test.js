'use strict';
// Minimal zero-dependency tests: node test/check.test.js
const { execFileSync, spawnSync } = require('child_process');
const fs = require('fs'), os = require('os'), path = require('path'), assert = require('assert');
const cli = path.join(__dirname, '..', 'bin', 'check.js');
const run = (dir, extra = []) => spawnSync(process.execPath, [cli, dir, ...extra], { encoding: 'utf8' });

// 1. empty repo -> score 0, --min fails
const empty = fs.mkdtempSync(path.join(os.tmpdir(), 'frc-empty-'));
let r = run(empty, ['--json']);
assert.strictEqual(JSON.parse(r.stdout).score, 0);
assert.strictEqual(run(empty, ['--min', '10']).status, 1);

// 2. kit itself -> everything except filled context + .env.example
r = run(path.join(__dirname, '..'), ['--json']);
const kit = JSON.parse(r.stdout);
assert.ok(kit.score >= 85, 'kit score ' + kit.score);
assert.strictEqual(kit.checks.find((c) => c.id === 'context').ok, false);

// 3. .env not ignored -> warning
const leaky = fs.mkdtempSync(path.join(os.tmpdir(), 'frc-leaky-'));
fs.writeFileSync(path.join(leaky, '.env'), 'SECRET=1');
assert.ok(JSON.parse(run(leaky, ['--json']).stdout).warnings.some((w) => w.includes('.env')));

console.log('all tests passed (kit score ' + kit.score + ')');

// 4. init copies files, never overwrites
const tgt = fs.mkdtempSync(path.join(os.tmpdir(), 'frc-init-'));
fs.writeFileSync(path.join(tgt, 'AGENTS.md'), 'MINE');
spawnSync(process.execPath, [cli, 'init', tgt], { encoding: 'utf8' });
assert.strictEqual(fs.readFileSync(path.join(tgt, 'AGENTS.md'), 'utf8'), 'MINE');
assert.ok(fs.existsSync(path.join(tgt, '.cursor/rules/guardrails.mdc')));
console.log('init test passed');
