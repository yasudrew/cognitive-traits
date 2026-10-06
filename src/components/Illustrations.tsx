import type { ReactNode } from "react";
import type { CategoryId, TypeId } from "@/lib/content";

/* ═══ キャラクター ═══
 * 6体とも同じ体型・顔・描き方（線なしのフラット）で、服の色と髪型・持ち物で描き分ける。
 * OG画像（Satori）でも描けるよう、defs・グラデーション・clipPath・フラグメント(<>)は使わず <g> でまとめる。
 */
const SKIN = "#F7D6C4";
const INK = "#2B2B33";
const LEG = "#3E3E48";
const BLUSH = "#F3A79E";

type Parts = {
  color: string;
  /** 頭の後ろに描くもの（後ろ髪など） */
  back?: ReactNode;
  hair: ReactNode;
  /** 顔の上に重ねるもの（メガネ・ヘッドホンなど） */
  front?: ReactNode;
  /** 省略時は両腕を下ろした姿勢 */
  arms?: ReactNode;
  prop?: ReactNode;
  eyes?: ReactNode;
  mouth?: ReactNode;
};

const arm = (color: string, x1: number, y1: number, x2: number, y2: number) => (
  <g>
    <path d={`M${x1} ${y1} L${x2} ${y2}`} stroke={color} strokeWidth={9} strokeLinecap="round" />
    <circle cx={x2} cy={y2} r={4.6} fill={SKIN} />
  </g>
);

const openEyes = (
  <g>
    <ellipse cx={52} cy={45} rx={2.7} ry={3.2} fill={INK} />
    <ellipse cx={68} cy={45} rx={2.7} ry={3.2} fill={INK} />
    <circle cx={53} cy={43.8} r={0.9} fill="#fff" />
    <circle cx={69} cy={43.8} r={0.9} fill="#fff" />
  </g>
);
const smile = <path d="M56.5 53 Q60 56.5 63.5 53" stroke={INK} strokeWidth={1.8} strokeLinecap="round" fill="none" />;

function Figure({ size, parts }: { size: number; parts: Parts }) {
  const { color } = parts;
  return (
    <svg viewBox="0 0 120 120" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <ellipse cx={60} cy={113} rx={21} ry={3.5} fill={INK} opacity={0.08} />
      {parts.back}
      <rect x={50} y={94} width={8} height={16} rx={4} fill={LEG} />
      <rect x={62} y={94} width={8} height={16} rx={4} fill={LEG} />
      <ellipse cx={53.5} cy={110} rx={6} ry={3.2} fill={INK} />
      <ellipse cx={66.5} cy={110} rx={6} ry={3.2} fill={INK} />
      <rect x={55} y={58} width={10} height={10} fill={SKIN} />
      <path d="M45 74 Q45 66 53 66 L67 66 Q75 66 75 74 L77 96 Q77 100 73 100 L47 100 Q43 100 43 96 Z" fill={color} />
      <path d="M54 66 Q60 72 66 66 Z" fill={SKIN} />
      {parts.arms ?? (
        <g>
          {arm(color, 46, 72, 39, 91)}
          {arm(color, 74, 72, 81, 91)}
        </g>
      )}
      <circle cx={37.5} cy={45} r={4.5} fill={SKIN} />
      <circle cx={82.5} cy={45} r={4.5} fill={SKIN} />
      <circle cx={60} cy={42} r={23} fill={SKIN} />
      {parts.eyes ?? openEyes}
      <ellipse cx={46} cy={52} rx={4} ry={2.3} fill={BLUSH} opacity={0.6} />
      <ellipse cx={74} cy={52} rx={4} ry={2.3} fill={BLUSH} opacity={0.6} />
      {parts.mouth ?? smile}
      {parts.hair}
      {parts.front}
      {parts.prop}
    </svg>
  );
}

