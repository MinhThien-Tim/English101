from pathlib import Path

# Georgia can render Vietnamese tone marks with visibly detached glyphs on
# some Windows/browser combinations. Cambria and Times New Roman both ship
# with complete precomposed Vietnamese coverage on supported Windows systems.
REPLACEMENTS = {
    "Georgia,serif": 'Cambria,"Times New Roman",serif',
    "Georgia, serif": 'Cambria,"Times New Roman",serif',
    '"Georgia",serif': 'Cambria,"Times New Roman",serif',
    '"Georgia", serif': 'Cambria,"Times New Roman",serif',
    "Georgia,'Times New Roman',serif": 'Cambria,"Times New Roman",serif',
    "'Iowan Old Style','Georgia',serif": 'Cambria,"Times New Roman",serif',
    'Georgia,"Times New Roman",serif': 'Cambria,"Times New Roman",serif',
}

changed = []
for path in Path(".").rglob("*.html"):
    text = path.read_text(encoding="utf-8")
    updated = text
    for old, new in REPLACEMENTS.items():
        updated = updated.replace(old, new)
    if updated != text:
        path.write_text(updated, encoding="utf-8", newline="")
        changed.append(str(path))

print(f"Updated Vietnamese-safe serif stacks in {len(changed)} files:")
for path in changed:
    print(path)
