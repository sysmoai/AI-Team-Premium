#!/usr/bin/env python3
from pathlib import Path

path = Path(__file__).with_name("apply-public-claim-hotfix.py")
text = path.read_text(encoding="utf-8")
replacements = {
    'const ManagedAiOperations = lazy(() => import("@/pages/services/ManagedAiOperations"));': 'const ManagedAiOperations = lazy(() => import("./pages/services/ManagedAiOperations"));',
    '"/chatgpt/plus-starter-shared"': '"/chatgpt/plus-shared"',
    '"/chatgpt/team-starter-shared"': '"/chatgpt/business-shared"',
    '"/chatgpt/team-premium-shared"': '"/chatgpt/business-premium-shared"',
    '"/chatgpt/team-personal-seat"': '"/chatgpt/business-personal-like"',
    '"/chatgpt/pro-personal-seat"': '"/chatgpt/go-shared"',
}
for old, new in replacements.items():
    if old not in text:
        raise SystemExit(f"runner patch target missing: {old}")
    text = text.replace(old, new)

needle = r"within\\s+\\d+|24\\/7"
replacement = r"within\\\\s+\\\\d+|24\\\\/7"
if needle not in text:
    raise SystemExit("ProductDetail unsafe-promise regex escape target missing")
text = text.replace(needle, replacement, 1)

# The application currently renders ProductSchema with a template-literal name.
# Make the transformation script match the whole first ProductSchema block rather
# than depending on a particular name prop shape.
start = text.find('    r"<ProductSchema')
if start < 0:
    raise SystemExit("ProductDetail ProductSchema raw matcher start missing")
end = text.find('/>",', start)
if end < 0:
    raise SystemExit("ProductDetail ProductSchema raw matcher end missing")
end += len('/>",')
text = text[:start] + '    r"<ProductSchema[\\s\\S]*?\\n\\s*/>",' + text[end:]

path.write_text(text, encoding="utf-8")
print("hotfix runner aligned with current routes, regex escapes and ProductSchema JSX")
