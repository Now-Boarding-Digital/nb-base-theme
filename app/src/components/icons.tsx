/**
 * Shared icons for design-system components
 */

export type IconSize = 'large' | 'medium' | 'small'

export const PlusIcon = ({ size = 'large' }: { size?: IconSize }) => {
  const sizeClasses = { large: 'w-4 h-4', medium: 'w-3.5 h-3.5', small: 'w-3 h-3' }
  return (
    <svg className={`shrink-0 ${sizeClasses[size]}`} viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export const CirclePlusIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={`shrink-0 ${className}`} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="10" cy="10" r="8" />
    <path d="M10 6v8M6 10h8" />
  </svg>
)

export const ChevronDownIcon = () => (
  <svg className="w-4 h-4 shrink-0" viewBox="0 0 16 16" fill="none" aria-hidden>
    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
