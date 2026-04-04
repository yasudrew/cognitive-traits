import { useState, useEffect } from "react";

/* ═══ SVG CHARACTERS ═══ */
// Each type gets a unique simple human character with props/pose reflecting the type
const CharacterSVG = ({ type, size = 120 }) => {
  const s = size;
  const chars = {
    camera: (
      <svg viewBox="0 0 120 140" width={s} height={s*140/120} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Person holding up a frame/viewfinder */}
        <circle cx="60" cy="32" r="18" fill="#D94F3B" opacity="0.15"/>
        <circle cx="60" cy="32" r="14" fill="#D94F3B" opacity="0.3"/>
        {/* Head */}
        <circle cx="60" cy="30" r="12" fill="#F5D0C5"/>
        <circle cx="56" cy="28" r="1.5" fill="#333"/>
        <circle cx="64" cy="28" r="1.5" fill="#333"/>
        <ellipse cx="60" cy="33" rx="3" ry="1.5" fill="#E8A090"/>
        {/* Hair */}
        <path d="M48 26c0-8 5-14 12-14s12 6 12 14" fill="#8B4513" opacity="0.8"/>
        {/* Body */}
        <rect x="50" y="44" width="20" height="28" rx="6" fill="#D94F3B" opacity="0.8"/>
        {/* Arms holding frame */}
        <rect x="32" y="48" width="18" height="5" rx="2.5" fill="#F5D0C5"/>
        <rect x="70" y="48" width="18" height="5" rx="2.5" fill="#F5D0C5"/>
        {/* Viewfinder frame */}
        <rect x="30" y="42" width="12" height="10" rx="2" stroke="#D94F3B" strokeWidth="2" fill="none"/>
        <rect x="78" y="42" width="12" height="10" rx="2" stroke="#D94F3B" strokeWidth="2" fill="none"/>
        {/* Legs */}
        <rect x="52" y="72" width="7" height="22" rx="3" fill="#444"/>
        <rect x="61" y="72" width="7" height="22" rx="3" fill="#444"/>
        <ellipse cx="55" cy="96" rx="6" ry="3" fill="#666"/>
        <ellipse cx="65" cy="96" rx="6" ry="3" fill="#666"/>
      </svg>
    ),
    "3d": (
      <svg viewBox="0 0 120 140" width={s} height={s*140/120} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Person in dynamic pose, one arm out */}
        <circle cx="60" cy="32" r="18" fill="#C87620" opacity="0.1"/>
        {/* Head */}
        <circle cx="60" cy="30" r="12" fill="#F5D0C5"/>
        <circle cx="56" cy="28" r="1.5" fill="#333"/>
        <circle cx="64" cy="28" r="1.5" fill="#333"/>
        <path d="M57 34 Q60 36 63 34" stroke="#C87620" strokeWidth="1.2" fill="none"/>
        {/* Hair - short */}
        <path d="M48 26c0-7 5-13 12-13s12 6 12 13" fill="#3A3A3A"/>
        {/* Body - slight lean */}
        <rect x="50" y="44" width="20" height="28" rx="6" fill="#C87620" opacity="0.8" transform="rotate(-3 60 58)"/>
        {/* Arms - one pointing out */}
        <line x1="50" y1="50" x2="28" y2="42" stroke="#F5D0C5" strokeWidth="5" strokeLinecap="round"/>
        <line x1="70" y1="52" x2="92" y2="58" stroke="#F5D0C5" strokeWidth="5" strokeLinecap="round"/>
        {/* 3D cube near hand */}
        <g transform="translate(18,30)">
          <path d="M0 8 L8 4 L16 8 L16 16 L8 20 L0 16Z" fill="#C87620" opacity="0.2" stroke="#C87620" strokeWidth="1"/>
          <path d="M0 8 L8 12 L16 8" fill="none" stroke="#C87620" strokeWidth="0.8"/>
          <path d="M8 12 L8 20" stroke="#C87620" strokeWidth="0.8"/>
        </g>
        {/* Legs */}
        <rect x="51" y="72" width="7" height="22" rx="3" fill="#444" transform="rotate(3 54 83)"/>
        <rect x="62" y="72" width="7" height="22" rx="3" fill="#444" transform="rotate(-5 65 83)"/>
        <ellipse cx="54" cy="96" rx="6" ry="3" fill="#666"/>
        <ellipse cx="67" cy="96" rx="6" ry="3" fill="#666"/>
      </svg>
    ),
    fantasy: (
      <svg viewBox="0 0 120 140" width={s} height={s*140/120} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Dreamy person with thought bubble */}
        <circle cx="60" cy="32" r="18" fill="#2968B0" opacity="0.08"/>
        {/* Head - looking up slightly */}
        <circle cx="60" cy="32" r="12" fill="#F5D0C5"/>
        <circle cx="57" cy="29" r="1.5" fill="#333"/>
        <circle cx="65" cy="29" r="1.5" fill="#333"/>
        <ellipse cx="60" cy="35" rx="2.5" ry="1" fill="#E8A090"/>
        {/* Hair - wavy */}
        <path d="M47 28c0-8 6-15 13-15s13 7 13 15" fill="#5C3317"/>
        <path d="M73 28c2 3 2 8 0 12" stroke="#5C3317" strokeWidth="3" fill="none"/>
        {/* Body */}
        <rect x="50" y="46" width="20" height="28" rx="6" fill="#2968B0" opacity="0.8"/>
        {/* Arms - one hand on chin */}
        <line x1="50" y1="52" x2="38" y2="60" stroke="#F5D0C5" strokeWidth="5" strokeLinecap="round"/>
        <line x1="70" y1="50" x2="80" y2="38" stroke="#F5D0C5" strokeWidth="5" strokeLinecap="round"/>
        <circle cx="80" cy="36" r="3" fill="#F5D0C5"/>
        {/* Thought bubbles */}
        <circle cx="88" cy="24" r="3" fill="#2968B0" opacity="0.15"/>
        <circle cx="94" cy="16" r="5" fill="#2968B0" opacity="0.15"/>
        <circle cx="100" cy="8" r="8" fill="#2968B0" opacity="0.12"/>
        {/* Legs */}
        <rect x="52" y="74" width="7" height="20" rx="3" fill="#444"/>
        <rect x="61" y="74" width="7" height="20" rx="3" fill="#444"/>
        <ellipse cx="55" cy="96" rx="6" ry="3" fill="#666"/>
        <ellipse cx="65" cy="96" rx="6" ry="3" fill="#666"/>
      </svg>
    ),
    dictionary: (
      <svg viewBox="0 0 120 140" width={s} height={s*140/120} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Studious person with clipboard/notebook */}
        <circle cx="60" cy="32" r="18" fill="#6D4ABA" opacity="0.08"/>
        {/* Head */}
        <circle cx="60" cy="30" r="12" fill="#F5D0C5"/>
        <circle cx="56" cy="28" r="1.5" fill="#333"/>
        <circle cx="64" cy="28" r="1.5" fill="#333"/>
        {/* Glasses */}
        <circle cx="56" cy="28" r="5" stroke="#6D4ABA" strokeWidth="1.2" fill="none" opacity="0.6"/>
        <circle cx="64" cy="28" r="5" stroke="#6D4ABA" strokeWidth="1.2" fill="none" opacity="0.6"/>
        <line x1="61" y1="27" x2="59" y2="27" stroke="#6D4ABA" strokeWidth="1" opacity="0.6"/>
        <path d="M57 34 Q60 35 63 34" stroke="#B08080" strokeWidth="1" fill="none"/>
        {/* Hair - neat */}
        <path d="M48 25c0-7 5-13 12-13s12 6 12 13" fill="#2A1A0A"/>
        {/* Body */}
        <rect x="50" y="44" width="20" height="28" rx="6" fill="#6D4ABA" opacity="0.8"/>
        {/* Arms holding clipboard */}
        <line x1="50" y1="52" x2="34" y2="56" stroke="#F5D0C5" strokeWidth="5" strokeLinecap="round"/>
        <line x1="70" y1="52" x2="78" y2="56" stroke="#F5D0C5" strokeWidth="5" strokeLinecap="round"/>
        {/* Clipboard */}
        <rect x="26" y="48" width="14" height="18" rx="2" fill="white" stroke="#6D4ABA" strokeWidth="1.2"/>
        <line x1="29" y1="53" x2="37" y2="53" stroke="#6D4ABA" strokeWidth="0.8" opacity="0.4"/>
        <line x1="29" y1="56" x2="37" y2="56" stroke="#6D4ABA" strokeWidth="0.8" opacity="0.4"/>
        <line x1="29" y1="59" x2="35" y2="59" stroke="#6D4ABA" strokeWidth="0.8" opacity="0.4"/>
        {/* Legs */}
        <rect x="52" y="72" width="7" height="22" rx="3" fill="#444"/>
        <rect x="61" y="72" width="7" height="22" rx="3" fill="#444"/>
        <ellipse cx="55" cy="96" rx="6" ry="3" fill="#666"/>
        <ellipse cx="65" cy="96" rx="6" ry="3" fill="#666"/>
      </svg>
    ),
    radio: (
      <svg viewBox="0 0 120 140" width={s} height={s*140/120} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Person speaking/listening, sound waves */}
        <circle cx="60" cy="32" r="18" fill="#178F5E" opacity="0.08"/>
        {/* Head */}
        <circle cx="60" cy="30" r="12" fill="#F5D0C5"/>
        <circle cx="56" cy="28" r="1.5" fill="#333"/>
        <circle cx="64" cy="28" r="1.5" fill="#333"/>
        <ellipse cx="60" cy="34" rx="3" ry="2" fill="#E8A090"/>
        {/* Hair */}
        <path d="M48 26c0-8 5-14 12-14s12 6 12 14" fill="#1A1A1A"/>
        {/* Body */}
        <rect x="50" y="44" width="20" height="28" rx="6" fill="#178F5E" opacity="0.8"/>
        {/* Arms - one hand near mouth */}
        <line x1="50" y1="52" x2="36" y2="62" stroke="#F5D0C5" strokeWidth="5" strokeLinecap="round"/>
        <line x1="70" y1="48" x2="74" y2="36" stroke="#F5D0C5" strokeWidth="5" strokeLinecap="round"/>
        {/* Sound waves from mouth */}
        <path d="M76 30 Q82 30 82 26" stroke="#178F5E" strokeWidth="1.5" fill="none" opacity="0.3"/>
        <path d="M78 34 Q86 34 86 28" stroke="#178F5E" strokeWidth="1.5" fill="none" opacity="0.25"/>
        <path d="M80 38 Q90 38 90 30" stroke="#178F5E" strokeWidth="1.5" fill="none" opacity="0.2"/>
        {/* Legs */}
        <rect x="52" y="72" width="7" height="22" rx="3" fill="#444"/>
        <rect x="61" y="72" width="7" height="22" rx="3" fill="#444"/>
        <ellipse cx="55" cy="96" rx="6" ry="3" fill="#666"/>
        <ellipse cx="65" cy="96" rx="6" ry="3" fill="#666"/>
      </svg>
    ),
    sound: (
      <svg viewBox="0 0 120 140" width={s} height={s*140/120} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Person with headphones, music notes */}
        <circle cx="60" cy="32" r="18" fill="#0E8A8A" opacity="0.08"/>
        {/* Head */}
        <circle cx="60" cy="30" r="12" fill="#F5D0C5"/>
        <circle cx="56" cy="28" r="1.5" fill="#333"/>
        <circle cx="64" cy="28" r="1.5" fill="#333"/>
        <path d="M57 33 Q60 35 63 33" stroke="#C08070" strokeWidth="1" fill="none"/>
        {/* Hair */}
        <path d="M48 26c0-8 5-14 12-14s12 6 12 14" fill="#6B3A2A"/>
        {/* Headphones */}
        <path d="M44 28 Q44 14 60 14 Q76 14 76 28" stroke="#0E8A8A" strokeWidth="2.5" fill="none"/>
        <rect x="40" y="26" width="6" height="10" rx="3" fill="#0E8A8A"/>
        <rect x="74" y="26" width="6" height="10" rx="3" fill="#0E8A8A"/>
        {/* Body */}
        <rect x="50" y="44" width="20" height="28" rx="6" fill="#0E8A8A" opacity="0.8"/>
        {/* Arms relaxed */}
        <line x1="50" y1="50" x2="38" y2="64" stroke="#F5D0C5" strokeWidth="5" strokeLinecap="round"/>
        <line x1="70" y1="50" x2="82" y2="64" stroke="#F5D0C5" strokeWidth="5" strokeLinecap="round"/>
        {/* Music notes */}
        <g transform="translate(84,18)" opacity="0.35">
          <circle cx="0" cy="6" r="2" fill="#0E8A8A"/>
          <line x1="2" y1="6" x2="2" y2="-2" stroke="#0E8A8A" strokeWidth="1"/>
          <path d="M2-2 Q6-4 4 0" fill="#0E8A8A"/>
        </g>
        <g transform="translate(92,10)" opacity="0.25">
          <circle cx="0" cy="6" r="2" fill="#0E8A8A"/>
          <line x1="2" y1="6" x2="2" y2="-2" stroke="#0E8A8A" strokeWidth="1"/>
          <path d="M2-2 Q6-4 4 0" fill="#0E8A8A"/>
        </g>
        {/* Legs */}
        <rect x="52" y="72" width="7" height="22" rx="3" fill="#444"/>
        <rect x="61" y="72" width="7" height="22" rx="3" fill="#444"/>
        <ellipse cx="55" cy="96" rx="6" ry="3" fill="#666"/>
        <ellipse cx="65" cy="96" rx="6" ry="3" fill="#666"/>
      </svg>
    ),
  };
  return chars[type] || null;
};

