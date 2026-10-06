/**
 * 計測・広告・アフィリエイトの設定。どれも環境変数で有効化し、未設定なら何も読み込まない。
 * - NEXT_PUBLIC_GA_ID            … Google アナリティクス 4 の測定ID（G-XXXXXXX）
 * - NEXT_PUBLIC_ADSENSE_CLIENT   … AdSense のパブリッシャーID（ca-pub-XXXXXXXXXXXXXXXX）
 * - NEXT_PUBLIC_ADSENSE_SLOT     … AdSense の広告ユニットID（数字）
 * - NEXT_PUBLIC_AMAZON_TAG       … Amazonアソシエイトのトラッキングタグ（xxxx-22）
 */
const env = (v: string | undefined): string | null => (v && v.trim() ? v.trim() : null);

export const GA_ID = env(process.env.NEXT_PUBLIC_GA_ID);
export const ADSENSE_CLIENT = env(process.env.NEXT_PUBLIC_ADSENSE_CLIENT);
export const ADSENSE_SLOT = env(process.env.NEXT_PUBLIC_ADSENSE_SLOT);
export const AMAZON_TAG = env(process.env.NEXT_PUBLIC_AMAZON_TAG);

/** Cookie同意の保存キー（サーバー側の読み込みスクリプトとクライアントで共有する） */
export const CONSENT_STORAGE_KEY = "cognitive-traits:consent";

/** Cookieの同意を聞く必要がある外部サービスが1つでも有効か */
export const NEEDS_CONSENT = Boolean(GA_ID || ADSENSE_CLIENT);
