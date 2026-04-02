/**
 * Dropdown trigger + menu (Radix UI; design-system styling)
 * Uses Radix for behavior (accessibility, keyboard, focus) + our design tokens for appearance
 */
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { forwardRef } from 'react'

export type DropdownSize = 'large' | 'small'
export type DropdownVariant = 'default' | 'icon-only' | 'with-plus-icon'

export interface DropdownItem {
  label: string
  onSelect?: () => void
}

export interface DropdownProps {
  trigger?: React.ReactNode
  label?: string
  items: DropdownItem[]
  size?: DropdownSize
  variant?: DropdownVariant
  className?: string
}

const triggerSizeClasses: Record<DropdownSize, string> = {
  large: 'h-10 min-w-[180px] px-3 text-sm leading-5',
  small: 'h-8 min-w-[160px] px-2.5 text-xs leading-4',
}

const iconOnlyClasses: Record<DropdownSize, string> = {
  large: 'min-w-10 w-10 p-0 justify-center',
  small: 'min-w-8 w-8 p-0 justify-center',
}

import { CirclePlusIcon, ChevronDownIcon } from './icons'

const IconOnlyTrigger = forwardRef<
  HTMLButtonElement,
  { size: DropdownSize; 'aria-label'?: string } & React.ComponentPropsWithoutRef<'button'>
>(function IconOnlyTrigger({ size, 'aria-label': ariaLabel = 'Open menu', className = '', ...props }, ref) {
  return (
    <button
      ref={ref}
      type="button"
      className={[
        'inline-flex items-center justify-center font-medium border border-[var(--color-dropdown-trigger-border)] bg-[var(--color-dropdown-trigger-bg)] text-[var(--color-dropdown-trigger-text)] rounded-[var(--radius-control-medium)] cursor-pointer transition-all duration-150',
        iconOnlyClasses[size],
        'hover:bg-[var(--color-dropdown-trigger-hover-bg)] hover:border-[var(--color-dropdown-trigger-hover-border)]',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-dropdown-trigger-focus-outline)] focus-visible:outline-offset-2 focus-visible:border-[var(--color-dropdown-trigger-open-border)]',
        'data-[state=open]:bg-[var(--color-dropdown-trigger-open-bg)] data-[state=open]:border-[var(--color-dropdown-trigger-open-border)] data-[state=open]:outline data-[state=open]:outline-2 data-[state=open]:outline-[var(--color-dropdown-trigger-focus-outline)] data-[state=open]:outline-offset-2',
        'data-[state=open]:[&>span]:rotate-180',
        className,
      ].join(' ')}
      aria-haspopup="menu"
      aria-label={ariaLabel}
      {...props}
    >
      <span className="shrink-0 transition-transform duration-200">
        <ChevronDownIcon />
      </span>
    </button>
  )
})

const DefaultTrigger = forwardRef<
  HTMLButtonElement,
  { label: string; size: DropdownSize; showPlusIcon?: boolean } & React.ComponentPropsWithoutRef<'button'>
>(function DefaultTrigger({ label, size, showPlusIcon = false, className = '', ...props }, ref) {
  return (
    <button
      ref={ref}
      type="button"
      className={[
        'inline-flex items-center justify-between gap-2 font-medium border border-[var(--color-dropdown-trigger-border)] bg-[var(--color-dropdown-trigger-bg)] text-[var(--color-dropdown-trigger-text)] rounded-[var(--radius-control-medium)] cursor-pointer transition-all duration-150',
        triggerSizeClasses[size],
        'hover:bg-[var(--color-dropdown-trigger-hover-bg)] hover:border-[var(--color-dropdown-trigger-hover-border)]',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-dropdown-trigger-focus-outline)] focus-visible:outline-offset-2 focus-visible:border-[var(--color-dropdown-trigger-open-border)]',
        'data-[state=open]:bg-[var(--color-dropdown-trigger-open-bg)] data-[state=open]:border-[var(--color-dropdown-trigger-open-border)] data-[state=open]:outline data-[state=open]:outline-2 data-[state=open]:outline-[var(--color-dropdown-trigger-focus-outline)] data-[state=open]:outline-offset-2',
        'data-[state=open]:[&>span:last-child]:rotate-180',
        className,
      ].join(' ')}
      aria-haspopup="menu"
      {...props}
    >
      <span className="flex items-center gap-2">
        {showPlusIcon && <CirclePlusIcon />}
        {label}
      </span>
      <span className="shrink-0 transition-transform duration-200">
        <ChevronDownIcon />
      </span>
    </button>
  )
})

export function Dropdown({
  trigger,
  label = 'Select',
  items,
  size = 'large',
  variant = 'default',
  className = '',
}: DropdownProps) {
  const triggerElement =
    trigger ??
    (variant === 'icon-only' ? (
      <IconOnlyTrigger size={size} aria-label={label} />
    ) : (
      <DefaultTrigger label={label} size={size} showPlusIcon={variant === 'with-plus-icon'} />
    ))

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        {triggerElement}
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={[
            'min-w-[var(--radix-dropdown-menu-trigger-width)] rounded-[var(--radius-control-medium)] border border-[var(--color-dropdown-content-border)] bg-[var(--color-dropdown-content-bg)] p-1 shadow-lg',
            className,
          ].join(' ')}
          sideOffset={4}
          align="start"
          collisionPadding={8}
        >
          {items.map((item, index) => (
            <DropdownMenu.Item
              key={index}
              className={[
                'relative flex cursor-default select-none items-center rounded px-3 py-2 text-sm text-[var(--color-dropdown-item-text)] outline-none',
                'hover:bg-[var(--color-dropdown-item-hover-bg)] hover:text-[var(--color-dropdown-item-hover-text)]',
                'focus:bg-[var(--color-dropdown-item-focus-bg)] focus:text-[var(--color-dropdown-item-focus-text)]',
                'data-[highlighted]:bg-[var(--color-dropdown-item-hover-bg)] data-[highlighted]:text-[var(--color-dropdown-item-hover-text)]',
              ].join(' ')}
              onSelect={() => item.onSelect?.()}
            >
              {item.label}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}

Dropdown.DefaultTrigger = DefaultTrigger
Dropdown.IconOnlyTrigger = IconOnlyTrigger
