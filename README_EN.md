# Лабораторная работа №1
Full Name: Akimov Nikita Alekseevich

Group: 6402-010302D

scientific supervisor: Golovaskin Dimitriy Lvovich

Intended topic of the diploma: "Construction of block algorithms for numerical solution of Maxwell's equations"

Favorite quote: Who you are is measured by who you refuse to become (c) Volition, Disco Elysium

<img width="368" height="512" alt="image" src="https://github.com/user-attachments/assets/53a44509-a84b-4af4-b857-1e9fa96d06c0" />

# Laboratory work #2. The website of the Amethyst Watch campaign

A multi-page website in support of the tabletop role-playing campaign "Amethyst
Watch" (D&D 5e, outpost "Fallen House"). The website is made in pure HTML5 and CSS3:
JavaScript, Bootstrap and other libraries are not used - all interactivity
(drop-down character dossiers, building improvements, collapsible summary)
is based on standard `details`/`summary` elements and CSS properties.

## Project structure

``
lab2/
├── index.html - home: about the campaign, links, statistics
├── settlement.html - Fallen House settlement: buildings and camp parameters
├── characters.html - sentinels: revealing dossiers of participants
├── chronicle.html - campaign timeline (section frame)
├── lore.html - ENT of the world (section frame)
├── css/
│ └── styles.css - a single external style file for all pages
└── img/ - illustrations (JPEG)
``

## Site pages

| File | Section | Content |
|------|--------|------------|
| `index.html` | Main | Campaign summary: wizard, system, setting, duration, start date; logo with text wrapping; useful community links; four statistics tiles |
| `settlement.html ` | Fallen House Settlement | Outpost: collapsible summary of building contributions, 12 camp parameters (zero values are muted), building cards "Warm Wind Bar" and "Fortification System" - cost, requirements, effect tables, improvements |
| `characters.html` | Sentinels | Dossiers of participants in the form of drop-down cards: portrait, name and readiness status on the "front" side; inside - appearance, additional information, achievements, background, hero quote |
| `chronicle.html` | Chronicle | Section framework: general header and navigation, content - in the plans |
| `lore.html ` | Ent | Section framework: general header and navigation, content is in the plans |

## Meeting the requirements of the assignment

| Requirement | How it was completed |
|------------|---------------|
| Number of pages: from 3 to 5 | 5 pages with a common header and end-to-end navigation; the current menu item is highlighted in gold (`aria-current="page"`) |
| Blocky and lowercase elements | Blocky: `header`, `nav`, `main`, `section`, `article`, `figure`, `table`, `p`, `ul`, `blockquote`; lowercase: `a`, `img`, `span`, `b`, `i`, `strong` |
| Links - from 1 pc. | Internal: menu and logo on each page; external: dnd.su , Foundry Lightweight Client, tokenstamp (on the main page) and Diconus' background in Google Docs (in the dossier). The external ones open in a new tab with `rel="noopener"` |
| Pictures - from 1 pc. | 7 illustrations: the emblem of the watch, the view of the outpost, two buildings, three portraits; all have an `alt`, most are decorated in a `figure` with a `figcaption` |
| Table - from 1 pc. | 3 tables on the Settlement page: summary of building contributions (collapsible) and tables of building effects; each has a `caption` for screen readers |
| Alignment in the table: left / center / right | Service classes `.ta-l`, `.ta-c`, `.ta-r`: in the summary, the names of the parameters are aligned to the left, the contributions of buildings are centered, the column "Total" is to the right |
| Separate plug-in CSS file | One file `css/styles.css`, connected via `<link>` on each page |
| At least 3 types of selectors | 7 types are used - see the section "Selectors" below |
| Color usage | Palette of 11 CSS variables in `:root` (rgb() formats`and `rgba()'): dark amethyst background, gold accents, muted text |
| Without JS, Bootstrap and other libraries | Not a single `script` tag; block disclosure is on `details`/`summary`, state highlighting is on attribute selectors |

## Solutions and techniques

### Selectors (7 types)

| View | Examples from `styles.css` |
|-----|-------------------------|
| By tag | `h1, h2, h3, h4`, `body`, `figure img`, `figcaption` |
| By class | `.card`, `.char-face`, `.status-signed` |
| By ID | `#deekonus' - scroll-margin-top indentation for direct link to dossier |
| Descendant (contextual) | `.building-meta .item`, `.card.building figure` |
| Attribute | `.upgrade[data-status="built"]`, `.char-card details[open]` |
| Pseudo-class | `:hover`, `:not(:last-child)` |
| Pseudo-element | `::after` - arrow of the drop-down card and the separator "·" in the meta lines |

### Interactivity without JavaScript

-**Character dossier**: `summary.char-face' shows portrait, name, and
ready status; when opened, the `details[open]` selector turns
the `::after` arrow 90 degrees.
- **Building improvements** - collapsible `.upgrade` blocks; built
  (`data-status="built"') are highlighted in gold, projects are muted.
- **Summary of buildings** collapses into one line and unfolds
  in front of the deposit table.
- The standard behavior of `details` provides keyboard control and support
  screen readers without a single line of scripts.

### Layout: Flexbox, Grid and Wrapping

- Flexbox: building card (picture next to the text), "face" of the card
  characters, meta strings, navigation.
- Grid: the statistics block on the main page is `grid-template-columns: repeat(4, 1fr)'.
- Flow (`float'): the logo on the main page is `figure.align-right'; in styles
  A mirrored `.align-left` is also provided.

### Adaptability and accessibility

- `@media (max-width: 720px)`: navigation is centered, wrapping
  pictures are canceled.
- `@media (max-width: 560px)`: The building cards are stacked in a column.
- `@media (prefers-reduced-motion: reduce)`: transitions, lifting cards and
  The rotation of the arrow is disabled.
- Hidden table signatures (`caption.sr-only`), `aria-current="page"` for the current
  menu items, `alt` for all images, `rel="noopener"` for external links.

### Units of measurement and color

- Units: `px` (basic typography), `%` (widths), `rem`/`em` (dimensions
  relative to the root and parent), `ch` (the length of the dossier string is `75ch'), `vh`
(rounding off the "capsules" is `100vh`), `deg` (turning the arrow).
- Color: the palette is set in `rgb()', shadows and glow are set in `rgba()`; inheritance
  via CSS variables `var(--...)`.

## How to open

1. Unpack the archive or clone the repository.
2. Open `index.html ` in any browser, the site works completely locally,
   the build and server are not required.

## Development plans

- Chronicle - a log of the past missions of the watch.
- ENT articles about the world; a map of the region has already been prepared (`img/map-region.jpg `).
- Counters on the main page are updated manually when the composition changes (locations
  marked with TODO comments in the code).
