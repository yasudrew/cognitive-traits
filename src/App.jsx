import { useState, useEffect, createContext, useContext } from "react";

/* ═══ i18n CONTEXT ═══ */
const LangContext = createContext("ja");
const useLang = () => useContext(LangContext);
const t = (lang, ja, en) => lang === "en" ? en : ja;

/* ═══ SVG CHARACTERS ═══ */
const CharacterSVG = ({ type, size = 120 }) => {
  const s = size;
  const chars = {
    camera: (
      <svg viewBox="0 0 120 140" width={s} height={s*140/120} fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="60" cy="32" r="18" fill="#D94F3B" opacity="0.15"/>
        <circle cx="60" cy="32" r="14" fill="#D94F3B" opacity="0.3"/>
        <circle cx="60" cy="30" r="12" fill="#F5D0C5"/>
        <circle cx="56" cy="28" r="1.5" fill="#333"/><circle cx="64" cy="28" r="1.5" fill="#333"/>
        <ellipse cx="60" cy="33" rx="3" ry="1.5" fill="#E8A090"/>
        <path d="M48 26c0-8 5-14 12-14s12 6 12 14" fill="#8B4513" opacity="0.8"/>
        <rect x="50" y="44" width="20" height="28" rx="6" fill="#D94F3B" opacity="0.8"/>
        <rect x="32" y="48" width="18" height="5" rx="2.5" fill="#F5D0C5"/>
        <rect x="70" y="48" width="18" height="5" rx="2.5" fill="#F5D0C5"/>
        <rect x="30" y="42" width="12" height="10" rx="2" stroke="#D94F3B" strokeWidth="2" fill="none"/>
        <rect x="78" y="42" width="12" height="10" rx="2" stroke="#D94F3B" strokeWidth="2" fill="none"/>
        <rect x="52" y="72" width="7" height="22" rx="3" fill="#444"/><rect x="61" y="72" width="7" height="22" rx="3" fill="#444"/>
        <ellipse cx="55" cy="96" rx="6" ry="3" fill="#666"/><ellipse cx="65" cy="96" rx="6" ry="3" fill="#666"/>
      </svg>
    ),
    "3d": (
      <svg viewBox="0 0 120 140" width={s} height={s*140/120} fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="60" cy="32" r="18" fill="#C87620" opacity="0.1"/>
        <circle cx="60" cy="30" r="12" fill="#F5D0C5"/>
        <circle cx="56" cy="28" r="1.5" fill="#333"/><circle cx="64" cy="28" r="1.5" fill="#333"/>
        <path d="M57 34 Q60 36 63 34" stroke="#C87620" strokeWidth="1.2" fill="none"/>
        <path d="M48 26c0-7 5-13 12-13s12 6 12 13" fill="#3A3A3A"/>
        <rect x="50" y="44" width="20" height="28" rx="6" fill="#C87620" opacity="0.8" transform="rotate(-3 60 58)"/>
        <line x1="50" y1="50" x2="28" y2="42" stroke="#F5D0C5" strokeWidth="5" strokeLinecap="round"/>
        <line x1="70" y1="52" x2="92" y2="58" stroke="#F5D0C5" strokeWidth="5" strokeLinecap="round"/>
        <g transform="translate(18,30)"><path d="M0 8 L8 4 L16 8 L16 16 L8 20 L0 16Z" fill="#C87620" opacity="0.2" stroke="#C87620" strokeWidth="1"/><path d="M0 8 L8 12 L16 8" fill="none" stroke="#C87620" strokeWidth="0.8"/><path d="M8 12 L8 20" stroke="#C87620" strokeWidth="0.8"/></g>
        <rect x="51" y="72" width="7" height="22" rx="3" fill="#444" transform="rotate(3 54 83)"/><rect x="62" y="72" width="7" height="22" rx="3" fill="#444" transform="rotate(-5 65 83)"/>
        <ellipse cx="54" cy="96" rx="6" ry="3" fill="#666"/><ellipse cx="67" cy="96" rx="6" ry="3" fill="#666"/>
      </svg>
    ),
    fantasy: (
      <svg viewBox="0 0 120 140" width={s} height={s*140/120} fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="60" cy="32" r="18" fill="#2968B0" opacity="0.08"/>
        <circle cx="60" cy="32" r="12" fill="#F5D0C5"/>
        <circle cx="57" cy="29" r="1.5" fill="#333"/><circle cx="65" cy="29" r="1.5" fill="#333"/>
        <ellipse cx="60" cy="35" rx="2.5" ry="1" fill="#E8A090"/>
        <path d="M47 28c0-8 6-15 13-15s13 7 13 15" fill="#5C3317"/><path d="M73 28c2 3 2 8 0 12" stroke="#5C3317" strokeWidth="3" fill="none"/>
        <rect x="50" y="46" width="20" height="28" rx="6" fill="#2968B0" opacity="0.8"/>
        <line x1="50" y1="52" x2="38" y2="60" stroke="#F5D0C5" strokeWidth="5" strokeLinecap="round"/>
        <line x1="70" y1="50" x2="80" y2="38" stroke="#F5D0C5" strokeWidth="5" strokeLinecap="round"/><circle cx="80" cy="36" r="3" fill="#F5D0C5"/>
        <circle cx="88" cy="24" r="3" fill="#2968B0" opacity="0.15"/><circle cx="94" cy="16" r="5" fill="#2968B0" opacity="0.15"/><circle cx="100" cy="8" r="8" fill="#2968B0" opacity="0.12"/>
        <rect x="52" y="74" width="7" height="20" rx="3" fill="#444"/><rect x="61" y="74" width="7" height="20" rx="3" fill="#444"/>
        <ellipse cx="55" cy="96" rx="6" ry="3" fill="#666"/><ellipse cx="65" cy="96" rx="6" ry="3" fill="#666"/>
      </svg>
    ),
    dictionary: (
      <svg viewBox="0 0 120 140" width={s} height={s*140/120} fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="60" cy="32" r="18" fill="#6D4ABA" opacity="0.08"/>
        <circle cx="60" cy="30" r="12" fill="#F5D0C5"/>
        <circle cx="56" cy="28" r="1.5" fill="#333"/><circle cx="64" cy="28" r="1.5" fill="#333"/>
        <circle cx="56" cy="28" r="5" stroke="#6D4ABA" strokeWidth="1.2" fill="none" opacity="0.6"/><circle cx="64" cy="28" r="5" stroke="#6D4ABA" strokeWidth="1.2" fill="none" opacity="0.6"/>
        <line x1="61" y1="27" x2="59" y2="27" stroke="#6D4ABA" strokeWidth="1" opacity="0.6"/>
        <path d="M57 34 Q60 35 63 34" stroke="#B08080" strokeWidth="1" fill="none"/>
        <path d="M48 25c0-7 5-13 12-13s12 6 12 13" fill="#2A1A0A"/>
        <rect x="50" y="44" width="20" height="28" rx="6" fill="#6D4ABA" opacity="0.8"/>
        <line x1="50" y1="52" x2="34" y2="56" stroke="#F5D0C5" strokeWidth="5" strokeLinecap="round"/><line x1="70" y1="52" x2="78" y2="56" stroke="#F5D0C5" strokeWidth="5" strokeLinecap="round"/>
        <rect x="26" y="48" width="14" height="18" rx="2" fill="white" stroke="#6D4ABA" strokeWidth="1.2"/>
        <line x1="29" y1="53" x2="37" y2="53" stroke="#6D4ABA" strokeWidth="0.8" opacity="0.4"/><line x1="29" y1="56" x2="37" y2="56" stroke="#6D4ABA" strokeWidth="0.8" opacity="0.4"/><line x1="29" y1="59" x2="35" y2="59" stroke="#6D4ABA" strokeWidth="0.8" opacity="0.4"/>
        <rect x="52" y="72" width="7" height="22" rx="3" fill="#444"/><rect x="61" y="72" width="7" height="22" rx="3" fill="#444"/>
        <ellipse cx="55" cy="96" rx="6" ry="3" fill="#666"/><ellipse cx="65" cy="96" rx="6" ry="3" fill="#666"/>
      </svg>
    ),
    radio: (
      <svg viewBox="0 0 120 140" width={s} height={s*140/120} fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="60" cy="32" r="18" fill="#178F5E" opacity="0.08"/>
        <circle cx="60" cy="30" r="12" fill="#F5D0C5"/>
        <circle cx="56" cy="28" r="1.5" fill="#333"/><circle cx="64" cy="28" r="1.5" fill="#333"/>
        <ellipse cx="60" cy="34" rx="3" ry="2" fill="#E8A090"/>
        <path d="M48 26c0-8 5-14 12-14s12 6 12 14" fill="#1A1A1A"/>
        <rect x="50" y="44" width="20" height="28" rx="6" fill="#178F5E" opacity="0.8"/>
        <line x1="50" y1="52" x2="36" y2="62" stroke="#F5D0C5" strokeWidth="5" strokeLinecap="round"/><line x1="70" y1="48" x2="74" y2="36" stroke="#F5D0C5" strokeWidth="5" strokeLinecap="round"/>
        <path d="M76 30 Q82 30 82 26" stroke="#178F5E" strokeWidth="1.5" fill="none" opacity="0.3"/><path d="M78 34 Q86 34 86 28" stroke="#178F5E" strokeWidth="1.5" fill="none" opacity="0.25"/><path d="M80 38 Q90 38 90 30" stroke="#178F5E" strokeWidth="1.5" fill="none" opacity="0.2"/>
        <rect x="52" y="72" width="7" height="22" rx="3" fill="#444"/><rect x="61" y="72" width="7" height="22" rx="3" fill="#444"/>
        <ellipse cx="55" cy="96" rx="6" ry="3" fill="#666"/><ellipse cx="65" cy="96" rx="6" ry="3" fill="#666"/>
      </svg>
    ),
    sound: (
      <svg viewBox="0 0 120 140" width={s} height={s*140/120} fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="60" cy="32" r="18" fill="#0E8A8A" opacity="0.08"/>
        <circle cx="60" cy="30" r="12" fill="#F5D0C5"/>
        <circle cx="56" cy="28" r="1.5" fill="#333"/><circle cx="64" cy="28" r="1.5" fill="#333"/>
        <path d="M57 33 Q60 35 63 33" stroke="#C08070" strokeWidth="1" fill="none"/>
        <path d="M48 26c0-8 5-14 12-14s12 6 12 14" fill="#6B3A2A"/>
        <path d="M44 28 Q44 14 60 14 Q76 14 76 28" stroke="#0E8A8A" strokeWidth="2.5" fill="none"/>
        <rect x="40" y="26" width="6" height="10" rx="3" fill="#0E8A8A"/><rect x="74" y="26" width="6" height="10" rx="3" fill="#0E8A8A"/>
        <rect x="50" y="44" width="20" height="28" rx="6" fill="#0E8A8A" opacity="0.8"/>
        <line x1="50" y1="50" x2="38" y2="64" stroke="#F5D0C5" strokeWidth="5" strokeLinecap="round"/><line x1="70" y1="50" x2="82" y2="64" stroke="#F5D0C5" strokeWidth="5" strokeLinecap="round"/>
        <g transform="translate(84,18)" opacity="0.35"><circle cx="0" cy="6" r="2" fill="#0E8A8A"/><line x1="2" y1="6" x2="2" y2="-2" stroke="#0E8A8A" strokeWidth="1"/><path d="M2-2 Q6-4 4 0" fill="#0E8A8A"/></g>
        <g transform="translate(92,10)" opacity="0.25"><circle cx="0" cy="6" r="2" fill="#0E8A8A"/><line x1="2" y1="6" x2="2" y2="-2" stroke="#0E8A8A" strokeWidth="1"/><path d="M2-2 Q6-4 4 0" fill="#0E8A8A"/></g>
        <rect x="52" y="72" width="7" height="22" rx="3" fill="#444"/><rect x="61" y="72" width="7" height="22" rx="3" fill="#444"/>
        <ellipse cx="55" cy="96" rx="6" ry="3" fill="#666"/><ellipse cx="65" cy="96" rx="6" ry="3" fill="#666"/>
      </svg>
    ),
  };
  return chars[type] || null;
};

