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
  large:
    'py-[var(--space-button-py-large)] rounded-[var(--radius-button-large)] text-[length:var(--text-button-font-size-large)] leading-[var(--text-button-line-height-large)]',
  medium:
    'py-[var(--space-button-py-medium)] rounded-[var(--radius-button-medium)] text-[length:var(--text-button-font-size-medium)] leading-[var(--text-button-line-height-medium)]',
  small:
    'py-[var(--space-button-py-small)] rounded-[var(--radius-button-small)] text-[length:var(--text-button-font-size-small)] leading-[var(--text-button-line-height-small)]',
}

const horizontalPaddingClasses: Record<ButtonSize, Record<ButtonIconPosition, string>> = {
  large: {
    none: 'px-[var(--space-button-px-large-none)]',
    left: 'pl-[var(--space-button-pl-large-left)] pr-[var(--space-button-pr-large-left)]',
    right: 'pl-[var(--space-button-pl-large-right)] pr-[var(--space-button-pr-large-right)]',
  },
  medium: {
    none: 'px-[var(--space-button-px-medium-none)]',
    left: 'pl-[var(--space-button-pl-medium-left)] pr-[var(--space-button-pr-medium-left)]',
    right: 'pl-[var(--space-button-pl-medium-right)] pr-[var(--space-button-pr-medium-right)]',
  },
  small: {
    none: 'px-[var(--space-button-px-small-none)]',
    left: 'pl-[var(--space-button-pl-small-left)] pr-[var(--space-button-pr-small-left)]',
    right: 'pl-[var(--space-button-pl-small-right)] pr-[var(--space-button-pr-small-right)]',
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
  large: 'gap-[var(--space-button-gap-large)]',
  medium: 'gap-[var(--space-button-gap-medium)]',
  small: 'gap-[var(--space-button-gap-small)]',
}

const iconSizeClasses: Record<ButtonSize, string> = {
  large: 'w-[var(--size-button-icon-large)] h-[var(--size-button-icon-large)]',
  medium: 'w-[var(--size-button-icon-medium)] h-[var(--size-button-icon-medium)]',
  small: 'w-[var(--size-button-icon-small)] h-[var(--size-button-icon-small)]',
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
  const isNonInteractive = resolvedState === 'disabled' || resolvedState === 'loading'
  const isNativeDisabled = resolvedState === 'disabled'
  const isVisuallyDisabled = resolvedState === 'disabled'
  const isLoading = resolvedState === 'loading'

  return (
    <button
      type="button"
      className={[
        'inline-flex items-center justify-center font-[var(--font-weight-button)] border transition-all duration-[var(--motion-button-duration)] cursor-pointer',
        'focus-visible:outline focus-visible:[outline-width:var(--width-button-focus-ring)] focus-visible:outline-offset-[var(--offset-button-focus-ring)] focus-visible:outline-[var(--color-button-focus-ring)]',
        'bg-[var(--color-button-bg)] text-[var(--color-button-text)] border-[var(--color-button-border)] [border-width:var(--width-button-border)]',
        'hover:bg-[var(--color-button-hover-bg)] hover:border-[var(--color-button-hover-border)] hover:shadow-[var(--shadow-button-hover)]',
        'active:shadow-[var(--shadow-button-hover)]',
        'disabled:hover:bg-[var(--color-button-bg)] disabled:hover:border-[var(--color-button-border)] disabled:hover:shadow-none',
        sizeBaseClasses[size],
        horizontalPaddingClasses[size][icon],
        styleClasses[style],
        resolvedState === 'hover' && 'bg-[var(--color-button-hover-bg)] border-[var(--color-button-hover-border)] shadow-[var(--shadow-button-hover)]',
        isVisuallyDisabled && 'opacity-[var(--opacity-button-disabled)] cursor-not-allowed',
        isLoading && 'cursor-not-allowed',
        isLoading && 'relative',
        className,
      ].filter(Boolean).join(' ')}
      disabled={isNativeDisabled}
      aria-disabled={isLoading ? true : undefined}
      onClick={isNonInteractive ? undefined : onClick}
    >
      {isLoading && (
        <span
          className="absolute inset-0 m-auto w-[var(--size-button-spinner)] h-[var(--size-button-spinner)] [border-width:var(--width-button-spinner-stroke)] border-current border-r-transparent rounded-[var(--radius-button-spinner)] animate-btn-spin"
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