/* Category SVG icons for home page */
const CategoryIcon = ({ type, size = 40 }) => {
  if (type === "visual") return (
    <svg viewBox="0 0 40 40" width={size} height={size} fill="none">
      <circle cx="20" cy="20" r="16" fill="#D94F3B" opacity="0.1"/>
      <ellipse cx="20" cy="20" rx="11" ry="8" stroke="#D94F3B" strokeWidth="1.8" fill="none"/>
      <circle cx="20" cy="20" r="3.5" fill="#D94F3B" opacity="0.6"/>
      <circle cx="20" cy="20" r="1.5" fill="#D94F3B"/>
    </svg>
  );
  if (type === "verbal") return (
    <svg viewBox="0 0 40 40" width={size} height={size} fill="none">
      <circle cx="20" cy="20" r="16" fill="#2968B0" opacity="0.1"/>
      <rect x="12" y="10" width="16" height="20" rx="2" stroke="#2968B0" strokeWidth="1.8" fill="none"/>
      <line x1="15" y1="15" x2="25" y2="15" stroke="#2968B0" strokeWidth="1.2" opacity="0.5"/>
      <line x1="15" y1="19" x2="25" y2="19" stroke="#2968B0" strokeWidth="1.2" opacity="0.5"/>
      <line x1="15" y1="23" x2="21" y2="23" stroke="#2968B0" strokeWidth="1.2" opacity="0.5"/>
    </svg>
  );
  return (
    <svg viewBox="0 0 40 40" width={size} height={size} fill="none">
      <circle cx="20" cy="20" r="16" fill="#178F5E" opacity="0.1"/>
      <path d="M13 16 Q13 10 20 10 Q27 10 27 16" stroke="#178F5E" strokeWidth="1.8" fill="none"/>
      <rect x="11" y="15" width="4" height="7" rx="2" fill="#178F5E" opacity="0.5"/>
      <rect x="25" y="15" width="4" height="7" rx="2" fill="#178F5E" opacity="0.5"/>
      <path d="M15 28 Q15 32 20 32 Q25 32 25 28" stroke="#178F5E" strokeWidth="1.2" fill="none" opacity="0.4"/>
      <line x1="20" y1="22" x2="20" y2="28" stroke="#178F5E" strokeWidth="1.2" opacity="0.4"/>
    </svg>
  );
};

