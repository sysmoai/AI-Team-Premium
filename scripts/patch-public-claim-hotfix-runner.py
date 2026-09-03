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
    'AITP does not grant permission to bypass provider restrictions.': 'AI Team Premium does not grant permission to bypass provider restrictions.',
}
for old, new in replacements.items():
    if old in text:
        text = text.replace(old, new)
    elif new not in text:
        raise SystemExit(f"runner patch target missing: {old}")

needle = r"within\\s+\\d+|24\\/7"
replacement = r"within\\\\s+\\\\d+|24\\\\/7"
if needle in text:
    text = text.replace(needle, replacement, 1)
elif replacement not in text:
    raise SystemExit("ProductDetail unsafe-promise regex escape target missing")

general_schema = '    r"<ProductSchema[\\s\\S]*?\\n\\s*/>",' 
if general_schema not in text:
    start = text.find('    r"<ProductSchema')
    if start < 0:
        raise SystemExit("ProductDetail ProductSchema raw matcher start missing")
    end = text.find('/>",', start)
    if end < 0:
        raise SystemExit("ProductDetail ProductSchema raw matcher end missing")
    end += len('/>",')
    text = text[:start] + general_schema + text[end:]

nested_template = 'items.push({ name: label, item: `${SITE}/${section}` });'
safe_concat = 'items.push({ name: label, item: SITE + "/" + section });'
if nested_template in text:
    text = text.replace(nested_template, safe_concat, 1)
elif safe_concat not in text:
    raise SystemExit("structured-data nested template target missing")

patched_lines = []
seen_slug = False
seen_normalized = False
for line in text.splitlines():
    if 'const slug = path.slice("/blog/".length).replace(' in line:
        patched_lines.append('  const rawSlug = path.slice("/blog/".length);')
        patched_lines.append('  const slug = rawSlug.endsWith("/") ? rawSlug.slice(0, -1) : rawSlug;')
        seen_slug = True
        continue
    if 'const normalized = path.length > 1 ? path.replace(' in line:
        patched_lines.append('  const normalized = path.length > 1 && path.endsWith("/") ? path.slice(0, -1) : path;')
        seen_normalized = True
        continue
    patched_lines.append(line)
text = "\n".join(patched_lines) + ("\n" if text.endswith("\n") else "")
if not seen_slug and 'const rawSlug = path.slice("/blog/".length);' not in text:
    raise SystemExit("content quarantine path-normalization target missing")
if not seen_normalized and 'path.length > 1 && path.endsWith("/")' not in text:
    raise SystemExit("public review path-normalization target missing")

faq_old = '`${faq.q} ${faq.a}`'
faq_new = '`${faq.question} ${faq.answer}`'
if faq_old in text:
    text = text.replace(faq_old, faq_new, 1)
elif faq_new not in text:
    raise SystemExit("catalog FAQ field-name target missing")

# The permanent handler verification must reflect the new evidence-review
# contract for legacy commercial aliases instead of expecting the old page title.
old_write = 'write("scripts/verify.mjs", verify.replace(anchor, gate + anchor, 1))'
new_write = '''verify = verify.replace(anchor, gate + anchor, 1)
verify = verify.replace(
    '["/api/tools/midjourney", 200, ROUTE_META["/tools/midjourney"].title],',
    '["/api/tools/midjourney", 200, "Commercial Page Under Evidence Review | AI Team Premium"],',
)
write("scripts/verify.mjs", verify)'''
if old_write in text:
    text = text.replace(old_write, new_write, 1)
elif 'Commercial Page Under Evidence Review | AI Team Premium' not in text:
    raise SystemExit("handler verify contract target missing")

path.write_text(text, encoding="utf-8")
print("hotfix runner aligned with current routes, claim-safe legal copy and evidence-review verification")
