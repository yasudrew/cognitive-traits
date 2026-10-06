import type { TypeId } from "./content";
import type { Lang } from "./i18n";

type Text = { stem: string; a: string; b: string };

/**
 * 2つの選択肢のどちらに近いかを5段階で答える対比式の設問。
 *
 * 設計方針:
 * - 能力や経験（できる・得意）ではなく、頭の中に自然に浮かぶ情報の形を聞く
 * - 誰でも経験している日常の場面だけを使う（楽器・スポーツ・絵など訓練が要る場面は避ける）
 * - 両方の選択肢が同じくらい望ましく見えるようにする（「整理」「正確」など有能さを感じさせる語を片側だけに置かない）
 * - 「ほぼ誰でもそうする」選択肢を置かない（例: やって見せてもらう方が分かりやすい、数字は唱えて覚える）
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
      ja: { stem: "初めて会った人の名前を覚えるとき", a: "顔や服装の見た目と結びつけて覚える", b: "名前の漢字や文字の並びを思い浮かべて覚える" },
      en: { stem: "When learning the name of someone you just met", a: "You link it to how they look — face, clothes", b: "You picture how the name is written" },
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
      ja: { stem: "人の体験談を聞いているとき、頭の中で追っているのは", a: "どこからどこへ移動したかなど、位置関係や動き", b: "その場の雰囲気や人物の様子が浮かぶ、物語としての場面" },
      en: { stem: "While listening to someone's story, what you follow in your head is", a: "Positions and movement — where they went from and to", b: "The scene as a story — the mood and how people looked" },
    },
  },
  {
    a: "dictionary", b: "sound",
    text: {
      ja: { stem: "外国語の単語を覚えるとき", a: "つづりや文字の形ごと覚える", b: "発音のリズムや抑揚ごと覚える" },
      en: { stem: "When memorizing a word in a foreign language", a: "You remember it by its spelling and written shape", b: "You remember it by its rhythm and intonation" },
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
      ja: { stem: "人に道順を説明するとき", a: "頭の中で道を歩きながら、見える景色の順に話す", b: "「2つ目の信号を右」のように、曲がる場所を言葉で並べて話す" },
      en: { stem: "When giving someone directions", a: "You walk the route in your head and describe what you see", b: "You list the turns in words — \"right at the second light\"" },
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
      ja: { stem: "旅行のガイドブックを読んだあと、印象に残っているのは", a: "載っていた写真の構図や色", b: "文章から自分で思い描いた景色" },
      en: { stem: "After reading a travel guidebook, what stays with you is", a: "The framing and colors of the photos in it", b: "The scenery you pictured from the text" },
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
      ja: { stem: "部屋の家具の配置を考えるとき", a: "家具を頭の中で動かして、いろいろな置き方を試す", b: "仕上がった部屋の様子を、写真のような一枚の絵で思い浮かべる" },
      en: { stem: "When planning how to arrange furniture in a room", a: "You move the furniture around in your head to try layouts", b: "You picture the finished room as a single photo-like image" },
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
      ja: { stem: "テレビのニュースを後から思い出すとき", a: "キャスターが話していた言葉", b: "映っていた映像やテロップの見た目" },
      en: { stem: "When you recall a TV news segment later", a: "The words the anchor said", b: "The footage and on-screen captions as they looked" },
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
      ja: { stem: "覚えたいことを繰り返すとき、しっくりくるのは", a: "声に出して繰り返す", b: "紙に書いて繰り返す" },
      en: { stem: "When repeating something to remember it, it feels right to", a: "Say it aloud, over and over", b: "Write it down, over and over" },
    },
  },
];
