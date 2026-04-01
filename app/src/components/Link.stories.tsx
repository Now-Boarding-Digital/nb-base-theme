import type { Meta, StoryObj } from '@storybook/react-vite'
import { Controls, Description, Primary, Stories, Title } from '@storybook/addon-docs/blocks'
import { Link } from './Link'

const sizes = ['large', 'medium', 'small'] as const
const icons = ['none', 'left', 'right'] as const
const weights = ['bold', 'regular'] as const
const states = ['default', 'hover', 'disabled'] as const

function variationSnippet(
  size: (typeof sizes)[number],
  icon: (typeof icons)[number],
  weight: (typeof weights)[number],
  state: (typeof states)[number],
) {
  const className = state === 'hover' ? ' className="underline text-[var(--color-ui-action)]"' : ''
  return `<Link size="${size}" icon="${icon}" bold={${weight === 'bold'}} disabled={${state === 'disabled'}} label="Label"${className} />`
}

const meta = {
  title: 'Design System/Link',
  component: Link,
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
          'Use `Link` for inline navigation and lightweight actions. Choose size, icon placement, and weight through props.',
      },
    },
  },
  argTypes: {
    label: { control: 'text' },
    size: { control: 'select', options: sizes },
    icon: { control: 'select', options: icons },
    bold: { control: 'boolean' },
    disabled: { control: 'boolean' },
    href: { control: 'text' },
    className: { table: { disable: true } },
    children: { table: { disable: true } },
    onClick: { table: { disable: true } },
  },
  args: {
    label: 'Label',
    size: 'large',
    icon: 'none',
    bold: true,
    disabled: false,
  },
} satisfies Meta<typeof Link>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  name: 'Playground',
  render: (args) => <Link {...args} />,
}

export const Sizes: Story = {
  name: 'Sizes',
  render: () => <div className="flex flex-col gap-2">{sizes.map((size) => <Link key={size} size={size} label={size} />)}</div>,
}

export const Icon: Story = {
  name: 'Icon',
  render: () => <div className="flex gap-4">{icons.map((icon) => <Link key={icon} icon={icon} label={icon} />)}</div>,
}

export const Weight: Story = {
  name: 'Weight',
  render: () => (
    <div className="flex gap-4">
      <Link bold label="bold" />
      <Link bold={false} label="regular" />
    </div>
  ),
}

export const State: Story = {
  name: 'State',
  render: () => (
    <div className="flex gap-4">
      <Link label="default" />
      <Link label="hover" className="underline text-[var(--color-ui-action)]" />
      <Link label="disabled" disabled />
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
      {weights.map((weight) => (
        <section key={weight} className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wide text-[var(--color-neutral-gray-500)]">Weight: {weight}</h3>
          {icons.map((icon) => (
            <div key={`${weight}-${icon}`} className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-neutral-gray-500)]">Icon: {icon}</p>
              <div className="overflow-x-auto rounded-[var(--radius-control-medium)] border border-[var(--color-neutral-gray-200)] bg-[var(--color-neutral-white)] p-4">
                <div className="grid gap-3" style={{ gridTemplateColumns: `120px repeat(${sizes.length}, minmax(0, 1fr))` }}>
                  <div />
                  {sizes.map((size) => (
                    <div key={`${weight}-${icon}-header-${size}`} className="text-center text-xs font-semibold capitalize text-[var(--color-neutral-gray-600)]">
                      {size}
                    </div>
                  ))}
                  {states.map((state) => (
                    <div key={`${weight}-${icon}-${state}`} className="contents">
                      <div className="flex items-center text-xs font-semibold capitalize text-[var(--color-neutral-gray-700)]">{state}</div>
                      {sizes.map((size) => (
                        <div key={`${weight}-${icon}-${state}-${size}`} className="flex flex-col items-center gap-1">
                          <Link
                            size={size}
                            icon={icon}
                            bold={weight === 'bold'}
                            disabled={state === 'disabled'}
                            label="Label"
                            className={state === 'hover' ? 'underline text-[var(--color-ui-action)]' : ''}
                          />
                          <details className="group text-xs leading-tight text-[var(--color-neutral-gray-600)]">
                            <summary className="cursor-pointer list-none rounded border border-[var(--color-neutral-gray-300)] px-2 py-1 font-semibold tracking-wide group-open:bg-[var(--color-neutral-gray-100)]">
                              <span className="group-open:hidden">Show code</span>
                              <span className="hidden group-open:inline">Hide code</span>
                            </summary>
                            <pre className="mt-1 max-w-[220px] overflow-x-auto rounded bg-[var(--color-neutral-gray-100)] p-1 text-[10px] text-[var(--color-neutral-gray-700)]">
                              {variationSnippet(size, icon, weight, state)}
                            </pre>
                          </details>
                        </div>
                      ))}
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
