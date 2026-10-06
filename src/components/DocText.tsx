/** 【要記入】や [TO BE FILLED] を目立たせて表示する */
export function DocText({ text }: { text: string }) {
  const parts = text.split(/(【要記入[^】]*】|\[TO BE FILLED[^\]]*\])/);
  return (
    <>
      {parts.map((p, i) =>
        /^(【要記入|\[TO BE FILLED)/.test(p) ? (
          <mark key={i} className="todo">
            {p}
          </mark>
        ) : (
          p
        ),
      )}
    </>
  );
}
