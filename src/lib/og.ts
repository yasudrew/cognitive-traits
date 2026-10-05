/**
 * OG画像用に、使う文字だけを含む日本語フォントをGoogle Fontsから取得する。
 * User-Agentを付けないとTTFが返るので、Satoriでそのまま使える。
 */
export async function loadOgFont(text: string, weight: 700 | 900): Promise<ArrayBuffer> {
  const cssUrl = `https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+New:wght@${weight}&text=${encodeURIComponent(text)}`;
  const css = await fetch(cssUrl).then((r) => {
    if (!r.ok) throw new Error(`Font CSS request failed: ${r.status} ${cssUrl}`);
    return r.text();
  });
  const src = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)?.[1];
  if (!src) throw new Error(`Font URL not found in Google Fonts CSS for weight ${weight}`);
  const res = await fetch(src);
  if (!res.ok) throw new Error(`Font file request failed: ${res.status} ${src}`);
  return res.arrayBuffer();
}

export const OG_SIZE = { width: 1200, height: 630 } as const;