const CategoryIcon = ({ type, size = 40 }) => {
  if (type === "visual") return (<svg viewBox="0 0 40 40" width={size} height={size} fill="none"><circle cx="20" cy="20" r="16" fill="#D94F3B" opacity="0.1"/><ellipse cx="20" cy="20" rx="11" ry="8" stroke="#D94F3B" strokeWidth="1.8" fill="none"/><circle cx="20" cy="20" r="3.5" fill="#D94F3B" opacity="0.6"/><circle cx="20" cy="20" r="1.5" fill="#D94F3B"/></svg>);
  if (type === "verbal") return (<svg viewBox="0 0 40 40" width={size} height={size} fill="none"><circle cx="20" cy="20" r="16" fill="#2968B0" opacity="0.1"/><rect x="12" y="10" width="16" height="20" rx="2" stroke="#2968B0" strokeWidth="1.8" fill="none"/><line x1="15" y1="15" x2="25" y2="15" stroke="#2968B0" strokeWidth="1.2" opacity="0.5"/><line x1="15" y1="19" x2="25" y2="19" stroke="#2968B0" strokeWidth="1.2" opacity="0.5"/><line x1="15" y1="23" x2="21" y2="23" stroke="#2968B0" strokeWidth="1.2" opacity="0.5"/></svg>);
  return (<svg viewBox="0 0 40 40" width={size} height={size} fill="none"><circle cx="20" cy="20" r="16" fill="#178F5E" opacity="0.1"/><path d="M13 16 Q13 10 20 10 Q27 10 27 16" stroke="#178F5E" strokeWidth="1.8" fill="none"/><rect x="11" y="15" width="4" height="7" rx="2" fill="#178F5E" opacity="0.5"/><rect x="25" y="15" width="4" height="7" rx="2" fill="#178F5E" opacity="0.5"/><path d="M15 28 Q15 32 20 32 Q25 32 25 28" stroke="#178F5E" strokeWidth="1.2" fill="none" opacity="0.4"/><line x1="20" y1="22" x2="20" y2="28" stroke="#178F5E" strokeWidth="1.2" opacity="0.4"/></svg>);
};

