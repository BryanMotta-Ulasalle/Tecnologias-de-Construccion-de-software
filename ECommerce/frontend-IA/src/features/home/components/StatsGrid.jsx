import React from 'react'

export default function StatsGrid({ stats }) {
  return (
    <div className="mt-10 grid max-w-xl grid-cols-3 gap-3 sm:gap-4">
      {stats.map((stat) => (
        <div key={stat.label} className=" p-4 shadow-sm shadow-black/5">
          <p className="text-2xl font-semibold text-white">{stat.value}</p>
          <p className="mt-1 text-xs uppercase tracking-[0.25em] text-slate-300">{stat.label}</p>
        </div>
      ))}
    </div>
  )
}
