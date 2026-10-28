const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { execSync } = require('node:child_process');

const root = path.resolve(__dirname, '..');

global.window = {};
require('../data/documents.js');
const catalogue = global.window.ENGLISH_101_DOCUMENTS;

test('homepage catalogue does not include the practice-version reading translation card', () => {
  const ids = catalogue.map(resource => resource.id);

  assert.equal(ids.includes('reading-translation-alt'), false);
});

test('every Resource ID is unique and every local catalogue path exists', () => {
  const ids = catalogue.map(resource => resource.id);

  assert.equal(new Set(ids).size, ids.length);
  const gitFiles = new Map(execSync('git ls-files', { cwd: root }).toString().split('\n').map(p => p.trim()).filter(Boolean).map(p => [p.toLowerCase(), p]));
  for (const resource of catalogue) {
    if (/^https?:/.test(resource.path)) continue;
    const target = path.join(root, decodeURIComponent(resource.path));
    assert.equal(fs.existsSync(target), true, `${resource.id} points to missing ${resource.path}`);
    const tracked = gitFiles.get(resource.path.toLowerCase());
    if (tracked) assert.equal(tracked, resource.path, `${resource.id} path casing does not match tracked file "${tracked}"`);
  }
});

test('static relative links and script/style references point to files', () => {
  const htmlFiles = [];
  function walk(directory) {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      if (entry.name === '.git' || entry.name === '.agents') continue;
      const target = path.join(directory, entry.name);
      if (entry.isDirectory()) walk(target);
      else if (target.endsWith('.html')) htmlFiles.push(target);
    }
  }
  walk(root);

  for (const file of htmlFiles) {
    const source = fs.readFileSync(file, 'utf8');
    for (const match of source.matchAll(/(?:href|src)=["']([^"']+)["']/g)) {
      const reference = match[1];
      if (/^(?:https?:|data:|mailto:|tel:|#|javascript:)/.test(reference) || reference.includes('${')) continue;
      const relative = decodeURIComponent(reference.split(/[?#]/)[0]);
      if (!relative) continue;
      const target = path.resolve(path.dirname(file), relative);
      assert.equal(fs.existsSync(target), true, `${path.relative(root, file)} points to missing ${reference}`);
    }
  }
});
