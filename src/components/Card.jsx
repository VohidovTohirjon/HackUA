export function Card({ children, className = "" }) {
  return (
    <div className={`rounded-xl border border-slate-200 bg-white shadow-soft ${className}`}>
      {children}
    </div>
  );
}

export function SectionHeader({ eyebrow, title, description, align = "center" }) {
  const alignment = align === "left" ? "text-left mx-0" : "text-center mx-auto";

  return (
    <div className={`mb-8 max-w-3xl ${alignment}`}>
      <p className="text-sm font-black uppercase tracking-[0.16em] text-care-cyan">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-black tracking-tight text-care-navy md:text-4xl">{title}</h2>
      {description && <p className="mt-3 text-base leading-7 text-slate-600">{description}</p>}
    </div>
  );
}

export function IconTile({ icon: Icon, className = "" }) {
  return (
    <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-50 text-care-cyan ${className}`}>
      <Icon className="h-5 w-5" />
    </div>
  );
}
