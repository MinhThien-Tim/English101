#!/usr/bin/env python3
"""Build the browser-ready TOEIC 600 vocabulary dataset from a source CSV.

The source CSV is expected to use the columns documented in
data/vocabulary/toeic-600-data.md. The generated file is intentionally plain
JavaScript so the static site can load it from file:// as well as HTTP.
"""

from __future__ import annotations

import argparse
import csv
import json
import re
import unicodedata
from pathlib import Path


LESSONS = [
    (1, "Contracts", "Contracts"),
    (2, "Marketing", "Marketing"),
    (3, "Warranties", "Warranties"),
    (4, "Business Planning", "Business Planning"),
    (5, "Conferences", "Conference"),
    (6, "Computers and the Internet", "Computers and the Internet"),
    (7, "Office Technology", "Office Technology"),
    (8, "Office Procedures", "Office Procedures"),
    (9, "Electronics", "Electronics"),
    (10, "Correspondence", "Correspondence"),
    (11, "Job Advertising and Recruiting", "Job Ads & Recruitment"),
    (12, "Applying and Interviewing", "Apply and Interviewing"),
    (13, "Hiring and Training", "Hiring and Training"),
    (14, "Salaries and Benefits", "Salaries & Benefits"),
    (15, "Promotions, Pensions, and Awards", "Promotions, Pensions & Award"),
    (16, "Shopping", "Shopping"),
    (17, "Ordering Supplies", "Ordering Supplies"),
    (18, "Shipping", "Shipping"),
    (19, "Invoices", "Invoice"),
    (20, "Inventory", "Inventory"),
    (21, "Banking", "Banking"),
    (22, "Accounting", "Accounting"),
    (23, "Investments", "Investment"),
    (24, "Taxes", "Taxes"),
    (25, "Financial Statements", "Financial Statements"),
    (26, "Property and Departments", "Property & Departments"),
    (27, "Board Meetings and Committees", "Board Meeting & Committees"),
    (28, "Quality Control", "Quality Control"),
    (29, "Product Development", "Product Development"),
    (30, "Renting and Leasing", "Renting and Leasing"),
    (31, "Selecting a Restaurant", "Selecting A Restaurant"),
    (32, "Eating Out", "Eating Out"),
    (33, "Ordering Lunch", "Ordering Lunch"),
    (34, "Cooking as a Career", "Cooking As A Career"),
    (35, "Events", "Events"),
    (36, "General Travel", "General Travel"),
    (37, "Airlines", "Airlines"),
    (38, "Trains", "Trains"),
    (39, "Hotels", "Hotels"),
    (40, "Car Rentals", "Car Rentals"),
    (41, "Movies", "Movies"),
    (42, "Theater", "Theater"),
    (43, "Music", "Music"),
    (44, "Museums", "Museums"),
    (45, "Media", "Media"),
    (46, "Doctor's Office", "Doctor's Office"),
    (47, "Dentist's Office", "Dentist's Office"),
    (48, "Health Insurance", "Health"),
    (49, "Hospitals", "Hospitals"),
    (50, "Pharmacy", "Pharmacy"),
]

GROUPS = [
    (1, "General Business"),
    (6, "Office Issues"),
    (11, "Personnel"),
    (16, "Purchasing"),
    (21, "Financing and Budgeting"),
    (26, "Management Issues"),
    (31, "Restaurants and Events"),
    (36, "Travel"),
    (41, "Entertainment"),
    (46, "Health"),
]

TOPIC_HEADINGS = {
    "accounting", "conference", "contract", "event", "health", "hospital",
    "hotel", "investment", "marketing", "media", "movie", "museum",
    "music", "shopping", "train",
}

FIELD_FIXES = {
    "bring in": {"partOfSpeech": "phr.v."},
    "come up with": {"partOfSpeech": "phr.v."},
    "look forward to": {"partOfSpeech": "phr.v.", "ipa": "lʊk ˈfɔːwəd tə"},
    "give up": {"ipa": "ɡɪv ʌp"},
    "be ready for": {"ipa": "bi ˈredi fə", "definition": "to be prepared for something"},
    "follow up": {"ipa": "ˈfɒləʊ ʌp"},
    "petition": {"ipa": "pəˈtɪʃn"},
    "throw out": {"definition": "to discard or remove something"},
    "open to": {"definition": "willing to consider or accept something"},
    "influence": {"definition": "the power to affect a person, decision, or result"},
    "demand": {"definition": "a strong need or request for something"},
    "ascertain": {"definition": "to find out something with certainty"},
    "agenda": {"definition": "a list of matters to discuss or act on"},
    "choose": {"definition": "to select from two or more possibilities"},
    "catalog": {"definition": "an organized list of products or other items"},
    "recruit": {"definition": "to find and hire a new employee or member"},
    "check-in": {"ipa": "ˈtʃek ɪn", "definition": "the process of registering on arrival"},
    "fund": {"definition": "a sum of money saved or provided for a purpose"},
    "pull-out": {"definition": "an act of withdrawing from an activity or investment"},
    "resource": {"definition": "a useful supply of money, materials, people, or information"},
    "secure": {"definition": "to obtain something, especially after effort"},
}

