/** A geographic point as MapLibre expects it: [longitude, latitude]. */
export type LngLat = [number, number];

/** A single photo with optional caption. */
export interface Photo {
  /** URL or path (relative paths resolve against /public, e.g. "/photos/rome.jpg"). */
  src: string;
  /** Short caption shown under the photo. */
  caption?: string;
  /** Alt text for accessibility. Falls back to caption if omitted. */
  alt?: string;
}

/** A place you've been: a pin on the map with photos and a blurb. */
export interface Place {
  id: string;
  name: string;
  /** Where the pin sits. Manually set: [lng, lat]. */
  coordinates: LngLat;
  /** Photos taken here. */
  photos: Photo[];
  /** Short description shown when the pin is clicked. */
  blurb?: string;
}

/** Camera overrides for a flyTo animation. */
export interface CameraOverride {
  zoom?: number;
  pitch?: number;
  bearing?: number;
}

/** One beat in the guided story tour. */
export interface TourStep {
  /** Which place this step focuses on (must match a Place id). */
  placeId: string;
  /** Play-by-play narrative text for this beat (supports plain text). */
  narrative: string;
  /** Optional camera overrides for the flyTo animation. */
  camera?: CameraOverride;
}

/** The whole experience: the places and the ordered tour through them. */
export interface TourData {
  title: string;
  /** Where the map opens before any interaction. */
  initialView: {
    center: LngLat;
    zoom: number;
  };
  places: Place[];
  steps: TourStep[];
}
