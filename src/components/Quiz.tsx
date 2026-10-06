"use client";

import { useRouter } from "next/navigation";
import { useEffect, useEffectEvent, useRef, useState } from "react";
import { UI } from "@/lib/content";
import { fill, localePath, type Lang } from "@/lib/i18n";
import { saveLastResult } from "@/lib/last-result";
import { QUESTIONS } from "@/lib/questions";
import { clearProgress, parseProgress, saveProgress, useSavedProgressRaw } from "@/lib/quiz-progress";
import { ANSWER_VALUES, encodeAnswers, type Answer } from "@/lib/scoring";
import { SITE_TEXT } from "@/lib/site-text";

export function Quiz({ lang }: { lang: Lang }) {
  const u = UI[lang];
  const t = SITE_TEXT[lang];
  const router = useRouter();
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<readonly (Answer | undefined)[]>(() => QUESTIONS.map(() => undefined));
  const [fade, setFade] = useState<"fadein" | "fadeout">("fadein");
  // フェード中の連打（キーボードの押しっぱなし等）で2問ぶん進まないようにする
  const busy = useRef(false);
  const saved = parseProgress(useSavedProgressRaw());
  const [resumeHandled, setResumeHandled] = useState(false);
  const fresh = idx === 0 && answers.every((a) => a === undefined);
  const showResume = !resumeHandled && fresh && saved !== null && saved.answers.some((a) => a !== null);
  const total = QUESTIONS.length;
  const q = QUESTIONS[idx].text[lang];
  const optionLabel: Record<Answer, string> = { 0: u.optA0, 1: u.optA1, 2: u.opt2, 3: u.optB3, 4: u.optB4 };

  const finish = (all: readonly (Answer | undefined)[]) => {
    const complete = all.filter((v): v is Answer => v !== undefined);
    if (complete.length !== total) throw new Error(`Quiz finished with ${complete.length}/${total} answers`);
    const code = encodeAnswers(complete);
    clearProgress();
    saveLastResult(code);
    router.push(localePath(lang, `/r/${code}`));
  };

  const transition = (next: () => void) => {
    if (busy.current) return;
    busy.current = true;
    setFade("fadeout");
    setTimeout(() => {
      next();
      setFade("fadein");
      busy.current = false;
    }, 200);
  };

  const answer = (v: Answer) =>
    transition(() => {
      const next = answers.map((a, i) => (i === idx ? v : a));
      setAnswers(next);
      setResumeHandled(true);
      if (idx < total - 1) {
        setIdx(idx + 1);
        saveProgress({ answers: next.map((a) => a ?? null), idx: idx + 1 });
      } else finish(next);
    });

  const goBack = () =>
    idx > 0 &&
    transition(() => {
      setIdx(idx - 1);
      saveProgress({ answers: answers.map((a) => a ?? null), idx: idx - 1 });
    });

  const resume = () => {
    if (!saved) return;
    setAnswers(saved.answers.map((a) => a ?? undefined));
    setIdx(saved.idx);
    setResumeHandled(true);
  };
  const restart = () => {
    clearProgress();
    setResumeHandled(true);
  };

  // 1〜5キーで回答、←キーで1問戻る
  const onKey = useEffectEvent((e: KeyboardEvent) => {
    if (showResume || e.metaKey || e.ctrlKey || e.altKey) return;
    const n = Number(e.key);
    if (Number.isInteger(n) && n >= 1 && n <= 5) answer((n - 1) as Answer);
    else if (e.key === "ArrowLeft") goBack();
  });
  useEffect(() => {
    const handler = (e: KeyboardEvent) => onKey(e);
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);
  const current = answers[idx];

  return (
    <div style={{ paddingTop: 32, paddingBottom: 40 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: "var(--text)" }}>
          Q{idx + 1}
          <span style={{ color: "var(--muted)", fontWeight: 400 }}> / {total}</span>
        </span>
        <span style={{ fontSize: 14, color: "var(--muted)" }}>{Math.round((idx / total) * 100)}%</span>
      </div>
      <div className="progress" style={{ marginBottom: 24 }}>
        <div className="progress-fill" style={{ width: `${(idx / total) * 100}%` }} />
      </div>
      {showResume && saved && (
        <div className="resume" role="status">
          <p style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>{t.resumeTitle}</p>
          <p style={{ fontSize: 14, color: "var(--sub)" }}>{fill(t.resumeLead, saved.answers.filter((a) => a !== null).length)}</p>
          <div className="resume-actions">
            <button className="primary-btn" onClick={resume}>
              {t.resumeBtn}
            </button>
            <button className="secondary-btn" onClick={restart}>
              {t.restartBtn}
            </button>
          </div>
        </div>
      )}
      {idx === 0 && <p className="quiz-note">{u.quizNote}</p>}
      <div className={fade} key={idx}>
        <h1 className="quiz-question" style={{ fontSize: 20, fontWeight: 700, lineHeight: 1.7, color: "var(--text)", marginBottom: 24 }}>
          {q.stem}
        </h1>
        <div className="pair">
          <button className={`pair-card${current !== undefined && current < 2 ? " chosen" : ""}`} onClick={() => answer(0)}>
            <span className="pair-tag">A</span>
            {q.a}
          </button>
          <button className={`pair-card side-b${current !== undefined && current > 2 ? " chosen" : ""}`} onClick={() => answer(4)}>
            <span className="pair-tag">B</span>
            {q.b}
          </button>
        </div>
        <div className="scale" role="radiogroup" aria-label={q.stem}>
          {ANSWER_VALUES.map((v) => (
            <button
              key={v}
              role="radio"
              aria-checked={current === v}
              aria-label={optionLabel[v]}
              title={optionLabel[v]}
              className={`scale-dot s${v}${current === v ? " on" : ""}`}
              onClick={() => answer(v)}
            />
          ))}
        </div>
        <div className="scale-labels">
          <span>{u.nearA}</span>
          <span>{u.nearB}</span>
        </div>
      </div>
      {idx > 0 && (
        <div style={{ marginTop: 24 }}>
          <button className="back-link" onClick={goBack}>
            {u.prevQ}
          </button>
        </div>
      )}
      <p className="key-hint">{t.keyHint}</p>
    </div>
  );
}
