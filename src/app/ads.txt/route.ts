import { ADSENSE_CLIENT } from "@/lib/monetize-config";

/** AdSense の ads.txt。パブリッシャーIDが未設定なら404 */
export function GET() {
  if (!ADSENSE_CLIENT) return new Response("Not Found", { status: 404 });
  const pub = ADSENSE_CLIENT.replace(/^ca-/, "");
  return new Response(`google.com, ${pub}, DIRECT, f08c47fec0942fa0\n`, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