/* ═══ i18n DATA ═══ */
const I = {
  types: {
    camera: {
      ja: { label:"カメラタイプ", sub:"写真（カメラアイ）", category:"視覚優位", desc:"写真のように二次元で情報を切り取り、画像として記憶するタイプ。色彩やデザインへの感度が高く、一度見た光景を鮮明に思い出せます。", input:"図表・写真・イラスト・カラーコードなど視覚的な情報。テキストだけのメールより、スクリーンショット付きの方が頭に入る。", learning:"カラーマーカーやマインドマップで色分け整理。教科書の図を見て覚える、ノートに絵を描くなど「見える化」が効果的。", workstyle:"デザインレビュー、資料のビジュアル作成、UI/UXチェック、ビジュアルQAなど、見た目の精度が求められる作業に強い。" },
      en: { label:"Camera Type", sub:"Photographic (Camera Eye)", category:"Visual", desc:"You capture information as two-dimensional snapshots, like photographs. You're highly sensitive to colors and design, and can vividly recall scenes you've seen before.", input:"Charts, photos, illustrations, color-coded information. A screenshot attached to an email sticks better than plain text.", learning:"Use color-coded markers and mind maps. Study diagrams in textbooks, sketch ideas — making information visible is your key to retention.", workstyle:"Design review, visual asset creation, UI/UX checks, visual QA — any task that demands precision in appearance." },
    },
    "3d": {
      ja: { label:"3Dタイプ", sub:"三次元映像（3D）", category:"視覚優位", desc:"空間や時間軸を使って立体的に思考するタイプ。動画のように記憶し、人の顔や道順を覚えるのが得意です。", input:"動画・実演・ハンズオン体験。文字で読むより実際にやってみる、歩いてみるのが一番の近道。", learning:"動画教材や実験・フィールドワークが最適。頭の中で手順を映像として再生するシミュレーション学習も有効。", workstyle:"プロトタイピング、空間設計、プロジェクトの段取り組み、現場の状況判断など、立体的・時系列的な把握が活きる場面。" },
      en: { label:"3D Type", sub:"Three-Dimensional (3D)", category:"Visual", desc:"You think in three dimensions, using space and time. You remember things like a movie — faces, routes, and spatial layouts come naturally.", input:"Videos, demonstrations, hands-on experiences. Doing it yourself or walking through it beats reading about it every time.", learning:"Video tutorials, experiments, and fieldwork are ideal. Mental simulation — replaying steps as a movie in your head — also works well.", workstyle:"Prototyping, spatial design, project planning, on-site decision making — situations where 3D and timeline awareness matter." },
    },
    fantasy: {
      ja: { label:"ファンタジータイプ", sub:"言語映像（ファンタジー）", category:"言語優位", desc:"読んだり聞いたりした内容を映像化して思考するタイプ。文章から鮮明な情景を思い浮かべ、映像を言葉にするのも得意です。", input:"ストーリー仕立ての説明、事例紹介、ケーススタディ。抽象的な理論より具体的なエピソードの方が入りやすい。", learning:"物語形式で覚える、歴史を漫画で読む、エピソード記憶の活用。例え話や比喩を使った理解がぴったり。", workstyle:"企画書やストーリーの構成、ユーザーの利用シナリオ作成、プレゼンの語り方設計など、言語と映像をつなぐ作業。" },
      en: { label:"Fantasy Type", sub:"Verbal-Visual (Fantasy)", category:"Verbal", desc:"You convert words into vivid mental images. When you read a story, you can see the characters and scenery like a movie — and you can just as easily put images back into words.", input:"Story-based explanations, case studies, real examples. Concrete episodes stick better than abstract theories.", learning:"Learn through narratives, read history as manga/comics, leverage episodic memory. Metaphors and analogies are your best friends.", workstyle:"Writing proposals, crafting user scenarios, designing presentation narratives — bridging language and imagery." },
    },
    dictionary: {
      ja: { label:"辞書タイプ", sub:"言語抽象（辞書）", category:"言語優位", desc:"文字や文章をそのまま言葉で思考し、図式化・体系化して記憶するタイプ。ノートまとめの達人で、論理的な整理が得意です。", input:"構造化されたドキュメント、箇条書き、フローチャート。目次がある教科書や体系的なマニュアルが最も頭に入る。", learning:"ノートに自分の言葉でまとめ直す、概念をカテゴリ分けする、フローチャートや表にして整理する学習法。", workstyle:"議事録作成、要件定義、マニュアル整備、ナレッジ管理、論理的な分析・レポート作成など、構造化が求められる場面。" },
      en: { label:"Dictionary Type", sub:"Verbal-Abstract (Dictionary)", category:"Verbal", desc:"You think in words and systems. You naturally organize information into categories, flowcharts, and structured notes — a master of logical summarization.", input:"Structured documents, bullet-point lists, flowcharts. Textbooks with a clear table of contents and systematic manuals work best.", learning:"Rewrite notes in your own words, categorize concepts, create flowcharts and tables to organize your understanding.", workstyle:"Meeting minutes, requirements definition, documentation, knowledge management, analytical reports — wherever structure matters." },
    },
    radio: {
      ja: { label:"ラジオタイプ", sub:"聴覚言語（ラジオ）", category:"聴覚優位", desc:"文字や文章を「音」として耳から入れ情報処理するタイプ。人の話を正確に覚え、語呂合わせや音読での記憶が得意です。", input:"口頭説明、会議、ポッドキャスト、講義。テキストを読むより、誰かに説明してもらう方が理解が早い。", learning:"音読、講義の録音再生、語呂合わせ、ポッドキャストやオーディオブックの活用。声に出して繰り返すと定着する。", workstyle:"ファシリテーション、ヒアリング、電話対応、プレゼン、口頭での引き継ぎなど、聴く・話すが中心の業務。" },
      en: { label:"Radio Type", sub:"Auditory-Verbal (Radio)", category:"Auditory", desc:"You process information best when it comes through spoken words. You accurately remember what people say, and excel at mnemonics and reading aloud.", input:"Verbal explanations, meetings, podcasts, lectures. Having someone explain it to you is faster than reading about it.", learning:"Read aloud, replay recorded lectures, use mnemonics, listen to podcasts and audiobooks. Repetition through voice makes things stick.", workstyle:"Facilitation, interviews, phone work, presentations, verbal handoffs — any task centered on listening and speaking." },
    },
    sound: {
      ja: { label:"サウンドタイプ", sub:"聴覚＆音（サウンド）", category:"聴覚優位", desc:"音色や音階といった音楽的イメージを理解・処理できるタイプ。メロディを一度聞いて再現したり、声の微細な違いを聞き分けます。", input:"音声のトーン・リズム・抑揚。話の内容だけでなく「どう聞こえるか」で理解度が変わる。BGMのある環境が集中しやすいことも。", learning:"リズムに乗せて覚える、チャンツ（歌うように唱える）学習法、BGM付き環境での学習、発音・イントネーションの模倣。", workstyle:"音声コンテンツ制作、場の雰囲気の察知、声のトーンで相手の状態を読む対人業務、ナレーション・音響関連の作業。" },
      en: { label:"Sound Type", sub:"Auditory & Music (Sound)", category:"Auditory", desc:"You understand and process musical patterns — tone, pitch, rhythm. You can reproduce a melody after one listen and pick up subtle differences in voices.", input:"Tone, rhythm, and intonation matter as much as content. How something sounds changes how well you understand it. Background music may help you focus.", learning:"Learn with rhythm, use chants, study with background music, mimic pronunciation and intonation patterns.", workstyle:"Audio content creation, reading the mood of a room, understanding people through vocal tone, narration and sound work." },
    },
  },
  questions: [
    { ja:"一度見た風景や場面を、写真のように鮮明に思い出せる", en:"I can vividly recall scenes and landscapes as if looking at a photograph", type:"camera", themeJa:"記憶", themeEn:"Memory" },
    { ja:"人の服装や持ち物の色・デザインの違いによく気づく", en:"I often notice differences in colors and designs of people's clothing and belongings", type:"camera", themeJa:"知覚", themeEn:"Perception" },
    { ja:"文字よりも図やイラストがあった方が圧倒的に理解しやすい", en:"I understand things much better with diagrams or illustrations than with text alone", type:"camera", themeJa:"学習", themeEn:"Learning" },
    { ja:"部屋のインテリアや資料のレイアウトの乱れが気になる", en:"I notice when room decor or document layouts are slightly off", type:"camera", themeJa:"日常", themeEn:"Daily life" },
    { ja:"何かを思い出すとき、文字ではなく画像やイメージが最初に浮かぶ", en:"When recalling something, images come to mind before words", type:"camera", themeJa:"思考", themeEn:"Thinking" },
    { ja:"一度会った人の顔は忘れにくく、表情の変化にもよく気づく", en:"I rarely forget a face and easily notice changes in people's expressions", type:"3d", themeJa:"知覚", themeEn:"Perception" },
    { ja:"初めての場所でも方向感覚が働き、道に迷いにくい", en:"I have a good sense of direction and rarely get lost in new places", type:"3d", themeJa:"日常", themeEn:"Daily life" },
    { ja:"家具の配置や部屋のレイアウトを頭の中で立体的にシミュレーションできる", en:"I can mentally simulate furniture arrangements and room layouts in 3D", type:"3d", themeJa:"思考", themeEn:"Thinking" },
    { ja:"スポーツや体を動かす場面で、動作のイメージを映像として捉えられる", en:"In sports or physical activities, I can visualize movements as mental video", type:"3d", themeJa:"身体", themeEn:"Physical" },
    { ja:"物事を説明するとき、時間の流れに沿って順を追って話すのが自然にできる", en:"When explaining things, I naturally present them in chronological order", type:"3d", themeJa:"表現", themeEn:"Expression" },
    { ja:"小説を読むと、登場人物や風景が頭の中に映画のように浮かぶ", en:"When reading novels, characters and scenery play like a movie in my mind", type:"fantasy", themeJa:"学習", themeEn:"Learning" },
    { ja:"人の話を聞くとき、内容を映像として頭の中で再現している", en:"When listening to someone, I replay what they describe as mental images", type:"fantasy", themeJa:"知覚", themeEn:"Perception" },
    { ja:"体験や感情を、比喩やたとえ話を使って表現するのが得意", en:"I'm good at expressing experiences and emotions through metaphors and analogies", type:"fantasy", themeJa:"表現", themeEn:"Expression" },
    { ja:"「あの時こうだったら…」という空想のストーリーをよく思い浮かべる", en:"I often imagine 'what if' scenarios and alternative storylines", type:"fantasy", themeJa:"思考", themeEn:"Thinking" },
    { ja:"歌詞の意味や物語の背景に感情移入しやすい", en:"I easily get emotionally invested in song lyrics and story backgrounds", type:"fantasy", themeJa:"日常", themeEn:"Daily life" },
    { ja:"メモやノートをきれいに整理してまとめるのが好きで得意", en:"I enjoy and excel at organizing notes and memos neatly", type:"dictionary", themeJa:"学習", themeEn:"Learning" },
    { ja:"初めて聞く話でも、頭の中で自動的にカテゴリ分けや構造化をしている", en:"Even with new information, my mind automatically categorizes and structures it", type:"dictionary", themeJa:"思考", themeEn:"Thinking" },
    { ja:"曖昧な表現より、正確で具体的な言葉遣いを好む", en:"I prefer precise and specific language over vague expressions", type:"dictionary", themeJa:"表現", themeEn:"Expression" },
    { ja:"何かを覚えるとき、図式化やリスト化すると定着しやすい", en:"Information sticks better when I organize it into diagrams or lists", type:"dictionary", themeJa:"記憶", themeEn:"Memory" },
    { ja:"議論では論点を整理し、矛盾や論理の飛躍に気づきやすい", en:"In discussions, I quickly spot logical gaps and organize the key points", type:"dictionary", themeJa:"知覚", themeEn:"Perception" },
    { ja:"講義やポッドキャストなど、耳から聴く情報の方が頭に入りやすい", en:"I absorb information better through lectures and podcasts than reading", type:"radio", themeJa:"学習", themeEn:"Learning" },
    { ja:"人から聞いた話を、ほぼそのまま正確に別の人に伝えられる", en:"I can accurately relay what someone told me to another person, almost word for word", type:"radio", themeJa:"表現", themeEn:"Expression" },
    { ja:"語呂合わせや声に出して読むことで記憶が定着しやすい", en:"Mnemonics and reading aloud help me remember things much better", type:"radio", themeJa:"記憶", themeEn:"Memory" },
    { ja:"電話やボイスメッセージの方が、テキストよりコミュニケーションしやすい", en:"I find phone calls and voice messages easier than texting", type:"radio", themeJa:"日常", themeEn:"Daily life" },
    { ja:"会議中、メモを取るより聞くことに集中した方が内容を覚えている", en:"In meetings, I remember more by listening closely than by taking notes", type:"radio", themeJa:"思考", themeEn:"Thinking" },
    { ja:"一度聞いたメロディを口ずさんだり、楽器で再現したりできる", en:"I can hum or play back a melody after hearing it just once", type:"sound", themeJa:"記憶", themeEn:"Memory" },
    { ja:"CMや映画では、映像より先に音楽やBGMが印象に残る", en:"In commercials and movies, the music and BGM stick with me more than the visuals", type:"sound", themeJa:"知覚", themeEn:"Perception" },
    { ja:"人の声のトーンや抑揚の変化で、感情や本音を感じ取れる", en:"I can sense people's true feelings through changes in their vocal tone and inflection", type:"sound", themeJa:"日常", themeEn:"Daily life" },
    { ja:"周囲の環境音（風、雨、電車など）に敏感で、よく気づく方だ", en:"I'm sensitive to ambient sounds — wind, rain, trains — and notice them often", type:"sound", themeJa:"身体", themeEn:"Physical" },
    { ja:"頭の中で常に何かしらの音楽が流れていることが多い", en:"There's almost always some music playing in my head", type:"sound", themeJa:"思考", themeEn:"Thinking" },
  ],
  ui: {
    ja: { siteTitle:"認知特性診断", navHome:"ホーム", navAbout:"認知特性とは", navTypes:"タイプ一覧", navResult:"診断結果", heroSub:"COGNITIVE STYLE ASSESSMENT", heroTitle1:"あなたの認知特性を", heroTitle2:"知ろう", heroDesc:"30の質問に答えるだけで、情報の受け取り方・処理の仕方が6タイプの割合で分かります。自分の「脳のクセ」を知って、学び方・働き方を最適化しましょう。", startBtn:"診断をはじめる", duration:"所要時間 約5分 ・ 全30問 ・ 無料", catVisual:"視覚優位", catVisualSub:"見て覚える", catVerbal:"言語優位", catVerbalSub:"読んで覚える", catAuditory:"聴覚優位", catAuditorySub:"聞いて覚える",
      likert5:"とてもそう思う", likert4:"ややそう思う", likert3:"どちらとも言えない", likert2:"あまりそう思わない", likert1:"全くそう思わない", prevQ:"← 前の質問",
      resultYourTop:"あなたの最も強い認知特性", resultTied:"%d つのタイプが同率で最も強い認知特性です", scoreTitle:"タイプ別スコア", maxNote:"各タイプ最大25点", catTitle:"カテゴリ別", detailTitle:"詳細", inputLabel:"得意なインプット：", learningLabel:"おすすめ学習法：", workLabel:"得意な業務スタイル：", levelStrong:"非常に強い", levelMod:"やや強い", levelAvg:"標準", levelLow:"弱め",
      adviceTitle:"あなたへのアドバイス", adviceSingle1:"あなたは", adviceSingle2:"の傾向が最も強いですが、認知特性は一つだけに決まるものではありません。", adviceSingle3:"2番目の", adviceSingle4:"も活用し、自分に合ったインプット・アウトプットの方法を見つけましょう。", adviceTied1:"が同じ強さで出ています。複数の認知チャンネルをバランスよく使えるタイプです。場面に応じて得意な処理方法を使い分けることで、さらに力を発揮できるでしょう。", disclaimer:"※本田真美先生の認知特性理論を参考にしたオリジナル版です。正式な診断は「本田40式認知特性テスト」をお試しください。",
      restartBtn:"もう一度診断する", typesBtn:"タイプ一覧",
      typesPageTitle:"6つの認知特性タイプ", typesPageDesc:"人は情報を処理する方法に個性があり、大きく「視覚」「言語」「聴覚」の3カテゴリ、さらに各2タイプに分かれます。", tryBtn:"診断してみる",
      aboutTitle:"認知特性とは", aboutSub:"Cognitive Style / Cognitive Characteristics", aboutP1:"認知特性とは、目や耳などの感覚器から入ってきた情報を、頭の中で", aboutP1b:"理解・整理・記憶・表現する方法", aboutP1c:"のことです。人によってその処理の仕方には個性があり、同じ情報に触れても、理解の仕方や覚え方が異なります。", aboutP2:"たとえば、好きな曲について話すとき「歌詞が好き」という人もいれば「メロディが好き」という人もいます。教科書を読んで覚える人もいれば、講義を聴いて覚える人もいます。この違いこそが、認知特性の違いです。", about3title:"3つのカテゴリと6つのタイプ", about3desc:"認知特性は大きく「視覚優位」「言語優位」「聴覚優位」の3カテゴリに分けられ、さらにそれぞれが2つのタイプに分かれます。",
      aboutBenTitle:"知ることのメリット", aboutBen1a:"自分の認知特性を知ると、", aboutBen1b:"自分に合った学び方・働き方", aboutBen1c:"を選べるようになります。たとえば視覚優位の人が音声教材だけで勉強しても効率が上がりにくいように、自分の特性に合わない方法を続けていると、本来の力を発揮しづらくなります。", aboutBen2a:"また、周囲の人との認知特性の違いを理解することで、", aboutBen2b:"コミュニケーションの改善", aboutBen2c:"にもつながります。「なぜこの人は口頭で伝えた方が理解してくれるのか」「なぜ資料を見せた方が話が早いのか」——その理由が認知特性の違いにあるかもしれません。", aboutBen3a:"認知特性は優劣ではなく、あくまで", aboutBen3b:"情報処理の好みや傾向", aboutBen3c:"です。また、環境や経験によって変化する可能性もあるとされています。",
      aboutThisTitle:"この診断について", aboutThisP:"この診断は、小児科医・医学博士の本田真美先生が提唱した認知特性理論をベースに、オリジナルの質問を30問用意したものです。各質問に5段階で回答することで、6タイプそれぞれの傾向を割合で確認できます。", aboutThisNote:"※より正確な診断を受けたい方は、本田先生の「本田40式認知特性テスト」をお試しください。",
      catVisualDesc:"目で見た情報を処理するのが得意", catVerbalDesc:"読んだ情報を処理するのが得意", catAuditoryDesc:"耳で聞いた情報を処理するのが得意",
    },
    en: { siteTitle:"Cognitive Style", navHome:"Home", navAbout:"What is this?", navTypes:"6 Types", navResult:"Results", heroSub:"COGNITIVE STYLE ASSESSMENT", heroTitle1:"Discover Your", heroTitle2:"Cognitive Style", heroDesc:"Answer 30 questions to find out how you naturally receive and process information, broken down across 6 cognitive types. Understand your brain's preferences and optimize the way you learn and work.", startBtn:"Start Assessment", duration:"About 5 min · 30 questions · Free", catVisual:"Visual", catVisualSub:"Learn by seeing", catVerbal:"Verbal", catVerbalSub:"Learn by reading", catAuditory:"Auditory", catAuditorySub:"Learn by listening",
      likert5:"Strongly agree", likert4:"Somewhat agree", likert3:"Neutral", likert2:"Somewhat disagree", likert1:"Strongly disagree", prevQ:"← Previous",
      resultYourTop:"Your strongest cognitive style", resultTied:"%d types are tied as your strongest cognitive style", scoreTitle:"Score by Type", maxNote:"Max 25 points per type", catTitle:"By Category", detailTitle:"Details", inputLabel:"Best Input Style: ", learningLabel:"Recommended Learning: ", workLabel:"Work Style Strength: ", levelStrong:"Very strong", levelMod:"Moderately strong", levelAvg:"Average", levelLow:"Weak",
      adviceTitle:"Personalized Advice", adviceSingle1:"Your strongest type is ", adviceSingle2:", but cognitive style isn't limited to just one type.", adviceSingle3:"Try leveraging your second-strongest type, ", adviceSingle4:", to find the input and output methods that work best for you.", adviceTied1:" are equally strong for you. You're a balanced multi-channel processor. By consciously switching between modes depending on the situation, you can unlock even more potential.", disclaimer:"This assessment is an original tool inspired by Dr. Mami Honda's cognitive trait theory. For a formal assessment, try the 'Honda 40-Style Cognitive Traits Test'.",
      restartBtn:"Retake Assessment", typesBtn:"View All Types",
      typesPageTitle:"The 6 Cognitive Types", typesPageDesc:"Everyone has their own way of processing information. There are 3 major categories — Visual, Verbal, and Auditory — each split into 2 distinct types.", tryBtn:"Take the Assessment",
      aboutTitle:"What Are Cognitive Styles?", aboutSub:"Cognitive Style / Cognitive Characteristics", aboutP1:"Cognitive style refers to how your brain ", aboutP1b:"understands, organizes, remembers, and expresses", aboutP1c:" information received through your senses. Everyone processes information differently — the same input can lead to very different understanding and recall.", aboutP2:"For example, when talking about a favorite song, some people focus on the lyrics while others focus on the melody. Some learn best by reading a textbook, others by listening to a lecture. These differences are cognitive styles.", about3title:"3 Categories, 6 Types", about3desc:"Cognitive styles fall into three broad categories — Visual, Verbal, and Auditory — each with two subtypes.",
      aboutBenTitle:"Why It Matters", aboutBen1a:"Knowing your cognitive style helps you ", aboutBen1b:"choose learning and working methods that actually fit you", aboutBen1c:". For instance, a visually-oriented person studying only through audio lectures may struggle — not because of ability, but because of a mismatch.", aboutBen2a:"Understanding these differences in others can also ", aboutBen2b:"improve communication", aboutBen2c:". Why does one colleague prefer verbal briefings while another wants a written document? The answer may lie in cognitive style.", aboutBen3a:"Cognitive styles are not about being better or worse — they're simply ", aboutBen3b:"preferences and tendencies in how you process information", aboutBen3c:". They may also shift with experience and environment.",
      aboutThisTitle:"About This Assessment", aboutThisP:"This assessment is based on the cognitive trait theory proposed by Dr. Mami Honda (pediatrician and medical doctor). It features 30 original questions rated on a 5-point scale, giving you a proportional breakdown across all 6 types.", aboutThisNote:"For a more precise assessment, try Dr. Honda's official 'Honda 40-Style Cognitive Traits Test'.",
      catVisualDesc:"Processes visual information best", catVerbalDesc:"Processes written information best", catAuditoryDesc:"Processes auditory information best",
    },
  },
};

