// A minimal markdown renderer for chat bubbles: handles **bold** inline and
// "* item" bullet lines. Deliberately not a full markdown parser — just
// enough to make LLM-formatted answers readable instead of showing raw
// asterisks.

function renderInline(text, keyPrefix) {
  // Order matters: try **bold** before *italic* so double-star runs aren't
  // mistaken for two italic markers.
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).filter(Boolean);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={`${keyPrefix}-${i}`}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return <em key={`${keyPrefix}-${i}`}>{part.slice(1, -1)}</em>;
    }
    return <span key={`${keyPrefix}-${i}`}>{part}</span>;
  });
}

export default function MarkdownLite({ text }) {
  if (!text) return null;

  const lines = text.split("\n");
  const blocks = [];
  let currentList = null;

  lines.forEach((line, i) => {
    const bulletMatch = line.match(/^\s*[*-]\s+(.*)/);
    if (bulletMatch) {
      if (!currentList) {
        currentList = [];
        blocks.push({ type: "list", items: currentList });
      }
      currentList.push(bulletMatch[1]);
    } else {
      currentList = null;
      if (line.trim() === "") {
        blocks.push({ type: "space", key: i });
      } else {
        blocks.push({ type: "text", content: line, key: i });
      }
    }
  });

  return (
    <>
      {blocks.map((block, i) => {
        if (block.type === "list") {
          return (
            <ul key={`list-${i}`} className="my-1.5 list-disc space-y-0.5 pl-4">
              {block.items.map((item, j) => (
                <li key={j}>{renderInline(item, `li-${i}-${j}`)}</li>
              ))}
            </ul>
          );
        }
        if (block.type === "space") return null;
        return (
          <p key={`p-${i}`} className={i > 0 ? "mt-1.5" : ""}>
            {renderInline(block.content, `p-${i}`)}
          </p>
        );
      })}
    </>
  );
}
