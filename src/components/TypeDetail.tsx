import { UI, type TypeText } from "@/lib/content";
import type { Lang } from "@/lib/i18n";

/** 得意なインプット・学習法・業務スタイルの3行 */
export function TypeDetail({ type, lang }: { type: TypeText; lang: Lang }) {
  const u = UI[lang];
  const rows = [
    [u.inputLabel, type.input],
    [u.learningLabel, type.learning],
    [u.workLabel, type.workstyle],
  ] as const;
  return (
    <div style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.8 }}>
      {rows.map(([label, text], i) => (
        <p key={label} style={i < rows.length - 1 ? { marginBottom: 4 } : undefined}>
          <span style={{ color: "var(--sub)", fontWeight: 600 }}>{label}</span>
          {text}
        </p>
      ))}
    </div>
  );
}