const TYPE_META = [
  { id:"camera", color:"#D94F3B", bg:"#FEF2F0" },
  { id:"3d", color:"#C87620", bg:"#FFF8EE" },
  { id:"fantasy", color:"#2968B0", bg:"#EFF6FF" },
  { id:"dictionary", color:"#6D4ABA", bg:"#F5F0FF" },
  { id:"radio", color:"#178F5E", bg:"#EEFBF4" },
  { id:"sound", color:"#0E8A8A", bg:"#EEFCFC" },
];

const QUESTION_ORDER = (() => {
  const themes = ["Memory","Perception","Learning","Daily life","Thinking","Expression","Physical"];
  const byTheme = {};
  I.questions.forEach((q,i) => { const th=q.themeEn; if(!byTheme[th]) byTheme[th]=[]; byTheme[th].push(i); });
  const order = [];
  const maxLen = Math.max(...Object.values(byTheme).map(a=>a.length));
  for(let r=0;r<maxLen;r++) for(const th of themes) if(byTheme[th]?.[r]!==undefined) order.push(byTheme[th][r]);
  return order;
})();

/* ═══ HELPERS ═══ */
const getTypeData = (id, lang) => ({ ...TYPE_META.find(m=>m.id===id), ...I.types[id][lang] });
const getLikert = (lang) => {
  const u = I.ui[lang];
  return [{ value:5, label:u.likert5 },{ value:4, label:u.likert4 },{ value:3, label:u.likert3 },{ value:2, label:u.likert2 },{ value:1, label:u.likert1 }];
};

