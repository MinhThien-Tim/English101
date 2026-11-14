const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const root = path.resolve(__dirname, '..', '..');
const html = fs.readFileSync(path.join(root, 'Grammar', 'same-word-different-parts-of-speech.html'), 'utf8');

// Evaluate the page's actual data block (defines E and words) so E is in scope for words.
const dataStart = html.indexOf('const E=');
const dataEnd = html.indexOf('const labels=');
assert.ok(dataStart !== -1 && dataEnd > dataStart, 'page data block (const E= ... const labels=) not found');
const { words } = eval(`(() => { ${html.slice(dataStart, dataEnd)} return { words }; })()`);

// Evaluate the page's actual norm() and pool definitions.
const normSource = html.match(/const norm=t=>\{[\s\S]*?return t\};/);
const poolSource = html.match(/const pool=\[[^\]]*\];/);
assert.ok(normSource, 'norm() definition not found in page');
assert.ok(poolSource, 'pool definition not found in page');
const norm = eval(`(() => { ${normSource[0]} return norm; })()`);
const pool = eval(`(() => { ${poolSource[0]} return pool; })()`);

test('every use of every word (full quiz) normalizes to a pool label', () => {
  for (const word of words) {
    assert.ok(word.u.length > 0, `${word.w} has no uses`);
    for (const use of word.u) {
      const answer = norm(use.type);
      assert.ok(pool.includes(answer), `${word.w} / "${use.type}" normalizes to "${answer}", which is not in the answer pool`);
    }
  }
});

test('the short-quiz selected use for every word normalizes to a pool label', () => {
  for (const word of words) {
    const use = word.u[word.u.length > 2 ? 1 : 0];
    const answer = norm(use.type);
    assert.ok(pool.includes(answer), `${word.w} short-quiz use "${use.type}" normalizes to "${answer}", which is not in the answer pool`);
  }
});

test('legacy type labels pin to their approved pool mappings', () => {
  assert.equal(norm('Mạo từ xác định / determiner'), 'Determiner');
  assert.equal(norm('Từ nối so sánh/relative marker'), 'Liên từ');
  assert.equal(norm('Relative marker cổ'), 'Đại từ');
});