const PARTS: Record<TypeId, Parts> = {
  /* カメラ: ボブヘアで、胸の前にカメラを構える */
  camera: {
    color: "#D94F3B",
    back: <path d="M35 42 Q35 16 60 16 Q85 16 85 42 L86 61 Q86 65 82 65 L38 65 Q34 65 34 61 Z" fill="#6B4332" />,
    hair: <path d="M37 41 Q38 19 60 18 Q82 19 83 41 Q74 31 62 33 Q50 30 37 41 Z" fill="#6B4332" />,
    arms: (
      <g>
        <path d="M46 72 L48 84" stroke="#D94F3B" strokeWidth={9} strokeLinecap="round" />
        <path d="M74 72 L72 84" stroke="#D94F3B" strokeWidth={9} strokeLinecap="round" />
      </g>
    ),
    prop: (
      <g>
        <rect x={50} y={71} width={9} height={6} rx={2} fill={INK} />
        <rect x={43} y={75} width={34} height={21} rx={5} fill={INK} />
        <circle cx={60} cy={85.5} r={7.5} fill="#E9E9EE" />
        <circle cx={60} cy={85.5} r={4.5} fill="#D94F3B" />
        <circle cx={58.5} cy={84} r={1.3} fill="#fff" />
        <rect x={69} y={78} width={5} height={3} rx={1} fill="#FFD66B" />
        <circle cx={45} cy={88} r={4.6} fill={SKIN} />
        <circle cx={75} cy={88} r={4.6} fill={SKIN} />
      </g>
    ),
  },
  /* 3D: ツンツン頭で、片手に立方体を持ち上げる */
  "3d": {
    color: "#C87620",
    hair: <path d="M37 42 Q36 18 60 17 Q84 18 83 42 Q80 31 73 29 L69 34 L64 27 L58 33 L52 27 L47 34 Q40 35 37 42 Z" fill="#2F2F38" />,
    arms: (
      <g>
        {arm("#C87620", 46, 72, 39, 91)}
        {arm("#C87620", 74, 71, 90, 60)}
      </g>
    ),
    prop: (
      <g>
        <path d="M95 30 L107 36 L95 42 L83 36 Z" fill="#F2B866" />
        <path d="M83 36 L95 42 L95 56 L83 50 Z" fill="#C87620" />
        <path d="M95 42 L107 36 L107 50 L95 56 Z" fill="#9A5A16" />
        <circle cx={90} cy={60} r={4.6} fill={SKIN} />
      </g>
    ),
  },
  /* ファンタジー: 長い髪で、上を見上げて空想のふきだしを浮かべる */
  fantasy: {
    color: "#2968B0",
    back: <path d="M35 42 Q35 16 60 16 Q85 16 85 42 L87 78 Q87 82 83 82 L37 82 Q33 82 33 78 Z" fill="#8A5A3C" />,
    hair: <path d="M37 42 Q38 18 62 18 Q84 20 83 40 Q71 36 59 26 Q51 37 37 42 Z" fill="#8A5A3C" />,
    eyes: (
      <g>
        <ellipse cx={53} cy={44} rx={2.7} ry={3.2} fill={INK} />
        <ellipse cx={69} cy={44} rx={2.7} ry={3.2} fill={INK} />
        <circle cx={54} cy={42.6} r={0.9} fill="#fff" />
        <circle cx={70} cy={42.6} r={0.9} fill="#fff" />
      </g>
    ),
    prop: (
      <g>
        <circle cx={86} cy={24} r={2.5} fill="#fff" stroke="#2968B0" strokeWidth={1.4} />
        <circle cx={92} cy={16} r={3.6} fill="#fff" stroke="#2968B0" strokeWidth={1.4} />
        <ellipse cx={104} cy={8} rx={12} ry={7.5} fill="#fff" stroke="#2968B0" strokeWidth={1.4} />
        <path d="M104 3.5 L105.4 6.6 L108.6 6.9 L106.2 9 L106.9 12.2 L104 10.5 L101.1 12.2 L101.8 9 L99.4 6.9 L102.6 6.6 Z" fill="#F2B866" />
      </g>
    ),
  },
  /* 辞書: 七三分けにメガネ、開いた本を持つ */
  dictionary: {
    color: "#6D4ABA",
    hair: <path d="M37 42 Q36 18 60 17 Q84 18 83 40 Q78 28 65 27 Q67 32 62 35 Q50 31 37 42 Z" fill="#23232B" />,
    front: (
      <g>
        <rect x={44.5} y={39} width={15} height={12} rx={4.5} stroke={INK} strokeWidth={1.7} fill="#fff" fillOpacity={0.25} />
        <rect x={60.5} y={39} width={15} height={12} rx={4.5} stroke={INK} strokeWidth={1.7} fill="#fff" fillOpacity={0.25} />
      </g>
    ),
    arms: (
      <g>
        <path d="M46 72 L46 88" stroke="#6D4ABA" strokeWidth={9} strokeLinecap="round" />
        <path d="M74 72 L74 88" stroke="#6D4ABA" strokeWidth={9} strokeLinecap="round" />
      </g>
    ),
    prop: (
      <g>
        <path d="M41 78 Q51 75 60 79 L60 97 Q51 93 41 96 Z" fill="#fff" stroke="#6D4ABA" strokeWidth={1.6} strokeLinejoin="round" />
        <path d="M79 78 Q69 75 60 79 L60 97 Q69 93 79 96 Z" fill="#fff" stroke="#6D4ABA" strokeWidth={1.6} strokeLinejoin="round" />
        <path d="M45 83 L56 84 M45 87 L56 88 M64 84 L75 83 M64 88 L75 87" stroke="#6D4ABA" strokeWidth={1.2} opacity={0.45} strokeLinecap="round" />
        <circle cx={43} cy={92} r={4.6} fill={SKIN} />
        <circle cx={77} cy={92} r={4.6} fill={SKIN} />
      </g>
    ),
  },
  /* ラジオ: 耳に手を当てて聞き取り、話しかけるふきだしを出す */
  radio: {
    color: "#178F5E",
    hair: (
      <g>
        <path d="M37 42 Q36 18 60 17 Q84 18 83 42 Q76 32 60 31 Q46 32 37 42 Z" fill="#4A3426" />
        <path d="M59 18 Q62 9 70 9 Q65 12 64 18 Z" fill="#4A3426" />
      </g>
    ),
    mouth: <path d="M56 52 Q60 59 64 52 Z" fill="#C2524A" />,
    arms: (
      <g>
        {arm("#178F5E", 46, 72, 39, 91)}
        {arm("#178F5E", 74, 71, 86, 49)}
      </g>
    ),
    prop: (
      <g>
        <rect x={4} y={10} width={30} height={20} rx={9} fill="#fff" stroke="#178F5E" strokeWidth={1.5} />
        <path d="M26 29 L33 36 L22 30 Z" fill="#fff" stroke="#178F5E" strokeWidth={1.5} strokeLinejoin="round" />
        <path d="M11 17 L27 17 M11 23 L22 23" stroke="#178F5E" strokeWidth={2} strokeLinecap="round" />
        <path d="M94 38 Q98 43 94 48 M98 35 Q104 43 98 51" stroke="#178F5E" strokeWidth={1.8} strokeLinecap="round" fill="none" opacity={0.7} />
      </g>
    ),
  },
  /* サウンド: ヘッドホンをして目を閉じ、音符が流れる */
  sound: {
    color: "#0E8A8A",
    hair: <path d="M37 42 Q38 20 60 19 Q82 20 83 42 Q72 33 60 34 Q48 33 37 42 Z" fill="#6B3F2E" />,
    eyes: (
      <path d="M49 46 Q52 43 55 46 M65 46 Q68 43 71 46" stroke={INK} strokeWidth={2} strokeLinecap="round" fill="none" />
    ),
    front: (
      <g>
        <path d="M35 46 Q34 14 60 14 Q86 14 85 46" stroke="#0E8A8A" strokeWidth={4} strokeLinecap="round" fill="none" />
        <rect x={30} y={38} width={10} height={17} rx={5} fill="#0E8A8A" />
        <rect x={80} y={38} width={10} height={17} rx={5} fill="#0E8A8A" />
      </g>
    ),
    prop: (
      <g>
        <circle cx={100} cy={30} r={4} fill="#0E8A8A" />
        <rect x={102.2} y={14} width={1.8} height={16} fill="#0E8A8A" />
        <path d="M104 14 Q110 16 109 22 Q107 18 104 18 Z" fill="#0E8A8A" />
        <circle cx={92} cy={14} r={2.8} fill="#0E8A8A" opacity={0.6} />
        <rect x={93.6} y={3} width={1.4} height={11} fill="#0E8A8A" opacity={0.6} />
      </g>
    ),
  },
};