/* ═══ COMPONENTS ═══ */
function Dot({ color, size=10 }) { return <span style={{ display:"inline-block", width:size, height:size, borderRadius:"50%", background:color, flexShrink:0 }}/>; }

function AnimBar({ value, max, color, delay, label, pct }) {
  const [width,setWidth]=useState(0);const [show,setShow]=useState(false);
  useEffect(()=>{ const t1=setTimeout(()=>setShow(true),delay); const t2=setTimeout(()=>setWidth((value/max)*100),delay+80); return()=>{clearTimeout(t1);clearTimeout(t2)} },[value,max,delay]);
  return (<div style={{ opacity:show?1:0, transform:show?"translateY(0)":"translateY(10px)", transition:"opacity .5s,transform .5s", marginBottom:14 }}>
    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:4 }}><span style={{ fontSize:13, fontWeight:600, color:"var(--text)", display:"flex", alignItems:"center", gap:8 }}><Dot color={color}/> {label}</span><span style={{ fontSize:17, fontWeight:800, color, fontFeatureSettings:"'tnum'" }}>{pct}%</span></div>
    <div style={{ height:8, background:"rgba(0,0,0,0.05)", borderRadius:4, overflow:"hidden" }}><div style={{ height:"100%", width:`${width}%`, background:color, borderRadius:4, transition:"width 1s cubic-bezier(0.34,1.56,0.64,1)" }}/></div></div>);
}

/* ═══ PAGES ═══ */
function LangSelect({ onSelect }) {
  return (
    <div className="fadein" style={{ textAlign:"center", paddingTop:120, paddingBottom:60 }}>
      <p style={{ fontSize:13, fontWeight:600, color:"var(--muted)", letterSpacing:2, marginBottom:20 }}>COGNITIVE STYLE ASSESSMENT</p>
      <h1 style={{ fontSize:32, fontWeight:900, color:"var(--text)", lineHeight:1.3, marginBottom:32 }}>
        認知特性診断<br/><span style={{ fontSize:18, fontWeight:500, color:"var(--muted)" }}>Cognitive Style Assessment</span>
      </h1>
      <p style={{ fontSize:14, color:"var(--sub)", marginBottom:48 }}>Select your language / 言語を選択</p>
      <div style={{ display:"flex", gap:16, justifyContent:"center", flexWrap:"wrap" }}>
        <button className="primary-btn" onClick={()=>onSelect("ja")} style={{ minWidth:160 }}>日本語</button>
        <button className="primary-btn" onClick={()=>onSelect("en")} style={{ minWidth:160 }}>English</button>
      </div>
    </div>
  );
}

