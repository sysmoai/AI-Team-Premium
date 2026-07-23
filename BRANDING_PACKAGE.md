# AI Team Premium — Complete Branding Package

## Brand Identity Overview

| Element | Value |
|---|---|
| **Brand Name** | AI Team Premium |
| **Domain** | aiteampremium.com |
| **Primary Blue** | `#2563EB` |
| **Dark Navy** | `#0F172A` |
| **Light Sky** | `#EFF6FF` |
| **White** | `#FFFFFF` |
| **Gradient** | `linear-gradient(135deg, #0F172A 0%, #1e3a5f 50%, #2563EB 100%)` |
| **Font** | Inter (sans-serif) |
| **Icon** | Atom Orbit — 3 elliptical orbits, 3 nodes, 1 core |

---

## 1. Improved Logo SVG (already in code)

The logo has been updated in `client/src/components/brand/LogoIcons.tsx`:
- Atom icon: thicker strokes (2.5 vs 2.2), larger core (4.5 vs 4), more visible ring (0.35 opacity vs 0.25), larger nodes (3.0 vs 2.8)
- Wordmark: removed "BD" suffix, simplified to 2 styles (bold blue "AI Team" + medium navy "Premium")
- `BRAND` object updated with `accent`, `gradient`, `muted` properties

---

## 2. Favicon

A new favicon has been created at `client/public/favicon.svg`:
- Dark navy (`#0F172A`) rounded square background
- White-blue atom icon with thicker strokes for small-scale visibility
- 64x64 viewBox, iOS-friendly

---

## 3. OG Image Prompts — For Higgsfield Free Mode

### Option A: Recraft V4.1 (vector mode) — Best for logo + brand assets

**Prompt for logo icon (vector):**
```
model: recraft_v4_1
model_type: vector
aspect_ratio: 1:1
colors: ["#2563EB", "#0F172A"]
background_color: "#FFFFFF"
prompt: "Modern minimalist atom icon with 3 elliptical orbits crossing at center, 3 small electron nodes on orbit paths, 1 larger central nucleus core. Clean vector style, no text, professional tech logo icon. Blue (#2563EB) lines on white background."
```

**Prompt for OG image 1200x630 (utility_vector):**
```
model: recraft_v4_1
model_type: utility_vector
aspect_ratio: 3:2
colors: ["#2563EB", "#0F172A", "#FFFFFF"]
background_color: "#0F172A"
prompt: "Premium technology brand hero image. Dark navy background with subtle blue gradient. Left side: minimalist blue atom icon with 3 orbital rings. Right side: bold text 'AI Team Premium' in white. Below it: 'ChatGPT · Claude · Gemini' in light blue. Clean corporate design, high contrast, modern tech aesthetic. No people, no photos."
```

### Option B: GPT Image 2 (text rendering) — Best for OG images with readable text

**Prompt for OG image (1200x630):**
```
model: gpt_image_2
aspect_ratio: 16:9
resolution: 2k
quality: high
prompt: "Dark navy and blue gradient background. A clean, modern atom logo icon on the left side — 3 intersecting elliptical orbits with small nodes. To the right of the icon, the text 'AI Team Premium' in bold white sans-serif. Below it, subtitle 'ChatGPT · Claude · Gemini & More' in a lighter blue. Professional technology brand header image for a website, 1200x630 pixels, corporate design, clean lines, no people, no photographs."
```

### Option C: Recraft V4.1 (utility) — Simplified OG image

**Prompt for OG image (simplified):**
```
model: recraft_v4_1
model_type: utility
aspect_ratio: 3:2
colors: ["#2563EB", "#0F172A", "#FFFFFF"]
background_color: "#0F172A"
prompt: "Technology brand cover image. Split composition: left half has a glowing blue atom icon with orbital rings on dark navy background. Right half is clean with brand name. Very minimal, corporate, premium feel. Dark blue and navy color scheme. 1200x630 format."
```

---

## 4. Apple Touch Icon Prompt

```
model: recraft_v4_1
model_type: vector
aspect_ratio: 1:1
colors: ["#2563EB", "#0F172A"]
background_color: "#0F172A"
prompt: "Square app icon, dark navy rounded square background. Center: simple blue atom icon with 3 orbital rings crossing. No text. Clean iOS-style icon. 180x180 pixel equivalent."
```

---

## 5. Code Updates Needed

### A. index.html — Update OG image URL
After generating the OG image, replace the Unsplash URL in `client/index.html`:
```html
<meta property="og:image" content="YOUR_GENERATED_OG_URL_HERE" />
<meta name="twitter:image" content="YOUR_GENERATED_OG_URL_HERE" />
```

### B. manifest.json — Update theme color
Already set to `#0F172A` — correct.

### C. OrganizationSchema.tsx — Update image URL
After generating the favicon and OG image, update:
```ts
const LOGO_URL = `${SITE_URL}/favicon.svg`;  // or your generated logo
```

### D. LogoIcons.tsx — Already updated with:
- Fixed atom icon geometry (thicker strokes, larger core, better nodes)
- Cleaner wordmark (no "BD" suffix, 2 styles only)
- New BRAND properties (accent, gradient, muted)

---

## 6. Brand Usage Rules

| Element | Rule |
|---|---|
| **Logo minimum size** | 28px icon height (horizontal) / 56px (stacked) |
| **Clear space** | Minimum 1/4 of icon width around all sides |
| **Backgrounds** | White, navy, sky blue only |
| **Never** | Stretch, rotate, recolor outside brand palette, add effects |
| **Typography** | Inter only. Fallback: system-ui, sans-serif |
| **Icon only** | Use alone for favicon, app icon, social avatar |
| **Full logo** | Use for website header, OG images, print |