import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import "./style.css";
import { tour } from "./data/tour";
import type { Place } from "./types";

// --- Basemap: OpenStreetMap raster tiles, no API key needed. ---
const map = new maplibregl.Map({
  container: "map",
  style: {
    version: 8,
    sources: {
      osm: {
        type: "raster",
        tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
        tileSize: 256,
        attribution: "© OpenStreetMap contributors",
      },
    },
    layers: [{ id: "osm", type: "raster", source: "osm" }],
  },
  center: tour.initialView.center,
  zoom: tour.initialView.zoom,
});

map.addControl(new maplibregl.NavigationControl(), "top-left");

// Quick lookup from id -> place.
const placeById = new Map<string, Place>(tour.places.map((p) => [p.id, p]));

// Track marker elements so the tour can highlight the active one.
const markerEls = new Map<string, HTMLElement>();

// --- Panel elements ---
const panel = document.getElementById("panel")!;
const panelContent = document.getElementById("panel-content")!;
document.getElementById("panel-close")!.addEventListener("click", closePanel);

function renderPhotos(place: Place): string {
  return place.photos
    .map(
      (photo) => `
      <figure>
        <img src="${photo.src}" alt="${photo.alt ?? photo.caption ?? place.name}"
             onerror="this.style.visibility='hidden'" />
        ${photo.caption ? `<figcaption>${photo.caption}</figcaption>` : ""}
      </figure>`,
    )
    .join("");
}

/** Open the panel for a place, optionally with tour narrative text. */
function openPanel(place: Place, narrative?: string) {
  panelContent.innerHTML = `
    <h2>${place.name}</h2>
    ${place.blurb ? `<p class="blurb">${place.blurb}</p>` : ""}
    ${renderPhotos(place)}
    ${narrative ? `<p class="narrative">${narrative}</p>` : ""}
  `;
  panel.classList.remove("hidden");
}

function closePanel() {
  panel.classList.add("hidden");
}

// --- Markers ---
for (const place of tour.places) {
  const el = document.createElement("div");
  el.className = "marker";
  el.title = place.name;
  el.addEventListener("click", (e) => {
    e.stopPropagation();
    openPanel(place);
  });
  markerEls.set(place.id, el);

  new maplibregl.Marker({ element: el })
    .setLngLat(place.coordinates)
    .addTo(map);
}

function setActiveMarker(placeId: string | null) {
  for (const [id, el] of markerEls) {
    el.classList.toggle("active", id === placeId);
  }
}

// ----------------------------------------------------------------------------
// Guided story tour
// ----------------------------------------------------------------------------
const tourStartBtn = document.getElementById("tour-start")!;
const tourNav = document.getElementById("tour-nav")!;
const tourProgress = document.getElementById("tour-progress")!;
const tourPrevBtn = document.getElementById("tour-prev")!;
const tourNextBtn = document.getElementById("tour-next")!;
const tourExitBtn = document.getElementById("tour-exit")!;

let stepIndex = -1;

function goToStep(index: number) {
  if (index < 0 || index >= tour.steps.length) return;
  stepIndex = index;

  const step = tour.steps[index];
  const place = placeById.get(step.placeId);
  if (!place) {
    console.warn(`Tour step references unknown placeId: ${step.placeId}`);
    return;
  }

  map.flyTo({
    center: place.coordinates,
    zoom: step.camera?.zoom ?? 15,
    pitch: step.camera?.pitch ?? 45,
    bearing: step.camera?.bearing ?? 0,
    duration: 2200,
    essential: true,
  });

  setActiveMarker(place.id);
  openPanel(place, step.narrative);

  tourProgress.textContent = `${index + 1} / ${tour.steps.length}`;
  tourPrevBtn.toggleAttribute("disabled", index === 0);
  tourNextBtn.toggleAttribute("disabled", index === tour.steps.length - 1);
}

function startTour() {
  tourStartBtn.classList.add("hidden");
  tourNav.classList.remove("hidden");
  goToStep(0);
}

function exitTour() {
  tourNav.classList.add("hidden");
  tourStartBtn.classList.remove("hidden");
  setActiveMarker(null);
  closePanel();
  stepIndex = -1;
  map.flyTo({
    center: tour.initialView.center,
    zoom: tour.initialView.zoom,
    pitch: 0,
    bearing: 0,
    duration: 1800,
    essential: true,
  });
}

tourStartBtn.addEventListener("click", startTour);
tourNextBtn.addEventListener("click", () => goToStep(stepIndex + 1));
tourPrevBtn.addEventListener("click", () => goToStep(stepIndex - 1));
tourExitBtn.addEventListener("click", exitTour);

// Keyboard navigation during the tour.
window.addEventListener("keydown", (e) => {
  if (tourNav.classList.contains("hidden")) return;
  if (e.key === "ArrowRight") goToStep(stepIndex + 1);
  if (e.key === "ArrowLeft") goToStep(stepIndex - 1);
  if (e.key === "Escape") exitTour();
});