/* ═══ DATA ═══ */
const TYPES = [
  { id:"camera", label:"カメラタイプ", sub:"写真（カメラアイ）", category:"視覚優位", color:"#D94F3B", bg:"#FEF2F0",
    desc:"写真のように二次元で情報を切り取り、画像として記憶するタイプ。色彩やデザインへの感度が高く、一度見た光景を鮮明に思い出せます。",
    input:"図表・写真・イラスト・カラーコードなど視覚的な情報。テキストだけのメールより、スクリーンショット付きの方が頭に入る。",
    learning:"カラーマーカーやマインドマップで色分け整理。教科書の図を見て覚える、ノートに絵を描くなど「見える化」が効果的。",
    workstyle:"デザインレビュー、資料のビジュアル作成、UI/UXチェック、ビジュアルQAなど、見た目の精度が求められる作業に強い。" },
  { id:"3d", label:"3Dタイプ", sub:"三次元映像（3D）", category:"視覚優位", color:"#C87620", bg:"#FFF8EE",
    desc:"空間や時間軸を使って立体的に思考するタイプ。動画のように記憶し、人の顔や道順を覚えるのが得意です。",
    input:"動画・実演・ハンズオン体験。文字で読むより実際にやってみる、歩いてみるのが一番の近道。",
    learning:"動画教材や実験・フィールドワークが最適。頭の中で手順を映像として再生するシミュレーション学習も有効。",
    workstyle:"プロトタイピング、空間設計、プロジェクトの段取り組み、現場の状況判断など、立体的・時系列的な把握が活きる場面。" },
  { id:"fantasy", label:"ファンタジータイプ", sub:"言語映像（ファンタジー）", category:"言語優位", color:"#2968B0", bg:"#EFF6FF",
    desc:"読んだり聞いたりした内容を映像化して思考するタイプ。文章から鮮明な情景を思い浮かべ、映像を言葉にするのも得意です。",
    input:"ストーリー仕立ての説明、事例紹介、ケーススタディ。抽象的な理論より具体的なエピソードの方が入りやすい。",
    learning:"物語形式で覚える、歴史を漫画で読む、エピソード記憶の活用。例え話や比喩を使った理解がぴったり。",
    workstyle:"企画書やストーリーの構成、ユーザーの利用シナリオ作成、プレゼンの語り方設計など、言語と映像をつなぐ作業。" },
  { id:"dictionary", label:"辞書タイプ", sub:"言語抽象（辞書）", category:"言語優位", color:"#6D4ABA", bg:"#F5F0FF",
    desc:"文字や文章をそのまま言葉で思考し、図式化・体系化して記憶するタイプ。ノートまとめの達人で、論理的な整理が得意です。",
    input:"構造化されたドキュメント、箇条書き、フローチャート。目次がある教科書や体系的なマニュアルが最も頭に入る。",
    learning:"ノートに自分の言葉でまとめ直す、概念をカテゴリ分けする、フローチャートや表にして整理する学習法。",
    workstyle:"議事録作成、要件定義、マニュアル整備、ナレッジ管理、論理的な分析・レポート作成など、構造化が求められる場面。" },
  { id:"radio", label:"ラジオタイプ", sub:"聴覚言語（ラジオ）", category:"聴覚優位", color:"#178F5E", bg:"#EEFBF4",
    desc:"文字や文章を「音」として耳から入れ情報処理するタイプ。人の話を正確に覚え、語呂合わせや音読での記憶が得意です。",
    input:"口頭説明、会議、ポッドキャスト、講義。テキストを読むより、誰かに説明してもらう方が理解が早い。",
    learning:"音読、講義の録音再生、語呂合わせ、ポッドキャストやオーディオブックの活用。声に出して繰り返すと定着する。",
    workstyle:"ファシリテーション、ヒアリング、電話対応、プレゼン、口頭での引き継ぎなど、聴く・話すが中心の業務。" },
  { id:"sound", label:"サウンドタイプ", sub:"聴覚＆音（サウンド）", category:"聴覚優位", color:"#0E8A8A", bg:"#EEFCFC",
    desc:"音色や音階といった音楽的イメージを理解・処理できるタイプ。メロディを一度聞いて再現したり、声の微細な違いを聞き分けます。",
    input:"音声のトーン・リズム・抑揚。話の内容だけでなく「どう聞こえるか」で理解度が変わる。BGMのある環境が集中しやすいことも。",
    learning:"リズムに乗せて覚える、チャンツ（歌うように唱える）学習法、BGM付き環境での学習、発音・イントネーションの模倣。",
    workstyle:"音声コンテンツ制作、場の雰囲気の察知、声のトーンで相手の状態を読む対人業務、ナレーション・音響関連の作業。" },
];

