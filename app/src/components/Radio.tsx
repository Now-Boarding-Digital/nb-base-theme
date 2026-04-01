import { useId } from 'react'

export type RadioSize = 'default' | 'large'
export type RadioVisualState = 'default' | 'hover' | 'disabled'

export interface RadioProps {
  checked?: boolean
  defaultChecked?: boolean
  disabled?: boolean
  name?: string
  value?: string
  size?: RadioSize
  state?: RadioVisualState
  className?: string
  'aria-label'?: string
  onChange?: (checked: boolean) => void
}

export function Radio({
  checked,
  defaultChecked = false,
  disabled = false,
  name,
  value,
  size = 'default',
  state = 'default',
  className = '',
  'aria-label': ariaLabel,
  onChange,
}: RadioProps) {
  const generatedId = useId()
  const isChecked = checked ?? defaultChecked
  const isDisabled = disabled || state === 'disabled'
  const isHoverVisual = state === 'hover'
  const controlSize = size === 'large' ? 'h-5 w-5' : 'h-4 w-4'
  const dotSize = 'h-2.5 w-2.5'
  const inputId = `${name ?? 'radio'}-${value ?? 'value'}-${size}-${generatedId}`

  return (
    <label className={`relative inline-flex items-center justify-center rounded-full ${className}`.trim()} htmlFor={inputId}>
      <input
        id={inputId}
        type="radio"
        name={name}
        value={value}
        checked={checked}
        defaultChecked={defaultChecked}
        readOnly={checked !== undefined && !onChange}
        disabled={isDisabled}
        aria-label={ariaLabel}
        onChange={(event) => onChange?.(event.target.checked)}
        className="peer sr-only"
      />

      <span
        aria-hidden="true"
        className={[
          'absolute rounded-full transition-colors duration-150',
          size === 'large' ? 'h-10 w-10' : 'h-8 w-8',
          isHoverVisual ? 'bg-[var(--color-radio-hover-bg)] opacity-[var(--opacity-radio-hover)]' : '',
        ]
          .filter(Boolean)
          .join(' ')}
      />

      <span
        aria-hidden="true"
        className={[
          'relative inline-flex items-center justify-center rounded-full border-2 transition-colors duration-150',
          controlSize,
          isChecked ? 'border-[var(--color-radio-ring-selected)]' : 'border-[var(--color-radio-ring-unselected)]',
          'peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--color-radio-focus-ring)]',
          isDisabled ? 'opacity-[var(--opacity-radio-disabled)]' : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {isChecked ? <span className={`${dotSize} rounded-full bg-[var(--color-radio-dot)]`} /> : null}
      </span>
    </label>
  )
}
