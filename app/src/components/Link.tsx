/**
 * Link - from Now Boarding Design System Kit (Links section)
 * Text links with Size (Large/Medium/Small), Icon (None/Left/Right), Bold (On/Off)
 */
export type LinkSize = 'large' | 'medium' | 'small';
export type LinkIconPosition = 'none' | 'left' | 'right';

export interface LinkProps {
  children?: React.ReactNode;
  href?: string;
  label?: string;
  size?: LinkSize;
  icon?: LinkIconPosition;
  bold?: boolean;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}

const sizeClasses: Record<LinkSize, string> = {
  large: 'text-base leading-6',
  medium: 'text-sm leading-5',
  small: 'text-xs leading-4',
}

import { PlusIcon } from './icons'

export function Link({
  children,
  href = '#',
  label = 'Label',
  size = 'large',
  icon = 'none',
  bold = true,
  disabled = false,
  className = '',
  onClick,
}: LinkProps) {
  const baseClasses = [
    'inline-flex items-center gap-1 text-[var(--color-text-link)] no-underline cursor-pointer transition-colors duration-150',
    sizeClasses[size],
    bold ? 'font-bold' : 'font-normal',
    disabled && 'opacity-50 cursor-not-allowed',
  ].filter(Boolean).join(' ')

  const hoverClasses = !disabled ? 'hover:text-[var(--color-ui-action)] hover:underline' : ''

  const content = (
    <>
      {icon === 'left' && <PlusIcon size={size as 'large' | 'medium' | 'small'} />}
      {children ?? label}
      {icon === 'right' && <PlusIcon size={size as 'large' | 'medium' | 'small'} />}
    </>
  )

  const classes = `${baseClasses} ${hoverClasses} ${className}`.trim()

  if (disabled) {
    return (
      <span className={classes} aria-disabled="true">
        {content}
      </span>
    )
  }

  return (
    <a href={href} className={classes} onClick={onClick}>
      {content}
    </a>
  )
}
