import { useSyncExternalStore } from "react";
import { QUESTIONS } from "./questions";
import type { Answer } from "./scoring";

const KEY = "cognitive-traits:quiz-progress";
const EVENT = "quiz-progress-change";
/** 設問を差し替えたら上げる。古い途中データは再開に使わない */
const VERSION = 2;

export type Progress = { answers: (Answer | null)[]; idx: number };

const isAnswerOrNull = (v: unknown): v is Answer | null => v === null || (typeof v === "number" && Number.isInteger(v) && v >= 0 && v <= 4);

/** 保存されている文字列を検証して途中データに戻す。壊れていれば null */
export const parseProgress = (raw: string | null): Progress | null => {
  if (!raw) return null;
  try {
    const data: unknown = JSON.parse(raw);
    if (typeof data !== "object" || data === null) return null;
    const { v, answers, idx } = data as Record<string, unknown>;
    if (v !== VERSION || !Array.isArray(answers) || answers.length !== QUESTIONS.length || !answers.every(isAnswerOrNull)) return null;
    if (typeof idx !== "number" || !Number.isInteger(idx) || idx < 0 || idx >= QUESTIONS.length) return null;
    return { answers, idx };
  } catch {
    return null;
  }
};

const write = (value: string | null) => {
  try {
    if (value === null) window.localStorage.removeItem(KEY);
    else window.localStorage.setItem(KEY, value);
    window.dispatchEvent(new Event(EVENT));
  } catch {
    // 保存できない環境（プライベートモード等）では再開機能が使えないだけ
  }
};

export const saveProgress = (p: Progress) => write(JSON.stringify({ v: VERSION, ...p }));
export const clearProgress = () => write(null);

const read = (): string | null => {
  try {
    return window.localStorage.getItem(KEY);
  } catch {
    return null;
  }
};

const subscribe = (cb: () => void) => {
  window.addEventListener(EVENT, cb);
  return () => window.removeEventListener(EVENT, cb);
};

/** 保存済みの途中データ（生の文字列）。SSR時は null */
export const useSavedProgressRaw = (): string | null => useSyncExternalStore(subscribe, read, () => null);
