interface AbilityBadgeProps {
  name: string
  size?: 'sm' | 'md'
}

export default function AbilityBadge({ name, size = 'md' }: AbilityBadgeProps) {
  if (size === 'sm') {
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-cinzel tracking-wider
                       text-red-400/80 bg-red-950/30 border border-red-950/60">
        {name}
      </span>
    )
  }
  return (
    <span
      className="inline-flex items-center px-3 py-1 rounded-md text-xs font-cinzel tracking-wider
                 text-orange-400/90 border border-red-900/50 bg-red-950/30
                 transition-all duration-200 hover:border-red-700/60 hover:text-orange-300"
      style={{ boxShadow: '0 0 8px rgba(220,38,38,0.08)' }}
    >
      {name}
    </span>
  )
}