function HomePage({ onStart, lang }) {
  const u = I.ui[lang];
  return (
    <div className="fadein hero-top" style={{ paddingTop:72, paddingBottom:60 }}>
      <p style={{ fontSize:13, fontWeight:600, color:"var(--muted)", letterSpacing:2, marginBottom:20 }}>{u.heroSub}</p>
      <h1 className="hero-title" style={{ fontSize:36, fontWeight:900, color:"var(--text)", lineHeight:1.3, marginBottom:16 }}>
        {u.heroTitle1}<br className="sp-only"/>{u.heroTitle2}
      </h1>
      <p className="hero-sub" style={{ fontSize:15, color:"var(--sub)", lineHeight:1.9, marginBottom:40 }}>{u.heroDesc}</p>
      <button className="primary-btn" onClick={onStart}>{u.startBtn}<span style={{ marginLeft:8 }}>→</span></button>
      <p style={{ marginTop:14, fontSize:12, color:"var(--muted)" }}>{u.duration}</p>
      <div style={{ marginTop:56, display:"flex", gap:1, borderRadius:12, overflow:"hidden", border:"1px solid var(--border)" }}>
        {[{ label:u.catVisual, sub:u.catVisualSub, type:"visual" },{ label:u.catVerbal, sub:u.catVerbalSub, type:"verbal" },{ label:u.catAuditory, sub:u.catAuditorySub, type:"auditory" }].map((c,i)=>(
          <div key={c.type} className="cat-card" style={{ flex:1, padding:"20px 12px", textAlign:"center", background:"var(--surface)", borderRight:i<2?"1px solid var(--border)":"none" }}>
            <div style={{ display:"flex", justifyContent:"center", marginBottom:8 }}><CategoryIcon type={c.type} size={36}/></div>
            <div style={{ fontSize:13, fontWeight:700, color:"var(--text)" }}>{c.label}</div>
            <div style={{ fontSize:11, color:"var(--muted)", marginTop:2 }}>{c.sub}</div>
          </div>))}
      </div>
    </div>
  );
}

function QuizPage({ onFinish, lang }) {
  const u = I.ui[lang]; const likert = getLikert(lang);
  const [idx,setIdx]=useState(0); const [answers,setAnswers]=useState({}); const [fade,setFade]=useState("fadein");
  const totalQ=I.questions.length; const qIndex=QUESTION_ORDER[idx]; const q=I.questions[qIndex];
  const handleAnswer=(val)=>{ setFade("fadeout"); setTimeout(()=>{ const next={...answers,[qIndex]:val}; setAnswers(next); if(idx<totalQ-1)setIdx(i=>i+1); else onFinish(next); setFade("fadein") },200) };
  const goBack=()=>{ if(idx>0){setFade("fadeout");setTimeout(()=>{setIdx(i=>i-1);setFade("fadein")},200)} };
  return (
    <div style={{ paddingTop:32, paddingBottom:40 }}>
      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
        <span style={{ fontSize:13, fontWeight:700, color:"var(--text)" }}>Q{idx+1}<span style={{ color:"var(--muted)", fontWeight:400 }}> / {totalQ}</span></span>
        <span style={{ fontSize:13, color:"var(--muted)" }}>{Math.round((idx/totalQ)*100)}%</span>
      </div>
      <div style={{ height:3, background:"rgba(0,0,0,0.06)", borderRadius:2, marginBottom:32, overflow:"hidden" }}><div style={{ height:"100%", borderRadius:2, transition:"width .4s ease", width:`${(idx/totalQ)*100}%`, background:"var(--text)" }}/></div>
      <div className={fade} key={idx}>
        <span style={{ display:"inline-block", padding:"3px 10px", borderRadius:4, fontSize:11, fontWeight:500, background:"rgba(0,0,0,0.04)", color:"var(--muted)", marginBottom:12 }}>{lang==="en"?q.themeEn:q.themeJa}</span>
        <h2 className="quiz-question" style={{ fontSize:19, fontWeight:700, lineHeight:1.8, color:"var(--text)", marginBottom:28 }}>{lang==="en"?q.en:q.ja}</h2>
        <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
          {likert.map(opt=>(<button key={opt.value} className="likert-btn" onClick={()=>handleAnswer(opt.value)} style={answers[qIndex]===opt.value?{borderColor:"var(--text)",background:"rgba(0,0,0,0.02)"}:{}}><span className="likert-num">{opt.value}</span><span>{opt.label}</span></button>))}
        </div>
      </div>
      {idx>0&&<div style={{marginTop:20}}><button className="back-link" onClick={goBack}>{u.prevQ}</button></div>}
    </div>
  );
}

function ResultPage({ answers, onNav, lang }) {
  const u = I.ui[lang];
  const scores={}; TYPE_META.forEach(tm=>scores[tm.id]=0);
  Object.entries(answers).forEach(([qi,val])=>{scores[I.questions[parseInt(qi)].type]+=val});
  const maxP=25;
  const types = TYPE_META.map(tm=>({...tm,...I.types[tm.id][lang]}));
  const sorted=[...types].sort((a,b)=>(scores[b.id]||0)-(scores[a.id]||0));
  const topScore=scores[sorted[0].id]||0;
  const topTypes=sorted.filter(t=>(scores[t.id]||0)===topScore);
  const top=topTypes[0];
  const nextTypes=sorted.filter(t=>(scores[t.id]||0)<topScore);
  const [openId,setOpenId]=useState(null);
  const getLevel=s=>{ if(s>=21)return u.levelStrong; if(s>=16)return u.levelMod; if(s>=11)return u.levelAvg; return u.levelLow };
  const catData = lang==="en"
    ? [{label:"Visual",ids:["camera","3d"],color:"#D94F3B"},{label:"Verbal",ids:["fantasy","dictionary"],color:"#2968B0"},{label:"Auditory",ids:["radio","sound"],color:"#178F5E"}]
    : [{label:"視覚優位",ids:["camera","3d"],color:"#D94F3B"},{label:"言語優位",ids:["fantasy","dictionary"],color:"#2968B0"},{label:"聴覚優位",ids:["radio","sound"],color:"#178F5E"}];

  return (
    <div className="fadein" style={{ paddingTop:32, paddingBottom:40 }}>
      <div className="result-hero" style={{ padding:"36px 24px", borderRadius:16, background:topTypes.length===1?top.bg:"var(--surface)", border:`1px solid ${topTypes.length===1?top.color+"18":"var(--border)"}`, marginBottom:24, textAlign:"center" }}>
        <div style={{ display:"flex", justifyContent:"center", gap:topTypes.length>1?16:0, marginBottom:8 }}>{topTypes.map(tp=><CharacterSVG key={tp.id} type={tp.id} size={topTypes.length>2?72:topTypes.length>1?88:100}/>)}</div>
        <div style={{ display:"flex", justifyContent:"center", gap:8, flexWrap:"wrap", marginBottom:10 }}>{topTypes.map(tp=>(<span key={tp.id} style={{ display:"inline-block", padding:"4px 12px", borderRadius:4, fontSize:11, fontWeight:600, color:tp.color, background:`${tp.color}14` }}>{tp.category}</span>))}</div>
        <h2 className="result-top-label" style={{ fontSize:topTypes.length>2?22:26, fontWeight:900, color:topTypes.length===1?top.color:"var(--text)", marginBottom:4 }}>
          {topTypes.map((tp,i)=>(<span key={tp.id}>{i>0&&<span style={{ color:"var(--muted)", fontWeight:400 }}> · </span>}<span style={{ color:tp.color }}>{tp.label}</span></span>))}
        </h2>
        <p style={{ fontSize:14, color:"var(--sub)" }}>{topTypes.length===1?u.resultYourTop:u.resultTied.replace("%d",topTypes.length)}</p>
      </div>

      <div className="card"><h3 className="section-title">{u.scoreTitle}</h3>
        {sorted.map((tp,i)=><AnimBar key={tp.id} value={scores[tp.id]||0} max={maxP} color={tp.color} delay={i*100} label={tp.label} pct={Math.round(((scores[tp.id]||0)/maxP)*100)}/>)}
        <p style={{ fontSize:11, color:"var(--muted)", textAlign:"center", marginTop:4 }}>{u.maxNote}</p></div>

      <div className="card"><h3 className="section-title">{u.catTitle}</h3>
        {catData.map((cat,i)=>{const cs=cat.ids.reduce((s,id)=>s+(scores[id]||0),0); return <AnimBar key={cat.label} value={cs} max={50} color={cat.color} delay={700+i*120} label={cat.label} pct={Math.round((cs/50)*100)}/>;})}</div>

      <div className="card" style={{ padding:"12px 0" }}>
        <h3 className="section-title" style={{ padding:"0 24px", marginBottom:8 }}>{u.detailTitle}</h3>
        {sorted.map(tp=>{const s=scores[tp.id]||0; const open=openId===tp.id; return (
          <div key={tp.id} style={{ borderBottom:"1px solid var(--border)" }}>
            <button onClick={()=>setOpenId(open?null:tp.id)} className="accordion-row"><Dot color={tp.color}/><div style={{ flex:1,textAlign:"left" }}><div style={{ fontSize:14,fontWeight:700,color:"var(--text)" }}>{tp.label}</div><div style={{ fontSize:11,color:"var(--muted)" }}>{tp.sub}</div></div><div style={{ textAlign:"right",marginRight:4 }}><div style={{ fontSize:16,fontWeight:800,color:tp.color }}>{s}<span style={{ fontSize:11,fontWeight:400,color:"var(--muted)" }}> / 25</span></div><div style={{ fontSize:10,color:"var(--muted)" }}>{getLevel(s)}</div></div><svg width="12" height="12" viewBox="0 0 12 12" style={{ transition:"transform .3s",transform:open?"rotate(180deg)":"rotate(0)",flexShrink:0 }}><path d="M2 4.5L6 8.5L10 4.5" stroke="#999" strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg></button>
            <div style={{ overflow:"hidden",transition:"max-height .35s ease,opacity .25s,padding .25s",maxHeight:open?600:0,opacity:open?1:0,padding:open?"8px 24px 20px":"0 24px" }}>
              <div style={{ display:"flex",justifyContent:"center",marginBottom:12 }}><CharacterSVG type={tp.id} size={80}/></div>
              <p style={{ fontSize:13,color:"var(--sub)",lineHeight:1.8,marginBottom:12 }}>{tp.desc}</p>
              <div style={{ fontSize:12,color:"var(--muted)",lineHeight:1.8 }}>
                <p style={{ marginBottom:4 }}><span style={{ color:"var(--sub)",fontWeight:600 }}>{u.inputLabel}</span>{tp.input}</p>
                <p style={{ marginBottom:4 }}><span style={{ color:"var(--sub)",fontWeight:600 }}>{u.learningLabel}</span>{tp.learning}</p>
                <p><span style={{ color:"var(--sub)",fontWeight:600 }}>{u.workLabel}</span>{tp.workstyle}</p></div></div></div>);})}
      </div>

      <div className="card" style={{ background:topTypes.length===1?top.bg:"var(--surface)", borderColor:topTypes.length===1?`${top.color}18`:"var(--border)" }}>
        <p style={{ fontSize:14, fontWeight:700, color:topTypes.length===1?top.color:"var(--text)", marginBottom:8 }}>{u.adviceTitle}</p>
        <p style={{ fontSize:13, color:"var(--sub)", lineHeight:1.8, marginBottom:8 }}>
          {topTypes.length===1?(<>{u.adviceSingle1}<strong style={{ color:top.color }}>{top.label}</strong>{u.adviceSingle2}{nextTypes[0]&&<>{u.adviceSingle3}<strong style={{ color:nextTypes[0].color }}>{nextTypes[0].label}</strong>{u.adviceSingle4}</>}</>)
          :(<>{topTypes.map((tp,i)=>(<span key={tp.id}>{i>0&&" · "}<strong style={{ color:tp.color }}>{tp.label}</strong></span>))}{u.adviceTied1}</>)}
        </p>
        <p style={{ fontSize:11, color:"var(--muted)", lineHeight:1.7 }}>{u.disclaimer}</p>
      </div>
      <div style={{ display:"flex", gap:12, justifyContent:"center", marginTop:12, flexWrap:"wrap" }}>
        <button className="primary-btn" onClick={()=>onNav("home")}>{u.restartBtn}</button>
        <button className="secondary-btn" onClick={()=>onNav("types")}>{u.typesBtn}</button></div>
    </div>
  );
}

