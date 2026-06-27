export const MIN_ZOOM = 0.5;
export const MAX_ZOOM = 2;
export const ZOOM_STEP = 0.1;

export function increaseZoom(value: number): number {
  return Math.min(roundZoom(value + ZOOM_STEP), MAX_ZOOM);
}

export function decreaseZoom(value: number): number {
  return Math.max(roundZoom(value - ZOOM_STEP), MIN_ZOOM);
}

export function formatZoom(value: number): string {
  return `${Math.round(value * 100)}%`;
}

function roundZoom(value: number): number {
  return Math.round(value * 100) / 100;
}
