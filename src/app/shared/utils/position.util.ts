export interface IPercentPosition {
  x: number;
  y: number;
}

export function getPercentPosition(
  event: MouseEvent | PointerEvent,
  element: HTMLElement,
  offset = { x: 0, y: 0 },
): IPercentPosition {
  const rect = element.getBoundingClientRect();

  return {
    x: normalizePercent(((event.clientX - rect.left - offset.x) / rect.width) * 100),
    y: normalizePercent(((event.clientY - rect.top - offset.y) / rect.height) * 100),
  };
}

export function normalizePercent(value: number): number {
  return Math.min(100, Math.max(0, value));
}
