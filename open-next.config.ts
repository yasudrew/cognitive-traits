import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

/**
 * 事前生成したページ（記事・タイプ別ページなど）は静的ファイルから返す。
 * 時間がたったら作り直す（ISR）ページは無いので、R2 などの保存先は使わない。
 */
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
  enableCacheInterception: true,
});
