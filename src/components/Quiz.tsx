"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { QUESTIONS, QUESTION_ORDER, UI } from "@/lib/content";
import { localePath, type Lang } from "@/lib/i18n";
import { saveLastResult } from "@/lib/last-result";
import { computeScores, encodeScores, type Answers } from "@/lib/scoring";

const LIKERT_VALUES = [5, 4, 3, 2, 1] as const;

export function Quiz({ lang }: { lang: Lang }) {
  const u = UI[lang];
  const router = useRouter();
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [fade, setFade] = useState<"fadein" | "fadeout">("fadein");
  const totalQ = QUESTION_ORDER.length;
  const qIndex = QUESTION_ORDER[idx];
  const q = QUESTIONS[qIndex];

  const finish = (all: Answers) => {
    const code = encodeScores(computeScores(all));
    saveLastResult(code);
    router.push(localePath(lang, `/r/${code}`));
  };

  const handleAnswer = (val: number) => {
    setFade("fadeout");
    setTimeout(() => {
      const next = { ...answers, [qIndex]: val };
      setAnswers(next);
      if (idx < totalQ - 1) setIdx((i) => i + 1);
      else finish(next);
      setFade("fadein");
    }, 200);
  };

  const goBack = () => {
    if (idx === 0) return;
    setFade("fadeout");
    setTimeout(() => {
      setIdx((i) => i - 1);
      setFade("fadein");
    }, 200);
  };

  const likertLabel = (v: (typeof LIKERT_VALUES)[number]) => u[`likert${v}`];

  return (
    <div style={{ paddingTop: 32, paddingBottom: 40 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: "var(--text)" }}>
          Q{idx + 1}
          <span style={{ color: "var(--muted)", fontWeight: 400 }}> / {totalQ}</span>
        </span>
        <span style={{ fontSize: 13, color: "var(--muted)" }}>{Math.round((idx / totalQ) * 100)}%</span>
      </div>
      <div style={{ height: 3, background: "rgba(0,0,0,0.06)", borderRadius: 2, marginBottom: 32, overflow: "hidden" }}>
        <div style={{ height: "100%", borderRadius: 2, transition: "width .4s ease", width: `${(idx / totalQ) * 100}%`, background: "var(--text)" }} />
      </div>
      <div className={fade} key={idx}>
        <span style={{ display: "inline-block", padding: "3px 10px", borderRadius: 4, fontSize: 11, fontWeight: 500, background: "rgba(0,0,0,0.04)", color: "var(--muted)", marginBottom: 12 }}>
          {lang === "en" ? q.themeEn : q.themeJa}
        </span>
        <h1 className="quiz-question" style={{ fontSize: 19, fontWeight: 700, lineHeight: 1.8, color: "var(--text)", marginBottom: 28 }}>
          {lang === "en" ? q.en : q.ja}
        </h1>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {LIKERT_VALUES.map((v) => (
            <button
              key={v}
              className="likert-btn"
              onClick={() => handleAnswer(v)}
              style={answers[qIndex] === v ? { borderColor: "var(--text)", background: "rgba(0,0,0,0.02)" } : {}}
            >
              <span className="likert-num">{v}</span>
              <span>{likertLabel(v)}</span>
            </button>
          ))}
        </div>
      </div>
      {idx > 0 && (
        <div style={{ marginTop: 20 }}>
          <button className="back-link" onClick={goBack}>
            {u.prevQ}
          </button>
        </div>
      )}
    </div>
  );
}