POS_MAP = {
    "n.": "n", "v.": "v", "adj.": "adj", "adv.": "adv",
    "n,v.": "n/v", "n, v.": "n/v", "v, n.": "v/n",
    "perp.": "prep", "phr. v.": "phr.v", "phr.v.": "phr.v",
    "n.ph.": "n.phr",
}


def clean(value: str) -> str:
    return re.sub(r"\s+", " ", (value or "").strip())


def strip_ipa(value: str) -> str:
    return clean(value).strip("/")


def slug(value: str) -> str:
    ascii_value = unicodedata.normalize("NFKD", value).encode("ascii", "ignore").decode()
    return re.sub(r"[^a-z0-9]+", "-", ascii_value.lower()).strip("-")


def make_hint(word: str) -> str:
    def mask(token: str) -> str:
        letters = [index for index, char in enumerate(token) if char.isalpha()]
        if not letters:
            return token
        visible = {letters[0]}
        if len(letters) >= 7:
            visible.add(letters[-1])
        return "".join(char if index in visible or not char.isalpha() else "_" for index, char in enumerate(token))

    return " ".join(mask(token) for token in word.split(" "))


def group_for(lesson_number: int) -> tuple[int, str]:
    start, title = max(group for group in GROUPS if group[0] <= lesson_number)
    return ((start - 1) // 5 + 1, title)


def build(source: Path) -> dict:
    with source.open(encoding="utf-8-sig", newline="") as handle:
        source_rows = list(csv.DictReader(handle))

    by_topic: dict[str, list[dict[str, str]]] = {}
    for row in source_rows:
        word = clean(row["english"])
        topic = clean(row["topic"])
        if word.lower() in TOPIC_HEADINGS and topic.lower().startswith(word.lower()):
            continue
        by_topic.setdefault(topic, []).append(row)

    entries = []
    lesson_summaries = []
    ordinal = 0
    for lesson_number, topic, source_topic in LESSONS:
        lesson_rows = by_topic.get(source_topic, [])
        if len(lesson_rows) != 12:
            raise ValueError(f"Lesson {lesson_number} ({topic}) has {len(lesson_rows)} entries, expected 12")
        group_number, group_title = group_for(lesson_number)
        lesson_summaries.append({
            "number": lesson_number,
            "topic": topic,
            "group": group_number,
            "groupTitle": group_title,
            "entryIds": [],
        })
        for position, row in enumerate(lesson_rows, start=1):
            ordinal += 1
            word = clean(row["english"])
            fixes = FIELD_FIXES.get(word.lower(), {})
            entry_id = f"toeic-{lesson_number:02d}-{position:02d}-{slug(word)}"
            lesson_summaries[-1]["entryIds"].append(entry_id)
            raw_pos = clean(row["type"])
            part_of_speech = POS_MAP.get(raw_pos, raw_pos.rstrip("."))
            entry = {
                "id": entry_id,
                "ordinal": ordinal,
                "lesson": lesson_number,
                "position": position,
                "group": group_number,
                "groupTitle": group_title,
                "topic": topic,
                "word": word,
                "partOfSpeech": fixes.get("partOfSpeech", part_of_speech),
                "ipa": fixes.get("ipa", strip_ipa(row["pronounce"])),
                "vietnamese": clean(row["vietnamese"]),
                "definition": fixes.get("definition", clean(row["explain"])),
                "hint": make_hint(word),
                "example": clean(row["example"]),
                "translation": clean(row["example_vietnamese"]),
                "media": {
                    "image": None,
                    "imageAlt": None,
                    "imageQuery": f"{word} {topic} business context",
                    "audioMode": "speechSynthesis",
                },
                "collocations": [],
                "wordFamily": [],
                "usageNote": "",
                "editorialStatus": "imported-draft",
            }
            entries.append(entry)

    return {
        "meta": {
            "id": "toeic-600-essential-words",
            "title": "600 Essential Words for the TOEIC",
            "author": "Lin Lougheed",
            "editionBasis": "Third edition topic sequence",
            "language": "en-vi",
            "entryCount": len(entries),
            "lessonCount": len(lesson_summaries),
            "entriesPerLesson": 12,
            "schemaVersion": 1,
            "editorialStatus": "draft",
            "importSource": {
                "name": "TOEIC 600 Words Scraped Dataset",
                "url": "https://github.com/tranngocminhhieu/toeic-600-words-dataset",
                "upstreamAttribution": "TFLAT Blog",
            },
            "sourceNote": (
                "The lesson sequence and target-word inventory follow the named book. "
                "Imported definitions, examples, translations, and legacy IPA require "
                "editorial review before publication. Media URLs are intentionally omitted."
            ),
        },
        "lessons": lesson_summaries,
        "entries": entries,
    }


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("source", type=Path, help="CSV containing the imported vocabulary rows")
    parser.add_argument("output", type=Path, help="Generated JavaScript destination")
    args = parser.parse_args()
    dataset = build(args.source)
    payload = json.dumps(dataset, ensure_ascii=False, indent=2)
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(
        "/* Generated by tools/build_toeic_600_data.py. */\n"
        "window.ENGLISH101_TOEIC_600_DATA = " + payload + ";\n",
        encoding="utf-8",
    )


if __name__ == "__main__":
    main()
