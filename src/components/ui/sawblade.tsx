import { cn } from "@/lib/utils";

export function SawBlade({
  size = 220,
  className,
  teeth = 32,
  duration = 40,
  color = "currentColor",
}: {
  size?: number;
  className?: string;
  teeth?: number;
  duration?: number;
  color?: string;
}) {
  const center = size / 2;
  const outer = center - 2;
  const inner = outer - size * 0.08;
  const hub = size * 0.12;
  const hubHole = size * 0.045;
  const path: string[] = [];
  for (let i = 0; i < teeth; i++) {
    const a0 = (i / teeth) * Math.PI * 2;
    const a1 = ((i + 0.5) / teeth) * Math.PI * 2;
    const a2 = ((i + 1) / teeth) * Math.PI * 2;
    const p0 = [center + Math.cos(a0) * outer, center + Math.sin(a0) * outer];
    const p1 = [center + Math.cos(a1) * inner, center + Math.sin(a1) * inner];
    const p2 = [center + Math.cos(a2) * outer, center + Math.sin(a2) * outer];
    if (i === 0) path.push(`M ${p0[0].toFixed(2)} ${p0[1].toFixed(2)}`);
    path.push(`L ${p1[0].toFixed(2)} ${p1[1].toFixed(2)}`);
    path.push(`L ${p2[0].toFixed(2)} ${p2[1].toFixed(2)}`);
  }
  path.push("Z");

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      className={cn("animate-spin-slow", className)}
      style={{ animationDuration: `${duration}s` }}
      fill={color}
      aria-hidden
    >
      <path d={path.join(" ")} fillRule="evenodd" />
      <circle
        cx={center}
        cy={center}
        r={hub}
        fill="none"
        stroke={color}
        strokeWidth={Math.max(1, size * 0.01)}
        opacity={0.35}
      />
      <circle cx={center} cy={center} r={hubHole} fill="var(--bg)" />
    </svg>
  );
}
