# Sphere

A zoomable world map for embedding the photos you've taken around the world,
paired with play-by-play narratives of the history behind each place.

Zoom out for the whole world; zoom in and the photos sit at their real
locations on the city map. A **guided story tour** flies the camera from place
to place, revealing each photo and its narrative one beat at a time.

## Stack

- **TypeScript** + **[Vite](https://vitejs.dev/)** — fast dev server, builds to
  a static site you can host anywhere (GitHub Pages, Netlify, Cloudflare Pages).
- **[MapLibre GL JS](https://maplibre.org/)** — the interactive map. Its `flyTo`
  camera powers the guided tour.
- **OpenStreetMap** raster tiles — no API key required.

No backend and no database: all content lives in one data file, and photos live
in the repo.

## Run it

```bash
npm install
npm run dev      # open the printed localhost URL
```

Build the static site for hosting:

```bash
npm run build    # outputs to dist/
npm run preview  # preview the production build locally
```

## Add your own content

Everything you edit is in **`src/data/tour.ts`**.

1. **Add a place** to the `places` array. Set `coordinates` as `[lng, lat]`.
   (On Google Maps, right-click a point to copy `lat, lng` — then swap the order
   here, because MapLibre wants longitude first.)
2. **Add photos**: drop image files in `public/photos/`, then reference them as
   `/photos/your-file.jpg`. Missing photos are hidden gracefully, so you can add
   places first and images later.
3. **Script the tour**: add `steps`, each pointing at a place `id` and carrying
   the `narrative` text for that beat. Optional `camera` settings (`zoom`,
   `pitch`, `bearing`) control how the map flies in.

The data shapes are defined and documented in `src/types.ts`.

## Controls

- Scroll / pinch to zoom, drag to pan.
- Click any pin to open its photos and blurb.
- **Start tour** to begin the guided walkthrough; use Prev/Next or the
  ← / → arrow keys, and Esc to exit.

## Roadmap

- **Timeline scrubber**: a draggable timeline that advances through events as a
  cinematic alternative to clicking Next. The data model already orders steps,
  so this layers on top of what's here.
