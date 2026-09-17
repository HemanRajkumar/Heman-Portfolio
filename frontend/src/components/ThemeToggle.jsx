import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, MonitorSmartphone } from "lucide-react";

const OPTIONS = [
  { value: "light", icon: Sun, label: "Light" },
  { value: "system", icon: MonitorSmartphone, label: "System" },
  { value: "dark", icon: Moon, label: "Dark" },
];

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch: only read the resolved theme client-side.
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="h-9 w-28" aria-hidden />;

  return (
    <div
      role="radiogroup"
      aria-label="Theme"
      className="flex items-center gap-0.5 rounded-full border border-ink-line/20 dark:border-ink-line bg-paper-surface/60 dark:bg-ink-surface/60 p-1"
    >
      {OPTIONS.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          role="radio"
          aria-checked={theme === value}
          aria-label={`${label} theme`}
          onClick={() => setTheme(value)}
          className={`relative grid h-7 w-9 place-items-center rounded-full transition-colors ${
            theme === value
              ? "bg-signal/20 text-signal"
              : "text-muted-light dark:text-muted-dark hover:text-ink dark:hover:text-paper"
          }`}
        >
          <Icon size={15} strokeWidth={2} />
        </button>
      ))}
    </div>
  );
}
