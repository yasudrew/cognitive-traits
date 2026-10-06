import type { Lang } from "./i18n";
import type { PairKind } from "./pair";

export const PAIR_TEXT = {
  ja: {
    inviteCardTitle: "友だちと相性を見る",
    inviteCardLead: "招待リンクを送ると、相手が診断したあとに2人の相性と、お互いへの伝え方がわかります。",
    inviteShareText: "認知特性の相性診断しよう！私は「%s」でした。あなたは？",
    inviteTitle: "相性診断への招待",
    inviteLead: "「%s」の友だちから、相性診断の招待が届いています。30問に答えると、2人の情報の受け取り方の違いと、お互いへの伝え方がわかります。",
    inviteStart: "診断して相性を見る",
    inviteUseMine: "前回の自分の結果で相性を見る",
    pairTitle: "2人の相性",
    pairMetaTitle: "相性診断：%s × %s",
    you: "招待した人",
    friend: "診断した人",
    matchLabel: "似ている度",
    kinds: {
      twin: { title: "そっくりペア", desc: "情報の受け取り方がよく似ています。説明の仕方や覚え方が近いので、言わなくても通じやすい2人です。その分、苦手な形式も同じになりがちなので、ときどき別の伝え方も試してみてください。" },
      balanced: { title: "ちょうどいいペア", desc: "似ているところと違うところが、ほどよく混ざっています。共通の得意を土台にしながら、違う部分でお互いの見落としを補える2人です。" },
      complement: { title: "補い合うペア", desc: "情報の受け取り方がはっきり違います。すれ違いも起きやすい一方で、片方が苦手な形式をもう片方が得意としているので、組むと視野が大きく広がる2人です。" },
    } satisfies Record<PairKind, { title: string; desc: string }>,
    sharedTitle: "共通の得意",
    sharedNone: "2人とも強く出ているタイプはありませんでした。",
    gapsTitle: "違いが大きいところ",
    gapsNone: "大きな違いはありませんでした。",
    gapLine: "「%s」は%sの方が強め",
    tellTitle: "%sに伝えるときは",
    retake: "もう一度診断する",
    seeMine: "自分の結果を見る",
    shareTitle: "相性をシェアする",
    shareText: "認知特性の相性は「%s」（似ている度%s%）でした！",
    ogLead: "認知特性の相性",
  },
  en: {
    inviteCardTitle: "Check compatibility with a friend",
    inviteCardLead: "Send an invite link. After your friend takes the assessment, you'll both see your compatibility and how to communicate with each other.",
    inviteShareText: "Let's compare our cognitive styles! I'm \"%s\". What are you?",
    inviteTitle: "You're invited to a compatibility check",
    inviteLead: "A friend who is \"%s\" invited you. Answer 30 questions to see how the two of you take in information differently, and how to communicate with each other.",
    inviteStart: "Take the assessment",
    inviteUseMine: "Use my previous result",
    pairTitle: "Your compatibility",
    pairMetaTitle: "Compatibility: %s × %s",
    you: "Inviter",
    friend: "Friend",
    matchLabel: "Similarity",
    kinds: {
      twin: { title: "Mirror pair", desc: "You take in information in very similar ways, so you tend to understand each other without much explanation. Since you may share the same blind spots, try other formats now and then." },
      balanced: { title: "Well-balanced pair", desc: "You have a healthy mix of similarities and differences. You can build on shared strengths while covering each other's blind spots." },
      complement: { title: "Complementary pair", desc: "You take in information quite differently. Misunderstandings can happen, but each of you is strong where the other is weak, so together you see much more." },
    } satisfies Record<PairKind, { title: string; desc: string }>,
    sharedTitle: "Shared strengths",
    sharedNone: "No type came out strongly for both of you.",
    gapsTitle: "Biggest differences",
    gapsNone: "No big differences.",
    gapLine: "%s is stronger for the %s",
    tellTitle: "When explaining to the %s",
    retake: "Retake the assessment",
    seeMine: "See my result",
    shareTitle: "Share your compatibility",
    shareText: "Our cognitive-style compatibility: \"%s\" (%s% similar)!",
    ogLead: "Cognitive style compatibility",
  },
} as const satisfies Record<Lang, Record<string, unknown>>;

/** fill の %s を順番に埋める版 */
export const fillAll = (template: string, ...values: (string | number)[]): string =>
  values.reduce<string>((s, v) => s.replace(/%s/, String(v)), template);
