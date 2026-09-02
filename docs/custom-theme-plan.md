# Plan: Replace PaperMod with a custom theme-less build (hugo-simple-blog style)

## Decision (supersedes `papermod-feature-parity-plan.md`)

Drop PaperMod entirely. Build realbrolog's own minimal layouts directly in
the project, modeled on `../hugo-simple-blog` (same author's minimal
near-zero-CSS theme). Scope, confirmed with user:

- **Feature scope**: match `hugo-simple-blog` as-is for now — no search,
  no TOC/breadcrumbs, no dark/light toggle, no code-copy buttons, no math
  rendering. Everything currently provided by those features is listed as
  a TODO to reimplement later (see bottom).
- **Theme structure**: project-root layouts. No `themes/` directory, no
  `theme:` key in `hugo.yaml`. `layouts/`, `i18n/`, `assets/` live directly
  in `realbrolog`.
- **Multilingual**: build KO/EN in now (not deferred), following
  `hugo-simple-blog`'s `content/<lang>/` + `languages:` pattern.

## Phase 0 — Decommission PaperMod

1. Remove `theme: "PaperMod"` from `hugo.yaml`.
2. Remove the `themes/PaperMod` git submodule: `git submodule deinit -f
   themes/PaperMod && git rm -f themes/PaperMod`, delete the matching
   entry in `.gitmodules` (delete the file if PaperMod was the only
   submodule).
3. Delete `layouts/partials/math.html` (KaTeX override — no longer used;
   math support is dropped for now, see TODO).
4. Remove PaperMod-only params from `hugo.yaml` (`defaultTheme`,
   `disableThemeToggle`, `ShowReadingTime`, `ShowShareButtons`,
   `ShowPostNavLinks`, `ShowBreadCrumbs`, `ShowCodeCopyButtons`,
   `ShowWordCount`, `ShowRssButtonInSectionTermList`, `UseHugoToc`,
   `disableSpecial1stPost`, `disableScrollToTop`, `comments`, `hidemeta`,
   `hideSummary`, `showtoc`, `tocopen`, `profileMode`, `socialIcons`,
   `homeInfoParams`) — none of them apply without PaperMod.
5. Drop the `search` menu entry and delete `content/search.md` (no search
   layout exists yet).

## Phase 1 — Scaffold project-root layouts

Port these files from `hugo-simple-blog` into realbrolog's own `layouts/`,
adjusting only what's realbrolog-specific (site title, nav links):

| File | Purpose |
|---|---|
| `layouts/_default/baseof.html` | base skeleton: head, header, `{{ block "main" }}`, footer |
| `layouts/partials/head.html` | charset/viewport meta, `seo.html`, CSS links, RSS alternate link |
| `layouts/partials/seo.html` | title/description/canonical/OG meta |
| `layouts/partials/header.html` | site title link, Posts/Tags nav (via `i18n`), language switcher |
| `layouts/partials/footer.html` | copyright line |
| `layouts/index.html` | home page: content + latest 10 posts |
| `layouts/_default/list.html` | generic section/taxonomy list |
| `layouts/posts/list.html` | posts list grouped by year (`GroupByDate "2006"`) |
| `layouts/_default/single.html` | article: title, date, tags, content |
| `layouts/robots.txt` | `User-agent: *` + sitemap line |
| `archetypes/default.md` | new-post front matter template |

## Phase 2 — i18n strings

Create `i18n/en.yaml` and `i18n/ko.yaml` with at minimum:
```yaml
posts: "Posts" / "포스트"
tags: "Tags" / "태그"
```
Extend as new UI strings are added.

## Phase 3 — Multilingual config in `hugo.yaml`

```yaml
defaultContentLanguage: en
defaultContentLanguageInSubdir: false
languages:
  en:
    languageName: "English"
    weight: 1
    contentDir: content/en
  ko:
    languageName: "한국어"
    weight: 2
    contentDir: content/ko

taxonomies:
  tag: tags

outputs:
  home:
    - HTML
    - RSS

markup:
  highlight:
    noClasses: false
```
Drop the `menu:` config — `header.html` (like hugo-simple-blog's) links
directly to the posts/tags sections via `i18n`, no menu system needed at
this scale.

## Phase 4 — Content migration

**Note:** `content/posts` is itself a git submodule (`dev-posts.git`, own
repo/history), not a plain directory. Moving it is a submodule remount,
not a plain file move — `git mv` handles this correctly (updates
`.gitmodules` path and `.git/modules` mapping), but it's a different
operation than moving ordinary files and worth doing carefully/separately
from the plain-file changes in this phase.

1. `git mv content/posts content/en/posts` — remounts the `dev-posts`
   submodule at the new path; its own internal history/content is
   untouched, only where it's mounted in `realbrolog` changes.
2. Create `content/en/_index.md` (home content, optional) and
   `content/en/posts/_index.md` (section title "Posts").
3. Create `content/ko/` mirroring the same section structure
   (`content/ko/posts/_index.md`) — start empty of posts; existing English
   posts don't need a Korean translation yet, Hugo doesn't require 1:1
   parity.
4. Confirm `content/posts/how-tls-handwhake-works/` slug — leave as-is
   during the move (front matter already declares `slug:
   how-tls-handshake-works`, correcting the folder name is optional/
   separate cleanup, not part of this migration).

## Phase 5 — Minimal CSS

Add `assets/css/main.css` (near-zero, just readable defaults: font stack,
max-width content column, link/code styling) and pipe it through
`head.html` via Hugo Pipes (`resources.Get` + `minify` + `fingerprint`),
matching how `hugo-simple-blog` links `css/main.css` / `css/chroma.css`.
Generate `chroma.css` with `hugo gen chromastyles --style=<name> >
assets/css/chroma.css` for syntax highlighting.

## Phase 6 — Verify

1. `hugo server -D`, confirm home, post list (grouped by year), single
   post, tags, and both `/` (en) and `/ko/` build without errors.
2. Confirm language switcher link in header toggles en/ko.
3. `hugo --minify` production build check, confirm `public/robots.txt`
   and sitemap generate.
4. Remove `.hugo_build.lock` / `resources/_gen` stale PaperMod-era cache
   if present before first new build.

## TODO — features dropped in this rebuild, to reimplement later

- [ ] **Search** (previously PaperMod's fuse.js `index.json` + search
      page) — needs its own `_default/search.html`, `index.json` output
      format, and client-side JS.
- [ ] **Math rendering (KaTeX)** — `params.math: true` and
      `layouts/partials/math.html` existed under PaperMod; needs a fresh
      partial + CDN/asset wiring.
- [ ] **Dark/light theme toggle**.
- [ ] **Table of contents** on posts.
- [ ] **Breadcrumbs**.
- [ ] **Code-copy buttons** on code blocks.
- [ ] **Reading time / word count** display.
- [ ] **Share buttons**.
- [ ] **Social icons** (github / linkedIn / brunchStory) in header or
      footer.
- [ ] **Yearly archive page** — current plan only does inline
      year-grouping on the posts list; a dedicated `/archives/` page (like
      PaperMod's) is not included yet.
- [ ] **OG image** support (`params.image` → `og:image` meta) — seo.html
      above only handles title/description/canonical, add image tag when
      needed.
