import type { Lang } from "./i18n";

export type TypeId = "camera" | "3d" | "fantasy" | "dictionary" | "radio" | "sound";
export type CategoryId = "visual" | "verbal" | "auditory";

export type TypeText = {
  label: string;
  sub: string;
  category: string;
  desc: string;
  input: string;
  learning: string;
  workstyle: string;
};

export type Question = {
  ja: string;
  en: string;
  type: TypeId;
  themeJa: string;
  themeEn: string;
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
      adviceTitle:"あなたへのアドバイス", adviceSingle1:"あなたは", adviceSingle2:"の傾向が最も強いですが、認知特性は一つだけに決まるものではありません。", adviceSingle3:"2番目の", adviceSingle4:"も活用し、自分に合ったインプット・アウトプットの方法を見つけましょう。", adviceTied1:"が同じ強さで出ています。複数の認知チャンネルをバランスよく使えるタイプです。場面に応じて得意な処理方法を使い分けることで、さらに力を発揮できるでしょう。", disclaimer:"※本診断は、本田真美氏の認知特性理論を参考に独自の設問で作成した非公式の簡易診断です。本田式認知特性研究所とは関係ありません。正式な診断は公式の「本田40式認知特性テスト」をお試しください。",
      restartBtn:"もう一度診断する", typesBtn:"タイプ一覧",
      typesPageTitle:"6つの認知特性タイプ", typesPageDesc:"人は情報を処理する方法に個性があり、大きく「視覚」「言語」「聴覚」の3カテゴリ、さらに各2タイプに分かれます。", tryBtn:"診断してみる",
      aboutTitle:"認知特性とは", aboutSub:"Cognitive Style / Cognitive Characteristics", aboutP1:"認知特性とは、目や耳などの感覚器から入ってきた情報を、頭の中で", aboutP1b:"理解・整理・記憶・表現する方法", aboutP1c:"のことです。人によってその処理の仕方には個性があり、同じ情報に触れても、理解の仕方や覚え方が異なります。", aboutP2:"たとえば、好きな曲について話すとき「歌詞が好き」という人もいれば「メロディが好き」という人もいます。教科書を読んで覚える人もいれば、講義を聴いて覚える人もいます。この違いこそが、認知特性の違いです。", about3title:"3つのカテゴリと6つのタイプ", about3desc:"認知特性は大きく「視覚優位」「言語優位」「聴覚優位」の3カテゴリに分けられ、さらにそれぞれが2つのタイプに分かれます。",
      aboutBenTitle:"知ることのメリット", aboutBen1a:"自分の認知特性を知ると、", aboutBen1b:"自分に合った学び方・働き方", aboutBen1c:"を選べるようになります。たとえば視覚優位の人が音声教材だけで勉強しても効率が上がりにくいように、自分の特性に合わない方法を続けていると、本来の力を発揮しづらくなります。", aboutBen2a:"また、周囲の人との認知特性の違いを理解することで、", aboutBen2b:"コミュニケーションの改善", aboutBen2c:"にもつながります。「なぜこの人は口頭で伝えた方が理解してくれるのか」「なぜ資料を見せた方が話が早いのか」——その理由が認知特性の違いにあるかもしれません。", aboutBen3a:"認知特性は優劣ではなく、あくまで", aboutBen3b:"情報処理の好みや傾向", aboutBen3c:"です。また、環境や経験によって変化する可能性もあるとされています。",
      aboutThisTitle:"この診断について", aboutThisP:"この診断は、小児科医・医学博士の本田真美先生が提唱した認知特性理論をベースに、オリジナルの質問を30問用意したものです。各質問に5段階で回答することで、6タイプそれぞれの傾向を割合で確認できます。", aboutThisNote:"※本診断は非公式のもので、本田式認知特性研究所とは関係ありません。より正確な診断を受けたい方は、公式の「本田40式認知特性テスト」をお試しください。",
      catVisualDesc:"目で見た情報を処理するのが得意", catVerbalDesc:"読んだ情報を処理するのが得意", catAuditoryDesc:"耳で聞いた情報を処理するのが得意",
      officialLink:"公式テストはこちら", shareTitle:"結果をシェアする", shareText:"私の認知特性は「%s」でした！あなたはどのタイプ？", shareTextTied:"私の認知特性は「%s」が同率トップでした！あなたはどのタイプ？", shareHashtag:"認知特性診断", copyLink:"リンクをコピー", copied:"コピーしました", shareMore:"その他",
      typeDetailLink:"詳しく見る", otherTypes:"ほかのタイプ", typeOfCategory:"%sのタイプ", invalidResult:"診断結果が読み込めませんでした。もう一度診断してください。",
      metaTitle:"認知特性診断｜30問であなたの脳のクセが分かる無料テスト", metaDesc:"30の質問に答えるだけで、あなたの認知特性（視覚・言語・聴覚の6タイプ）が割合で分かる無料診断。自分に合った学び方・働き方が見つかります。", resultMetaTitle:"診断結果：%s｜認知特性診断", ogResultLead:"私の認知特性は", ogCta:"あなたも30問で診断",
    },
    en: { siteTitle:"Cognitive Style", navHome:"Home", navAbout:"What is this?", navTypes:"6 Types", navResult:"Results", heroSub:"COGNITIVE STYLE ASSESSMENT", heroTitle1:"Discover Your", heroTitle2:"Cognitive Style", heroDesc:"Answer 30 questions to find out how you naturally receive and process information, broken down across 6 cognitive types. Understand your brain's preferences and optimize the way you learn and work.", startBtn:"Start Assessment", duration:"About 5 min · 30 questions · Free", catVisual:"Visual", catVisualSub:"Learn by seeing", catVerbal:"Verbal", catVerbalSub:"Learn by reading", catAuditory:"Auditory", catAuditorySub:"Learn by listening",
      likert5:"Strongly agree", likert4:"Somewhat agree", likert3:"Neutral", likert2:"Somewhat disagree", likert1:"Strongly disagree", prevQ:"← Previous",
      resultYourTop:"Your strongest cognitive style", resultTied:"%d types are tied as your strongest cognitive style", scoreTitle:"Score by Type", maxNote:"Max 25 points per type", catTitle:"By Category", detailTitle:"Details", inputLabel:"Best Input Style: ", learningLabel:"Recommended Learning: ", workLabel:"Work Style Strength: ", levelStrong:"Very strong", levelMod:"Moderately strong", levelAvg:"Average", levelLow:"Weak",
      adviceTitle:"Personalized Advice", adviceSingle1:"Your strongest type is ", adviceSingle2:", but cognitive style isn't limited to just one type.", adviceSingle3:"Try leveraging your second-strongest type, ", adviceSingle4:", to find the input and output methods that work best for you.", adviceTied1:" are equally strong for you. You're a balanced multi-channel processor. By consciously switching between modes depending on the situation, you can unlock even more potential.", disclaimer:"This is an unofficial, independently written assessment inspired by Dr. Mami Honda's cognitive trait theory. It is not affiliated with the Honda Cognitive Traits Institute. For a formal assessment, try the official 'Honda 40-Style Cognitive Traits Test'.",
      restartBtn:"Retake Assessment", typesBtn:"View All Types",
      typesPageTitle:"The 6 Cognitive Types", typesPageDesc:"Everyone has their own way of processing information. There are 3 major categories — Visual, Verbal, and Auditory — each split into 2 distinct types.", tryBtn:"Take the Assessment",
      aboutTitle:"What Are Cognitive Styles?", aboutSub:"Cognitive Style / Cognitive Characteristics", aboutP1:"Cognitive style refers to how your brain ", aboutP1b:"understands, organizes, remembers, and expresses", aboutP1c:" information received through your senses. Everyone processes information differently — the same input can lead to very different understanding and recall.", aboutP2:"For example, when talking about a favorite song, some people focus on the lyrics while others focus on the melody. Some learn best by reading a textbook, others by listening to a lecture. These differences are cognitive styles.", about3title:"3 Categories, 6 Types", about3desc:"Cognitive styles fall into three broad categories — Visual, Verbal, and Auditory — each with two subtypes.",
      aboutBenTitle:"Why It Matters", aboutBen1a:"Knowing your cognitive style helps you ", aboutBen1b:"choose learning and working methods that actually fit you", aboutBen1c:". For instance, a visually-oriented person studying only through audio lectures may struggle — not because of ability, but because of a mismatch.", aboutBen2a:"Understanding these differences in others can also ", aboutBen2b:"improve communication", aboutBen2c:". Why does one colleague prefer verbal briefings while another wants a written document? The answer may lie in cognitive style.", aboutBen3a:"Cognitive styles are not about being better or worse — they're simply ", aboutBen3b:"preferences and tendencies in how you process information", aboutBen3c:". They may also shift with experience and environment.",
      aboutThisTitle:"About This Assessment", aboutThisP:"This assessment is based on the cognitive trait theory proposed by Dr. Mami Honda (pediatrician and medical doctor). It features 30 original questions rated on a 5-point scale, giving you a proportional breakdown across all 6 types.", aboutThisNote:"This assessment is unofficial and not affiliated with the Honda Cognitive Traits Institute. For a more precise assessment, try the official 'Honda 40-Style Cognitive Traits Test'.",
      catVisualDesc:"Processes visual information best", catVerbalDesc:"Processes written information best", catAuditoryDesc:"Processes auditory information best",
      officialLink:"Official test", shareTitle:"Share your result", shareText:"My cognitive style is \"%s\"! What's yours?", shareTextTied:"My top cognitive styles are \"%s\"! What's yours?", shareHashtag:"CognitiveStyle", copyLink:"Copy link", copied:"Copied", shareMore:"More",
      typeDetailLink:"Learn more", otherTypes:"Other types", typeOfCategory:"%s types", invalidResult:"We couldn't load this result. Please take the assessment again.",
      metaTitle:"Cognitive Style Assessment | Free 30-question test", metaDesc:"Answer 30 questions to discover how you process information across 6 cognitive types (visual, verbal, auditory). Find the learning and working style that fits you.", resultMetaTitle:"Result: %s | Cognitive Style Assessment", ogResultLead:"My cognitive style is", ogCta:"Take the free 30-question test",
    },
  },
};

