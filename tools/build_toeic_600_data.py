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

import eng_to_ipa as english_ipa
from wordfreq import zipf_frequency


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

IRREGULAR_FORMS = {
    "bear": ["bears", "bore", "borne/born", "bearing"],
    "bring": ["brings", "brought", "bringing"],
    "build": ["builds", "built", "building"],
    "catch": ["catches", "caught", "catching"],
    "choose": ["chooses", "chose", "chosen", "choosing"],
    "come": ["comes", "came", "come", "coming"],
    "deal": ["deals", "dealt", "dealing"],
    "draw": ["draws", "drew", "drawn", "drawing"],
    "find": ["finds", "found", "finding"],
    "get": ["gets", "got", "got/gotten", "getting"],
    "give": ["gives", "gave", "given", "giving"],
    "hold": ["holds", "held", "holding"],
    "keep": ["keeps", "kept", "keeping"],
    "lead": ["leads", "led", "leading"],
    "make": ["makes", "made", "making"],
    "run": ["runs", "ran", "run", "running"],
    "sell": ["sells", "sold", "selling"],
    "shut": ["shuts", "shut", "shutting"],
    "take": ["takes", "took", "taken", "taking"],
    "throw": ["throws", "threw", "thrown", "throwing"],
    "withhold": ["withholds", "withheld", "withholding"],
}

TOPIC_VI = {
    "General Business": "kinh doanh tổng quát",
    "Office Issues": "công việc văn phòng",
    "Personnel": "nhân sự",
    "Purchasing": "mua hàng",
    "Financing and Budgeting": "tài chính và ngân sách",
    "Management Issues": "quản lý",
    "Restaurants and Events": "nhà hàng và sự kiện",
    "Travel": "du lịch và di chuyển",
    "Entertainment": "giải trí",
    "Health": "y tế và sức khỏe",
}


def clean(value: str) -> str:
    return re.sub(r"\s+", " ", (value or "").strip())


def strip_ipa(value: str) -> str:
    value = clean(value).strip("/").replace(":", "ː").replace("'", "ˈ")
    return value


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


def edited_ipa(word: str, legacy: str) -> str:
    candidate = english_ipa.convert(word.replace("-", " "))
    if candidate and "*" not in candidate:
        return candidate
    return strip_ipa(legacy)


def regular_verb_forms(word: str) -> list[str]:
    first, *rest = word.split()
    if first in IRREGULAR_FORMS:
        forms = IRREGULAR_FORMS[first]
    else:
        third = first + "es" if re.search(r"(?:s|sh|ch|x|z|o)$", first) else (first[:-1] + "ies" if re.search(r"[^aeiou]y$", first) else first + "s")
        past = first + "d" if first.endswith("e") else (first[:-1] + "ied" if re.search(r"[^aeiou]y$", first) else first + "ed")
        ing = first[:-1] + "ing" if first.endswith("e") and not first.endswith("ee") else first + "ing"
        forms = [third, past, ing]
    suffix = " " + " ".join(rest) if rest else ""
    return [word, *(form + suffix for form in forms)]


def word_family(word: str, part_of_speech: str) -> list[dict[str, str]]:
    family = [{"form": word, "partOfSpeech": part_of_speech}]
    if "v" in part_of_speech:
        family.extend({"form": form, "partOfSpeech": "verb form"} for form in regular_verb_forms(word)[1:])
    elif part_of_speech == "n" and " " not in word:
        plural = word[:-1] + "ies" if re.search(r"[^aeiou]y$", word) else (word + "es" if re.search(r"(?:s|sh|ch|x|z)$", word) else word + "s")
        family.append({"form": plural, "partOfSpeech": "plural noun"})
    elif part_of_speech == "adj" and " " not in word:
        candidate = word[:-1] + "ily" if word.endswith("y") else word + "ly"
        if zipf_frequency(candidate, "en") >= 2:
            family.append({"form": candidate, "partOfSpeech": "adv"})
    return family[:5]


