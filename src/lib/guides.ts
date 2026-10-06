import type { TypeId } from "./content";
import type { Lang } from "./i18n";

/** タイプごとの詳しい解説。結果ページとタイプ別ページで使う */
export type TypeGuide = {
  summary: string;
  strengths: readonly string[];
  struggles: readonly string[];
  learning: readonly string[];
  /** このタイプの人に伝えるとき */
  receive: readonly string[];
  /** このタイプの人が誰かに伝えるときのコツ */
  express: readonly string[];
  work: readonly string[];
  /** 苦手を補うコツ */
  cover: readonly string[];
};

export const GUIDE_SECTIONS = ["strengths", "struggles", "learning", "receive", "express", "work", "cover"] as const;
export type GuideSection = (typeof GUIDE_SECTIONS)[number];

export const GUIDE_LABELS: Record<Lang, Record<GuideSection, string> & { title: string; forYou: string }> = {
  ja: {
    title: "タイプの解説",
    forYou: "あなたのタイプの解説",
    strengths: "得意なこと",
    struggles: "つまずきやすいこと",
    learning: "おすすめの学び方",
    receive: "このタイプの人に伝えるときは",
    express: "このタイプの人が伝えるときのコツ",
    work: "活きやすい役割・仕事",
    cover: "苦手を補うコツ",
  },
  en: {
    title: "About this type",
    forYou: "About your type",
    strengths: "Strengths",
    struggles: "Where you may struggle",
    learning: "How to learn",
    receive: "How to communicate with this type",
    express: "Tips when this type explains things",
    work: "Roles where it shines",
    cover: "Ways to compensate",
  },
};

