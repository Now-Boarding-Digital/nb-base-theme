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
    '[--color-button-bg:var(--color-button-solid-bg)] [--color-button-text:var(--color-button-solid-text)] [--color-button-border:var(--color-button-solid-border)] [--color-button-hover-bg:var(--color-button-solid-bg)] [--color-button-hover-border:var(--color-button-solid-border)] [--shadow-button-hover:var(--shadow-button-solid-hover)]',
  white:
    '[--color-button-bg:var(--color-button-white-bg)] [--color-button-text:var(--color-button-white-text)] [--color-button-border:transparent] [--color-button-hover-bg:var(--color-button-white-hover-bg)] [--color-button-hover-border:transparent] [--shadow-button-hover:none]',
  outline:
    '[--color-button-bg:transparent] [--color-button-text:var(--color-button-outline-text)] [--color-button-border:var(--color-button-outline-border)] [--color-button-hover-bg:var(--color-button-outline-hover-bg)] [--color-button-hover-border:var(--color-button-outline-border)] [--shadow-button-hover:none]',
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
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[4px] focus-visible:outline-[var(--color-button-focus-ring)]',
        'bg-[var(--color-button-bg)] text-[var(--color-button-text)] border-[var(--color-button-border)]',
        'hover:bg-[var(--color-button-hover-bg)] hover:border-[var(--color-button-hover-border)] hover:shadow-[var(--shadow-button-hover)]',
        'active:shadow-[var(--shadow-button-hover)]',
        'disabled:hover:bg-[var(--color-button-bg)] disabled:hover:border-[var(--color-button-border)] disabled:hover:shadow-none',
        sizeBaseClasses[size],
        horizontalPaddingClasses[size][icon],
        styleClasses[style],
        resolvedState === 'hover' && 'bg-[var(--color-button-hover-bg)] border-[var(--color-button-hover-border)] shadow-[var(--shadow-button-hover)]',
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
