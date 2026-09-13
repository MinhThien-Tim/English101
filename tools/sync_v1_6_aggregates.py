import json
from collections import defaultdict
from pathlib import Path

ATLAS_FILES = [
    Path("Vocabulary/vong-1-2-vocabulary-complete-examples.html"),
    Path("Vocabulary/vong-3-4-vocabulary-complete-examples.html"),
    Path("Vocabulary/vong-5-6-vocabulary-complete-examples.html"),
]
PIPELINE = Path("Writing/meaning-to-english-pipeline-v1-6.html")
COMPACT = Path("Vocabulary/tu-vung-vong-1-6-rut-gon-luyen-viet.html")


def decode_after(text, marker):
    start = text.index(marker) + len(marker)
    value, used = json.JSONDecoder().raw_decode(text[start:])
    return value, start, start + used


def atlas_data(path):
    text = path.read_text(encoding="utf-8")
    items, _, _ = decode_after(text, "const DATA=")
    groups, _, _ = decode_after(text, "GROUPS=")
    return items, groups


all_items = []
for path in ATLAS_FILES:
    items, groups = atlas_data(path)
    for item in items:
        group = groups[item["groups"][0]] if item.get("groups") else ""
        all_items.append((item, group))

# The writing pipeline used to carry an older, larger snapshot containing
# hundreds of placeholder examples. Rebuild it exclusively from the atlases.
text = PIPELINE.read_text(encoding="utf-8")
_, start, end = decode_after(text, "const RAW_ITEMS = ")
rows = [[
    item["tier"], item["w"], item.get("ipa", ""), item.get("pos", ""),
    item["vi"], item["ex"], group, "", "", item["id"],
] for item, group in all_items]
payload = json.dumps(rows, ensure_ascii=False, separators=(",", ":"))
PIPELINE.write_text(text[:start] + payload + text[end:], encoding="utf-8", newline="")

# The compact page is intentionally a 1,200-item selection. Preserve that
# selection and its ordering, but synchronize every matching entry with the
# canonical meaning, IPA, part of speech, example, and topic.
index = defaultdict(list)
for item, group in all_items:
    index[(item["tier"], item["w"].casefold())].append((item, group))

ALIASES = {
    ("V3", "tear 1"): "tear",
    ("V4", "convict /kənˈvɪkt/ (v),"): "convict",
    ("V4", "delegate /ˈdelɪɡət/ (n),"): "delegate",
    ("V4", "advocate /ˈædvəkət/ (n),"): "advocate",
    ("V6", "be primarily driven by …"): "be primarily driven by",
    ("V6", "burn calories and build muscle → maintain a healthy weight"): "burn calories and build muscle",
    ("V6", "a complete ban on…"): "a complete ban on",
    ("V6", "fast food – junk food"): "fast food",
    ("V6", "foreign/second language"): "a foreign language",
    ("V6", "free humans from …"): "free humans from",
    ("V6", "extreme sports = dangerous sports"): "extreme sports",
    ("V6", "cycle lanes = bike lanes"): "cycle lanes",
    ("V6", "government funding for…"): "government funding for",
    ("V6", "fail to reach the right people/ the intended recipient"): "fail to reach the right people",
    ("V6", "guarantee access to …"): "guarantee access to",
    ("V6", "cause great damage to …"): "cause great damage to",
    ("V6", "anxiety disorders(n)"): "anxiety disorders",
    ("V6", "cause damage to…"): "cause damage to",
    ("V6", "obese(adj)"): "obese",
    ("V6", "surf/browse the internet"): "surf",
    ("V6", "rely on relatives for …"): "rely on relatives for",
    ("V6", "highly dangerous and life-threatening"): "be highly dangerous and life-threatening",
    ("V6", "find it difficult to …"): "find it difficult to",
    ("V6", "obesity (n)"): "obesity",
    ("V6", "government support for…"): "government support for",
    ("V6", "animals do not get many of the human diseases that we do"): "animals do not develop many human diseases",
    ("V6", "people’s health"): "people's health",
    ("V6", "investment (n)"): "investment",
    ("V6", "increase local prices (inflation)"): "increase local prices",
    ("V6", "lack access to …"): "lack access to",
}

SPECIAL = {
    ("V6", "build = construct"): ["V6", "build", "bɪld", "v", "xây dựng", "The city plans to build more affordable housing.", "V6 · IELTS COLLOCATIONS — HOUSING AND ARCHITECTURE", "noun"],
    ("V6", "build"): ["V6", "build", "bɪld", "v", "xây dựng", "The city plans to build more affordable housing.", "V6 · IELTS COLLOCATIONS — HOUSING AND ARCHITECTURE", "noun"],
    ("V6", "act/serve as a deterrent"): ["V6", "act as a deterrent", "—", "collocation", "có tác dụng răn đe", "Visible security cameras can act as a deterrent to theft.", "V6 · IELTS COLLOCATIONS — CRIME", "other"],
    ("V6", "act as a deterrent"): ["V6", "act as a deterrent", "—", "collocation", "có tác dụng răn đe", "Visible security cameras can act as a deterrent to theft.", "V6 · IELTS COLLOCATIONS — CRIME", "other"],
}

text = COMPACT.read_text(encoding="utf-8")
compact, start, end = decode_after(text, "const RAW=")
matched = 0
ambiguous = 0
for row in compact:
    original_key = (row[0], row[1])
    if original_key in SPECIAL:
        row[:] = SPECIAL[original_key]
        matched += 1
        continue
    alias = ALIASES.get(original_key, row[1])
    candidates = index.get((row[0], alias.casefold()), [])
    if row[1] == "t":
        row[:] = []
        continue
    if not candidates:
        continue
    if len(candidates) > 1:
        same_pos = [x for x in candidates if x[0].get("pos", "") == row[3]]
        candidates = same_pos or candidates
        ambiguous += len(candidates) > 1
    item, group = candidates[0]
    row[1:7] = [item["w"], item.get("ipa", ""), item.get("pos", ""), item["vi"], item["ex"], group]
    matched += 1
compact = [row for row in compact if row]
# Preserve the formerly truncated compact entry as a repaired learning item.
restored_key = ("V6", "experiments on cell structures rather than whole animals")
if not any((row[0], row[1].casefold()) == restored_key for row in compact):
    item, group = index[restored_key][0]
    compact.append([item["tier"], item["w"], item.get("ipa", ""), item.get("pos", ""), item["vi"], item["ex"], group, "other"])
payload = json.dumps(compact, ensure_ascii=False, separators=(",", ":"))
COMPACT.write_text(text[:start] + payload + text[end:], encoding="utf-8", newline="")

print(f"Pipeline rebuilt: {len(rows)} canonical items")
print(f"Compact page synchronized: {matched}/{len(compact)} items; ambiguous keys: {ambiguous}")
