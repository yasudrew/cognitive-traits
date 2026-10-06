import type { Lang } from "./i18n";

const BCP47: Record<Lang, string> = { ja: "ja-JP", en: "en-US" };

/** ブラウザの読み上げ機能が使えるか */
export const canSpeak = (): boolean => typeof window !== "undefined" && "speechSynthesis" in window && typeof SpeechSynthesisUtterance !== "undefined";

const pickVoice = (lang: Lang): SpeechSynthesisVoice | undefined => {
  const voices = window.speechSynthesis.getVoices();
  const prefix = BCP47[lang].slice(0, 2);
  return voices.find((v) => v.lang === BCP47[lang] && v.localService) ?? voices.find((v) => v.lang.startsWith(prefix));
};

/**
 * 1語を読み上げ、読み終わったら resolve する。
 * 一部のブラウザは end イベントを出さないことがあるため、一定時間で打ち切る。
 */
export const speak = (text: string, lang: Lang, timeoutMs = 4_000): Promise<void> =>
  new Promise((resolve) => {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = BCP47[lang];
    const voice = pickVoice(lang);
    if (voice) u.voice = voice;
    u.rate = 0.9;
    const timer = window.setTimeout(resolve, timeoutMs);
    const done = () => {
      window.clearTimeout(timer);
      resolve();
    };
    u.onend = done;
    u.onerror = (e) => {
      console.error("Speech synthesis failed", e.error);
      done();
    };
    window.speechSynthesis.speak(u);
  });

export const stopSpeaking = () => {
  if (canSpeak()) window.speechSynthesis.cancel();
};
