import type { Meta, StoryObj } from '@storybook/react-vite'
import { Controls, Description, Primary, Stories, Title } from '@storybook/addon-docs/blocks'
import { Button } from './Button'

const styles = ['solid', 'outline', 'white'] as const
const sizes = ['large', 'medium', 'small'] as const
const icons = ['none', 'left', 'right'] as const
const states = ['default', 'hover', 'loading', 'disabled'] as const

function variationSnippet(
  style: (typeof styles)[number],
  icon: (typeof icons)[number],
  size: (typeof sizes)[number],
  state: (typeof states)[number],
) {
  return `<Button style="${style}" icon="${icon}" size="${size}" state="${state}" labelText="Label" />`
}

const meta = {
  title: 'Design System/Button',
  component: Button,
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
          'Use `Button` for primary and secondary call-to-action flows.\n\nExamples:\n`<Button labelText="Save" style="solid" size="medium" />`\n`<Button labelText="Create" style="solid" size="small" icon="right" />`\n`<Button labelText="Continue" style="outline" size="large" state="loading" />`',
      },
    },
  },
  argTypes: {
    labelText: {
      control: 'text',
      description: 'Preferred visible text label for the button.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'Label'" },
      },
    },
    style: {
      control: 'select',
      options: styles,
      description: 'Visual treatment of the button.',
      table: {
        type: { summary: "'solid' | 'outline' | 'white'" },
        defaultValue: { summary: "'solid'" },
      },
    },
    size: {
      control: 'select',
      options: sizes,
      description: 'Size variant that controls height, spacing, and text scale.',
      table: {
        type: { summary: "'large' | 'medium' | 'small'" },
        defaultValue: { summary: "'large'" },
      },
    },
    icon: {
      control: 'select',
      options: icons,
      description: 'Optional plus icon position.',
      table: {
        type: { summary: "'none' | 'left' | 'right'" },
        defaultValue: { summary: "'none'" },
      },
    },
    state: {
      control: false,
      description: 'Advanced visual QA state override (used in matrix stories). Hidden in interactive docs to avoid conflicting with loading/disabled controls.',
      table: {
        type: { summary: "'default' | 'hover' | 'disabled' | 'loading'" },
        defaultValue: { summary: 'undefined (auto from loading/disabled)' },
      },
    },
    children: {
      control: false,
      description: 'Optional custom node content. Overrides label props when provided.',
      table: { type: { summary: 'ReactNode' } },
    },
    label: {
      control: false,
      description: 'Legacy text alias. Prefer `labelText` for new usage.',
      table: { type: { summary: 'string' }, defaultValue: { summary: "'Label'" } },
    },
    loading: {
      control: 'boolean',
      description: 'Convenience flag. When true, resolves state to loading.',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables interaction. Also resolves state to disabled when no explicit state is passed.',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    className: {
      control: false,
      description: 'Optional class extension hook.',
      table: { type: { summary: 'string' }, defaultValue: { summary: "''" } },
    },
    onClick: {
      table: { disable: true },
    },
  },
  args: {
    labelText: 'Label',
    style: 'solid',
    size: 'large',
    icon: 'none',
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  name: 'Playground',
  render: (args) => <Button {...args} />,
}

export const Styles: Story = {
  name: 'Styles',
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Button style="solid" labelText="solid" />
      <Button style="outline" labelText="outline" />
      <Button style="white" labelText="white" />
    </div>
  ),
}

export const Sizes: Story = {
  name: 'Sizes',
  render: () => (
    <div className="flex items-end gap-3">
      <Button size="large" labelText="large" />
      <Button size="medium" labelText="medium" />
      <Button size="small" labelText="small" />
    </div>
  ),
}

export const Icon: Story = {
  name: 'Icon',
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Button icon="none" labelText="none" />
      <Button icon="left" labelText="left" />
      <Button icon="right" labelText="right" />
    </div>
  ),
}

export const State: Story = {
  name: 'State',
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Button state="default" labelText="default" />
      <Button state="hover" labelText="hover" />
      <Button state="loading" labelText="loading" />
      <Button state="disabled" labelText="disabled" />
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
          {icons.map((icon) => (
            <div key={`${style}-${icon}`} className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-neutral-gray-500)]">Icon: {icon}</p>
              <div className="overflow-x-auto rounded-[var(--radius-control-medium)] border border-[var(--color-neutral-gray-200)] bg-[var(--color-neutral-white)] p-4">
                <div className="grid gap-3" style={{ gridTemplateColumns: `120px repeat(${sizes.length}, minmax(0, 1fr))` }}>
                  <div />
                  {sizes.map((size) => (
                    <div key={`${style}-${icon}-header-${size}`} className="text-center text-xs font-semibold capitalize text-[var(--color-neutral-gray-600)]">
                      {size}
                    </div>
                  ))}
                  {states.map((state) => (
                    <div key={`${style}-${icon}-${state}`} className="contents">
                      <div className="flex items-center text-xs font-semibold capitalize text-[var(--color-neutral-gray-700)]">{state}</div>
                      {sizes.map((size) => (
                          <div key={`${style}-${icon}-${state}-${size}`} className="flex flex-col items-center gap-1">
                            <Button style={style} icon={icon} size={size} state={state} labelText="Label" />
                            <details className="group text-xs leading-tight text-[var(--color-neutral-gray-600)]">
                              <summary className="cursor-pointer list-none rounded border border-[var(--color-neutral-gray-300)] px-2 py-1 font-semibold tracking-wide group-open:bg-[var(--color-neutral-gray-100)]">
                                <span className="group-open:hidden">Show code</span>
                                <span className="hidden group-open:inline">Hide code</span>
                              </summary>
                              <pre className="mt-1 max-w-[180px] overflow-x-auto rounded bg-[var(--color-neutral-gray-100)] p-1 text-[10px] text-[var(--color-neutral-gray-700)]">
                                {variationSnippet(style, icon, size, state)}
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
