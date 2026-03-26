/**
 * Icon Button - from Now Boarding Design System Kit
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
  solid: 'bg-[var(--color-ui-action)] text-[var(--color-neutral-white)] border-[var(--color-ui-action)] hover:bg-[var(--color-ui-action-hover)] hover:border-[var(--color-ui-action-hover)] disabled:hover:bg-[var(--color-ui-action)] disabled:hover:border-[var(--color-ui-action)]',
  outline: 'bg-transparent text-[var(--color-ui-action)] border-[var(--color-ui-action)] hover:bg-[var(--color-action-tint)] disabled:hover:bg-transparent',
  transparent: 'bg-transparent text-[var(--color-ui-action)] border-transparent hover:bg-[var(--color-action-tint)] disabled:hover:bg-transparent',
  white: 'bg-[var(--color-neutral-white)] text-[var(--color-ui-action)] border-[var(--color-neutral-white)] hover:bg-[#e8f2ff] hover:border-[#e8f2ff] disabled:hover:bg-[var(--color-neutral-white)] disabled:hover:border-[var(--color-neutral-white)]',
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
