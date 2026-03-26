import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from './Button'

const meta = {
  title: 'Design System/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    style: { control: 'select', options: ['solid', 'white', 'outline'] },
    size: { control: 'select', options: ['large', 'medium', 'small'] },
    icon: { control: 'select', options: ['none', 'left', 'right'] },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    label: 'Label',
    style: 'solid',
    size: 'large',
    icon: 'none',
    loading: false,
    disabled: false,
  },
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

const styles = ['solid', 'white', 'outline'] as const
const icons = ['none', 'left', 'right'] as const

/** Matrix: style × icon (large, default state) — matches Figma “Buttons” grid intent */
export const Examples: Story = {
  name: 'Examples',
  render: () => (
    <div className="flex flex-col gap-10 text-left">
      <section className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wide text-[var(--color-neutral-gray-500)]">Style × icon</h3>
        <div className="overflow-x-auto rounded-[var(--radius-control-medium)] border border-[var(--color-neutral-gray-200)] bg-[var(--color-neutral-white)] p-6">
          <div className="grid gap-6" style={{ gridTemplateColumns: `120px repeat(${icons.length}, minmax(0, 1fr))` }}>
            <div />
            {icons.map((ic) => (
              <div key={ic} className="text-center text-xs font-semibold capitalize text-[var(--color-neutral-gray-600)]">
                {ic}
              </div>
            ))}
            {styles.map((st) => (
              <div key={st} className="contents">
                <div className="flex items-center text-sm font-semibold capitalize text-[var(--color-neutral-gray-800)]">{st}</div>
                {icons.map((ic) => (
                  <div key={`${st}-${ic}`} className="flex justify-center">
                    <Button style={st} size="large" icon={ic} label="Label" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wide text-[var(--color-neutral-gray-500)]">Sizes (solid)</h3>
        <div className="flex flex-wrap items-center gap-4">
          <Button size="large" label="Large" />
          <Button size="medium" label="Medium" />
          <Button size="small" label="Small" />
        </div>
      </section>
    </div>
  ),
}

export const Default: Story = {}

export const Loading: Story = {
  args: { loading: true },
}

export const Disabled: Story = {
  args: { disabled: true },
}
