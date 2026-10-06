import type { Block } from "@/lib/articles";

/** 記事本文。h2 には目次から飛べるようにIDを振る */
export function ArticleBody({ blocks }: { blocks: readonly Block[] }) {
  const headingIds = new Map(blocks.flatMap((b, i) => (b.kind === "h2" ? [i] : [])).map((idx, n) => [idx, `s${n + 1}`]));
  return (
    <div className="article-body">
      {blocks.map((b, i) => {
        switch (b.kind) {
          case "h2":
            return (
              <h2 key={i} id={headingIds.get(i)}>
                {b.text}
              </h2>
            );
          case "p":
            return <p key={i}>{b.text}</p>;
          case "ul":
            return (
              <ul key={i}>
                {b.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            );
          case "steps":
            return (
              <ol key={i} className="article-steps">
                {b.items.map((it, n) => (
                  <li key={it.title}>
                    <span className="step-num">{n + 1}</span>
                    <div>
                      <h3>{it.title}</h3>
                      <p>{it.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            );
          case "note":
            return (
              <p key={i} className="article-note">
                {b.text}
              </p>
            );
        }
      })}
    </div>
  );
}

export const headingsOf = (blocks: readonly Block[]) => blocks.filter((b): b is Extract<Block, { kind: "h2" }> => b.kind === "h2").map((b, i) => ({ id: `s${i + 1}`, text: b.text }));
