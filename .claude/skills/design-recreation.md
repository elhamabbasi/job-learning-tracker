# Website Design Recreation Skill

**Command**: `/design-recreation` or `/recreate-design`

## What This Does
Recreates a website design from a reference screenshot with pixel-perfect accuracy using Tailwind CSS.

## Workflow

When the user provides a reference image (screenshot) and optionally some CSS classes or style notes:

1. **Generate** a single `index.html` file using Tailwind CSS (via CDN). Include all content inline - no external files unless requested.

2. **Screenshot** the rendered page using Puppeteer (`npm puppeteer screenshot index.html --fullpage` or equivalent). If the page has distinct sections, capture those individually too.

3. **Compare** your screenshot against the reference image. Check for mismatches in:
   - Spacing and padding (measure in px)
   - Font sizes, weights, and line heights
   - Colors (exact hex values)
   - Alignment and positioning
   - Border radius, shadows, and effects
   - Responsive behavior
   - Image/icon sizing and placement

4. **Fix** every mismatch found. Edit the HTML/Tailwind code.

5. **Re-screenshot** and compare again.

6. **Repeat** steps 3–5 until the result is within ~2–3px of the reference everywhere.

## Important Rules
- Do NOT stop after one pass
- Always do at least 2 comparison rounds
- Only stop when the user says so or when no visible differences remain
- Be obsessive about pixel-perfect accuracy

## Usage Example
```
/design-recreation
[User provides screenshot]
```
