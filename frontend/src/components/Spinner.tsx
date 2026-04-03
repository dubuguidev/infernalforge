interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg'
}

export default function Spinner({ size = 'md' }: SpinnerProps) {
  const sizes = {
    sm: 'w-4 h-4 border-[2px]',
    md: 'w-8 h-8 border-[2px]',
    lg: 'w-12 h-12 border-[3px]',
  }
  return (
    <div
      className={`${sizes[size]} animate-spin rounded-full border-red-950 border-t-red-600`}
      style={{ boxShadow: '0 0 8px rgba(220,38,38,0.3)' }}
    />
  )
}
