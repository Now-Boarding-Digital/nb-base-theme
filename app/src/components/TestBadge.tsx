/**
 * Temporary demo component for Chromatic / PR preview testing — safe to delete after workflow is verified.
 */
export interface TestBadgeProps {
  label?: string
  className?: string
}

export function TestBadge({ label = 'Chromatic test', className = '' }: TestBadgeProps) {
  return (
    <span
      className={[
        'inline-flex items-center rounded-full border border-[var(--color-neutral-gray-300)]',
        'bg-[var(--color-neutral-gray-100)] px-3 py-1 text-xs font-semibold',
        'text-[var(--color-neutral-gray-800)]',
        className,
      ].join(' ')}
    >
      {label}
    </span>
  )
}