export const CharacterSVG = ({ type, size = 120 }: { type: TypeId; size?: number }) => <Figure size={size} parts={PARTS[type]} />;

export const CategoryIcon = ({ type, size = 40 }: { type: CategoryId; size?: number }) => {
  if (type === "visual") return (<svg viewBox="0 0 40 40" width={size} height={size} fill="none"><circle cx="20" cy="20" r="16" fill="#D94F3B" opacity="0.1"/><ellipse cx="20" cy="20" rx="11" ry="8" stroke="#D94F3B" strokeWidth="1.8" fill="none"/><circle cx="20" cy="20" r="3.5" fill="#D94F3B" opacity="0.6"/><circle cx="20" cy="20" r="1.5" fill="#D94F3B"/></svg>);
  if (type === "verbal") return (<svg viewBox="0 0 40 40" width={size} height={size} fill="none"><circle cx="20" cy="20" r="16" fill="#2968B0" opacity="0.1"/><rect x="12" y="10" width="16" height="20" rx="2" stroke="#2968B0" strokeWidth="1.8" fill="none"/><line x1="15" y1="15" x2="25" y2="15" stroke="#2968B0" strokeWidth="1.2" opacity="0.5"/><line x1="15" y1="19" x2="25" y2="19" stroke="#2968B0" strokeWidth="1.2" opacity="0.5"/><line x1="15" y1="23" x2="21" y2="23" stroke="#2968B0" strokeWidth="1.2" opacity="0.5"/></svg>);
  return (<svg viewBox="0 0 40 40" width={size} height={size} fill="none"><circle cx="20" cy="20" r="16" fill="#178F5E" opacity="0.1"/><path d="M13 16 Q13 10 20 10 Q27 10 27 16" stroke="#178F5E" strokeWidth="1.8" fill="none"/><rect x="11" y="15" width="4" height="7" rx="2" fill="#178F5E" opacity="0.5"/><rect x="25" y="15" width="4" height="7" rx="2" fill="#178F5E" opacity="0.5"/><path d="M15 28 Q15 32 20 32 Q25 32 25 28" stroke="#178F5E" strokeWidth="1.2" fill="none" opacity="0.4"/><line x1="20" y1="22" x2="20" y2="28" stroke="#178F5E" strokeWidth="1.2" opacity="0.4"/></svg>);
};
