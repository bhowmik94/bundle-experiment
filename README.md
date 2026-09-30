# Bundle Experiment

A deliberately minimal React + Vite app with four realistic bloat decisions
baked in, meant as a testbed for a bundle-size-reduction experiment. Check the dev community article for a detailed breakdown of the whole experiment: (https://dev.to/sourav_bhowmik_73d35592ab/how-i-cut-a-react-apps-initial-bundle-by-89-58k2)


## Setup

The main branch serves as the baseline version and the `fix/all-combined` branch is the final version with all the bundle reducer code combined.

```bash
npm install
npm run build
```

After the build, open `dist/stats.html` in a browser — that's the
rollup-plugin-visualizer treemap showing exactly what's in the bundle.

Also record from the `vite build` terminal output:
- total JS size (raw + the gzip figure Vite prints)
- build time

## The four bloat decisions (and their justification)

1. **`moment` in `src/pages/Feed.jsx`** — used for relative timestamps
   ("2 hours ago") and date-grouping. Fix later: `Intl.RelativeTimeFormat`
   or `date-fns`'s `formatDistanceToNow`.

2. **Full `lodash` import in `src/pages/Feed.jsx`** — only `debounce` and
   `groupBy` are used. Fix later: `import debounce from 'lodash/debounce'`.

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
