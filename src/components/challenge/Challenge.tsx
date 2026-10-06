"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useEffectEvent, useRef, useState } from "react";
import {
  MEMORY_STUDY_MS,
  ROTATION_TIME_LIMIT_MS,
  VIVIDNESS_ITEMS,
  WORD_GAP_MS,
  WORD_SHOW_MS,
  encodeChallenge,
  makeMemoryRound,
  makeRotationTrials,
  makeWordRound,
  scoreWords,
  type MemoryRound,
  type RotationTrial,
  type WordRound,
  type WordScore,
} from "@/lib/challenge";
import { track } from "@/lib/analytics";
import { CHALLENGE_TEXT, VIVIDNESS_PROMPTS } from "@/lib/challenge-text";
import type { TypeId } from "@/lib/content";
import { fill, localePath, type Lang } from "@/lib/i18n";
import { saveLastResult } from "@/lib/last-result";
import { canSpeak, speak, stopSpeaking } from "@/lib/speech";
import { MemoryIcon } from "./MemoryIcon";
import { Polycube } from "./Polycube";

type RotationLog = { correct: boolean; ms: number };

/** 前半3課題の結果。音声の課題に進むときに持ち回る */
type Base = { rotation: RotationLog[]; memoryCorrect: number; viv: Record<TypeId, number> };
type WordMode = "visual" | "audio";
const wordOrder = (round: WordRound): [WordMode, WordMode] => (round.visualFirst ? ["visual", "audio"] : ["audio", "visual"]);

type Phase =
  | { step: "intro" }
  | { step: "rotation"; trials: RotationTrial[]; log: RotationLog[] }
  | { step: "memoryStudy"; round: MemoryRound; rotation: RotationLog[] }
  | { step: "memoryTest"; round: MemoryRound; rotation: RotationLog[]; correct: number; idx: number }
  | { step: "vividness"; rotation: RotationLog[]; memoryCorrect: number; viv: Partial<Record<TypeId, number>> }
  | { step: "wordIntro"; base: Base; checked: boolean }
  | { step: "wordStudy"; base: Base; round: WordRound; part: 0 | 1 }
  | { step: "wordBreak"; base: Base; round: WordRound }
  | { step: "wordTest"; base: Base; round: WordRound; selected: string[] }
  | { step: "done" };

/** 進捗バー（3つの課題を通した位置） */
function Progress({ section, of, label }: { section: number; of: number; label: string }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, marginBottom: 8 }}>
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
      <div className="pair" style={{ marginTop: 24 }}>
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

/** 単語を1つずつ、文字で見せる／音声で読み上げる */
function WordStudy({ words, mode, lang, onDone }: { words: readonly string[]; mode: WordMode; lang: Lang; onDone: () => void }) {
  const c = CHALLENGE_TEXT[lang];
  const [cur, setCur] = useState(-1);
  const done = useEffectEvent(onDone);
  useEffect(() => {
    let cancelled = false;
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    const run = async () => {
      await sleep(800);
      for (let i = 0; i < words.length; i++) {
        if (cancelled) return;
        setCur(i);
        if (mode === "audio") {
          await speak(words[i], lang);
        } else {
          await sleep(WORD_SHOW_MS);
          if (cancelled) return;
          setCur(-1);
        }
        await sleep(WORD_GAP_MS);
      }
      if (!cancelled) done();
    };
    void run();
    return () => {
      cancelled = true;
      stopSpeaking();
    };
  }, [words, mode, lang]);

  return (
    <div className="fadein">
      <p style={{ fontSize: 14, color: "var(--sub)", textAlign: "center", marginBottom: 16 }}>{mode === "visual" ? c.visualStudy : c.audioStudy}</p>
      <div className="word-stage" aria-live="off">
        {mode === "visual" ? (cur >= 0 ? <span className="word-big">{words[cur]}</span> : null) : <span className={`speaker${cur >= 0 ? " on" : ""}`} aria-hidden>🔊</span>}
      </div>
      <p style={{ fontSize: 14, color: "var(--muted)", textAlign: "center" }}>{Math.max(cur + 1, 0)} / {words.length}</p>
    </div>
  );
}

