import type { MemoryShape } from "@/lib/challenge";

const PATHS: Record<MemoryShape, string> = {
  circle: "M50 12a38 38 0 1 0 0.01 0Z",
  square: "M16 16h68v68H16Z",
  triangle: "M50 12 88 84H12Z",
  star: "M50 8l11 30h32l-26 19 10 31-27-19-27 19 10-31L7 38h32Z",
  diamond: "M50 8 90 50 50 92 10 50Z",
  heart: "M50 86 14 50a20 20 0 0 1 36-26 20 20 0 0 1 36 26Z",
};

export function MemoryIcon({ shape, color, size = 48 }: { shape: MemoryShape; color: string; size?: number }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} aria-hidden>
      <path d={PATHS[shape]} fill={color} />
    </svg>
  );
}
