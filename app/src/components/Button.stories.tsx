import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from './Button'

const styles = ['solid', 'white', 'outline'] as const
const sizes = ['large', 'medium', 'small'] as const
const icons = ['none', 'left', 'right'] as const
const states = ['default', 'hover', 'disabled', 'loading'] as const

const meta = {
  title: 'Design System/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    style: {
      name: 'Style',
      options: styles,
      control: {
        type: 'select',
        labels: { solid: 'Solid', white: 'White', outline: 'Outline' },
      },
    },
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
    state: {
      name: 'State',
      options: states,
      control: {
        type: 'select',
        labels: { default: 'Default', hover: 'Hover', disabled: 'Disabled', loading: 'Loading' },
      },
    },
    labelText: { name: 'Label Text', control: 'text' },
  },
  args: {
    labelText: 'Label',
    style: 'solid',
    size: 'large',
    icon: 'none',
    state: 'default',
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Styles: Story = {
  name: 'Styles',
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      {styles.map((style) => (
        <Button key={style} style={style} size="large" icon="none" state="default" labelText={style} />
      ))}
    </div>
  ),
}

export const Sizes: Story = {
  name: 'Sizes',
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      {sizes.map((size) => (
        <Button key={size} style="solid" size={size} icon="none" state="default" labelText={size} />
      ))}
    </div>
  ),
}

export const Icon: Story = {
  name: 'Icon',
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      {icons.map((icon) => (
        <Button key={icon} style="solid" size="large" icon={icon} state="default" labelText={icon} />
      ))}
    </div>
  ),
}

export const State: Story = {
  name: 'State',
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      {states.map((state) => (
        <Button key={state} style="solid" size="large" icon="none" state={state} labelText={state} />
      ))}
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
          {styles.map((style) => (
            <div key={`${size}-${style}`} className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-neutral-gray-500)]">Style: {style}</p>
              <div className="overflow-x-auto rounded-[var(--radius-control-medium)] border border-[var(--color-neutral-gray-200)] bg-[var(--color-neutral-white)] p-4">
                <div className="grid gap-3" style={{ gridTemplateColumns: `110px repeat(${icons.length}, minmax(0, 1fr))` }}>
                  <div />
                  {icons.map((icon) => (
                    <div key={`${size}-${style}-header-${icon}`} className="text-center text-xs font-semibold capitalize text-[var(--color-neutral-gray-600)]">
                      {icon}
                    </div>
                  ))}
                  {states.map((state) => (
                    <div key={`${size}-${style}-${state}`} className="contents">
                      <div className="flex items-center text-xs font-semibold capitalize text-[var(--color-neutral-gray-700)]">{state}</div>
                      {icons.map((icon) => (
                        <div key={`${size}-${style}-${state}-${icon}`} className="flex justify-center">
                          <Button
                            style={style}
                            size={size}
                            icon={icon}
                            state={state}
                            labelText="Label"
                          />
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
