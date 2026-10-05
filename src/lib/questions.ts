import type { TypeId } from "./content";
import type { Lang } from "./i18n";

type Text = { stem: string; a: string; b: string };

/**
 * 2つの選択肢のどちらに近いかを5段階で答える対比式の設問。
 *
 * 設計方針:
 * - 能力や経験（できる・得意）ではなく、頭の中に自然に浮かぶ情報の形を聞く
 * - 誰でも経験している日常の場面だけを使う（楽器・スポーツ・絵など訓練が要る場面は避ける）
 * - 両方の選択肢が同じくらい望ましく見えるようにする
 * - 6タイプの全15組を2問ずつ比較する。同じ組の2問は15問離し、A/Bの上下を入れ替える
 */
export type PairQuestion = { a: TypeId; b: TypeId; text: Record<Lang, Text> };

export const QUESTIONS: readonly PairQuestion[] = [
  {
    a: "camera", b: "3d",
    text: {
      ja: { stem: "昨日行ったお店を思い出すとき", a: "看板や店内の一場面が、写真のように止まった絵で浮かぶ", b: "入口から席まで歩いた流れが、動画のように浮かぶ" },
      en: { stem: "When you recall a shop you visited yesterday", a: "A single scene — the sign or the interior — appears like a still photo", b: "The walk from the entrance to your seat replays like a video" },
    },
  },
  {
    a: "fantasy", b: "dictionary",
    text: {
      ja: { stem: "小説や長めの記事を読んでいるとき", a: "場面や人物が映像になって流れていく", b: "要点や筋道が、言葉のまま整理されていく" },
      en: { stem: "While reading a novel or a long article", a: "Scenes and people turn into moving images", b: "Key points and logic get organized as words" },
    },
  },
  {
    a: "radio", b: "sound",
    text: {
      ja: { stem: "好きな曲を思い出すとき、先に頭に流れるのは", a: "歌詞のフレーズ", b: "メロディやリズム、音色" },
      en: { stem: "When a favorite song comes to mind, what plays first is", a: "A line of the lyrics", b: "The melody, rhythm, or sound of it" },
    },
  },
  {
    a: "camera", b: "dictionary",
    text: {
      ja: { stem: "人の名前を思い出そうとするとき", a: "顔や服装など、見た目が先に浮かぶ", b: "名前の漢字や文字の並びが浮かぶ" },
      en: { stem: "When trying to remember someone's name", a: "Their face or clothes come to mind first", b: "The spelling or written form of the name comes to mind" },
    },
  },
  {
    a: "3d", b: "radio",
    text: {
      ja: { stem: "電話で道案内を受けているとき", a: "聞きながら、頭の中の地図の上を移動している", b: "「右」「コンビニ」など、言われた言葉を順に覚えている" },
      en: { stem: "When someone gives you directions over the phone", a: "You move along a map in your head as you listen", b: "You keep the words in order — \"right\", \"convenience store\"…" },
    },
  },
  {
    a: "fantasy", b: "sound",
    text: {
      ja: { stem: "歌を聴いているとき", a: "歌詞から情景やストーリーが浮かぶ", b: "音の重なりやリズム、声の質感に耳がいく" },
      en: { stem: "While listening to a song", a: "The lyrics bring up scenes and a story", b: "You notice the layers of sound, rhythm, and texture of the voice" },
    },
  },
  {
    a: "camera", b: "radio",
    text: {
      ja: { stem: "授業や研修を後から思い出すとき", a: "スライドや板書の見た目", b: "講師が話していた言葉や説明" },
      en: { stem: "When you think back on a class or training", a: "What the slides or whiteboard looked like", b: "The words and explanations the speaker used" },
    },
  },
  {
    a: "3d", b: "fantasy",
    text: {
      ja: { stem: "何かのやり方を教わるとき、分かりやすいのは", a: "目の前でやって見せてもらう", b: "「たとえば〜みたいな感じ」と、たとえで説明してもらう" },
      en: { stem: "When learning how to do something, it clicks when", a: "Someone shows you by doing it in front of you", b: "Someone explains it with an analogy — \"it's kind of like…\"" },
    },
  },
  {
    a: "dictionary", b: "sound",
    text: {
      ja: { stem: "外国語の単語を覚えるとき", a: "つづりや文字の形、意味のつながりで覚える", b: "発音の響きやイントネーションで覚える" },
      en: { stem: "When memorizing a word in a foreign language", a: "You remember its spelling and how its meaning connects", b: "You remember how it sounds and its intonation" },
    },
  },
  {
    a: "camera", b: "sound",
    text: {
      ja: { stem: "映画やドラマのワンシーンを思い出すとき", a: "画面の構図や色", b: "流れていた音楽や効果音" },
      en: { stem: "When recalling a scene from a movie or show", a: "The framing and colors on screen", b: "The music or sound effects that were playing" },
    },
  },
  {
    a: "3d", b: "dictionary",
    text: {
      ja: { stem: "人に道順を説明するとき", a: "頭の中で道を歩きながら、見える景色の順に話す", b: "「2つ目の信号を右」のように、要点を整理して話す" },
      en: { stem: "When giving someone directions", a: "You walk the route in your head and describe what you see", b: "You organize the key points — \"right at the second light\"" },
    },
  },
  {
    a: "fantasy", b: "radio",
    text: {
      ja: { stem: "本を読むとき、頭の中では", a: "文章が映像に変わっていく", b: "文章が声（音読のような音）で聞こえている" },
      en: { stem: "When you read, inside your head", a: "The text turns into images", b: "You hear the text as a voice, like reading aloud" },
    },
  },
  {
    a: "camera", b: "fantasy",
    text: {
      ja: { stem: "何かを覚えるとき、残りやすいのは", a: "実際に目で見た写真や図そのもの", b: "言葉で説明された内容から、自分で思い描いた場面" },
      en: { stem: "What tends to stay in memory is", a: "The actual photo or diagram you saw", b: "A scene you pictured yourself from a verbal description" },
    },
  },
  {
    a: "3d", b: "sound",
    text: {
      ja: { stem: "体操やダンスの振りを覚えるとき", a: "動きの形や流れを、映像で覚える", b: "音楽のリズムやカウントに合わせて覚える" },
      en: { stem: "When learning a routine, like exercises or a dance", a: "You remember the shape and flow of the movements as images", b: "You remember it by the rhythm of the music or the count" },
    },
  },
  {
    a: "dictionary", b: "radio",
    text: {
      ja: { stem: "考えごとをするとき、頭の中では", a: "メモのように、文字で言葉が並ぶ", b: "自分と会話するように、声で言葉が流れる" },
      en: { stem: "When you're thinking something through", a: "Words line up as written text, like notes", b: "Words flow as a voice, like talking to yourself" },
    },
  },
  {
    a: "3d", b: "camera",
    text: {
      ja: { stem: "家具を組み立てるとき", a: "部品を頭の中で回したり動かしたりして試す", b: "説明書の図とそっくりの絵を見比べて確かめる" },
      en: { stem: "When assembling furniture", a: "You rotate and move the parts in your head to try them out", b: "You compare against the picture in the manual to check" },
    },
  },
  {
    a: "dictionary", b: "fantasy",
    text: {
      ja: { stem: "新しい言葉や概念が「わかった」と感じるのは", a: "定義やほかとの違いが、言葉ではっきりしたとき", b: "たとえ話やエピソードで、情景が浮かんだとき" },
      en: { stem: "A new idea feels understood when", a: "Its definition and how it differs from others become clear in words", b: "An analogy or story lets you picture it" },
    },
  },
  {
    a: "sound", b: "radio",
    text: {
      ja: { stem: "誰かとの会話を後で思い出すとき、残っているのは", a: "声のトーン・速さ・間などの響き", b: "相手が言った言葉そのもの" },
      en: { stem: "When you recall a conversation later, what remains is", a: "The tone, pace, and pauses of their voice", b: "The exact words they said" },
    },
  },
  {
    a: "dictionary", b: "camera",
    text: {
      ja: { stem: "頭の中で情報を整理するとき", a: "見出しや箇条書きのような、言葉の構造", b: "色や配置で区別された、図のイメージ" },
      en: { stem: "When organizing information in your head", a: "A structure of words, like headings and bullet points", b: "A picture where things are separated by color and position" },
    },
  },
  {
    a: "radio", b: "3d",
    text: {
      ja: { stem: "旅行やイベントを思い出すとき", a: "そこで交わした会話や言葉", b: "その場を歩き回るような、空間や動き" },
      en: { stem: "When you recall a trip or an event", a: "The conversations and words exchanged there", b: "The space and movement, as if walking around the place" },
    },
  },
  {
    a: "sound", b: "fantasy",
    text: {
      ja: { stem: "ぼんやりしているとき、頭の中にあるのは", a: "メロディや、どこかで聞いた音", b: "空想の場面やストーリー" },
      en: { stem: "When your mind wanders, what's there is", a: "A melody or some sound you heard somewhere", b: "Imagined scenes or stories" },
    },
  },
  {
    a: "radio", b: "camera",
    text: {
      ja: { stem: "電話番号や暗証番号を覚えるとき", a: "声に出したり、心の中で唱えたりする", b: "数字の並びを、形として目に焼き付ける" },
      en: { stem: "When memorizing a phone number or PIN", a: "You say it aloud or repeat it in your head", b: "You burn the shape of the digits into your eyes" },
    },
  },
  {
    a: "fantasy", b: "3d",
    text: {
      ja: { stem: "初めての場所に行く予定を考えるとき", a: "「こうなったらこうしよう」と、場面を物語のように思い描く", b: "移動や行動を、実際に動いているように頭の中で予行演習する" },
      en: { stem: "When planning a visit to a new place", a: "You picture scenes like a story — \"if this happens, I'll do that\"", b: "You rehearse the route and actions as if actually moving" },
    },
  },
  {
    a: "sound", b: "dictionary",
    text: {
      ja: { stem: "相手の気持ちを読み取るとき、手がかりにするのは", a: "声の高さ・抑揚・話す速さ", b: "言葉の選び方や話の筋道" },
      en: { stem: "To read how someone feels, you rely on", a: "The pitch, inflection, and pace of their voice", b: "Their choice of words and the logic of what they say" },
    },
  },
  {
    a: "sound", b: "camera",
    text: {
      ja: { stem: "よく行く場所を思い浮かべるとき", a: "ざわめき・BGM・アナウンスなど、その場の音", b: "看板・色・物の配置など、見た目" },
      en: { stem: "When you picture a place you often go", a: "Its sounds — chatter, music, announcements", b: "Its look — signs, colors, where things are" },
    },
  },
  {
    a: "dictionary", b: "3d",
    text: {
      ja: { stem: "作業の手順を覚えるとき、頭の中にあるのは", a: "番号付きの手順リストのような言葉", b: "自分が動いている様子の、映像の流れ" },
      en: { stem: "When learning the steps of a task, in your head there's", a: "Words, like a numbered list of steps", b: "A flowing video of yourself doing it" },
    },
  },
  {
    a: "radio", b: "fantasy",
    text: {
      ja: { stem: "人の話を聞いているとき", a: "話された言葉が、そのまま耳に残る", b: "話の内容が、映像になって浮かぶ" },
      en: { stem: "While listening to someone talk", a: "The spoken words stay in your ears as they are", b: "What they describe turns into images" },
    },
  },
  {
    a: "fantasy", b: "camera",
    text: {
      ja: { stem: "本や資料の内容を思い出すとき", a: "内容が、場面やストーリーとして浮かぶ", b: "ページのどのあたりに、どんな見た目で書いてあったかが浮かぶ" },
      en: { stem: "When recalling something you read", a: "The content comes back as scenes or a story", b: "You see where on the page it was and how it looked" },
    },
  },
  {
    a: "sound", b: "3d",
    text: {
      ja: { stem: "街を歩いているとき、自然と意識が向くのは", a: "足音・話し声・音楽など、周りの音", b: "人や車の動き、距離感、空間の広がり" },
      en: { stem: "Walking through town, your attention naturally goes to", a: "Surrounding sounds — footsteps, voices, music", b: "The movement of people and cars, distances, open space" },
    },
  },
  {
    a: "radio", b: "dictionary",
    text: {
      ja: { stem: "覚えたいことがあるとき、しっくりくるのは", a: "口に出したり人に話したりして、耳で確かめる", b: "書き出して整理し、目で文字を確かめる" },
      en: { stem: "When you want to remember something, it feels right to", a: "Say it aloud or tell someone, checking it by ear", b: "Write it out, organize it, and check the words by eye" },
    },
  },
];
