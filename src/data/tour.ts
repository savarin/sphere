import type { TourData } from "../types";

/**
 * This is the single file you edit to add your own content.
 *
 * 1. Add a Place for each spot you've been (set `coordinates` as [lng, lat]).
 *    Tip: right-click a point on Google Maps to copy "lat, lng" — then SWAP the
 *    order here, because MapLibre wants [lng, lat].
 * 2. Put photos in `public/photos/` and reference them as "/photos/your-file.jpg".
 * 3. Add `steps` to script the guided tour: each step points at a place and
 *    carries the play-by-play narrative for that beat.
 */
export const tour: TourData = {
  title: "Sphere — places & stories",

  initialView: {
    center: [10, 30], // a gentle world view
    zoom: 1.6,
  },

  places: [
    {
      id: "rome",
      name: "Rome, Italy",
      coordinates: [12.4924, 41.8902], // the Colosseum
      blurb: "Where it started for me — standing in the arena at dawn.",
      photos: [
        {
          src: "/photos/rome.jpg",
          caption: "The Colosseum at first light.",
          alt: "The Roman Colosseum in early morning sun",
        },
      ],
    },
    {
      id: "kyoto",
      name: "Kyoto, Japan",
      coordinates: [135.678, 35.0394], // Fushimi Inari
      blurb: "A thousand vermilion gates climbing the mountain.",
      photos: [
        {
          src: "/photos/kyoto.jpg",
          caption: "The torii gates of Fushimi Inari.",
          alt: "Rows of red torii gates",
        },
      ],
    },
    {
      id: "cusco",
      name: "Cusco, Peru",
      coordinates: [-72.545, -13.1631], // Machu Picchu
      blurb: "The cloud forest opened up and there it was.",
      photos: [
        {
          src: "/photos/cusco.jpg",
          caption: "Machu Picchu under shifting cloud.",
          alt: "Machu Picchu citadel in the mountains",
        },
      ],
    },
  ],

  // The guided story tour: an ordered walk through the places above.
  steps: [
    {
      placeId: "rome",
      narrative:
        "79 AD. We begin in Rome. The Flavian Amphitheatre — the Colosseum — " +
        "is barely a year from completion. Picture 50,000 spectators filing " +
        "through 80 numbered arches, each clutching a pottery shard ticket.",
      camera: { zoom: 16, pitch: 55, bearing: -20 },
    },
    {
      placeId: "kyoto",
      narrative:
        "711 AD, half a world east. On a wooded slope south of the new " +
        "capital, the first shrine to Inari is founded. Over centuries, " +
        "worshippers will donate the gates one by one until the path becomes " +
        "a tunnel of vermilion.",
      camera: { zoom: 16, pitch: 50, bearing: 30 },
    },
    {
      placeId: "cusco",
      narrative:
        "1450 AD, the Andes. The Inca emperor Pachacuti raises an estate on a " +
        "ridge between two peaks. Within a century it is abandoned and " +
        "forgotten by the outside world — until 1911.",
      camera: { zoom: 15, pitch: 60, bearing: 0 },
    },
  ],
};
