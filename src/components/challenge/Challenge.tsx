"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useEffectEvent, useRef, useState } from "react";
import {
  MEMORY_STUDY_MS,
  ROTATION_TIME_LIMIT_MS,
  VIVIDNESS_ITEMS,
  encodeChallenge,
  makeMemoryRound,
  makeRotationTrials,
  type MemoryRound,
  type RotationTrial,
} from "@/lib/challenge";
import { CHALLENGE_TEXT, VIVIDNESS_PROMPTS } from "@/lib/challenge-text";
import type { TypeId } from "@/lib/content";
import { localePath, type Lang } from "@/lib/i18n";
import { saveLastResult } from "@/lib/last-result";
import { MemoryIcon } from "./MemoryIcon";
import { Polycube } from "./Polycube";

type RotationLog = { correct: boolean; ms: number };

type Phase =
  | { step: "intro" }
  | { step: "rotation"; trials: RotationTrial[]; log: RotationLog[] }
  | { step: "memoryStudy"; round: MemoryRound; rotation: RotationLog[] }
  | { step: "memoryTest"; round: MemoryRound; rotation: RotationLog[]; correct: number; idx: number }
  | { step: "vividness"; rotation: RotationLog[]; memoryCorrect: number; viv: Partial<Record<TypeId, number>> }
  | { step: "done" };

/** 進捗バー（3つの課題を通した位置） */
function Progress({ section, of, label }: { section: number; of: number; label: string }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6 }}>
        <span style={{ fontWeight: 700 }}>{label}</span>
        <span style={{ color: "var(--muted)" }}>
          {section} / {of}
        </span>
      </div>
      <div className="progress">
        <div className="progress-fill" style={{ width: `${(section / of) * 100}%` }} />
      </div>
    </div>
  );
}

function RotationStep({ trial, onAnswer, lang }: { trial: RotationTrial; onAnswer: (log: RotationLog) => void; lang: Lang }) {
  const c = CHALLENGE_TEXT[lang];
  const started = useRef(0);
  const finish = (saidMirror: boolean | null) => {
    const ms = performance.now() - started.current;
    onAnswer({ correct: saidMirror === trial.mirrored, ms });
  };
  const timeout = useEffectEvent(() => finish(null));
  useEffect(() => {
    started.current = performance.now();
    // 制限時間を過ぎたら不正解として次へ
    const t = setTimeout(() => timeout(), ROTATION_TIME_LIMIT_MS);
    return () => clearTimeout(t);
  }, [trial]);

  return (
    <div className="fadein">
      <p style={{ fontSize: 14, color: "var(--sub)", lineHeight: 1.8, marginBottom: 16 }}>{c.rotHelp}</p>
      <div className="rot-pair">
        <Polycube cubes={trial.cubes} angle={trial.baseAngle} size={150} />
        <Polycube cubes={trial.cubes} angle={trial.baseAngle + trial.turn} mirrored={trial.mirrored} size={150} />
      </div>
      <div className="pair" style={{ marginTop: 20 }}>
        <button className="secondary-btn choice-btn" onClick={() => finish(false)}>
          {c.rotSame}
        </button>
        <button className="secondary-btn choice-btn" onClick={() => finish(true)}>
          {c.rotMirror}
        </button>
      </div>
    </div>
  );
}

