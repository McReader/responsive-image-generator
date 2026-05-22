export const PRESET_BREAKPOINTS = [320, 480, 640, 768, 1024, 1280, 1920] as const;

export const DEFAULT_SELECTED_BREAKPOINTS = [640, 1024, 1280];

export function getApplicableBreakpoints(
  selectedBreakpoints: number[],
  sourceWidth: number,
): number[] {
  return selectedBreakpoints
    .filter((width) => width <= sourceWidth)
    .sort((a, b) => a - b);
}

export function getBaseName(fileName: string): string {
  const lastDot = fileName.lastIndexOf(".");
  return lastDot === -1 ? fileName : fileName.slice(0, lastDot);
}
