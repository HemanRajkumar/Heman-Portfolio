import { useEffect, useState } from "react";

// Reveals `text` one character at a time on mount. Skips straight to the
// full text if the user prefers reduced motion.
export default function useTypewriter(text, { speed = 32, startDelay = 150 } = {}) {
  const [output, setOutput] = useState("");

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setOutput(text);
      return;
    }

    let i = 0;
    let interval;
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        i += 1;
        setOutput(text.slice(0, i));
        if (i >= text.length) clearInterval(interval);
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [text, speed, startDelay]);

  return output;
}