const CAT_COLORS = { "視覚優位":"#D94F3B", "言語優位":"#2968B0", "聴覚優位":"#178F5E" };

const QUESTIONS = [
  { q:"一度見た風景や場面を、写真のように鮮明に思い出せる", type:"camera", theme:"記憶" },
  { q:"人の服装や持ち物の色・デザインの違いによく気づく", type:"camera", theme:"知覚" },
  { q:"文字よりも図やイラストがあった方が圧倒的に理解しやすい", type:"camera", theme:"学習" },
  { q:"部屋のインテリアや資料のレイアウトの乱れが気になる", type:"camera", theme:"日常" },
  { q:"何かを思い出すとき、文字ではなく画像やイメージが最初に浮かぶ", type:"camera", theme:"思考" },
  { q:"一度会った人の顔は忘れにくく、表情の変化にもよく気づく", type:"3d", theme:"知覚" },
  { q:"初めての場所でも方向感覚が働き、道に迷いにくい", type:"3d", theme:"日常" },
  { q:"家具の配置や部屋のレイアウトを頭の中で立体的にシミュレーションできる", type:"3d", theme:"思考" },
  { q:"スポーツや体を動かす場面で、動作のイメージを映像として捉えられる", type:"3d", theme:"身体" },
  { q:"物事を説明するとき、時間の流れに沿って順を追って話すのが自然にできる", type:"3d", theme:"表現" },
  { q:"小説を読むと、登場人物や風景が頭の中に映画のように浮かぶ", type:"fantasy", theme:"学習" },
  { q:"人の話を聞くとき、内容を映像として頭の中で再現している", type:"fantasy", theme:"知覚" },
  { q:"体験や感情を、比喩やたとえ話を使って表現するのが得意", type:"fantasy", theme:"表現" },
  { q:"「あの時こうだったら…」という空想のストーリーをよく思い浮かべる", type:"fantasy", theme:"思考" },
  { q:"歌詞の意味や物語の背景に感情移入しやすい", type:"fantasy", theme:"日常" },
  { q:"メモやノートをきれいに整理してまとめるのが好きで得意", type:"dictionary", theme:"学習" },
  { q:"初めて聞く話でも、頭の中で自動的にカテゴリ分けや構造化をしている", type:"dictionary", theme:"思考" },
  { q:"曖昧な表現より、正確で具体的な言葉遣いを好む", type:"dictionary", theme:"表現" },
  { q:"何かを覚えるとき、図式化やリスト化すると定着しやすい", type:"dictionary", theme:"記憶" },
  { q:"議論では論点を整理し、矛盾や論理の飛躍に気づきやすい", type:"dictionary", theme:"知覚" },
  { q:"講義やポッドキャストなど、耳から聴く情報の方が頭に入りやすい", type:"radio", theme:"学習" },
  { q:"人から聞いた話を、ほぼそのまま正確に別の人に伝えられる", type:"radio", theme:"表現" },
  { q:"語呂合わせや声に出して読むことで記憶が定着しやすい", type:"radio", theme:"記憶" },
  { q:"電話やボイスメッセージの方が、テキストよりコミュニケーションしやすい", type:"radio", theme:"日常" },
  { q:"会議中、メモを取るより聞くことに集中した方が内容を覚えている", type:"radio", theme:"思考" },
  { q:"一度聞いたメロディを口ずさんだり、楽器で再現したりできる", type:"sound", theme:"記憶" },
  { q:"CMや映画では、映像より先に音楽やBGMが印象に残る", type:"sound", theme:"知覚" },
  { q:"人の声のトーンや抑揚の変化で、感情や本音を感じ取れる", type:"sound", theme:"日常" },
  { q:"周囲の環境音（風、雨、電車など）に敏感で、よく気づく方だ", type:"sound", theme:"身体" },
  { q:"頭の中で常に何かしらの音楽が流れていることが多い", type:"sound", theme:"思考" },
];

const QUESTION_ORDER = (() => {
  const themes = ["記憶","知覚","学習","日常","思考","表現","身体"];
  const byTheme = {};
  QUESTIONS.forEach((q,i) => { if(!byTheme[q.theme]) byTheme[q.theme]=[]; byTheme[q.theme].push(i); });
  const order = [];
  const maxLen = Math.max(...Object.values(byTheme).map(a=>a.length));
  for(let r=0;r<maxLen;r++) for(const t of themes) if(byTheme[t]?.[r]!==undefined) order.push(byTheme[t][r]);
  return order;
})();

// Reversed: 5 at top
const LIKERT = [
  { value:5, label:"とてもそう思う" },
  { value:4, label:"ややそう思う" },
  { value:3, label:"どちらとも言えない" },
  { value:2, label:"あまりそう思わない" },
  { value:1, label:"全くそう思わない" },
];

/* ═══ COMPONENTS ═══ */
function Dot({ color, size=10 }) {
  return <span style={{ display:"inline-block", width:size, height:size, borderRadius:"50%", background:color, flexShrink:0 }}/>;
}

