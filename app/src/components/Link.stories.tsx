import type { Meta, StoryObj } from '@storybook/react-vite'
import { Link } from './Link'

const sizes = ['large', 'medium', 'small'] as const
const icons = ['none', 'left', 'right'] as const
const weights = ['bold', 'regular'] as const
const states = ['default', 'hover', 'disabled'] as const

const meta = {
  title: 'Design System/Link',
  component: Link,
  tags: ['autodocs'],
  argTypes: {
    size: {
      name: 'Size',
      options: sizes,
      control: {
        type: 'select',
        labels: { large: 'Large', medium: 'Medium', small: 'Small' },
      },
    },
    icon: {
      name: 'Icon',
      options: icons,
      control: {
        type: 'select',
        labels: { none: 'None', left: 'Left', right: 'Right' },
      },
    },
    bold: {
      name: 'Weight',
      options: [true, false],
      control: {
        type: 'select',
        labels: { true: 'Bold', false: 'Regular' },
      },
    },
    disabled: { name: 'Disabled', control: 'boolean' },
    label: { name: 'Label Text', control: 'text' },
    href: { table: { disable: true } },
    onClick: { table: { disable: true } },
    className: { table: { disable: true } },
    children: { table: { disable: true } },
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

export const Sizes: Story = {
  name: 'Sizes',
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      {sizes.map((size) => (
        <Link key={size} size={size} icon="none" bold label={size} />
      ))}
    </div>
  ),
}

export const Icon: Story = {
  name: 'Icon',
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      {icons.map((icon) => (
        <Link key={icon} size="large" icon={icon} bold label={icon} />
      ))}
    </div>
  ),
}

export const Weight: Story = {
  name: 'Weight',
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      {weights.map((weight) => (
        <Link key={weight} size="large" icon="none" bold={weight === 'bold'} label={weight} />
      ))}
    </div>
  ),
}

export const State: Story = {
  name: 'State',
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Link size="large" icon="none" bold label="default" />
      <Link size="large" icon="none" bold className="text-[var(--color-ui-action)] underline" label="hover" />
      <Link size="large" icon="none" bold disabled label="disabled" />
    </div>
  ),
}

export const AllCombinations: Story = {
  name: 'All Combinations',
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div className="space-y-8 text-left">
      {sizes.map((size) => (
        <section key={size} className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wide text-[var(--color-neutral-gray-500)]">Size: {size}</h3>
          <div className="overflow-x-auto rounded-[var(--radius-control-medium)] border border-[var(--color-neutral-gray-200)] bg-[var(--color-neutral-white)] p-4">
            <div className="grid gap-3" style={{ gridTemplateColumns: `90px repeat(${icons.length}, minmax(0, 1fr))` }}>
              <div />
              {icons.map((icon) => (
                <div key={`${size}-header-${icon}`} className="text-center text-xs font-semibold capitalize text-[var(--color-neutral-gray-600)]">
                  {icon}
                </div>
              ))}
              {weights.map((weight) =>
                states.map((state) => (
                  <div key={`${size}-${weight}-${state}`} className="contents">
                    <div className="flex items-center text-xs font-semibold capitalize text-[var(--color-neutral-gray-700)]">
                      {weight} / {state}
                    </div>
                    {icons.map((icon) => (
                      <div key={`${size}-${weight}-${state}-${icon}`} className="flex justify-center">
                        <Link
                          size={size}
                          icon={icon}
                          bold={weight === 'bold'}
                          disabled={state === 'disabled'}
                          className={state === 'hover' ? 'text-[var(--color-ui-action)] underline' : ''}
                          label="Label"
                        />
                      </div>
                    ))}
                  </div>
                )),
              )}
            </div>
          </div>
        </section>
      ))}
    </div>
  ),
}
