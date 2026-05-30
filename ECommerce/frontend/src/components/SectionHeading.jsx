export function SectionHeading({ eyebrow, title, action }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#C98C4B]">{eyebrow}</p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#11110F] sm:text-4xl">{title}</h2>
      </div>
      {action ? <div>{action}</div> : null}
    </div>
  )
}
