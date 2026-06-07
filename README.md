# Scalda Investments LLC — Website

Static marketing site for **Scalda Investments LLC**, served from this repo as
GitHub Pages on the custom domain in [`CNAME`](CNAME) → **scaldainvestments.com**.

The site is plain HTML + CSS + a small amount of vanilla JavaScript — no build
step, no framework, no dependencies. Open `index.html` in a browser to preview
locally.

---

## Project layout

```
.
├── index.html                       homepage (hero, About, Properties grid, Why Us, Contact)
├── README.md                        this file
├── CNAME                            GitHub Pages custom-domain pointer
├── assets/
│   └── Logo_Scalda_Investments_LLC.png
└── properties/
    ├── property.css                 shared styles for every property detail page
    ├── property.js                  shared lightbox / keyboard nav script
    │
    ├── <slug>/                      one folder per property
    │   ├── cover.jpeg               the thumbnail shown on the homepage
    │   ├── 01.jpeg … NN.jpeg        gallery photos, zero-padded sequential
    │   └── index.html               the property's detail page (optional —
    │                                only properties with gallery photos have one)
    │
    ├── 1142-w-28th-st/              ← cover only
    ├── 1302-1304-medford-ave/       ← cover + 7 gallery + detail page
    ├── 1470-1472-lee-st/            ← cover + 4 gallery + detail page
    ├── 15-s-gray-st/                ← cover only
    ├── 1923-1925-w-ohio-st/         ← cover + 6 gallery + detail page
    ├── 2526-adams/                  ← cover only
    ├── 3502-white-cedar-ct/         ← cover + 2 gallery + detail page
    ├── 3647-hillside-ave/           ← cover only
    ├── 3664-yellow-poplar-ct/       ← cover + 4 gallery + detail page
    ├── 4050-w-vermont-st/           ← cover only
    ├── 730-n-arnold/                ← cover + 3 gallery + detail page
    ├── 755-lynn-st/                 ← cover only
    ├── 931-lynn-st/                 ← cover + 6 gallery + detail page
    └── omoa-luna-mare/              ← Honduras property (cover + aerial)
```

Folder slugs use lowercase-kebab-case (`1302-1304-medford-ave`), no spaces, no
special characters. The slug is also the URL path: a detail page lives at
`https://scaldainvestments.com/properties/<slug>/`.

---

## Homepage cards (`index.html`)

Each property in the Properties section is a `<div class="prop-card">` with a
few `data-*` attributes that the share + detail-page logic reads:

```html
<div class="prop-card"
     data-addr="931 Lynn St"
     data-city="Indianapolis, IN 46222"
     data-details="2 BD · 1 BA · 600 sqft"
     data-detail="properties/931-lynn-st/"        ← optional; presence of this
     style="cursor:pointer"                         attribute is what makes the
     onclick="if(!event.target.closest('.prop-share-btn'))   card clickable AND
              window.location.href='properties/931-lynn-st/'">  what the share
                                                                modal links to.
  <button class="prop-share-btn"
          onclick="event.stopPropagation();openShareModal(this)" ...>...</button>
  ...
</div>
```

- A card **with** `data-detail` is clickable and shares a deep link to the
  detail page.
- A card **without** `data-detail` is a static tile and its share falls back to
  `https://scaldainvestments.com/#properties`.
- The `event.stopPropagation()` on the share button is what prevents a click on
  the share icon from also navigating to the detail page.

---

## Adding a new property

1. **Drop photos** into `properties/<slug>/` named `01.jpeg`, `02.jpeg`, … and a
   homepage thumbnail named `cover.jpeg`. Any JPEG/PNG works — just keep the
   naming pattern.
2. **Copy a sibling detail page** (e.g. `properties/931-lynn-st/index.html`)
   into the new folder and update:
   - `<title>` tag
   - The tag, address, city, and `.detail-stats` block in the header
   - The `<div class="gallery-item">` entries (one per photo)
   - The `<script>initGallery(N);</script>` at the bottom — `N` is the photo
     count
3. **Add the card** to `index.html` in the US properties grid. Easiest is to
   copy an existing card and tweak the addr/city/stats/`cover.jpeg` path, then
   add the three "clickable" bits:
   - `data-detail="properties/<slug>/"`
   - `style="cursor:pointer"`
   - `onclick="if(!event.target.closest('.prop-share-btn'))window.location.href='properties/<slug>/'"`

   And remember `event.stopPropagation();` on the share button's `onclick`.

To list a property **without** a detail page yet (just a cover tile), skip
step 2 and omit the `data-detail` / `style` / `onclick` attributes from the
card. The share modal will fall back to the homepage anchor.

---

## Adding more photos to an existing property

1. Drop the new photo into the property's folder as the next sequential file
   (e.g. `08.jpeg`).
2. Add a `<div class="gallery-item" data-idx="N">…</div>` line to that
   property's `index.html`.
3. Bump the number in `initGallery(N)` at the bottom of the file.

---

## Share-link behaviour

Every property card has a share button (top-right) that opens a modal with
WhatsApp, Email, SMS, Facebook, and Copy-link actions. The URL it shares is:

- `https://scaldainvestments.com/properties/<slug>/` — if the card has a
  detail page (via `data-detail`)
- `https://scaldainvestments.com/#properties` — otherwise

The share logic lives near the bottom of `index.html` in `openShareModal` /
`buildShareURL`.

---

## Bilingual content (EN / ES)

The site has an EN/ES toggle (button in the top-right of the header). Translated
content is duplicated in the HTML with `data-lang="en"` / `data-lang="es"`
markers, and a small script toggles which set is visible. Whenever you add new
human-readable copy, add the Spanish version too with the matching marker.

Property detail pages are currently English-only.

---

## Publishing

Pushing to the default branch (`main`) deploys to GitHub Pages on
**scaldainvestments.com**. There's no build step — the repo is served as-is.

---

## Local preview

Just open `index.html` in any browser. For the share modal's
`navigator.clipboard.writeText` to work, some browsers require the page be
served over `http://` rather than `file://` — if that matters, run a quick
local server, e.g.:

```bash
# from the repo root
python -m http.server 8000
# then open http://localhost:8000
```