export const TYPE_TEXT: Record<TypeId, Record<Lang, TypeText>> = I.types;
export const QUESTIONS: readonly Question[] = I.questions as Question[];
export type UiText = typeof I.ui.ja;
export const UI: Record<Lang, UiText> = I.ui;

export type TypeMeta = { id: TypeId; color: string; bg: string; categoryId: CategoryId };

/** 表示順。スコアのURLエンコード順もこの順で固定する */
export const TYPE_META: readonly TypeMeta[] = [
  { id: "camera", color: "#D94F3B", bg: "#FEF2F0", categoryId: "visual" },
  { id: "3d", color: "#C87620", bg: "#FFF8EE", categoryId: "visual" },
  { id: "fantasy", color: "#2968B0", bg: "#EFF6FF", categoryId: "verbal" },
  { id: "dictionary", color: "#6D4ABA", bg: "#F5F0FF", categoryId: "verbal" },
  { id: "radio", color: "#178F5E", bg: "#EEFBF4", categoryId: "auditory" },
  { id: "sound", color: "#0E8A8A", bg: "#EEFCFC", categoryId: "auditory" },
];

export const TYPE_IDS: readonly TypeId[] = TYPE_META.map((m) => m.id);

export const isTypeId = (v: string): v is TypeId => (TYPE_IDS as readonly string[]).includes(v);

