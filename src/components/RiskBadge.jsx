const styles = {
  Low: 'bg-emerald-50 text-emerald-800 ring-emerald-200 before:bg-emerald-500',
  Medium: 'bg-amber-50 text-amber-800 ring-amber-200 before:bg-amber-500',
  High: 'bg-red-50 text-red-800 ring-red-200 before:bg-ua-red',
  Critical: 'bg-red-100 text-red-900 ring-red-300 before:bg-ua-red',
};

export default function RiskBadge({ level }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-black ring-1 before:h-2 before:w-2 before:rounded-full ${
        styles[level] || styles.Low
      }`}
    >
      {level}
    </span>
  );
}
