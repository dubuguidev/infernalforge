'use client'

import { useEffect, useRef } from 'react'

interface StatBarProps {
  label: string
  value: number
  max?: number
  color: string      // Tailwind bg class or CSS color
  icon: React.ReactNode
  compact?: boolean
}

export default function StatBar({
  label,
  value,
  max = 100,
  color,
  icon,
  compact = false,
}: StatBarProps) {
  const fillRef = useRef<HTMLDivElement>(null)
  const pct = Math.min(100, Math.max(0, (value / max) * 100))

  useEffect(() => {
    const el = fillRef.current
    if (!el) return
    // Start from 0 then animate to real value
    el.style.width = '0%'
    const raf = requestAnimationFrame(() => {
      el.style.width = `${pct}%`
    })
    return () => cancelAnimationFrame(raf)
  }, [pct])

  if (compact) {
    return (
      <div className="space-y-0.5">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1 text-[10px] font-cinzel tracking-widest text-stone-500 uppercase">
            {icon}
            <span>{label}</span>
          </span>
          <span className="font-cinzel font-bold text-stone-300 text-xs tabular-nums">{value}</span>
        </div>
        <div className="stat-track h-1.5">
          <div
            ref={fillRef}
            className={`h-full rounded-full stat-fill ${color}`}
            style={{ width: 0 }}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-cinzel font-semibold tracking-widest text-stone-500 uppercase">
          {icon}
          <span>{label}</span>
        </div>
        <span className="font-cinzel font-bold text-stone-200 text-sm tabular-nums">
          {value}
          <span className="text-stone-600 font-normal">/{max}</span>
        </span>
      </div>
      <div className="stat-track">
        <div
          ref={fillRef}
          className={`h-full rounded-full stat-fill ${color}`}
          style={{ width: 0 }}
        />
      </div>
    </div>
  )
}