export const CATEGORIES: readonly { id: CategoryId; color: string; ids: readonly TypeId[]; label: Record<Lang, string> }[] = [
  { id: "visual", color: "#D94F3B", ids: ["camera", "3d"], label: { ja: "視覚優位", en: "Visual" } },
  { id: "verbal", color: "#2968B0", ids: ["fantasy", "dictionary"], label: { ja: "言語優位", en: "Verbal" } },
  { id: "auditory", color: "#178F5E", ids: ["radio", "sound"], label: { ja: "聴覚優位", en: "Auditory" } },
];

export const getType = (id: TypeId, lang: Lang): TypeMeta & TypeText => {
  const meta = TYPE_META.find((m) => m.id === id);
  if (!meta) throw new Error(`Unknown type id: ${id}`);
  return { ...meta, ...TYPE_TEXT[id][lang] };
};

/** テーマが偏らないよう、テーマごとに1問ずつ順に並べる */
export const QUESTION_ORDER: readonly number[] = (() => {
  const themes = ["Memory", "Perception", "Learning", "Daily life", "Thinking", "Expression", "Physical"];
  const byTheme = new Map<string, number[]>();
  QUESTIONS.forEach((q, i) => byTheme.set(q.themeEn, [...(byTheme.get(q.themeEn) ?? []), i]));
  const maxLen = Math.max(...[...byTheme.values()].map((a) => a.length));
  return Array.from({ length: maxLen }, (_, r) =>
    themes.flatMap((th) => {
      const i = byTheme.get(th)?.[r];
      return i === undefined ? [] : [i];
    }),
  ).flat();
})();

/** 「認知特性とは」ページで使う一言説明 */
export const TYPE_TAGLINE: Record<TypeId, Record<Lang, string>> = {
  camera: { ja: "写真のように二次元で記憶", en: "Captures information as 2D snapshots" },
  "3d": { ja: "空間や時間軸で立体的に思考", en: "Thinks spatially and temporally in 3D" },
  fantasy: { ja: "言葉を映像化して思考", en: "Converts words into vivid mental images" },
  dictionary: { ja: "文字を図式化・体系化して記憶", en: "Organizes information into structures and systems" },
  radio: { ja: "言葉を音として処理", en: "Processes spoken words as audio" },
  sound: { ja: "音色やメロディで理解", en: "Understands through musical tone and rhythm" },
};
