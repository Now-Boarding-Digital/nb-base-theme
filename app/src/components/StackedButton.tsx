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
  solid: 'bg-[var(--color-ui-action)] text-[var(--color-neutral-white)] border-[var(--color-ui-action)] hover:bg-[var(--color-ui-action-hover)] hover:border-[var(--color-ui-action-hover)] disabled:hover:bg-[var(--color-ui-action)] disabled:hover:border-[var(--color-ui-action)]',
  'outline-grey': 'bg-transparent text-[var(--color-neutral-gray-700)] border-[var(--color-neutral-gray-300)] hover:bg-[var(--color-neutral-gray-100)] hover:border-[var(--color-neutral-gray-400)] disabled:hover:bg-transparent disabled:hover:border-[var(--color-neutral-gray-300)]',
  grey: 'bg-[var(--color-neutral-gray-100)] text-[var(--color-neutral-gray-700)] border-[var(--color-neutral-gray-100)] hover:bg-[var(--color-neutral-gray-200)] hover:border-[var(--color-neutral-gray-200)] disabled:hover:bg-[var(--color-neutral-gray-100)] disabled:hover:border-[var(--color-neutral-gray-100)]',
  transparent: 'bg-transparent text-[var(--color-ui-action)] border-transparent hover:bg-[var(--color-action-tint)] disabled:hover:bg-transparent',
  white: 'bg-[var(--color-neutral-white)] text-[var(--color-text-link)] border-[var(--color-neutral-white)] hover:bg-[#e8f2ff] hover:border-[#e8f2ff] disabled:hover:bg-[var(--color-neutral-white)] disabled:hover:border-[var(--color-neutral-white)]',
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
