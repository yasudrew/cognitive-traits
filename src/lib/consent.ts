import { useSyncExternalStore } from "react";
import { CONSENT_STORAGE_KEY } from "./monetize-config";

export type Consent = "granted" | "denied";

const KEY = CONSENT_STORAGE_KEY;
const EVENT = "consent-change";

type Gtag = (...args: unknown[]) => void;
const gtag = (): Gtag | null => {
  const g = (window as unknown as { gtag?: Gtag }).gtag;
  return typeof g === "function" ? g : null;
};

const read = (): Consent | null => {
  try {
    const v = window.localStorage.getItem(KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
};

/** 同意状況を保存し、Google の Consent Mode に反映する */
export const setConsent = (value: Consent) => {
  try {
    window.localStorage.setItem(KEY, value);
  } catch {
    // 保存できなくても、このページ表示中は反映する
  }
  gtag()?.("consent", "update", {
    analytics_storage: value,
    ad_storage: value,
    ad_user_data: value,
    ad_personalization: value,
  });
  window.dispatchEvent(new Event(EVENT));
};

const subscribe = (cb: () => void) => {
  window.addEventListener(EVENT, cb);
  return () => window.removeEventListener(EVENT, cb);
};

/** 保存済みの同意。未選択なら null、SSR時は "pending" */
export const useConsent = (): Consent | null | "pending" => useSyncExternalStore(subscribe, read, () => "pending" as const);