def collocations_from_example(word: str, example: str, topic: str) -> list[str]:
    tokens = re.findall(r"[A-Za-z]+(?:['’-][A-Za-z]+)?", example)
    lowered = [token.lower().replace("’", "'") for token in tokens]
    first = word.split()[0].lower()
    index = next((i for i, token in enumerate(lowered) if token == first or token.startswith(first[:max(3, len(first) - 2)])), -1)
    chunks = []
    if index >= 0:
        chunks.append(" ".join(tokens[max(0, index - 2):min(len(tokens), index + max(3, len(word.split()) + 2))]))
    if " " in word:
        chunks.append(word)
    topic_chunk = f"{word} · {topic.lower()}"
    if topic_chunk not in chunks:
        chunks.append(topic_chunk)
    return chunks[:3]


def usage_note(part_of_speech: str, word: str, topic: str) -> str:
    if part_of_speech == "phr.v" or " " in word:
        return f"Học cả cụm “{word}”; không bỏ hoặc tự đổi giới từ/tiểu từ. Trong TOEIC, cụm này thường xuất hiện ở ngữ cảnh {topic.lower()}."
    if "v" in part_of_speech:
        return f"Khi gặp “{word}”, kiểm tra tân ngữ hoặc giới từ theo sau. Ưu tiên học cùng cụm từ trong tình huống {topic.lower()}."
    if part_of_speech == "n":
        return f"Đây là danh từ. Chú ý mạo từ, số ít–số nhiều và động từ đi kèm khi dùng trong ngữ cảnh {topic.lower()}."
    if part_of_speech == "adj":
        return "Tính từ này có thể bổ nghĩa cho danh từ hoặc đứng sau linking verb; cần học thêm giới từ đi kèm nếu có."
    if part_of_speech == "adv":
        return "Trạng từ này bổ nghĩa cho động từ, tính từ hoặc cả mệnh đề; vị trí trong câu thay đổi theo trọng tâm cần nhấn mạnh."
    return f"Ghi nhớ từ trong cả cụm và đối chiếu chức năng của nó trong ngữ cảnh {topic.lower()}."


def replace_words(sentence: str, replacements: dict[str, str]) -> str:
    result = sentence
    for source, target in replacements.items():
        result = re.sub(rf"\b{re.escape(source)}\b", target, result, flags=re.IGNORECASE)
    return result


def lower_sentence_start(sentence: str) -> str:
    if sentence.startswith("I ") or sentence.startswith("I'") or sentence.startswith("I’"):
        return sentence
    return sentence[:1].lower() + sentence[1:]


