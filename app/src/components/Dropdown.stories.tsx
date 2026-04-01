import type { Meta, StoryObj } from '@storybook/react-vite'
import { Controls, Description, Primary, Stories, Title } from '@storybook/addon-docs/blocks'
import { Dropdown } from './Dropdown'

const sizes = ['large', 'small'] as const
const variants = ['default', 'icon-only', 'with-plus-icon'] as const
const states = ['default', 'hover', 'filled', 'open', 'disabled'] as const

const items = [{ label: 'Option A' }, { label: 'Option B' }, { label: 'Option C' }]

function stateClass(state: (typeof states)[number]): string {
  if (state === 'hover') return 'bg-[var(--color-neutral-gray-50)] border-[var(--color-neutral-gray-400)]'
  if (state === 'filled') return 'bg-[var(--color-neutral-gray-100)] border-[var(--color-ui-action)]'
  if (state === 'open') return 'bg-[var(--color-neutral-gray-100)] border-[var(--color-ui-action)] outline outline-2 outline-[var(--color-action-outline)] outline-offset-2'
  if (state === 'disabled') return 'opacity-50 pointer-events-none'
  return ''
}

function variationSnippet(
  size: (typeof sizes)[number],
  variant: (typeof variants)[number],
  state: (typeof states)[number],
) {
  return `<TriggerPreview size="${size}" variant="${variant}" state="${state}" />`
}

function TriggerPreview({
  size,
  variant,
  state,
}: {
  size: (typeof sizes)[number]
  variant: (typeof variants)[number]
  state: (typeof states)[number]
}) {
  const base = [
    'inline-flex items-center justify-between gap-2 font-medium border border-[var(--color-neutral-gray-300)] bg-[var(--color-neutral-white)] text-[var(--color-neutral-gray-700)] rounded-[var(--radius-control-medium)]',
    size === 'large' ? 'h-10 min-w-[180px] px-3 text-sm leading-5' : 'h-8 min-w-[160px] px-2.5 text-xs leading-4',
    variant === 'icon-only' ? (size === 'large' ? 'min-w-10 w-10 p-0 justify-center' : 'min-w-8 w-8 p-0 justify-center') : '',
    stateClass(state),
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button type="button" className={base} aria-label="Open menu">
      {variant === 'with-plus-icon' && <span>+</span>}
      {variant !== 'icon-only' && <span>Label</span>}
      <span>v</span>
    </button>
  )
}

const meta = {
  title: 'Design System/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Description />
          <Primary />
          <Controls />
          <Stories includePrimary={false} title="Examples" />
        </>
      ),
      description: {
        component:
          'Use `Dropdown` for selectable menu actions. Configure trigger size/variant and menu items through props.',
      },
    },
  },
  argTypes: {
    size: { control: 'select', options: sizes },
    variant: { control: 'select', options: variants },
    label: { control: 'text' },
    items: { control: false },
    trigger: { table: { disable: true } },
    className: { table: { disable: true } },
  },
  args: { size: 'large', variant: 'default', label: 'Select', items },
} satisfies Meta<typeof Dropdown>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  name: 'Playground',
  render: (args) => <Dropdown {...args} />,
}

export const Sizes: Story = { name: 'Sizes', render: () => <div className="flex gap-3">{sizes.map((s) => <Dropdown key={s} size={s} label={s} items={items} />)}</div> }
export const Variant: Story = { name: 'Variant', render: () => <div className="flex gap-3">{variants.map((v) => <Dropdown key={v} variant={v} label={v} items={items} />)}</div> }
export const State: Story = {
  name: 'State',
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      {states.map((state) => (
        <TriggerPreview key={state} size="large" variant="default" state={state} />
      ))}
    </div>
  ),
}
export const AllCombinations: Story = {
  name: 'All Combinations',
  parameters: {
    controls: { disable: true },
    docs: { disable: true },
  },
  render: () => (
    <div className="space-y-6 text-left">
      {sizes.map((size) => (
        <section key={size} className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wide text-[var(--color-neutral-gray-500)]">Size: {size}</h3>
          {variants.map((variant) => (
            <div key={`${size}-${variant}`} className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-neutral-gray-500)]">Variant: {variant}</p>
              <div className="overflow-x-auto rounded-[var(--radius-control-medium)] border border-[var(--color-neutral-gray-200)] bg-[var(--color-neutral-white)] p-4">
                <div className="grid gap-3" style={{ gridTemplateColumns: `120px repeat(${states.length}, minmax(0, 1fr))` }}>
                  <div />
                  {states.map((state) => (
                    <div key={`${size}-${variant}-header-${state}`} className="text-center text-xs font-semibold capitalize text-[var(--color-neutral-gray-600)]">
                      {state}
                    </div>
                  ))}
                  <div className="flex items-center text-xs font-semibold text-[var(--color-neutral-gray-700)]">Trigger</div>
                  {states.map((state) => (
                    <div key={`${size}-${variant}-${state}`} className="flex flex-col items-center gap-1">
                      <TriggerPreview size={size} variant={variant} state={state} />
                      <details className="group text-xs leading-tight text-[var(--color-neutral-gray-600)]">
                        <summary className="cursor-pointer list-none rounded border border-[var(--color-neutral-gray-300)] px-2 py-1 font-semibold tracking-wide group-open:bg-[var(--color-neutral-gray-100)]">
                          <span className="group-open:hidden">Show code</span>
                          <span className="hidden group-open:inline">Hide code</span>
                        </summary>
                        <pre className="mt-1 max-w-[240px] overflow-x-auto rounded bg-[var(--color-neutral-gray-100)] p-1 text-[10px] text-[var(--color-neutral-gray-700)]">
                          {variationSnippet(size, variant, state)}
                        </pre>
                      </details>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </section>
      ))}
    </div>
  ),
}
