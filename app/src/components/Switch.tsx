import * as RadixSwitch from '@radix-ui/react-switch'

export interface SwitchProps {
  checked?: boolean
  defaultChecked?: boolean
  disabled?: boolean
  className?: string
  'aria-label'?: string
  onCheckedChange?: (checked: boolean) => void
}

export function Switch({
  checked,
  defaultChecked = false,
  disabled = false,
  className = '',
  'aria-label': ariaLabel = 'Toggle',
  onCheckedChange,
}: SwitchProps) {
  return (
    <RadixSwitch.Root
      checked={checked}
      defaultChecked={defaultChecked}
      disabled={disabled}
      onCheckedChange={onCheckedChange}
      aria-label={ariaLabel}
      className={[
        'inline-flex h-5 w-10 shrink-0 cursor-pointer items-center rounded-full border border-[var(--color-switch-border)] p-0.5 transition-colors duration-150',
        'bg-[var(--color-switch-track-bg-off)] data-[state=checked]:bg-[var(--color-switch-track-bg-on)]',
        'disabled:cursor-not-allowed disabled:opacity-[var(--opacity-switch-disabled)]',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-switch-focus-ring)]',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <RadixSwitch.Thumb
        className={[
          'pointer-events-none block h-4 w-4 rounded-full bg-[var(--color-switch-thumb-bg)]',
          'translate-x-0 transition-transform duration-150 data-[state=checked]:translate-x-5',
        ]
          .filter(Boolean)
          .join(' ')}
      />
    </RadixSwitch.Root>
  )
}