def adapted_examples(word: str, imported_example: str, imported_translation: str) -> list[dict[str, str]]:
    english_sets = [
        {"company": "firm", "manager": "supervisor", "employee": "staff member", "customer": "client", "project": "assignment", "meeting": "briefing", "problem": "issue", "plan": "proposal", "report": "summary", "decision": "ruling", "judge": "mediator", "week": "month", "year": "quarter"},
        {"business": "organization", "office": "department", "workers": "employees", "people": "participants", "product": "service", "system": "process", "money": "funds", "job": "role", "work": "task", "important": "essential", "new": "updated", "good": "effective"},
    ]
    vietnamese_sets = [
        {"công ty": "doanh nghiệp", "người quản lý": "người giám sát", "nhân viên": "thành viên nhóm", "khách hàng": "khách", "dự án": "nhiệm vụ", "cuộc họp": "buổi trao đổi", "vấn đề": "trở ngại", "kế hoạch": "đề xuất", "quyết định": "phán quyết", "tuần": "tháng", "năm": "quý"},
        {"doanh nghiệp": "tổ chức", "văn phòng": "bộ phận", "mọi người": "những người tham gia", "sản phẩm": "dịch vụ", "hệ thống": "quy trình", "tiền": "nguồn vốn", "công việc": "vai trò", "quan trọng": "thiết yếu", "mới": "được cập nhật", "tốt": "hiệu quả"},
    ]
    prefixes = [
        ("Recently, ", "Gần đây, "),
        ("During a team meeting, ", "Trong một cuộc họp nhóm, "),
        ("In a recent workplace case, ", "Trong một tình huống gần đây tại nơi làm việc, "),
        ("Earlier this month, ", "Đầu tháng này, "),
        ("After reviewing the details, ", "Sau khi xem xét chi tiết, "),
        ("Before the final decision, ", "Trước quyết định cuối cùng, "),
        ("As part of the project, ", "Trong khuôn khổ dự án, "),
        ("During a routine review, ", "Trong một lần rà soát định kỳ, "),
        ("In the latest report, ", "Trong báo cáo mới nhất, "),
        ("At the weekly briefing, ", "Tại buổi họp ngắn hằng tuần, "),
        ("When the issue came up, ", "Khi vấn đề xuất hiện, "),
        ("During staff training, ", "Trong buổi đào tạo nhân viên, "),
    ]
    seed = sum(ord(character) for character in word)
    results = []
    for index, (english_map, vietnamese_map) in enumerate(zip(english_sets, vietnamese_sets)):
        english = replace_words(imported_example, english_map)
        vietnamese = replace_words(imported_translation, vietnamese_map)
        if english == imported_example:
            english_prefix, _ = prefixes[(seed + index * 5) % len(prefixes)]
            english = english_prefix + lower_sentence_start(imported_example)
        if vietnamese == imported_translation:
            _, vietnamese_prefix = prefixes[(seed + index * 5) % len(prefixes)]
            vietnamese = vietnamese_prefix + lower_sentence_start(imported_translation)
        results.append({"en": english, "vi": vietnamese, "source": "english101-contextualized"})
    return results


def original_examples(word: str, part_of_speech: str, vietnamese: str, topic: str, group_title: str, imported_example: str, imported_translation: str) -> list[dict[str, str]]:
    return [
        {"en": imported_example, "vi": imported_translation, "source": "imported-reference"},
        *adapted_examples(word, imported_example, imported_translation),
    ]


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
            vietnamese = clean(row["vietnamese"]).rstrip(" ,;")
            imported_example = clean(row["example"])
            imported_translation = clean(row["example_vietnamese"])
            examples = original_examples(
                word, fixes.get("partOfSpeech", part_of_speech), vietnamese,
                topic, group_title, imported_example, imported_translation,
            )
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
                "ipa": fixes.get("ipa", edited_ipa(word, row["pronounce"])),
                "vietnamese": vietnamese,
                "definition": fixes.get("definition", clean(row["explain"])),
                "hint": make_hint(word),
                "example": examples[0]["en"],
                "translation": examples[0]["vi"],
                "examples": examples,
                "media": {
                    "image": None,
                    "imageAlt": None,
                    "imageQuery": f"{word} {topic} business context",
                    "audioMode": "speechSynthesis",
                },
                "collocations": collocations_from_example(word, imported_example, topic),
                "wordFamily": word_family(word, fixes.get("partOfSpeech", part_of_speech)),
                "usageNote": usage_note(fixes.get("partOfSpeech", part_of_speech), word, topic),
                "editorialStatus": "enriched-draft",
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
            "editorialStatus": "enriched-draft",
            "importSource": {
                "name": "TOEIC 600 Words Scraped Dataset",
                "url": "https://github.com/tranngocminhhieu/toeic-600-words-dataset",
                "upstreamAttribution": "TFLAT Blog",
            },
            "sourceNote": (
                "The lesson sequence and target-word inventory follow the named book. "
                "The lexical import has been normalized and expanded with English101 "
                "examples, word forms, collocation cues, and usage notes. Imported reference "
                "examples and machine-assisted IPA still require spot review. Media URLs are "
                "intentionally omitted."
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