function TypesPage({ onNav, lang }) {
  const u = I.ui[lang];
  const cats = lang==="en"
    ? [{cat:"Visual",color:"#D94F3B",ids:["camera","3d"]},{cat:"Verbal",color:"#2968B0",ids:["fantasy","dictionary"]},{cat:"Auditory",color:"#178F5E",ids:["radio","sound"]}]
    : [{cat:"視覚優位",color:"#D94F3B",ids:["camera","3d"]},{cat:"言語優位",color:"#2968B0",ids:["fantasy","dictionary"]},{cat:"聴覚優位",color:"#178F5E",ids:["radio","sound"]}];
  return (
    <div className="fadein" style={{ paddingTop:32, paddingBottom:40 }}>
      <h2 style={{ fontSize:24, fontWeight:900, color:"var(--text)", marginBottom:4 }}>{u.typesPageTitle}</h2>
      <p style={{ fontSize:14, color:"var(--sub)", lineHeight:1.8, marginBottom:36 }}>{u.typesPageDesc}</p>
      {cats.map(c=>(<div key={c.cat} style={{ marginBottom:36 }}>
        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:14 }}><Dot color={c.color} size={8}/><h3 style={{ fontSize:13, fontWeight:700, color:"var(--muted)", letterSpacing:1 }}>{c.cat}</h3></div>
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>{c.ids.map(id=>{const tp=getTypeData(id,lang); const m=TYPE_META.find(x=>x.id===id); return (
          <div key={id} className="card" style={{ background:m.bg, borderColor:`${m.color}12` }}>
            <div style={{ display:"flex", gap:16, alignItems:"flex-start", marginBottom:12 }}><CharacterSVG type={id} size={72}/><div style={{ flex:1 }}><div style={{ fontSize:16, fontWeight:800, color:m.color }}>{tp.label}</div><div style={{ fontSize:12, color:"var(--muted)", marginBottom:6 }}>{tp.sub}</div><p style={{ fontSize:13, color:"var(--sub)", lineHeight:1.7 }}>{tp.desc}</p></div></div>
            <div style={{ fontSize:12, color:"var(--muted)", lineHeight:1.8, borderTop:`1px solid ${m.color}10`, paddingTop:12 }}>
              <p style={{ marginBottom:4 }}><span style={{ color:"var(--sub)", fontWeight:600 }}>{u.inputLabel}</span>{tp.input}</p>
              <p style={{ marginBottom:4 }}><span style={{ color:"var(--sub)", fontWeight:600 }}>{u.learningLabel}</span>{tp.learning}</p>
              <p><span style={{ color:"var(--sub)", fontWeight:600 }}>{u.workLabel}</span>{tp.workstyle}</p></div></div>);})}</div></div>))}
      <div style={{ textAlign:"center", marginTop:8 }}><button className="primary-btn" onClick={()=>onNav("home")}>{u.tryBtn}</button></div></div>
  );
}

function AboutPage({ onNav, lang }) {
  const u = I.ui[lang];
  const cats = lang==="en"
    ? [{cat:"Visual",color:"#D94F3B",desc:u.catVisualDesc,types:["Camera Type — Captures information as 2D snapshots","3D Type — Thinks spatially and temporally in 3D"]},{cat:"Verbal",color:"#2968B0",desc:u.catVerbalDesc,types:["Fantasy Type — Converts words into vivid mental images","Dictionary Type — Organizes information into structures and systems"]},{cat:"Auditory",color:"#178F5E",desc:u.catAuditoryDesc,types:["Radio Type — Processes spoken words as audio","Sound Type — Understands through musical tone and rhythm"]}]
    : [{cat:"視覚優位",color:"#D94F3B",desc:u.catVisualDesc,types:["カメラタイプ — 写真のように二次元で記憶","3Dタイプ — 空間や時間軸で立体的に思考"]},{cat:"言語優位",color:"#2968B0",desc:u.catVerbalDesc,types:["ファンタジータイプ — 言葉を映像化して思考","辞書タイプ — 文字を図式化・体系化して記憶"]},{cat:"聴覚優位",color:"#178F5E",desc:u.catAuditoryDesc,types:["ラジオタイプ — 言葉を音として処理","サウンドタイプ — 音色やメロディで理解"]}];
  return (
    <div className="fadein" style={{ paddingTop:32, paddingBottom:40 }}>
      <h2 style={{ fontSize:24, fontWeight:900, color:"var(--text)", marginBottom:4 }}>{u.aboutTitle}</h2>
      <p style={{ fontSize:13, color:"var(--muted)", marginBottom:24 }}>{u.aboutSub}</p>
      <div className="card"><p className="about-body" style={{ fontSize:14, color:"var(--sub)", lineHeight:2, marginBottom:16 }}>{u.aboutP1}<strong style={{ color:"var(--text)" }}>{u.aboutP1b}</strong>{u.aboutP1c}</p><p className="about-body" style={{ fontSize:14, color:"var(--sub)", lineHeight:2 }}>{u.aboutP2}</p></div>
      <div className="card"><h3 style={{ fontSize:15, fontWeight:700, color:"var(--text)", marginBottom:12 }}>{u.about3title}</h3><p style={{ fontSize:13, color:"var(--sub)", lineHeight:1.9, marginBottom:16 }}>{u.about3desc}</p>
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>{cats.map(c=>(<div key={c.cat} style={{ padding:"16px 18px", borderRadius:10, background:`${c.color}08`, border:`1px solid ${c.color}12` }}><div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}><Dot color={c.color} size={8}/><span style={{ fontSize:14, fontWeight:700, color:c.color }}>{c.cat}</span><span style={{ fontSize:12, color:"var(--muted)" }}>— {c.desc}</span></div>{c.types.map((tp,i)=>(<p key={i} style={{ fontSize:12, color:"var(--sub)", lineHeight:1.8, paddingLeft:16 }}>{tp}</p>))}</div>))}</div></div>
      <div className="card"><h3 style={{ fontSize:15, fontWeight:700, color:"var(--text)", marginBottom:12 }}>{u.aboutBenTitle}</h3><div style={{ fontSize:13, color:"var(--sub)", lineHeight:2 }}>
        <p style={{ marginBottom:12 }}>{u.aboutBen1a}<strong style={{ color:"var(--text)" }}>{u.aboutBen1b}</strong>{u.aboutBen1c}</p>
        <p style={{ marginBottom:12 }}>{u.aboutBen2a}<strong style={{ color:"var(--text)" }}>{u.aboutBen2b}</strong>{u.aboutBen2c}</p>
        <p>{u.aboutBen3a}<strong style={{ color:"var(--text)" }}>{u.aboutBen3b}</strong>{u.aboutBen3c}</p></div></div>
      <div className="card"><h3 style={{ fontSize:15, fontWeight:700, color:"var(--text)", marginBottom:12 }}>{u.aboutThisTitle}</h3><p style={{ fontSize:13, color:"var(--sub)", lineHeight:2, marginBottom:8 }}>{u.aboutThisP}</p><p style={{ fontSize:12, color:"var(--muted)", lineHeight:1.8 }}>{u.aboutThisNote}</p></div>
      <div style={{ display:"flex", gap:12, justifyContent:"center", marginTop:8, flexWrap:"wrap" }}><button className="primary-btn" onClick={()=>onNav("home")}>{u.tryBtn}</button><button className="secondary-btn" onClick={()=>onNav("types")}>{u.typesBtn}</button></div>
    </div>
  );
}

