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

# This TypeScript regex is itself written through a Python re.sub replacement.
# Double its source escapes so Python's replacement parser emits literal \s, \d
# and \/ sequences into the TS regex instead of treating them as replacements.
needle = r"within\\s+\\d+|24\\/7"
replacement = r"within\\\\s+\\\\d+|24\\\\/7"
if needle not in text:
    raise SystemExit("ProductDetail unsafe-promise regex escape target missing")
text = text.replace(needle, replacement, 1)

path.write_text(text, encoding="utf-8")
print("hotfix runner aligned with current App routes and literal regex escapes")
