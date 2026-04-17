
// =====================================================
// JustDefenders ©
// File: HealthSparkline.tsx
// Timestamp: 22 March 2026 (Sydney)
// =====================================================

type Props = {
  data: number[];
  color?: string;
};

export default function HealthSparkline({ data, color }: Props) {
  if (!data.length) return null;

  const max = Math.max(...data);
  const min = Math.min(...data);

  const points = data
    .map((value, i) => {
      const x = (i / (data.length - 1)) * 100;
      const y = 100 - ((value - min) / (max - min || 1)) * 100;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg viewBox="0 0 100 100" className="w-full h-12">
      <polyline
        fill="none"
        stroke="currentColor"
        className={color}
        strokeWidth="2"
        points={points}
      />
    </svg>
  );
}