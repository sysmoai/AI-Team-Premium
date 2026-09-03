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
path.write_text(text, encoding="utf-8")
print("hotfix runner aligned with current App routes")
