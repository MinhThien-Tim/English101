# TOEIC 600 data contract

`toeic-600.js` is a browser-ready draft dataset for a future Vocabulary
Lesson. It exposes `window.ENGLISH101_TOEIC_600_DATA` and remains compatible
with direct `file://` use.

## Shape

- `meta`: identity, counts, version, and editorial status.
- `lessons`: 50 ordered Lesson summaries with 12 stable Vocabulary Entry IDs.
- `entries`: 600 ordered Vocabulary Entries.

Each entry contains the fields used by the library, flashcard, quiz, spelling,
and dictation Activities: stable ID, Lesson position, topic group, word, part
of speech, IPA, Vietnamese meaning, English definition, spelling hint, three
examples with translations, media placeholder, collocation cues, word
family/forms, usage note, and editorial status.

The image field is deliberately a placeholder. Do not hotlink the legacy
third-party images from the import. A future authoring pass should attach a
licensed local asset and meaningful alt text, or leave the image absent.

## Import CSV

`tools/build_toeic_600_data.py` accepts a UTF-8 CSV with these columns:

```text
english,type,vietnamese,pronounce,explain,example,example_vietnamese,
image_url,audio_url,topic,topic_url
```

Install the pinned authoring dependencies before rebuilding:

```bash
python -m pip install -r tools/requirements-toeic-600.txt
```

The builder removes the 15 topic-label rows found in the 615-row legacy
export, normalizes Lesson names and parts of speech, fills known missing
fields, creates spelling hints, omits third-party media URLs, and fails if any
Lesson does not contain exactly 12 entries.

The current import was normalized from the public **TOEIC 600 Words Scraped
Dataset** (`tranngocminhhieu/toeic-600-words-dataset`), whose README attributes
its collected material to the TFLAT Blog. Keep this attribution with the draft
until every definition, example, and translation has been independently
rewritten and reviewed.

Five headwords intentionally occur in two Lesson contexts: `productive`,
`register`, `express`, `constantly`, and `basis`. Their Lesson-scoped IDs keep
the Attempts and progress states separate.

## Publication gate

The dataset is marked `enriched-draft`. The Lesson is publishable as an
interactive study surface, but imported reference sentences, adapted examples,
machine-assisted IPA, collocation windows, and generated word forms still need
ongoing human spot review. Keep the 600 entry IDs stable during that work.