function MemoryStudy({ round, onDone, lang }: { round: MemoryRound; onDone: () => void; lang: Lang }) {
  const c = CHALLENGE_TEXT[lang];
  const done = useEffectEvent(onDone);
  useEffect(() => {
    const t = setTimeout(() => done(), MEMORY_STUDY_MS);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className="fadein">
      <p style={{ fontSize: 14, color: "var(--sub)", marginBottom: 12, textAlign: "center" }}>{c.memStudy}</p>
      <div className="countdown" style={{ animationDuration: `${MEMORY_STUDY_MS}ms` }} />
      <div className="mem-grid">
        {round.grid.map((item, i) => (
          <div key={i} className="mem-cell">
            <MemoryIcon shape={item.shape} color={item.color} size={56} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function Challenge({ lang, resultCode }: { lang: Lang; resultCode: string | null }) {
  const c = CHALLENGE_TEXT[lang];
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>({ step: "intro" });

  const finish = (rotation: RotationLog[], memoryCorrect: number, viv: Record<TypeId, number>) => {
    const right = rotation.filter((r) => r.correct);
    const avgMs = right.length ? right.reduce((s, r) => s + r.ms, 0) / right.length : ROTATION_TIME_LIMIT_MS;
    const x = encodeChallenge({ rotationCorrect: right.length, rotationAvgDecisec: avgMs / 100, memoryCorrect, vividness: viv });
    if (!resultCode) throw new Error("Challenge finished without a main result code");
    const target = `${resultCode}?x=${x}`;
    saveLastResult(target);
    setPhase({ step: "done" });
    router.push(localePath(lang, `/r/${target}`));
  };

  if (phase.step === "intro") {
    return (
      <div className="fadein" style={{ paddingTop: 32, paddingBottom: 40 }}>
        <h1 style={{ fontSize: 24, fontWeight: 900, marginBottom: 12 }}>{c.introTitle}</h1>
        <p style={{ fontSize: 14, color: "var(--sub)", lineHeight: 1.9, marginBottom: 20 }}>{c.introLead}</p>
        <ol className="card" style={{ paddingLeft: 40, fontSize: 13, color: "var(--sub)", lineHeight: 2 }}>
          {c.introSteps.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
        <p style={{ fontSize: 12, color: "var(--muted)", marginBottom: 24 }}>{c.introTime}</p>
        {resultCode ? (
          <button className="primary-btn" onClick={() => setPhase({ step: "rotation", trials: makeRotationTrials(), log: [] })}>
            {c.start}
            <span style={{ marginLeft: 8 }}>→</span>
          </button>
        ) : (
          <>
            <p style={{ fontSize: 13, color: "var(--sub)", marginBottom: 16 }}>{c.introNeedResult}</p>
            <Link className="primary-btn" href={localePath(lang, "/quiz")}>
              {c.takeMain}
            </Link>
          </>
        )}
      </div>
    );
  }

  if (phase.step === "rotation") {
    const i = phase.log.length;
    return (
      <div style={{ paddingTop: 32, paddingBottom: 40 }}>
        <Progress section={i + 1} of={phase.trials.length} label={`1. ${c.rotTitle}`} />
        <RotationStep
          key={i}
          trial={phase.trials[i]}
          lang={lang}
          onAnswer={(entry) => {
            const log = [...phase.log, entry];
            setPhase(log.length < phase.trials.length ? { ...phase, log } : { step: "memoryStudy", round: makeMemoryRound(), rotation: log });
          }}
        />
      </div>
    );
  }

  if (phase.step === "memoryStudy") {
    return (
      <div style={{ paddingTop: 32, paddingBottom: 40 }}>
        <Progress section={0} of={phase.round.questions.length} label={`2. ${c.memTitle}`} />
        <MemoryStudy round={phase.round} lang={lang} onDone={() => setPhase({ step: "memoryTest", round: phase.round, rotation: phase.rotation, correct: 0, idx: 0 })} />
      </div>
    );
  }

  if (phase.step === "memoryTest") {
    const q = phase.round.questions[phase.idx];
    const answer = (choice: number) => {
      const correct = phase.correct + (choice === q.answer ? 1 : 0);
      const idx = phase.idx + 1;
      setPhase(idx < phase.round.questions.length ? { ...phase, correct, idx } : { step: "vividness", rotation: phase.rotation, memoryCorrect: correct, viv: {} });
    };
    return (
      <div style={{ paddingTop: 32, paddingBottom: 40 }}>
        <Progress section={phase.idx + 1} of={phase.round.questions.length} label={`2. ${c.memTitle}`} />
        <div className="fadein" key={phase.idx}>
          {q.kind === "whatAt" ? (
            <>
              <p style={{ fontSize: 16, fontWeight: 700, marginBottom: 14 }}>{c.memWhatAt}</p>
              <div className="mem-grid small">
                {phase.round.grid.map((_, i) => (
                  <div key={i} className={`mem-cell${i === q.cell ? " target" : ""}`}>
                    {i === q.cell ? "?" : ""}
                  </div>
                ))}
              </div>
              <div className="mem-options">
                {q.options.map((o, i) => (
                  <button key={i} className="mem-option" onClick={() => answer(i)} aria-label={`${o.shape} ${o.color}`}>
                    <MemoryIcon shape={o.shape} color={o.color} size={48} />
                  </button>
                ))}
              </div>
            </>
          ) : (
            <>
              <p style={{ fontSize: 16, fontWeight: 700, marginBottom: 14, display: "flex", alignItems: "center", gap: 10 }}>
                <MemoryIcon shape={q.item.shape} color={q.item.color} size={36} />
                {c.memWhereIs}
              </p>
              <div className="mem-grid">
                {phase.round.grid.map((_, i) => (
                  <button key={i} className="mem-cell tap" onClick={() => answer(i)} aria-label={`${i + 1}`} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  if (phase.step === "vividness") {
    const done = Object.keys(phase.viv).length;
    const id = VIVIDNESS_ITEMS[done];
    return (
      <div style={{ paddingTop: 32, paddingBottom: 40 }}>
        <Progress section={done + 1} of={VIVIDNESS_ITEMS.length} label={`3. ${c.vivTitle}`} />
        <div className="fadein" key={id}>
          <p style={{ fontSize: 12, color: "var(--muted)", marginBottom: 10 }}>{c.vivHelp}</p>
          <h1 className="quiz-question" style={{ fontSize: 18, fontWeight: 700, lineHeight: 1.8, marginBottom: 20 }}>
            {VIVIDNESS_PROMPTS[id][lang]}
          </h1>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {c.vivScale.map((label, i) => (
              <button
                key={label}
                className="likert-btn"
                onClick={() => {
                  const viv = { ...phase.viv, [id]: i + 1 };
                  if (Object.keys(viv).length < VIVIDNESS_ITEMS.length) setPhase({ ...phase, viv });
                  else finish(phase.rotation, phase.memoryCorrect, viv as Record<TypeId, number>);
                }}
              >
                <span className="likert-num">{i + 1}</span>
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return <p style={{ padding: "64px 0", textAlign: "center", color: "var(--muted)" }}>{c.finishing}</p>;
}
