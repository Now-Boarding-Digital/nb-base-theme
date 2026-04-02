/**
 * Full-width stacked button (design-system control)
 * Vertical buttons (64×56px in Figma). Style=Solid/Outline Grey/Grey/Transparent/White
 */
export type StackedButtonStyle = 'solid' | 'outline-grey' | 'grey' | 'transparent' | 'white';

export interface StackedButtonProps {
  children?: React.ReactNode;
  label?: string;
  style?: StackedButtonStyle;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
  onClick?: () => void;
}

import { CirclePlusIcon } from './icons'

const styleClasses: Record<StackedButtonStyle, string> = {
  solid:
    '[--color-stacked-bg:var(--color-stacked-solid-bg)] [--color-stacked-text:var(--color-stacked-solid-text)] [--color-stacked-border:var(--color-stacked-solid-border)] [--color-stacked-hover-bg:var(--color-stacked-solid-hover-bg)] [--color-stacked-hover-border:var(--color-stacked-solid-hover-border)]',
  'outline-grey':
    '[--color-stacked-bg:transparent] [--color-stacked-text:var(--color-stacked-outline-text)] [--color-stacked-border:var(--color-stacked-outline-border)] [--color-stacked-hover-bg:var(--color-stacked-outline-hover-bg)] [--color-stacked-hover-border:var(--color-stacked-outline-hover-border)]',
  grey:
    '[--color-stacked-bg:var(--color-stacked-grey-bg)] [--color-stacked-text:var(--color-stacked-grey-text)] [--color-stacked-border:var(--color-stacked-grey-border)] [--color-stacked-hover-bg:var(--color-stacked-grey-hover-bg)] [--color-stacked-hover-border:var(--color-stacked-grey-hover-border)]',
  transparent:
    '[--color-stacked-bg:transparent] [--color-stacked-text:var(--color-stacked-transparent-text)] [--color-stacked-border:transparent] [--color-stacked-hover-bg:var(--color-stacked-transparent-hover-bg)] [--color-stacked-hover-border:transparent]',
  white:
    '[--color-stacked-bg:var(--color-stacked-white-bg)] [--color-stacked-text:var(--color-stacked-white-text)] [--color-stacked-border:var(--color-stacked-white-border)] [--color-stacked-hover-bg:var(--color-stacked-white-hover-bg)] [--color-stacked-hover-border:var(--color-stacked-white-hover-border)]',
};

export function StackedButton({
  children,
  label = 'Label',
  style = 'solid',
  disabled = false,
  fullWidth = false,
  className = '',
  onClick,
}: StackedButtonProps) {
  return (
    <button
      type="button"
      className={[
        'min-w-16 h-14 flex flex-col items-center justify-center gap-0.5 font-bold text-sm leading-5 rounded-[var(--radius-control-large)] border cursor-pointer transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed',
        'bg-[var(--color-stacked-bg)] text-[var(--color-stacked-text)] border-[var(--color-stacked-border)] hover:bg-[var(--color-stacked-hover-bg)] hover:border-[var(--color-stacked-hover-border)] disabled:hover:bg-[var(--color-stacked-bg)] disabled:hover:border-[var(--color-stacked-border)]',
        fullWidth ? 'w-full px-6' : 'w-16 shrink-0 px-2',
        styleClasses[style],
        className,
      ].filter(Boolean).join(' ')}
      disabled={disabled}
      onClick={onClick}
    >
      <span className="flex items-center justify-center"><CirclePlusIcon /></span>
      {children ?? label}
    </button>
  );
}
