import type { Vec3 } from "@/lib/challenge";

type Props = {
  cubes: readonly Vec3[];
  /** 縦軸まわりの回転（度） */
  angle: number;
  mirrored?: boolean;
  size?: number;
};

const TILT = (22 * Math.PI) / 180;
const LIGHT: Vec3 = (() => {
  const v: Vec3 = [0.35, 0.65, 0.68];
  const n = Math.hypot(...v);
  return [v[0] / n, v[1] / n, v[2] / n];
})();
const AXES: readonly Vec3[] = [
  [1, 0, 0],
  [-1, 0, 0],
  [0, 1, 0],
  [0, -1, 0],
  [0, 0, 1],
  [0, 0, -1],
];

const add = (a: Vec3, b: Vec3): Vec3 => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
const scale = (a: Vec3, k: number): Vec3 => [a[0] * k, a[1] * k, a[2] * k];
const dot = (a: Vec3, b: Vec3) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];

/** 縦軸まわりに回し、少し上から見下ろす向きに傾ける */
const view = (p: Vec3, rad: number): Vec3 => {
  const [x, y, z] = p;
  const x1 = x * Math.cos(rad) + z * Math.sin(rad);
  const z1 = -x * Math.sin(rad) + z * Math.cos(rad);
  return [x1, y * Math.cos(TILT) - z1 * Math.sin(TILT), y * Math.sin(TILT) + z1 * Math.cos(TILT)];
};

/** キューブを積んだ立体を、陰影付きのSVGとして描く（隠面は奥から描く画家のアルゴリズム） */
export function Polycube({ cubes, angle, mirrored = false, size = 150 }: Props) {
  const src = mirrored ? cubes.map(([x, y, z]): Vec3 => [-x, y, z]) : cubes;
  const center = scale(src.reduce(add, [0, 0, 0]), 1 / src.length);
  const pts = src.map((c) => add(c, scale(center, -1)));
  const occupied = new Set(src.map((c) => c.join(",")));
  const rad = (angle * Math.PI) / 180;

  const faces = pts.flatMap((c, i) =>
    AXES.flatMap((n) => {
      if (occupied.has(add(src[i], n).join(","))) return [];
      const k = n.findIndex((v) => v !== 0);
      const [u, w] = [0, 1, 2].filter((j) => j !== k);
      const unit = (j: number, s: number): Vec3 => [j === 0 ? s : 0, j === 1 ? s : 0, j === 2 ? s : 0];
      const fc = add(c, scale(n, 0.5));
      const corners = [
        [0.5, 0.5],
        [0.5, -0.5],
        [-0.5, -0.5],
        [-0.5, 0.5],
      ].map(([a, b]) => view(add(add(fc, unit(u, a)), unit(w, b)), rad));
      const nv = view(n, rad);
      if (nv[2] <= 1e-6) return [];
      const depth = corners.reduce((s, p) => s + p[2], 0) / 4;
      const light = 0.5 + 0.5 * Math.max(0, dot(nv, LIGHT));
      return [{ corners, depth, light }];
    }),
  );
  faces.sort((a, b) => a.depth - b.depth);

  return (
    <svg viewBox="-3.3 -3.3 6.6 6.6" width={size} height={size} role="img" aria-hidden>
      {faces.map((f, i) => (
        <polygon
          key={i}
          points={f.corners.map(([x, y]) => `${x.toFixed(3)},${(-y).toFixed(3)}`).join(" ")}
          fill={`hsl(215 28% ${Math.round(38 + f.light * 50)}%)`}
          stroke="#1A1A1A"
          strokeWidth={0.05}
          strokeLinejoin="round"
        />
      ))}
    </svg>
  );
}
