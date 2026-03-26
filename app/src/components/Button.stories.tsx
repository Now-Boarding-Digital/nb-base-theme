import type { Meta, StoryObj } from '@storybook/react'
import type { ReactNode } from 'react'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'Design System/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Primary action buttons — sizes, styles, icon, loading, and disabled. See the **Examples** story for a Grafana-style overview ([reference](https://developers.grafana.com/ui/latest/index.html?path=/story/inputs-button--examples)).',
      },
    },
  },
  argTypes: {
    style: { control: 'select', options: ['solid', 'outline', 'white'] },
    size: { control: 'select', options: ['large', 'medium', 'small'] },
    icon: { control: 'select', options: ['none', 'left', 'right'] },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
}
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Label',
    style: 'solid',
    size: 'large',
    icon: 'none',
  },
}

export const Loading: Story = {
  args: {
    ...Default.args,
    loading: true,
  },
}

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
}

/** Grafana-style overview: sections + matrix — primary place to review all combinations. */
export const Examples: Story = {
  name: 'Examples',
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: {
        inline: false,
      },
    },
  },
  render: () => (
    <div className="min-h-full bg-[var(--color-neutral-gray-200)] px-6 py-10 text-left">
      <div className="mx-auto max-w-5xl space-y-12">
        <header className="border-b border-[var(--color-neutral-gray-300)] pb-6">
          <h2 className="text-lg font-bold text-[var(--color-neutral-gray-800)]">Button examples</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--color-neutral-gray-600)]">
            All combinations at a glance. Use the **Default** story for interactive controls.
          </p>
        </header>

        <ExamplesSection title="Styles" description="Large, text only — compare visual treatments.">
          <div className="flex flex-wrap gap-3">
            <LabeledButton label="Solid">
              <Button label="Label" style="solid" size="large" icon="none" />
            </LabeledButton>
            <LabeledButton label="Outline">
              <Button label="Label" style="outline" size="large" icon="none" />
            </LabeledButton>
            <LabeledButton label="White">
              <Button label="Label" style="white" size="large" icon="none" />
            </LabeledButton>
          </div>
        </ExamplesSection>

        <ExamplesSection title="Sizes" description="Solid — same label, different hit targets.">
          <div className="flex flex-wrap items-end gap-6">
            <LabeledButton label="Large">
              <Button label="Label" style="solid" size="large" icon="none" />
            </LabeledButton>
            <LabeledButton label="Medium">
              <Button label="Label" style="solid" size="medium" icon="none" />
            </LabeledButton>
            <LabeledButton label="Small">
              <Button label="Label" style="solid" size="small" icon="none" />
            </LabeledButton>
          </div>
        </ExamplesSection>

        <ExamplesSection title="Icons" description="Solid, large — icon placement.">
          <div className="flex flex-wrap gap-6">
            <LabeledButton label="None">
              <Button label="Label" style="solid" size="large" icon="none" />
            </LabeledButton>
            <LabeledButton label="Left">
              <Button label="Label" style="solid" size="large" icon="left" />
            </LabeledButton>
            <LabeledButton label="Right">
              <Button label="Label" style="solid" size="large" icon="right" />
            </LabeledButton>
          </div>
        </ExamplesSection>

        <ExamplesSection title="States" description="Solid, large — interaction states.">
          <div className="flex flex-wrap gap-6">
            <LabeledButton label="Default">
              <Button label="Label" style="solid" size="large" icon="none" />
            </LabeledButton>
            <LabeledButton label="Loading">
              <Button label="Label" style="solid" size="large" icon="none" loading />
            </LabeledButton>
            <LabeledButton label="Disabled">
              <Button label="Label" style="solid" size="large" icon="none" disabled />
            </LabeledButton>
          </div>
        </ExamplesSection>

        <ExamplesSection
          title="Matrix — style × icon"
          description="Large buttons; each cell is one variant."
        >
          <VariantMatrix />
        </ExamplesSection>

        <ExamplesSection
          title="White on dark"
          description="White style is meant for dark surfaces — same buttons on a dark band."
        >
          <div className="rounded-[var(--radius-control-medium)] bg-[var(--color-neutral-gray-800)] px-6 py-8">
            <div className="flex flex-wrap gap-4">
              <Button label="Label" style="white" size="large" icon="none" />
              <Button label="Label" style="white" size="large" icon="left" />
              <Button label="Label" style="white" size="medium" icon="none" />
            </div>
          </div>
        </ExamplesSection>
      </div>
    </div>
  ),
}

function ExamplesSection({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: ReactNode
}) {
  return (
    <section className="space-y-4">
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-neutral-gray-500)]">{title}</h3>
        {description && (
          <p className="mt-1 text-sm text-[var(--color-neutral-gray-600)]">{description}</p>
        )}
      </div>
      {children}
    </section>
  )
}

function LabeledButton({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col items-start gap-2">
      <span className="text-xs font-medium text-[var(--color-neutral-gray-500)]">{label}</span>
      {children}
    </div>
  )
}

const styles = ['solid', 'outline', 'white'] as const
const icons: { key: 'none' | 'left' | 'right'; label: string }[] = [
  { key: 'none', label: 'No icon' },
  { key: 'left', label: 'Icon left' },
  { key: 'right', label: 'Icon right' },
]

function VariantMatrix() {
  return (
    <div className="overflow-x-auto rounded-[var(--radius-control-medium)] border border-[var(--color-neutral-gray-300)] bg-[var(--color-neutral-white)] shadow-sm">
      <table className="w-full min-w-[520px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-[var(--color-neutral-gray-200)] bg-[var(--color-neutral-gray-50)]">
            <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--color-neutral-gray-600)]">
              Style
            </th>
            {icons.map((col) => (
              <th
                key={col.key}
                className="px-4 py-3 text-left text-xs font-semibold text-[var(--color-neutral-gray-600)]"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {styles.map((style) => (
            <tr key={style} className="border-b border-[var(--color-neutral-gray-100)] last:border-0">
              <td className="whitespace-nowrap px-4 py-4 align-middle">
                <span className="font-medium capitalize text-[var(--color-neutral-gray-800)]">{style}</span>
              </td>
              {icons.map((col) => (
                <td
                  key={col.key}
                  className={`px-4 py-4 align-middle ${
                    style === 'white' ? 'bg-[var(--color-neutral-gray-800)]' : ''
                  }`}
                >
                  <Button label="Label" style={style} size="large" icon={col.key} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
