# 🧠 認知特性診断 | Cognitive Style Assessment

6タイプのうち2つを比べる質問30問に5段階で答えると、あなたの認知特性が分かる診断ツールです。全15通りの組み合わせを2問ずつ比べ、「できる・得意」ではなく「自然にそうなるか」を聞くことで、経験や訓練の影響を減らしています。

任意の「精密チャレンジ」（図形回転・見た目の記憶・イメージの鮮明さ・耳と目の単語記憶、約4分）で実際の処理を測り、自己申告の結果と並べて比較できます。耳と目の単語記憶はブラウザの読み上げ機能（Web Speech API）を使い、音を出せない場合はスキップできます。

## 6つの認知特性タイプ

| カテゴリ | タイプ | 説明 |
|---------|--------|------|
| 視覚優位 | 📷 カメラタイプ | 写真のように二次元で記憶する |
| 視覚優位 | 🎬 3Dタイプ | 空間や時間軸を使って立体的に思考する |
| 言語優位 | 📖 ファンタジータイプ | 言葉を映像化して思考する |
| 言語優位 | 🧩 辞書タイプ | 文字や文章を図式化・体系化して記憶する |
| 聴覚優位 | 🎙️ ラジオタイプ | 耳から入る言語情報で処理する |
| 聴覚優位 | 🎵 サウンドタイプ | 音色や音階の音楽的イメージで処理する |

## Tech Stack

- Next.js 16（App Router / SSG）+ TypeScript
- Vercel (hosting)

## Development

```bash
npm install
npm run dev
```

本番URLは環境変数 `NEXT_PUBLIC_SITE_URL` で指定する（未設定時は `https://cognitive-traits.vercel.app`）。canonical・OG画像・sitemap がこの値を使う。

### 環境変数（Vercel）

| 変数 | 内容 | 未設定のとき |
|------|------|------|
| `NEXT_PUBLIC_SITE_URL` | 本番URL | `https://cognitive-traits.vercel.app` |
| `NEXT_PUBLIC_GA_ID` | GA4 の測定ID（G-…） | 計測・同意バナーを出さない |
| `NEXT_PUBLIC_ADSENSE_CLIENT` | AdSense のパブリッシャーID（ca-pub-…） | AdSense のスクリプト・確認タグ・`ads.txt` を出さない |
| `NEXT_PUBLIC_ADSENSE_SLOT` | AdSense の広告ユニットID | 広告枠を出さない |
| `NEXT_PUBLIC_AMAZON_TAG` | Amazonアソシエイトのトラッキングタグ | おすすめはタグなしリンク・PR表記なし |
| `GOOGLE_SITE_VERIFICATION` | サーチコンソールの所有確認コード（HTMLタグの content の値） | 確認タグを出さない |

GA4 は Consent Mode v2 で既定を拒否にしており、同意バナーで「同意する」を選んだときだけCookieを使う。

## URL構成

| パス | 内容 |
|------|------|
| `/` | トップ（日本語。英語は `/en` を前に付ける） |
| `/quiz` | 診断 |
| `/r/{code}` | 診断結果（30問の回答をコード化した共有用URL。noindex） |
| `/r/{code}?x={challenge}` | 精密チャレンジの結果を含む診断結果 |
| `/challenge?r={code}` | 精密チャレンジ（本診断の結果コードを引き継ぐ） |
| `/r/{code}/story` | 結果のストーリーズ用画像（1080×1920 PNG） |
| `/pair/{A}` | 相性診断への招待（招待された人はここから診断） |
| `/pair/{A}/{B}` | 2人の相性（似ている度・ペアの種類・お互いへの伝え方。noindex） |
| `/types` `/types/{id}` | タイプ一覧・タイプ別ページ |
| `/about` | 認知特性とは |
| `/articles` `/articles/{slug}` | 読みもの（タイプ別の記事。日本語のみ） |
| `/privacy` `/operator` | プライバシーポリシー・運営者情報（`src/lib/legal-text.ts` の【要記入】を埋めるまで noindex） |

日本語ページは `src/proxy.ts` で `/ja/...` に内部 rewrite している。

## ディレクトリ

- `src/lib/questions.ts` — 設問（日英）と設計方針
- `src/lib/content.ts` — タイプ説明・UI文言（日英）
- `src/lib/scoring.ts` — 採点・プロフィール判定・回答の一貫性、結果コードのエンコード／デコード
- `src/lib/challenge.ts` — 精密チャレンジの課題生成・採点・結果コード（v2、v1も読める）
- `src/lib/speech.ts` — 単語の読み上げ（Web Speech API）
- `src/lib/pair.ts` / `src/lib/pair-text.ts` — 相性の計算と文言
- `src/lib/articles/` — 記事の本文データ（テーマごとのファイル）と一覧・関連記事の取得
- `src/lib/guides.ts` — タイプ別の詳しい解説（日英）
- `src/lib/monetize-config.ts` / `src/lib/recommendations.ts` — 計測・広告・アフィリエイトの設定とタイプ別おすすめ
- `src/lib/site-text.ts` / `src/lib/legal-text.ts` — トップ・FAQ・規約ページの文言
- `src/app/[lang]/` — 各ページと OG 画像

## 参考

本田真美氏の認知特性理論（本田40式認知特性テスト）を参考に、独自の設問で作成した非公式版です。本田式認知特性研究所とは関係ありません。