/* ═══ APP ═══ */
export default function App() {
  const [lang,setLang]=useState(null); // null = lang select screen
  const [page,setPage]=useState("home");
  const [resultAnswers,setResultAnswers]=useState(null);
  const [menuOpen,setMenuOpen]=useState(false);
  const navigate=(p)=>{setPage(p);setMenuOpen(false)};
  const startQuiz=()=>navigate("quiz");
  const finishQuiz=(ans)=>{setResultAnswers(ans);setPage("result")};
  const switchLang=()=>{setLang(null);setPage("home");setResultAnswers(null);setMenuOpen(false)};

  const u = lang ? I.ui[lang] : null;

  return (
    <div style={{ minHeight:"100vh", background:"var(--bg)" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+New:wght@400;500;700;900&display=swap');
        :root{--bg:#FAFAF7;--surface:#FFF;--text:#1A1A1A;--sub:#4A4A4A;--muted:#999;--border:#E8E8E4}
        *{box-sizing:border-box;margin:0;padding:0}
        body{background:var(--bg)!important}
        .fadein{animation:fi .35s ease forwards}.fadeout{animation:fo .18s ease forwards}
        @keyframes fi{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fo{from{opacity:1}to{opacity:0;transform:translateY(-6px)}}
        .nav-bar{display:flex;align-items:center;justify-content:space-between;padding:14px 0;border-bottom:1px solid var(--border);margin-bottom:4px;position:relative}
        .nav-logo{font-size:15px;font-weight:900;color:var(--text);cursor:pointer;letter-spacing:-0.3px}
        .nav-links{display:none;flex-direction:column;position:absolute;top:100%;left:0;right:0;background:var(--surface);border:1px solid var(--border);border-radius:0 0 12px 12px;padding:8px 0;z-index:100;box-shadow:0 8px 24px rgba(0,0,0,0.08)}
        .nav-links.open{display:flex}
        .nav-link{font-size:14px;font-weight:500;color:var(--muted);cursor:pointer;background:none;border:none;font-family:inherit;padding:12px 20px;transition:all .15s;border-bottom:none;text-align:left;width:100%}
        .nav-link:hover{color:var(--text);background:rgba(0,0,0,0.02)}
        .nav-link.active{color:var(--text);background:rgba(0,0,0,0.03)}
        .nav-link.lang-switch{color:var(--muted);font-size:12px;border-top:1px solid var(--border);margin-top:4px;padding-top:12px}
        .hamburger{display:flex;flex-direction:column;gap:4px;background:none;border:none;cursor:pointer;padding:6px}
        .hamburger span{display:block;width:20px;height:2px;background:var(--text);border-radius:1px;transition:all .2s}
        .hamburger.open span:nth-child(1){transform:rotate(45deg) translate(3px,4px)}.hamburger.open span:nth-child(2){opacity:0}.hamburger.open span:nth-child(3){transform:rotate(-45deg) translate(3px,-4px)}
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
        .sp-only{display:inline}
        .container{max-width:520px;margin:0 auto;padding:0 20px}
        @media(min-width:768px){
          .sp-only{display:none}
          .hamburger{display:none}
          .nav-links{display:flex!important;flex-direction:row;position:static;background:none;border:none;padding:0;box-shadow:none;gap:24px}
          .nav-link{padding:4px 0;font-size:14px;text-align:center;width:auto;border-bottom:1.5px solid transparent}
          .nav-link:hover{background:none;color:var(--text)}
          .nav-link.active{background:none;color:var(--text);border-bottom-color:var(--text)}
          .nav-link.lang-switch{border-top:none;margin-top:0;padding-top:4px;margin-left:8px;padding-left:12px;border-left:1px solid var(--border)}
          .container{max-width:680px;padding:0 32px}
          .nav-bar{padding:18px 0}.nav-logo{font-size:17px}
          .card{padding:32px;border-radius:16px;margin-bottom:18px}
          .likert-btn{padding:14px 20px;font-size:15px;border-radius:12px}.likert-num{width:32px;height:32px;font-size:13px}
          .primary-btn{padding:15px 40px;font-size:15px}.secondary-btn{padding:14px 32px;font-size:14px}
          .section-title{font-size:13px}.accordion-row{padding:16px 32px}
          .hero-title{font-size:42px!important}.hero-sub{font-size:16px!important;max-width:100%!important}
          .hero-top{padding-top:96px!important;padding-bottom:72px!important}.quiz-question{font-size:21px!important}
          .cat-card{padding:24px 20px!important}.result-hero{padding:48px 36px!important}.result-top-label{font-size:30px!important}
          .about-body{font-size:15px!important}
        }
        @media(min-width:1024px){.container{max-width:760px;padding:0 40px}.hero-title{font-size:48px!important}.hero-top{padding-top:112px!important}}
      `}</style>
      <div className="container" style={{ fontFamily:"'Zen Kaku Gothic New',sans-serif" }}>
        {!lang ? <LangSelect onSelect={setLang}/> : <>
          <nav className="nav-bar">
            <div className="nav-logo" onClick={()=>navigate("home")}>{u.siteTitle}</div>
            <button className={`hamburger${menuOpen?" open":""}`} onClick={()=>setMenuOpen(!menuOpen)}><span/><span/><span/></button>
            <div className={`nav-links${menuOpen?" open":""}`}>
              <button className={`nav-link ${page==="home"||page==="quiz"?"active":""}`} onClick={()=>navigate("home")}>{u.navHome}</button>
              <button className={`nav-link ${page==="about"?"active":""}`} onClick={()=>navigate("about")}>{u.navAbout}</button>
              <button className={`nav-link ${page==="types"?"active":""}`} onClick={()=>navigate("types")}>{u.navTypes}</button>
              {resultAnswers&&<button className={`nav-link ${page==="result"?"active":""}`} onClick={()=>navigate("result")}>{u.navResult}</button>}
              <button className="nav-link lang-switch" onClick={switchLang}>{lang==="ja"?"English":"日本語"}</button>
            </div>
          </nav>
          {page==="home"&&<HomePage onStart={startQuiz} lang={lang}/>}
          {page==="quiz"&&<QuizPage onFinish={finishQuiz} lang={lang}/>}
          {page==="result"&&resultAnswers&&<ResultPage answers={resultAnswers} onNav={navigate} lang={lang}/>}
          {page==="types"&&<TypesPage onNav={navigate} lang={lang}/>}
          {page==="about"&&<AboutPage onNav={navigate} lang={lang}/>}
        </>}
      </div>
    </div>
  );
}
