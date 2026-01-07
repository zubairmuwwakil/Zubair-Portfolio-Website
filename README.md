# Zubair-Portfolio-Website

## Builds
- `npm run build:domain` – root/custom-domain build (base `/`).
- `npm run build:gh` – GitHub Pages project build (base `/Zubair-Portfolio-Website/`); fixes blank loads when assets are requested from the repo subpath.
- `npm run build` – defaults to `/` but can be overridden with `--base` or `BASE_PATH` in CI.
- `npm run build:ssg` – builds for the custom-domain/root case, then prerenders HTML with `react-snap` and refreshes `404.html` so link previews/ATS see real content.

The Pages workflow now auto-picks the correct base: it uses `/` when a `CNAME` or `*.github.io` repo is present, otherwise it builds with the repo subpath so JS/CSS load correctly from GitHub Pages.