export const GUIDES: Record<TypeId, Record<Lang, TypeGuide>> = {
  camera: {
    ja: {
      summary: "目で見たものを、写真のように一枚の絵として切り取って記憶・思考するタイプです。色・形・配置といった見た目の情報の解像度が高く、言葉より先に画像が浮かびます。",
      strengths: ["一度見た資料や場所の様子を、配置や色まで思い出せる", "レイアウトのずれや色味の差など、細かな違いにすぐ気づく", "図やチャートから、全体像をつかむのが早い", "資料・空間・デザインなど、見た目を整えることが自然にできる"],
      struggles: ["口頭だけの説明や電話での指示は、後から抜けやすい", "文字ばかりの資料は、内容が頭に残りにくい", "動きや手順の流れ（時系列）を頭の中で追うのが負担になりやすい"],
      learning: ["図や表を中心に覚え、色分けやマーカーで見た目の違いをつける", "覚えたい内容を一枚の図やマインドマップにまとめ、紙面の位置ごと記憶する", "動画より、要所を切り取ったスクリーンショットや写真で復習する", "単語カードには、文字だけでなくイラストや写真を添える"],
      receive: ["口頭で済ませず、図・写真・スクリーンショットを1枚添える", "説明の前に、完成形やゴールのイメージを見せる", "大事な情報は色や枠で目立たせ、紙面上の位置を固定する"],
      express: ["頭の中の絵をそのまま渡すつもりで、図やラフスケッチを描いて見せる", "言葉で伝えるときは「左上の」「赤い部分」など、位置や色を手がかりにする", "相手が聴覚・言語寄りなら、絵を言葉で補う一言を添える"],
      work: ["資料デザイン・UIチェック・品質確認など、見た目の精度が問われる仕事", "現場の状態を写真のように記録し、比べる仕事", "情報を図解して、チームの理解をそろえる役割"],
      cover: ["口頭の指示はその場でメモし、あとで図にしておく", "手順ものは1ステップごとに絵を描いて並べ、紙芝居のようにする"],
    },
    en: {
      summary: "You capture what you see as still, photo-like images and think with them. You're highly tuned to color, shape, and layout, and images come to mind before words.",
      strengths: ["Recalling documents or places down to layout and color", "Spotting small differences — misaligned layouts, slightly off colors", "Grasping the big picture quickly from diagrams and charts", "Naturally making documents, spaces, and designs look right"],
      struggles: ["Verbal-only instructions and phone calls slip away later", "Text-heavy documents don't stick easily", "Following movement or step-by-step sequences in your head can be tiring"],
      learning: ["Study from diagrams and tables; use colors and highlighters to make differences visible", "Put what you want to remember on a single diagram or mind map and memorize its layout", "Review with screenshots or photos of key moments rather than full videos", "Add illustrations or photos to flashcards, not just text"],
      receive: ["Don't rely on talk alone — attach a diagram, photo, or screenshot", "Show the finished result or goal before explaining", "Highlight key info with color or boxes and keep it in a fixed position"],
      express: ["Draw a diagram or rough sketch to hand over the picture in your head", "When using words, anchor on position and color — \"top left\", \"the red part\"", "If the listener is auditory or verbal, add a sentence that puts the picture into words"],
      work: ["Work that demands visual precision — document design, UI checks, quality inspection", "Recording and comparing the state of things like photographs", "Visualizing information so a team shares the same understanding"],
      cover: ["Take notes on verbal instructions right away and turn them into a diagram later", "For procedures, sketch each step and line them up like a storyboard"],
    },
  },
  "3d": {
    ja: {
      summary: "空間や時間の流れを使って、立体的・動画的に考えるタイプです。物の位置関係や動きを頭の中で動かしてシミュレーションでき、体験しながら覚えるのが得意です。",
      strengths: ["道順や建物の構造など、空間を把握するのが得意", "頭の中で物を回したり組み立てたりして試せる", "段取りや手順を、動きの流れとして先回りしてイメージできる", "実際に手を動かすと、短い時間で要領をつかむ"],
      struggles: ["動きのない、文字だけの説明はイメージがつかみにくい", "抽象的な定義や用語を、言葉だけで覚えるのが負担になりやすい", "体験の機会がないまま進む座学は、集中が続きにくい"],
      learning: ["実際にやってみる・現地へ行く・模型を触るなど、体験から入る", "手順は「自分が動いている映像」として頭の中で予行演習する", "動画や実演、フロー図やアニメーションなど動きのある教材を選ぶ", "歴史や物語は、地図や年表の上で出来事を動かして覚える"],
      receive: ["文字の説明より先に、やって見せる・動画を見せる", "どこから始まり、どこへ向かうのか、全体の流れを最初に示す", "位置関係は、地図・見取り図・模型など空間として見せる"],
      express: ["頭の中の映像は相手に見えていないので、順番と位置を言葉で補う", "ホワイトボードに動きを描きながら説明する", "「まずここ、次にこっち」と、相手の視点に立って順に案内する"],
      work: ["設計・施工・物流・イベント運営など、空間や段取りを扱う仕事", "試作と検証を繰り返しながら形にしていく仕事", "現場の状況を見て、動き方を判断する役割"],
      cover: ["文字資料は、図や流れ図に描き直してから読む", "用語は、それが使われる場面や動きとセットで覚える"],
    },
    en: {
      summary: "You think in three dimensions and in motion, using space and time. You can move objects around in your head to simulate them, and you learn best by doing.",
      strengths: ["Understanding space — routes, building layouts", "Rotating and assembling things in your head to try them out", "Anticipating plans and procedures as a flow of movement", "Getting the hang of things quickly once your hands are moving"],
      struggles: ["Static, text-only explanations are hard to picture", "Memorizing abstract definitions or terms from words alone can be tiring", "Lectures with no chance to try things make focus hard to sustain"],
      learning: ["Start from experience — try it, visit the place, handle a model", "Rehearse procedures as a video of yourself doing them", "Choose materials with motion — videos, demonstrations, flowcharts, animations", "Learn history or stories by moving events across a map or timeline"],
      receive: ["Show it or play a video before explaining in text", "Lay out the overall flow first — where it starts and where it goes", "Show spatial relationships as space — maps, floor plans, models"],
      express: ["Others can't see the movie in your head, so put order and position into words", "Draw the movement on a whiteboard as you explain", "Guide step by step from the listener's point of view — \"first here, then over there\""],
      work: ["Work involving space and logistics — design, construction, logistics, event operations", "Building things through repeated prototyping and testing", "Reading on-site situations and deciding how to move"],
      cover: ["Redraw text documents as diagrams or flowcharts before reading", "Learn terms together with the situation or movement where they're used"],
    },
  },
  fantasy: {
    ja: {
      summary: "読んだり聞いたりした言葉を、映像に変えて考えるタイプです。文章から情景を思い描き、反対に頭の中の映像を言葉で表すのも得意。物語やたとえ話で理解が深まります。",
      strengths: ["文章や話から、場面や人物をいきいきと思い描ける", "たとえ話やエピソードを使って、分かりやすく伝えられる", "相手の立場や状況を想像し、気持ちを汲み取るのが得意", "企画や構想を、具体的な場面として描ける"],
      struggles: ["物語やたとえのない、抽象的な理論や数式は入りにくい", "想像が広がりすぎて、要点や事実関係があいまいになることがある", "細かい数値や正確な用語の暗記は負担になりやすい"],
      learning: ["覚えたい内容を、登場人物や場面のある物語に変えて覚える", "歴史は漫画や小説、人物伝から入る", "抽象的な概念は、身近なたとえや具体例を自分で作って理解する", "学んだことを、誰かに語るつもりでストーリーとしてまとめ直す"],
      receive: ["結論だけでなく、「たとえば〜という場面で」と具体例を添える", "なぜそうするのか、背景や目的のストーリーを共有する", "数字や仕様は、それが使われる場面のイメージとセットで伝える"],
      express: ["物語は伝わりやすい反面、要点が埋もれがちなので、最初に結論を一言で言う", "たとえ話のあとに、事実や数字で裏付けを添える", "相手が辞書タイプなら、箇条書きの要約も渡す"],
      work: ["企画・コピーライティング・編集など、言葉で世界を描く仕事", "利用者の場面を想像して形にする仕事（UX、サービス設計など）", "接客・相談・教育など、相手の気持ちを想像する役割"],
      cover: ["想像が広がったら「要点は3つ」と書き出し、事実と想像を分ける", "用語や数値は、場面のイメージに貼り付けるように覚える"],
    },
    en: {
      summary: "You turn the words you read or hear into images. You picture scenes from text and can just as easily put the images in your head into words. Stories and analogies deepen your understanding.",
      strengths: ["Vividly picturing scenes and people from text or talk", "Explaining clearly with analogies and stories", "Imagining others' situations and sensing their feelings", "Describing plans and ideas as concrete scenes"],
      struggles: ["Abstract theories or formulas without stories or examples are hard to absorb", "Imagination can run wide and blur the key points or facts", "Memorizing precise numbers or terms can be tiring"],
      learning: ["Turn what you want to remember into a story with characters and scenes", "Approach history through comics, novels, or biographies", "Understand abstract ideas by making your own everyday analogies", "Retell what you learned as a story, as if explaining it to someone"],
      receive: ["Add a concrete example — \"say, in a situation where…\" — not just the conclusion", "Share the backstory: why it's being done and for what purpose", "Pair numbers or specs with an image of where they're used"],
      express: ["Stories land well but can bury the point — open with a one-line conclusion", "Back up analogies with facts or numbers", "For a dictionary-type listener, hand over a bullet-point summary too"],
      work: ["Painting worlds with words — planning, copywriting, editing", "Designing around users' situations — UX, service design", "Roles that require imagining others' feelings — customer service, counseling, teaching"],
      cover: ["When your imagination spreads, write down \"three key points\" to separate facts from images", "Attach terms and numbers to a scene in your mind as you learn them"],
    },
  },
  dictionary: {
    ja: {
      summary: "文字や言葉をそのまま扱い、分類・構造化して考えるタイプです。情報を見出しや箇条書きのように整理するのが自然で、定義や筋道がはっきりすると理解が深まります。",
      strengths: ["情報を分類・構造化し、筋道立てて整理できる", "文章を正確に読み取り、言葉の細かな違いに敏感", "ルールや仕組みを、体系として理解・記憶できる", "議事録やマニュアルなど、分かりやすい文書にまとめられる"],
      struggles: ["構造や定義が見えない、ふわっとした説明は落ち着かない", "体験やノリで進む場面や、正解のない雑談的な議論は消耗しやすい", "見た目や雰囲気など、言葉にしにくい情報の扱いが後回しになりやすい"],
      learning: ["自分の言葉でノートにまとめ直し、見出し・箇条書き・表で構造化する", "新しい概念は、定義とほかの概念との違いを書き出す", "目次や全体の体系を先に把握してから、細部に入る", "用語集や一問一答を自分で作る"],
      receive: ["口頭で済ませず、文章や箇条書きで残す", "結論・理由・具体例の順に、筋道を明確にする", "あいまいな言葉を避け、定義や条件をはっきり伝える"],
      express: ["正確さを求めて情報量が多くなりがちなので、相手に合わせて要点を絞る", "「つまり」で始まる一文の要約を最初に置く", "映像タイプの相手には図や例を、聴覚タイプの相手には口頭の要約を添える"],
      work: ["要件定義・ドキュメント作成・ナレッジ管理など、情報を構造化する仕事", "法務・経理・研究など、正確な言葉とルールを扱う仕事", "議論を整理し、論点をまとめる役割"],
      cover: ["体験型の場面では、終わったあとに要点を書き出して自分の体系に組み込む", "雰囲気や見た目の情報も、あえて言葉にしてメモしておく"],
    },
    en: {
      summary: "You work with words as they are and think by categorizing and structuring. Organizing information like headings and bullet points comes naturally, and clear definitions and logic deepen your understanding.",
      strengths: ["Categorizing and structuring information logically", "Reading text precisely and noticing subtle differences in wording", "Understanding and remembering rules and systems as a whole", "Writing clear documents — minutes, manuals"],
      struggles: ["Vague explanations with no visible structure or definitions feel unsettling", "Learning by feel or open-ended chatty discussions can be draining", "Information that's hard to put into words — looks, atmosphere — tends to get sidelined"],
      learning: ["Rewrite notes in your own words, structured with headings, bullets, and tables", "For new concepts, write out the definition and how it differs from others", "Get the table of contents or overall system first, then dive into details", "Make your own glossary or Q&A sets"],
      receive: ["Leave it in writing or bullet points, not just spoken", "Make the logic clear: conclusion, reason, example", "Avoid vague wording; state definitions and conditions clearly"],
      express: ["Precision can lead to too much detail — trim to what the listener needs", "Open with a one-sentence summary starting with \"In short\"", "Add diagrams or examples for visual listeners, a spoken summary for auditory ones"],
      work: ["Structuring information — requirements, documentation, knowledge management", "Work with precise language and rules — legal, accounting, research", "Organizing discussions and summarizing the issues"],
      cover: ["After hands-on sessions, write down the key points and fit them into your system", "Deliberately put looks and atmosphere into words in your notes"],
    },
  },
  radio: {
    ja: {
      summary: "言葉を「音」として耳から取り入れ、処理するタイプです。人の話をそのまま覚えていたり、声に出すことで考えがまとまったりします。会話や講義から学ぶのが得意です。",
      strengths: ["人の話や講義の内容を、言い回しまで正確に覚えている", "話しながら考えを整理し、口頭で分かりやすく説明できる", "語呂合わせや音読で、効率よく暗記できる", "会議やヒアリングで、発言の要点を聞き取るのが得意"],
      struggles: ["文字だけの資料を黙読し続けると、内容が入りにくい", "騒がしい場所や、話し声のある環境では集中しにくい", "図や表だけで説明されると、意味をつかむまで時間がかかる"],
      learning: ["教科書は音読するか、読み上げ機能で耳から聞く", "講義・オーディオブック・ポッドキャストを活用する", "覚えたい内容を、人に説明するつもりで声に出して話す", "語呂合わせや、リズムのある唱え方で暗記する"],
      receive: ["資料を渡すだけでなく、口頭で要点を説明する", "大事なことは、繰り返し言葉にして伝える", "音声メッセージや通話など、耳で受け取れる手段も用意する"],
      express: ["話すと伝わる反面、記録が残りにくいので、要点は文字でも送る", "相手が視覚タイプなら、話の内容を図や資料で補う", "早口になりやすいときは、区切りと間を意識する"],
      work: ["営業・接客・電話対応など、会話が中心の仕事", "ファシリテーション・インタビュー・講師など、聞く・話すを扱う役割", "口頭での引き継ぎや調整を担う仕事"],
      cover: ["資料は、要点を声に出して確認しながら読む", "図や表は「これは〜を表している」と言葉で説明しながら見る"],
    },
    en: {
      summary: "You take in and process words as sound. You remember what people said, and speaking out loud helps your thoughts come together. You learn well from conversations and lectures.",
      strengths: ["Remembering talks and lectures down to the exact phrasing", "Organizing thoughts by talking and explaining clearly out loud", "Memorizing efficiently with mnemonics and reading aloud", "Catching the key points in meetings and interviews"],
      struggles: ["Silently reading text-only material for long stretches doesn't sink in", "Noisy places or nearby conversations make focus hard", "Explanations with only diagrams or tables take time to grasp"],
      learning: ["Read textbooks aloud, or listen with text-to-speech", "Use lectures, audiobooks, and podcasts", "Say what you want to remember out loud, as if explaining it to someone", "Memorize with mnemonics or rhythmic chanting"],
      receive: ["Don't just hand over documents — explain the key points aloud", "Repeat important things in words", "Offer ways to receive by ear — voice messages, calls"],
      express: ["Talking works, but leaves no record — send the key points in writing too", "For visual listeners, back up what you say with diagrams or documents", "If you tend to speak fast, pause between points"],
      work: ["Conversation-centered work — sales, customer service, phone support", "Roles built on listening and speaking — facilitation, interviews, teaching", "Handling verbal handoffs and coordination"],
      cover: ["Read documents while saying the key points out loud", "Look at diagrams while describing them in words — \"this shows…\""],
    },
  },
  sound: {
    ja: {
      summary: "言葉の意味よりも、音色・リズム・抑揚といった「音そのもの」に敏感なタイプです。声のトーンから相手の気持ちを感じ取ったり、リズムに乗せると覚えやすかったりします。",
      strengths: ["声のトーンや話し方の変化から、相手の気持ちや本音を感じ取れる", "メロディやリズムに乗せると、長い内容も覚えやすい", "場の雰囲気や空気の変化に敏感", "発音やイントネーションをまねるのが得意"],
      struggles: ["雑音が多い環境では、気が散ったり疲れたりしやすい", "抑揚のない話や単調な読み上げは、内容が入りにくい", "音のない文字や図だけの情報は、印象に残りにくい"],
      learning: ["覚えたい内容を、リズムやメロディに乗せて唱える", "好みのBGMなど、集中しやすい音の環境を整える", "外国語は、シャドーイングで発音と抑揚ごとまねる", "声に強弱をつけて音読し、大事なところを音で区別する"],
      receive: ["内容だけでなく、声のトーンや話す速さにも気を配る", "大事なところは、声の強弱や間で区切って伝える", "テキストだけのやりとりより、通話や対面で話す機会をつくる"],
      express: ["声の調子で伝わる分、言葉が少なくなりがちなので、要点は言葉にする", "相手が辞書タイプなら、文章や箇条書きでも共有する", "感じ取った「空気」は、根拠と一緒に伝える"],
      work: ["音声・映像・音楽など、音を扱う仕事", "相談・カウンセリング・接客など、声から相手の状態を読む役割", "ナレーションや発表など、声で伝える仕事"],
      cover: ["静かな場所や耳栓・ノイズキャンセリングで、音の刺激を調整する", "文字資料は、リズムよく音読して「音」に変えて覚える"],
    },
    en: {
      summary: "You're more tuned to sound itself — tone, rhythm, inflection — than to the meaning of words. You sense feelings from someone's voice, and things set to rhythm are easier to remember.",
      strengths: ["Sensing people's feelings and true intentions from changes in their voice", "Remembering long content when it's set to melody or rhythm", "Picking up on shifts in mood or atmosphere", "Imitating pronunciation and intonation"],
      struggles: ["Noisy environments are distracting and tiring", "Flat, monotonous talks or readings are hard to absorb", "Silent information — text or diagrams alone — doesn't leave much impression"],
      learning: ["Chant what you want to remember to a rhythm or melody", "Set up a sound environment that helps you focus, like favorite background music", "For languages, shadow speakers to copy pronunciation and intonation", "Read aloud with emphasis to mark the important parts by sound"],
      receive: ["Mind your tone and pace, not just the content", "Mark key points with vocal emphasis and pauses", "Make time for calls or face-to-face talks, not just text"],
      express: ["Your tone carries a lot, so you may use fewer words — state the key points explicitly", "For dictionary-type listeners, share it in writing or bullets too", "When you sense the \"mood\", share the cues behind it"],
      work: ["Working with sound — audio, video, music", "Reading people through their voice — counseling, customer service", "Communicating by voice — narration, presentations"],
      cover: ["Adjust sound input with quiet spaces, earplugs, or noise canceling", "Turn text into sound by reading it aloud rhythmically"],
    },
  },
};
