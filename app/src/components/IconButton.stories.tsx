import type { Meta, StoryObj } from '@storybook/react-vite'
import { Controls, Description, Primary, Stories, Title } from '@storybook/addon-docs/blocks'
import { IconButton } from './IconButton'

const styles = ['solid', 'outline', 'transparent', 'white'] as const
const sizes = ['large', 'medium', 'small'] as const
const states = ['default', 'hover', 'disabled'] as const

function variationSnippet(
  style: (typeof styles)[number],
  size: (typeof sizes)[number],
  state: (typeof states)[number],
) {
  const className = state === 'hover' ? ' className="brightness-[0.97]"' : ''
  return `<IconButton aria-label="Label" style="${style}" size="${size}" disabled={${state === 'disabled'}}${className} />`
}

const meta = {
  title: 'Design System/IconButton',
  component: IconButton,
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
          'Use `IconButton` for icon-only actions. Always pass an accessible label via `aria-label`.\n\nExample:\n`<IconButton aria-label="Add item" style="solid" size="large" />`',
      },
    },
  },
  argTypes: {
    style: { control: 'select', options: styles },
    size: { control: 'select', options: sizes },
    disabled: { control: 'boolean' },
    'aria-label': { control: 'text' },
    className: { table: { disable: true } },
    children: { table: { disable: true } },
    onClick: { table: { disable: true } },
  },
  args: { 'aria-label': 'Icon button', style: 'solid', size: 'large', disabled: false },
} satisfies Meta<typeof IconButton>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  name: 'Playground',
  render: (args) => <IconButton {...args} />,
}

export const Styles: Story = {
  name: 'Styles',
  render: () => (
    <div className="flex gap-3">
      <IconButton aria-label="solid" style="solid" />
      <IconButton aria-label="outline" style="outline" />
      <IconButton aria-label="transparent" style="transparent" />
      <IconButton aria-label="white" style="white" />
    </div>
  ),
}

export const Sizes: Story = {
  name: 'Sizes',
  render: () => (
    <div className="flex items-end gap-3">
      <IconButton aria-label="large" size="large" />
      <IconButton aria-label="medium" size="medium" />
      <IconButton aria-label="small" size="small" />
    </div>
  ),
}
export const State: Story = {
  name: 'State',
  render: () => (
    <div className="flex gap-3">
      <IconButton aria-label="default" />
      <IconButton aria-label="hover" className="brightness-[0.97]" />
      <IconButton aria-label="disabled" disabled />
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
      {styles.map((style) => (
        <section key={style} className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wide text-[var(--color-neutral-gray-500)]">Style: {style}</h3>
          <div className="overflow-x-auto rounded-[var(--radius-control-medium)] border border-[var(--color-neutral-gray-200)] bg-[var(--color-neutral-white)] p-4">
            <div className="grid gap-3" style={{ gridTemplateColumns: `100px repeat(${sizes.length}, minmax(0, 1fr))` }}>
              <div />
              {sizes.map((size) => (
                <div key={`${style}-header-${size}`} className="text-center text-xs font-semibold capitalize text-[var(--color-neutral-gray-600)]">
                  {size}
                </div>
              ))}
              {states.map((state) => (
                <div key={`${style}-${state}`} className="contents">
                  <div className="flex items-center text-xs font-semibold capitalize text-[var(--color-neutral-gray-700)]">{state}</div>
                  {sizes.map((size) => (
                    <div key={`${style}-${state}-${size}`} className="flex flex-col items-center gap-1">
                      <IconButton
                        aria-label={`${style}-${state}-${size}`}
                        style={style}
                        size={size}
                        disabled={state === 'disabled'}
                        className={state === 'hover' ? 'brightness-[0.97]' : ''}
                      />
                      <details className="group text-xs leading-tight text-[var(--color-neutral-gray-600)]">
                        <summary className="cursor-pointer list-none rounded border border-[var(--color-neutral-gray-300)] px-2 py-1 font-semibold tracking-wide group-open:bg-[var(--color-neutral-gray-100)]">
                          <span className="group-open:hidden">Show code</span>
                          <span className="hidden group-open:inline">Hide code</span>
                        </summary>
                        <pre className="mt-1 max-w-[220px] overflow-x-auto rounded bg-[var(--color-neutral-gray-100)] p-1 text-[10px] text-[var(--color-neutral-gray-700)]">
                          {variationSnippet(style, size, state)}
                        </pre>
                      </details>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}
    </div>
  ),
}
