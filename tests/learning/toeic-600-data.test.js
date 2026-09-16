const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const test = require('node:test');

const root = path.resolve(__dirname, '..', '..');
const source = fs.readFileSync(path.join(root, 'data/vocabulary/toeic-600.js'), 'utf8');
const context = {window: {}};
vm.runInNewContext(source, context);
const dataset = context.window.ENGLISH101_TOEIC_600_DATA;

test('contains 50 lessons and 600 ordered entries', () => {
  assert.equal(dataset.meta.lessonCount, 50);
  assert.equal(dataset.meta.entryCount, 600);
  assert.equal(dataset.lessons.length, 50);
  assert.equal(dataset.entries.length, 600);
  assert.deepEqual(
    Array.from(dataset.entries, entry => entry.ordinal),
    Array.from({length: 600}, (_, index) => index + 1)
  );
});

test('contains exactly 12 entries in every lesson', () => {
  for (const lesson of dataset.lessons) {
    assert.equal(lesson.entryIds.length, 12, `Lesson ${lesson.number}`);
    const entries = dataset.entries.filter(entry => entry.lesson === lesson.number);
    assert.equal(entries.length, 12, `Lesson ${lesson.number}`);
    assert.deepEqual(
      Array.from(entries, entry => entry.id),
      Array.from(lesson.entryIds)
    );
  }
});

test('uses stable unique IDs and fills the core learning fields', () => {
  const ids = new Set();
  for (const entry of dataset.entries) {
    assert.match(entry.id, /^toeic-\d{2}-\d{2}-[a-z0-9-]+$/);
    assert.equal(ids.has(entry.id), false, entry.id);
    ids.add(entry.id);
    for (const field of ['word', 'partOfSpeech', 'ipa', 'vietnamese', 'definition', 'hint', 'example', 'translation']) {
      assert.ok(entry[field], `${entry.id} is missing ${field}`);
    }
  }
});

test('does not ship legacy third-party media URLs', () => {
  for (const entry of dataset.entries) {
    assert.equal(entry.media.image, null);
    assert.equal(entry.media.imageAlt, null);
    assert.equal(entry.media.audioMode, 'speechSynthesis');
  }
});
