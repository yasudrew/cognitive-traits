import { useSyncExternalStore } from "react";

const KEY = "cognitive-traits:last-result";
const EVENT = "last-result-change";

const read = (): string | null => {
  try {
    return window.localStorage.getItem(KEY);
  } catch {
    // プライベートモード等で使えない場合は「保存なし」として扱う
    return null;
  }
};

export const saveLastResult = (code: string): void => {
  try {
    window.localStorage.setItem(KEY, code);
    window.dispatchEvent(new Event(EVENT));
  } catch {
    // 保存できなくても結果URLは手元にあるので致命的ではない
  }
};

const subscribe = (cb: () => void) => {
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", cb);
  };
};

/** 直近の診断結果コード。SSR時は null */
export const useLastResult = (): string | null => useSyncExternalStore(subscribe, read, () => null);