function AnimBar({ value, max, color, delay, label, pct }) {
  const [width, setWidth] = useState(0);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t1=setTimeout(()=>setShow(true),delay);
    const t2=setTimeout(()=>setWidth((value/max)*100),delay+80);
    return ()=>{clearTimeout(t1);clearTimeout(t2)};
  },[value,max,delay]);
  return (
    <div style={{ opacity:show?1:0, transform:show?"translateY(0)":"translateY(10px)", transition:"opacity .5s,transform .5s", marginBottom:14 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:4 }}>
        <span style={{ fontSize:13, fontWeight:600, color:"var(--text)", display:"flex", alignItems:"center", gap:8 }}>
          <Dot color={color}/> {label}
        </span>
        <span style={{ fontSize:17, fontWeight:800, color, fontFeatureSettings:"'tnum'" }}>{pct}%</span>
      </div>
      <div style={{ height:8, background:"rgba(0,0,0,0.05)", borderRadius:4, overflow:"hidden" }}>
        <div style={{ height:"100%", width:`${width}%`, background:color, borderRadius:4, transition:"width 1s cubic-bezier(0.34,1.56,0.64,1)" }}/>
      </div>
    </div>
  );
}

/* ═══ PAGES ═══ */
function HomePage({ onStart }) {
  return (
    <div className="fadein hero-top" style={{ paddingTop:72, paddingBottom:60 }}>
      <p style={{ fontSize:13, fontWeight:600, color:"var(--muted)", letterSpacing:2, marginBottom:20 }}>COGNITIVE STYLE ASSESSMENT</p>
      <h1 className="hero-title" style={{ fontSize:36, fontWeight:900, color:"var(--text)", lineHeight:1.3, marginBottom:16 }}>
        あなたの認知特性を<br/>知ろう
      </h1>
      <p className="hero-sub" style={{ fontSize:15, color:"var(--sub)", lineHeight:1.9, maxWidth:440, marginBottom:40 }}>
        30の質問に答えるだけで、情報の受け取り方・処理の仕方が6タイプの割合で分かります。自分の「脳のクセ」を知って、学び方・働き方を最適化しましょう。
      </p>
      <button className="primary-btn" onClick={onStart}>診断をはじめる<span style={{ marginLeft:8 }}>→</span></button>
      <p style={{ marginTop:14, fontSize:12, color:"var(--muted)" }}>所要時間 約5分 ・ 全30問 ・ 無料</p>

      <div style={{ marginTop:56, display:"flex", gap:1, borderRadius:12, overflow:"hidden", border:"1px solid var(--border)" }}>
        {[
          { label:"視覚優位", sub:"見て覚える", type:"visual" },
          { label:"言語優位", sub:"読んで覚える", type:"verbal" },
          { label:"聴覚優位", sub:"聞いて覚える", type:"auditory" },
        ].map((c,i) => (
          <div key={c.label} className="cat-card" style={{ flex:1, padding:"20px 12px", textAlign:"center", background:"var(--surface)", borderRight:i<2?"1px solid var(--border)":"none" }}>
            <div style={{ display:"flex", justifyContent:"center", marginBottom:8 }}><CategoryIcon type={c.type} size={36} className="cat-icon"/></div>
            <div style={{ fontSize:13, fontWeight:700, color:"var(--text)" }}>{c.label}</div>
            <div style={{ fontSize:11, color:"var(--muted)", marginTop:2 }}>{c.sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function QuizPage({ onFinish }) {
  const [idx,setIdx]=useState(0);
  const [answers,setAnswers]=useState({});
  const [fade,setFade]=useState("fadein");
  const totalQ=QUESTIONS.length;
  const qIndex=QUESTION_ORDER[idx];
  const q=QUESTIONS[qIndex];
  const handleAnswer=(val)=>{
    setFade("fadeout");
    setTimeout(()=>{
      const next={...answers,[qIndex]:val};
      setAnswers(next);
      if(idx<totalQ-1) setIdx(i=>i+1); else onFinish(next);
      setFade("fadein");
    },200);
  };
  const goBack=()=>{ if(idx>0){setFade("fadeout");setTimeout(()=>{setIdx(i=>i-1);setFade("fadein")},200)} };
  return (
    <div style={{ paddingTop:32, paddingBottom:40 }}>
      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
        <span style={{ fontSize:13, fontWeight:700, color:"var(--text)" }}>Q{idx+1}<span style={{ color:"var(--muted)", fontWeight:400 }}> / {totalQ}</span></span>
        <span style={{ fontSize:13, color:"var(--muted)" }}>{Math.round((idx/totalQ)*100)}%</span>
      </div>
      <div style={{ height:3, background:"rgba(0,0,0,0.06)", borderRadius:2, marginBottom:32, overflow:"hidden" }}>
        <div style={{ height:"100%", borderRadius:2, transition:"width .4s ease", width:`${(idx/totalQ)*100}%`, background:"var(--text)" }}/>
      </div>
      <div className={fade} key={idx}>
        <span style={{ display:"inline-block", padding:"3px 10px", borderRadius:4, fontSize:11, fontWeight:500, background:"rgba(0,0,0,0.04)", color:"var(--muted)", marginBottom:12 }}>{q.theme}</span>
        <h2 className="quiz-question" style={{ fontSize:19, fontWeight:700, lineHeight:1.8, color:"var(--text)", marginBottom:28 }}>{q.q}</h2>
        <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
          {LIKERT.map(opt=>(
            <button key={opt.value} className="likert-btn" onClick={()=>handleAnswer(opt.value)}
              style={answers[qIndex]===opt.value?{borderColor:"var(--text)",background:"rgba(0,0,0,0.02)"}:{}}>
              <span className="likert-num">{opt.value}</span><span>{opt.label}</span>
            </button>
          ))}
        </div>
      </div>
      {idx>0&&<div style={{marginTop:20}}><button className="back-link" onClick={goBack}>← 前の質問</button></div>}
    </div>
  );
}

function ResultPage({ answers, onNav }) {
  const scores={};
  TYPES.forEach(t=>scores[t.id]=0);
  Object.entries(answers).forEach(([qi,val])=>{scores[QUESTIONS[parseInt(qi)].type]+=val});
  const maxP=25;
  const sorted=[...TYPES].sort((a,b)=>(scores[b.id]||0)-(scores[a.id]||0));
  const top=sorted[0];
  const [openId,setOpenId]=useState(null);
  const getLevel=s=>{ if(s>=21)return"非常に強い"; if(s>=16)return"やや強い"; if(s>=11)return"標準"; return"弱め" };

  return (
    <div className="fadein" style={{ paddingTop:32, paddingBottom:40 }}>
      {/* Hero */}
      <div className="result-hero" style={{ padding:"36px 24px", borderRadius:16, background:top.bg, border:`1px solid ${top.color}18`, marginBottom:24, textAlign:"center" }}>
        <div style={{ display:"flex", justifyContent:"center", marginBottom:8 }}><CharacterSVG type={top.id} size={100}/></div>
        <div style={{ display:"inline-block", padding:"4px 12px", borderRadius:4, fontSize:11, fontWeight:600, color:top.color, background:`${top.color}14`, marginBottom:10 }}>{top.category}</div>
        <h2 className="result-top-label" style={{ fontSize:26, fontWeight:900, color:top.color, marginBottom:4 }}>{top.label}</h2>
        <p style={{ fontSize:14, color:"var(--sub)" }}>あなたの最も強い認知特性</p>
      </div>

      {/* Bars */}
      <div className="card">
        <h3 className="section-title">タイプ別スコア</h3>
        {sorted.map((t,i)=><AnimBar key={t.id} value={scores[t.id]||0} max={maxP} color={t.color} delay={i*100} label={t.label} pct={Math.round(((scores[t.id]||0)/maxP)*100)}/>)}
        <p style={{ fontSize:11, color:"var(--muted)", textAlign:"center", marginTop:4 }}>各タイプ最大25点</p>
      </div>

      {/* Categories */}
      <div className="card">
        <h3 className="section-title">カテゴリ別</h3>
        {[{label:"視覚優位",ids:["camera","3d"],color:"#D94F3B"},{label:"言語優位",ids:["fantasy","dictionary"],color:"#2968B0"},{label:"聴覚優位",ids:["radio","sound"],color:"#178F5E"}].map((cat,i)=>{
          const cs=cat.ids.reduce((s,id)=>s+(scores[id]||0),0);
          return <AnimBar key={cat.label} value={cs} max={50} color={cat.color} delay={700+i*120} label={cat.label} pct={Math.round((cs/50)*100)}/>;
        })}
      </div>

      {/* Accordion */}
      <div className="card" style={{ padding:"12px 0" }}>
        <h3 className="section-title" style={{ padding:"0 24px", marginBottom:8 }}>詳細</h3>
        {sorted.map(t=>{
          const s=scores[t.id]||0; const open=openId===t.id;
          return (
            <div key={t.id} style={{ borderBottom:"1px solid var(--border)" }}>
              <button onClick={()=>setOpenId(open?null:t.id)} className="accordion-row">
                <Dot color={t.color}/>
                <div style={{ flex:1, textAlign:"left" }}>
                  <div style={{ fontSize:14, fontWeight:700, color:"var(--text)" }}>{t.label}</div>
                  <div style={{ fontSize:11, color:"var(--muted)" }}>{t.sub}</div>
                </div>
                <div style={{ textAlign:"right", marginRight:4 }}>
                  <div style={{ fontSize:16, fontWeight:800, color:t.color }}>{s}<span style={{ fontSize:11, fontWeight:400, color:"var(--muted)" }}> / 25</span></div>
                  <div style={{ fontSize:10, color:"var(--muted)" }}>{getLevel(s)}</div>
                </div>
                <svg width="12" height="12" viewBox="0 0 12 12" style={{ transition:"transform .3s", transform:open?"rotate(180deg)":"rotate(0)", flexShrink:0 }}>
                  <path d="M2 4.5L6 8.5L10 4.5" stroke="#999" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                </svg>
              </button>
              <div style={{ overflow:"hidden", transition:"max-height .35s ease,opacity .25s,padding .25s", maxHeight:open?600:0, opacity:open?1:0, padding:open?"8px 24px 20px":"0 24px" }}>
                <div style={{ display:"flex", justifyContent:"center", marginBottom:12 }}><CharacterSVG type={t.id} size={80}/></div>
                <p style={{ fontSize:13, color:"var(--sub)", lineHeight:1.8, marginBottom:12 }}>{t.desc}</p>
                <div style={{ fontSize:12, color:"var(--muted)", lineHeight:1.8 }}>
                  <p style={{ marginBottom:4 }}><span style={{ color:"var(--sub)", fontWeight:600 }}>得意なインプット：</span>{t.input}</p>
                  <p style={{ marginBottom:4 }}><span style={{ color:"var(--sub)", fontWeight:600 }}>おすすめ学習法：</span>{t.learning}</p>
                  <p><span style={{ color:"var(--sub)", fontWeight:600 }}>得意な業務スタイル：</span>{t.workstyle}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Advice */}
      <div className="card" style={{ background:top.bg, borderColor:`${top.color}18` }}>
        <p style={{ fontSize:14, fontWeight:700, color:top.color, marginBottom:8 }}>あなたへのアドバイス</p>
        <p style={{ fontSize:13, color:"var(--sub)", lineHeight:1.8, marginBottom:8 }}>
          あなたは<strong style={{ color:top.color }}>{top.label}</strong>の傾向が最も強いですが、認知特性は一つだけに決まるものではありません。
          {sorted[1]&&<>2番目の<strong style={{ color:sorted[1].color }}>{sorted[1].label}</strong>も活用し、自分に合ったインプット・アウトプットの方法を見つけましょう。</>}
        </p>
        <p style={{ fontSize:11, color:"var(--muted)", lineHeight:1.7 }}>
          ※本田真美先生の認知特性理論を参考にしたオリジナル版です。正式な診断は「本田40式認知特性テスト」をお試しください。
        </p>
      </div>
      <div style={{ display:"flex", gap:12, justifyContent:"center", marginTop:12, flexWrap:"wrap" }}>
        <button className="primary-btn" onClick={()=>onNav("home")}>もう一度診断する</button>
        <button className="secondary-btn" onClick={()=>onNav("types")}>タイプ一覧</button>
      </div>
    </div>
  );
}

function TypesPage({ onNav }) {
  return (
    <div className="fadein" style={{ paddingTop:32, paddingBottom:40 }}>
      <h2 style={{ fontSize:24, fontWeight:900, color:"var(--text)", marginBottom:4 }}>6つの認知特性タイプ</h2>
      <p style={{ fontSize:14, color:"var(--sub)", lineHeight:1.8, marginBottom:36 }}>
        人は情報を処理する方法に個性があり、大きく「視覚」「言語」「聴覚」の3カテゴリ、さらに各2タイプに分かれます。
      </p>
      {["視覚優位","言語優位","聴覚優位"].map(cat=>(
        <div key={cat} style={{ marginBottom:36 }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:14 }}>
            <Dot color={CAT_COLORS[cat]} size={8}/>
            <h3 style={{ fontSize:13, fontWeight:700, color:"var(--muted)", letterSpacing:1 }}>{cat}</h3>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            {TYPES.filter(t=>t.category===cat).map(t=>(
              <div key={t.id} className="card" style={{ background:t.bg, borderColor:`${t.color}12` }}>
                <div style={{ display:"flex", gap:16, alignItems:"flex-start", marginBottom:12 }}>
                  <CharacterSVG type={t.id} size={72}/>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:16, fontWeight:800, color:t.color }}>{t.label}</div>
                    <div style={{ fontSize:12, color:"var(--muted)", marginBottom:6 }}>{t.sub}</div>
                    <p style={{ fontSize:13, color:"var(--sub)", lineHeight:1.7 }}>{t.desc}</p>
                  </div>
                </div>
                <div style={{ fontSize:12, color:"var(--muted)", lineHeight:1.8, borderTop:`1px solid ${t.color}10`, paddingTop:12 }}>
                  <p style={{ marginBottom:4 }}><span style={{ color:"var(--sub)", fontWeight:600 }}>得意なインプット：</span>{t.input}</p>
                  <p style={{ marginBottom:4 }}><span style={{ color:"var(--sub)", fontWeight:600 }}>おすすめ学習法：</span>{t.learning}</p>
                  <p><span style={{ color:"var(--sub)", fontWeight:600 }}>得意な業務スタイル：</span>{t.workstyle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div style={{ textAlign:"center", marginTop:8 }}>
        <button className="primary-btn" onClick={()=>onNav("home")}>診断してみる</button>
      </div>
    </div>
  );
}

function AboutPage({ onNav }) {
  return (
    <div className="fadein" style={{ paddingTop:32, paddingBottom:40 }}>
      <h2 style={{ fontSize:24, fontWeight:900, color:"var(--text)", marginBottom:4 }}>認知特性とは</h2>
      <p style={{ fontSize:13, color:"var(--muted)", marginBottom:24 }}>Cognitive Style / Cognitive Characteristics</p>

      <div className="card">
        <p className="about-body" style={{ fontSize:14, color:"var(--sub)", lineHeight:2, marginBottom:16 }}>
          認知特性とは、目や耳などの感覚器から入ってきた情報を、頭の中で<strong style={{ color:"var(--text)" }}>理解・整理・記憶・表現する方法</strong>のことです。人によってその処理の仕方には個性があり、同じ情報に触れても、理解の仕方や覚え方が異なります。
        </p>
        <p className="about-body" style={{ fontSize:14, color:"var(--sub)", lineHeight:2 }}>
          たとえば、好きな曲について話すとき「歌詞が好き」という人もいれば「メロディが好き」という人もいます。教科書を読んで覚える人もいれば、講義を聴いて覚える人もいます。この違いこそが、認知特性の違いです。
        </p>
      </div>

      <div className="card">
        <h3 style={{ fontSize:15, fontWeight:700, color:"var(--text)", marginBottom:12 }}>3つのカテゴリと6つのタイプ</h3>
        <p style={{ fontSize:13, color:"var(--sub)", lineHeight:1.9, marginBottom:16 }}>
          認知特性は大きく「視覚優位」「言語優位」「聴覚優位」の3カテゴリに分けられ、さらにそれぞれが2つのタイプに分かれます。
        </p>
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          {[
            { cat:"視覚優位", color:"#D94F3B", desc:"目で見た情報を処理するのが得意", types:["カメラタイプ — 写真のように二次元で記憶", "3Dタイプ — 空間や時間軸で立体的に思考"] },
            { cat:"言語優位", color:"#2968B0", desc:"読んだ情報を処理するのが得意", types:["ファンタジータイプ — 言葉を映像化して思考", "辞書タイプ — 文字を図式化・体系化して記憶"] },
            { cat:"聴覚優位", color:"#178F5E", desc:"耳で聞いた情報を処理するのが得意", types:["ラジオタイプ — 言葉を音として処理", "サウンドタイプ — 音色やメロディで理解"] },
          ].map(c => (
            <div key={c.cat} style={{ padding:"16px 18px", borderRadius:10, background:`${c.color}08`, border:`1px solid ${c.color}12` }}>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
                <Dot color={c.color} size={8}/>
                <span style={{ fontSize:14, fontWeight:700, color:c.color }}>{c.cat}</span>
                <span style={{ fontSize:12, color:"var(--muted)" }}>— {c.desc}</span>
              </div>
              {c.types.map((t,i) => (
                <p key={i} style={{ fontSize:12, color:"var(--sub)", lineHeight:1.8, paddingLeft:16 }}>{t}</p>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h3 style={{ fontSize:15, fontWeight:700, color:"var(--text)", marginBottom:12 }}>知ることのメリット</h3>
        <div style={{ fontSize:13, color:"var(--sub)", lineHeight:2 }}>
          <p style={{ marginBottom:12 }}>
            自分の認知特性を知ると、<strong style={{ color:"var(--text)" }}>自分に合った学び方・働き方</strong>を選べるようになります。たとえば視覚優位の人が音声教材だけで勉強しても効率が上がりにくいように、自分の特性に合わない方法を続けていると、本来の力を発揮しづらくなります。
          </p>
          <p style={{ marginBottom:12 }}>
            また、周囲の人との認知特性の違いを理解することで、<strong style={{ color:"var(--text)" }}>コミュニケーションの改善</strong>にもつながります。「なぜこの人は口頭で伝えた方が理解してくれるのか」「なぜ資料を見せた方が話が早いのか」——その理由が認知特性の違いにあるかもしれません。
          </p>
          <p>
            認知特性は優劣ではなく、あくまで<strong style={{ color:"var(--text)" }}>情報処理の好みや傾向</strong>です。また、環境や経験によって変化する可能性もあるとされています。
          </p>
        </div>
      </div>

      <div className="card">
        <h3 style={{ fontSize:15, fontWeight:700, color:"var(--text)", marginBottom:12 }}>この診断について</h3>
        <p style={{ fontSize:13, color:"var(--sub)", lineHeight:2, marginBottom:8 }}>
          この診断は、小児科医・医学博士の本田真美先生が提唱した認知特性理論をベースに、オリジナルの質問を30問用意したものです。各質問に5段階で回答することで、6タイプそれぞれの傾向を割合で確認できます。
        </p>
        <p style={{ fontSize:12, color:"var(--muted)", lineHeight:1.8 }}>
          ※より正確な診断を受けたい方は、本田先生の「本田40式認知特性テスト」をお試しください。
        </p>
      </div>

      <div style={{ display:"flex", gap:12, justifyContent:"center", marginTop:8, flexWrap:"wrap" }}>
        <button className="primary-btn" onClick={() => onNav("home")}>診断してみる</button>
        <button className="secondary-btn" onClick={() => onNav("types")}>6タイプ一覧</button>
      </div>
    </div>
  );
}

/* ═══ APP ═══ */
export default function App() {
  const [page,setPage]=useState("home");
  const [resultAnswers,setResultAnswers]=useState(null);
  const navigate=(p)=>setPage(p);
  const startQuiz=()=>navigate("quiz");
  const finishQuiz=(ans)=>{setResultAnswers(ans);setPage("result")};

  return (
    <div style={{ minHeight:"100vh", background:"var(--bg)" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+New:wght@400;500;700;900&display=swap');
        :root{--bg:#FAFAF7;--surface:#FFF;--text:#1A1A1A;--sub:#4A4A4A;--muted:#999;--border:#E8E8E4}
        *{box-sizing:border-box;margin:0;padding:0}
        body{background:var(--bg)!important}
        .fadein{animation:fi .35s ease forwards}
        .fadeout{animation:fo .18s ease forwards}
        @keyframes fi{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fo{from{opacity:1}to{opacity:0;transform:translateY(-6px)}}
        .nav-bar{display:flex;align-items:center;justify-content:space-between;padding:14px 0;border-bottom:1px solid var(--border);margin-bottom:4px}
        .nav-logo{font-size:15px;font-weight:900;color:var(--text);cursor:pointer;letter-spacing:-0.3px}
        .nav-links{display:flex;gap:16px}
        .nav-link{font-size:13px;font-weight:500;color:var(--muted);cursor:pointer;background:none;border:none;font-family:inherit;padding:4px 0;transition:color .15s;border-bottom:1.5px solid transparent}
        .nav-link:hover{color:var(--text)}
        .nav-link.active{color:var(--text);border-bottom-color:var(--text)}
        .primary-btn{background:var(--text);color:var(--bg);border:none;padding:13px 32px;border-radius:8px;font-size:14px;font-weight:700;cursor:pointer;font-family:inherit;transition:all .15s;display:inline-flex;align-items:center}
        .primary-btn:hover{opacity:.85;transform:translateY(-1px)}
        .secondary-btn{background:none;color:var(--text);border:1.5px solid var(--border);padding:12px 24px;border-radius:8px;font-size:13px;font-weight:600;cursor:pointer;font-family:inherit;transition:all .15s}
        .secondary-btn:hover{border-color:var(--text)}
        .likert-btn{width:100%;border:1.5px solid var(--border);background:var(--surface);color:var(--sub);padding:12px 16px;border-radius:10px;font-size:14px;text-align:left;cursor:pointer;transition:all .12s;font-family:inherit;display:flex;align-items:center;gap:12px}
        .likert-btn:hover{border-color:var(--text);background:rgba(0,0,0,0.01);transform:translateX(2px)}
        .likert-num{width:28px;height:28px;border-radius:7px;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:12px;background:rgba(0,0,0,0.04);color:var(--muted);flex-shrink:0;transition:all .12s}
        .likert-btn:hover .likert-num{background:var(--text);color:var(--bg)}
        .back-link{background:none;border:none;color:var(--muted);font-size:13px;cursor:pointer;font-family:inherit;padding:4px 0;transition:color .15s}
        .back-link:hover{color:var(--text)}
        .card{background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:24px;margin-bottom:14px}
        .section-title{font-size:12px;font-weight:700;color:var(--muted);text-align:center;margin-bottom:16px;letter-spacing:1px;text-transform:uppercase}
        .accordion-row{width:100%;background:none;border:none;padding:14px 24px;cursor:pointer;display:flex;align-items:center;gap:12px;font-family:inherit;transition:background .1s}
        .accordion-row:hover{background:rgba(0,0,0,0.015)}
        .container{max-width:520px;margin:0 auto;padding:0 20px}
        @media(min-width:768px){
          .container{max-width:680px;padding:0 32px}
          .nav-bar{padding:18px 0}
          .nav-links{gap:24px}
          .nav-link{font-size:14px}
          .nav-logo{font-size:17px}
          .card{padding:32px;border-radius:16px;margin-bottom:18px}
          .likert-btn{padding:14px 20px;font-size:15px;border-radius:12px}
          .likert-num{width:32px;height:32px;font-size:13px}
          .primary-btn{padding:15px 40px;font-size:15px}
          .secondary-btn{padding:14px 32px;font-size:14px}
          .section-title{font-size:13px}
          .accordion-row{padding:16px 32px}
          .hero-title{font-size:42px!important}
          .hero-sub{font-size:16px!important;max-width:520px!important}
          .hero-top{padding-top:96px!important;padding-bottom:72px!important}
          .quiz-question{font-size:21px!important}
          .cat-card{padding:24px 20px!important}
          .cat-icon{width:44px!important;height:44px!important}
          .result-hero{padding:48px 36px!important}
          .result-top-label{font-size:30px!important}
          .type-card-layout{flex-direction:row!important;align-items:flex-start!important}
          .about-body{font-size:15px!important}
        }
        @media(min-width:1024px){
          .container{max-width:760px;padding:0 40px}
          .hero-title{font-size:48px!important}
          .hero-top{padding-top:112px!important}
        }
      `}</style>
      <div className="container" style={{ fontFamily:"'Zen Kaku Gothic New',sans-serif" }}>
        <nav className="nav-bar">
          <div className="nav-logo" onClick={()=>navigate("home")}>認知特性診断</div>
          <div className="nav-links">
            <button className={`nav-link ${page==="home"||page==="quiz"?"active":""}`} onClick={()=>navigate("home")}>ホーム</button>
            <button className={`nav-link ${page==="about"?"active":""}`} onClick={()=>navigate("about")}>認知特性とは</button>
            <button className={`nav-link ${page==="types"?"active":""}`} onClick={()=>navigate("types")}>タイプ一覧</button>
            {resultAnswers&&<button className={`nav-link ${page==="result"?"active":""}`} onClick={()=>navigate("result")}>診断結果</button>}
          </div>
        </nav>
        {page==="home"&&<HomePage onStart={startQuiz}/>}
        {page==="quiz"&&<QuizPage onFinish={finishQuiz}/>}
        {page==="result"&&resultAnswers&&<ResultPage answers={resultAnswers} onNav={navigate}/>}
        {page==="types"&&<TypesPage onNav={navigate}/>}
        {page==="about"&&<AboutPage onNav={navigate}/>}
      </div>
    </div>
  );
}