export function Challenge({ lang, resultCode }: { lang: Lang; resultCode: string | null }) {
  const c = CHALLENGE_TEXT[lang];
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>({ step: "intro" });

  const finish = ({ rotation, memoryCorrect, viv }: Base, words: WordScore | null) => {
    const right = rotation.filter((r) => r.correct);
    const avgMs = right.length ? right.reduce((s, r) => s + r.ms, 0) / right.length : ROTATION_TIME_LIMIT_MS;
    const x = encodeChallenge({ rotationCorrect: right.length, rotationAvgDecisec: avgMs / 100, memoryCorrect, vividness: viv, words });
    if (!resultCode) throw new Error("Challenge finished without a main result code");
    track({ name: "challenge_complete", rotation: right.length, memory: memoryCorrect });
    const target = `${resultCode}?x=${x}`;
    saveLastResult(target);
    setPhase({ step: "done" });
    router.push(localePath(lang, `/r/${target}`));
  };

  if (phase.step === "intro") {
    return (
      <div className="fadein" style={{ paddingTop: 32, paddingBottom: 40 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>{c.introTitle}</h1>
        <p style={{ fontSize: 14, color: "var(--sub)", lineHeight: 1.9, marginBottom: 24 }}>{c.introLead}</p>
        <ol className="card" style={{ paddingLeft: 40, fontSize: 14, color: "var(--sub)", lineHeight: 2 }}>
          {c.introSteps.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
        <p style={{ fontSize: 12, color: "var(--muted)", marginBottom: 24 }}>{c.introTime}</p>
        {resultCode ? (
          <button className="primary-btn" onClick={() => {
              track({ name: "challenge_start" });
              setPhase({ step: "rotation", trials: makeRotationTrials(), log: [] });
            }}>
            {c.start}
            <span style={{ marginLeft: 8 }}>→</span>
          </button>
        ) : (
          <>
            <p style={{ fontSize: 14, color: "var(--sub)", marginBottom: 16 }}>{c.introNeedResult}</p>
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
              <p style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>{c.memWhatAt}</p>
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
              <p style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
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
          <p style={{ fontSize: 12, color: "var(--muted)", marginBottom: 8 }}>{c.vivHelp}</p>
          <h1 className="quiz-question" style={{ fontSize: 20, fontWeight: 700, lineHeight: 1.8, marginBottom: 24 }}>
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
                  else setPhase({ step: "wordIntro", base: { rotation: phase.rotation, memoryCorrect: phase.memoryCorrect, viv: viv as Record<TypeId, number> }, checked: false });
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

  if (phase.step === "wordIntro") {
    const supported = canSpeak();
    return (
      <div style={{ paddingTop: 32, paddingBottom: 40 }}>
        <Progress section={0} of={3} label={`4. ${c.wordTitle}`} />
        <div className="fadein">
          <p style={{ fontSize: 16, color: "var(--sub)", marginBottom: 24 }}>{supported ? c.wordIntro : c.noSpeech}</p>
          {supported ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-start" }}>
              <button className="secondary-btn" onClick={() => void speak(c.soundCheckWord, lang).then(() => setPhase({ ...phase, checked: true }))}>
                🔊 {c.soundCheck}
              </button>
              {phase.checked && <p style={{ fontSize: 14, color: "var(--muted)" }}>{c.soundCheckHint}</p>}
              <button className="primary-btn" disabled={!phase.checked} onClick={() => setPhase({ step: "wordStudy", base: phase.base, round: makeWordRound(lang), part: 0 })}>
                {c.soundReady}
              </button>
              <button className="back-link" onClick={() => finish(phase.base, null)}>
                {c.wordSkip}
              </button>
            </div>
          ) : (
            <button className="primary-btn" onClick={() => finish(phase.base, null)}>
              {c.toResult}
            </button>
          )}
        </div>
      </div>
    );
  }

  if (phase.step === "wordStudy") {
    const mode = wordOrder(phase.round)[phase.part];
    const words = mode === "visual" ? phase.round.visual : phase.round.audio;
    return (
      <div style={{ paddingTop: 32, paddingBottom: 40 }}>
        <Progress section={phase.part + 1} of={3} label={`4. ${c.wordTitle}`} />
        <WordStudy
          key={`${phase.part}-${mode}`}
          words={words}
          mode={mode}
          lang={lang}
          onDone={() => setPhase(phase.part === 0 ? { step: "wordBreak", base: phase.base, round: phase.round } : { step: "wordTest", base: phase.base, round: phase.round, selected: [] })}
        />
      </div>
    );
  }

  if (phase.step === "wordBreak") {
    // 2つ目のリストの前にボタンを挟む（音声の再生をユーザー操作の直後に始めるため）
    const next = wordOrder(phase.round)[1];
    return (
      <div style={{ paddingTop: 32, paddingBottom: 40 }}>
        <Progress section={1} of={3} label={`4. ${c.wordTitle}`} />
        <div className="fadein" style={{ textAlign: "center", padding: "40px 0" }}>
          <p style={{ fontSize: 16, color: "var(--sub)", marginBottom: 24 }}>{next === "audio" ? c.nextAudio : c.nextVisual}</p>
          <button className="primary-btn" onClick={() => setPhase({ step: "wordStudy", base: phase.base, round: phase.round, part: 1 })}>
            {c.next}
          </button>
        </div>
      </div>
    );
  }

  if (phase.step === "wordTest") {
    const selected = new Set(phase.selected);
    // 連続で押されても取りこぼさないよう、直前の状態から更新する
    const toggle = (w: string) =>
      setPhase((p) => (p.step === "wordTest" ? { ...p, selected: p.selected.includes(w) ? p.selected.filter((x) => x !== w) : [...p.selected, w] } : p));
    return (
      <div style={{ paddingTop: 32, paddingBottom: 40 }}>
        <Progress section={3} of={3} label={`4. ${c.wordTitle}`} />
        <div className="fadein">
          <p style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>{c.testPrompt}</p>
          <p style={{ fontSize: 14, color: "var(--muted)", marginBottom: 16 }}>{c.testHint}</p>
          <div className="word-chips">
            {phase.round.test.map((w) => (
              <button key={w} className={`word-chip${selected.has(w) ? " on" : ""}`} aria-pressed={selected.has(w)} onClick={() => toggle(w)}>
                {w}
              </button>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 24, gap: 16 }}>
            <span style={{ fontSize: 14, color: "var(--muted)" }}>{fill(c.selectedCount, selected.size)}</span>
            <button className="primary-btn" onClick={() => finish(phase.base, scoreWords(phase.round, selected))}>
              {c.testDone}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <p style={{ padding: "64px 0", textAlign: "center", color: "var(--muted)" }}>{c.finishing}</p>;
}
