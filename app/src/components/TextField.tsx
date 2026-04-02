import { useId, useState } from 'react'
import { CirclePlusIcon, PlusIcon } from './icons'

export type TextFieldSize = 'large' | 'small'
export type TextFieldState = 'default' | 'hover' | 'focused' | 'filled' | 'error' | 'disabled'
export type TextFieldType = 'default' | 'prefix' | 'suffix'

export interface TextFieldProps {
  size?: TextFieldSize
  state?: TextFieldState
  label?: string
  type?: TextFieldType
  prefixText?: string
  placeholder?: string
  value?: string
  defaultValue?: string
  disabled?: boolean
  errorText?: string
  showLeadingIcon?: boolean
  showAction?: boolean
  className?: string
  onValueChange?: (value: string) => void
}

const sizeClasses: Record<TextFieldSize, string> = {
  large: 'w-[246px] min-h-10 gap-1 pl-4 pr-2 py-2 rounded-[var(--radius-field)]',
  small: 'w-[200px] min-h-9 gap-1 pl-3 pr-2 py-2 rounded-[var(--radius-control-small)]',
}

export function TextField({
  size = 'large',
  state = 'default',
  label = 'Label',
  type = 'default',
  prefixText = 'Prefix',
  placeholder = 'Type here',
  value,
  defaultValue = '',
  disabled = false,
  errorText,
  showLeadingIcon = false,
  showAction = true,
  className = '',
  onValueChange,
}: TextFieldProps) {
  const id = useId()
  const [internalValue, setInternalValue] = useState(defaultValue)
  const [isFocused, setIsFocused] = useState(false)
  const currentValue = value ?? internalValue

  const isDisabled = disabled || state === 'disabled'
  const isError = state === 'error'
  const isFocusedVisual = state === 'focused' || (!isDisabled && isFocused)
  const hasValue = state === 'filled' || currentValue.trim().length > 0
  const isHoverVisual = state === 'hover'

  const wrapperClasses = [
    'inline-flex items-center border bg-[var(--color-field-bg)] transition-colors',
    sizeClasses[size],
    isError
      ? 'border-[var(--color-field-border-error)]'
      : isFocusedVisual || hasValue
        ? 'border-[var(--color-field-border-active)]'
        : isHoverVisual
          ? 'border-[var(--color-field-border-hover)]'
          : 'border-[var(--color-field-border-default)]',
    isDisabled && 'opacity-50 pointer-events-none',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const labelClasses = [
    'absolute left-0 pointer-events-none transition-[top,transform,font-size,line-height,color] duration-150',
    isError
      ? 'text-[var(--color-field-text-error)]'
      : hasValue || isFocusedVisual
        ? 'text-[var(--color-field-label-floating)]'
        : 'text-[var(--color-field-label-resting)]',
    hasValue || isFocusedVisual ? 'top-0 -translate-y-1/2 text-xs leading-4' : 'top-1/2 -translate-y-1/2 text-base leading-6',
  ]
    .filter(Boolean)
    .join(' ')

  const placeholderText = isFocusedVisual && !hasValue ? placeholder : ''
  const hasInteractiveInput = isFocusedVisual || hasValue || state === 'error'

  return (
    <div className="inline-flex flex-col gap-1">
      <label htmlFor={id} className={wrapperClasses}>
        {showLeadingIcon && (
          <CirclePlusIcon
            className={size === 'large' ? 'w-5 h-5 text-[var(--color-field-leading-icon)]' : 'w-4 h-4 text-[var(--color-field-leading-icon)]'}
          />
        )}
        <span className="relative flex-1 min-w-0 min-h-6">
          <span className={labelClasses}>{label}</span>
          <span className="pt-2 flex items-center gap-1">
            {hasInteractiveInput && type === 'prefix' && (
              <span
                className={[
                  'shrink-0',
                  isError
                    ? 'text-[var(--color-field-text-error)]'
                    : isFocusedVisual
                      ? 'text-[var(--color-field-text-active)]'
                      : 'text-[var(--color-field-text-default)]',
                  size === 'small' ? 'text-sm leading-5' : 'text-base leading-6',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                {prefixText}
              </span>
            )}
            <input
              id={id}
              type="text"
              value={currentValue}
              placeholder={placeholderText}
              disabled={isDisabled}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onChange={(event) => {
                if (value === undefined) setInternalValue(event.target.value)
                onValueChange?.(event.target.value)
              }}
              className={[
                'w-full border-0 bg-transparent p-0 outline-none',
                isError
                  ? 'text-[var(--color-field-text-error)]'
                  : isFocusedVisual
                    ? 'text-[var(--color-field-text-active)]'
                    : 'text-[var(--color-field-text-default)]',
                size === 'small' ? 'text-sm leading-5' : 'text-base leading-6',
              ]
                .filter(Boolean)
                .join(' ')}
              aria-invalid={Boolean(errorText)}
              aria-describedby={errorText ? `${id}-error` : undefined}
            />
            {hasInteractiveInput && type === 'suffix' && (
              <span
                className={[
                  'shrink-0',
                  isError
                    ? 'text-[var(--color-field-text-error)]'
                    : isFocusedVisual
                      ? 'text-[var(--color-field-text-active)]'
                      : 'text-[var(--color-field-text-default)]',
                  size === 'small' ? 'text-sm leading-5' : 'text-base leading-6',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                {prefixText}
              </span>
            )}
          </span>
        </span>
        {showAction && (
          <span className="inline-flex items-center justify-center rounded-[var(--radius-icon-buttons)] p-2">
            <PlusIcon className="w-6 h-6 text-[var(--color-field-action-icon)]" />
          </span>
        )}
      </label>
      {errorText && (
        <p
          id={`${id}-error`}
          className={[
            'px-1 pt-2 pb-1 text-xs leading-4',
            isError ? 'text-[var(--color-field-helper-error)]' : 'text-[var(--color-field-helper-default)]',
          ].join(' ')}
        >
          {errorText}
        </p>
      )}
    </div>
  )
}
