/**
 * Circular icon button (design-system control)
 * Circular buttons with a plus icon. Variations: Style (Solid/Outline/Transparent/White), Size (Large/Medium/Small)
 */
export type IconButtonStyle = 'solid' | 'outline' | 'transparent' | 'white';
export type IconButtonSize = 'large' | 'medium' | 'small';

export interface IconButtonProps {
  'aria-label': string;
  children?: React.ReactNode;
  style?: IconButtonStyle;
  size?: IconButtonSize;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}

const sizeClasses: Record<IconButtonSize, string> = {
  large: 'w-10 h-10',
  medium: 'w-8 h-8',
  small: 'w-6 h-6',
}

const styleClasses: Record<IconButtonStyle, string> = {
  solid:
    '[--color-icon-button-bg:var(--color-icon-button-solid-bg)] [--color-icon-button-text:var(--color-icon-button-solid-text)] [--color-icon-button-border:var(--color-icon-button-solid-border)] [--color-icon-button-hover-bg:var(--color-icon-button-solid-hover-bg)] [--color-icon-button-hover-border:var(--color-icon-button-solid-hover-border)]',
  outline:
    '[--color-icon-button-bg:transparent] [--color-icon-button-text:var(--color-icon-button-outline-text)] [--color-icon-button-border:var(--color-icon-button-outline-border)] [--color-icon-button-hover-bg:var(--color-icon-button-outline-hover-bg)] [--color-icon-button-hover-border:var(--color-icon-button-outline-border)]',
  transparent:
    '[--color-icon-button-bg:transparent] [--color-icon-button-text:var(--color-icon-button-transparent-text)] [--color-icon-button-border:transparent] [--color-icon-button-hover-bg:var(--color-icon-button-transparent-hover-bg)] [--color-icon-button-hover-border:transparent]',
  white:
    '[--color-icon-button-bg:var(--color-icon-button-white-bg)] [--color-icon-button-text:var(--color-icon-button-white-text)] [--color-icon-button-border:var(--color-icon-button-white-border)] [--color-icon-button-hover-bg:var(--color-icon-button-white-hover-bg)] [--color-icon-button-hover-border:var(--color-icon-button-white-hover-border)]',
}

import { PlusIcon } from './icons'

export function IconButton({
  'aria-label': ariaLabel,
  children,
  style = 'solid',
  size = 'large',
  disabled = false,
  className = '',
  onClick,
}: IconButtonProps) {
  return (
    <button
      type="button"
      className={[
        'inline-flex items-center justify-center rounded-full border cursor-pointer transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed',
        'bg-[var(--color-icon-button-bg)] text-[var(--color-icon-button-text)] border-[var(--color-icon-button-border)]',
        'hover:bg-[var(--color-icon-button-hover-bg)] hover:border-[var(--color-icon-button-hover-border)]',
        'disabled:hover:bg-[var(--color-icon-button-bg)] disabled:hover:border-[var(--color-icon-button-border)]',
        sizeClasses[size],
        styleClasses[style],
        className,
      ].filter(Boolean).join(' ')}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children ?? <PlusIcon size={size as 'large' | 'medium' | 'small'} />}
    </button>
  )
}
