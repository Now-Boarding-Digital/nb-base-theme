/**
 * Primary action button (design-system control)
 * Specs from Figma get_design_context
 */
import type { ReactNode } from 'react'

export type ButtonStyle = 'solid' | 'white' | 'outline';
export type ButtonSize = 'large' | 'medium' | 'small';
export type ButtonIconPosition = 'none' | 'left' | 'right';
export type ButtonState = 'default' | 'hover' | 'disabled' | 'loading';

export interface ButtonProps {
  children?: ReactNode;
  label?: string;
  labelText?: string;
  style?: ButtonStyle;
  size?: ButtonSize;
  icon?: ButtonIconPosition;
  state?: ButtonState;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}

const sizeBaseClasses: Record<ButtonSize, string> = {
  large: 'py-4 rounded-[var(--radius-control-large)] text-base leading-6',
  medium: 'py-2.5 rounded-[var(--radius-control-medium)] text-sm leading-5',
  small: 'py-2 rounded-[var(--radius-control-small)] text-xs leading-4',
}

const horizontalPaddingClasses: Record<ButtonSize, Record<ButtonIconPosition, string>> = {
  large: {
    none: 'px-8',
    left: 'pl-6 pr-8',
    right: 'pl-8 pr-6',
  },
  medium: {
    none: 'px-6',
    left: 'pl-4 pr-6',
    right: 'pl-6 pr-4',
  },
  small: {
    none: 'px-3',
    left: 'pl-3 pr-4',
    right: 'pl-4 pr-3',
  },
}

const styleClasses: Record<ButtonStyle, string> = {
  solid:
    'bg-[var(--color-ui-action)] text-[var(--color-neutral-white)] border-[var(--color-ui-action)] ' +
    'hover:shadow-[var(--shadow-button)] active:shadow-[var(--shadow-button)] ' +
    'disabled:hover:shadow-none disabled:hover:bg-[var(--color-ui-action)] disabled:hover:border-[var(--color-ui-action)]',
  white: 'bg-[var(--color-neutral-white)] text-[var(--color-text-link)] border-transparent hover:bg-[var(--color-control-hover)] disabled:hover:bg-[var(--color-neutral-white)]',
  outline: 'bg-transparent text-[var(--color-ui-action)] border-[var(--color-ui-action)] hover:bg-[var(--color-action-tint)] disabled:hover:bg-transparent',
}

const hoverStateClasses: Record<ButtonStyle, string> = {
  solid: 'shadow-[var(--shadow-button)]',
  white: 'bg-[var(--color-control-hover)]',
  outline: 'bg-[var(--color-action-tint)]',
}

const contentGapClasses: Record<ButtonSize, string> = {
  large: 'gap-2',
  medium: 'gap-2',
  small: 'gap-1.5',
}

const iconSizeClasses: Record<ButtonSize, string> = {
  large: 'w-5 h-5',
  medium: 'w-5 h-5',
  small: 'w-3.5 h-3.5',
}

import { PlusIcon } from './icons'

export function Button({
  children,
  label = 'Label',
  labelText,
  style = 'solid',
  size = 'large',
  icon = 'none',
  state,
  loading = false,
  disabled = false,
  className = '',
  onClick,
}: ButtonProps) {
  const resolvedState: ButtonState = state ?? (loading ? 'loading' : disabled ? 'disabled' : 'default')
  const isDisabled = resolvedState === 'disabled' || resolvedState === 'loading'
  const isLoading = resolvedState === 'loading'

  return (
    <button
      type="button"
      className={[
        'inline-flex items-center justify-center font-bold border transition-all duration-150 cursor-pointer',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[4px] focus-visible:outline-[var(--color-focus-ring)]',
        sizeBaseClasses[size],
        horizontalPaddingClasses[size][icon],
        styleClasses[style],
        resolvedState === 'hover' && hoverStateClasses[style],
        isDisabled && 'opacity-50 cursor-not-allowed',
        isLoading && 'relative',
        className,
      ].filter(Boolean).join(' ')}
      disabled={isDisabled}
      onClick={onClick}
    >
      {isLoading && (
        <span
          className="absolute inset-0 m-auto w-4 h-4 border-2 border-current border-r-transparent rounded-full animate-btn-spin"
          aria-hidden
        />
      )}
      <span className={`flex items-center justify-center ${contentGapClasses[size]} ${isLoading ? 'invisible' : ''}`}>
        {icon === 'left' && <PlusIcon className={iconSizeClasses[size]} />}
        {children ?? labelText ?? label}
        {icon === 'right' && <PlusIcon className={iconSizeClasses[size]} />}
      </span>
    </button>
  );
}
