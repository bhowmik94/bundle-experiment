# Bundle Experiment — "Team Activity Dashboard"

A deliberately minimal React + Vite app with four realistic bloat decisions
baked in, meant as a testbed for a bundle-size-reduction experiment.

## Setup

```bash
npm install
npm run build
```

After the build, open `dist/stats.html` in a browser — that's the
rollup-plugin-visualizer treemap showing exactly what's in your bundle.
Screenshot it now, before making any changes. This is your baseline.

Also record from the `vite build` terminal output:
- total JS size (raw + the gzip figure Vite prints)
- build time

## The four bloat decisions (and their justification)

1. **`moment` in `src/pages/Feed.jsx`** — used for relative timestamps
   ("2 hours ago") and date-grouping. Fix later: `Intl.RelativeTimeFormat`
   or `date-fns`'s `formatDistanceToNow`.

2. **Full `lodash` import in `src/pages/Feed.jsx`** — only `debounce` and
   `groupBy` are used. Fix later: `import debounce from 'lodash/debounce'`
   (or switch to `lodash-es`), and consider hand-rolling `groupBy` with
   `reduce`.

3. **Whole icon set in `src/components/CategoryIcon.jsx`** — the icon name
   is data-driven (`category` comes from the mock API data), so it's
   resolved at runtime. Fix later: an explicit category → named-import
   lookup table.

4. **Static import of `Dashboard` in `src/App.jsx`** — pulls in `recharts`
   for every user, even ones who never visit `/dashboard`. Fix later:
   `React.lazy(() => import('./pages/Dashboard'))` + `Suspense`.

## Suggested workflow for each fix

```bash
git checkout -b fix/moment
# make the change
npm run build   # record size + build time
git checkout main
```

Repeat per fix, keeping a simple table of before/after numbers as you go.

## Dev server

```bash
npm run dev
```

Visit http://localhost:5173 — Feed, Dashboard, and Settings routes are
in the nav bar.
