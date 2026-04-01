import type { Meta, StoryObj } from '@storybook/react-vite'
import { Controls, Description, Primary, Stories, Title } from '@storybook/addon-docs/blocks'
import { StackedButton } from './StackedButton'

const styles = ['solid', 'outline-grey', 'grey', 'transparent', 'white'] as const
const states = ['default', 'hover', 'disabled'] as const

function variationSnippet(
  style: (typeof styles)[number],
  state: (typeof states)[number],
) {
  const className = state === 'hover' ? ' className="brightness-[0.97]"' : ''
  return `<StackedButton style="${style}" disabled={${state === 'disabled'}} label="Label"${className} />`
}

const meta = {
  title: 'Design System/StackedButton',
  component: StackedButton,
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
          'Use `StackedButton` for compact vertical actions with icon + label. Configure style and disabled state from props.',
      },
    },
  },
  argTypes: {
    style: { control: 'select', options: styles },
    label: { control: 'text' },
    disabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    className: { table: { disable: true } },
    children: { table: { disable: true } },
    onClick: { table: { disable: true } },
  },
  args: { style: 'solid', label: 'Label', disabled: false },
} satisfies Meta<typeof StackedButton>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  name: 'Playground',
  render: (args) => <StackedButton {...args} />,
}

export const Styles: Story = {
  name: 'Styles',
  render: () => (
    <div className="flex flex-wrap gap-4">
      <div className="flex flex-col items-center gap-2">
        <StackedButton style="solid" label="Label" />
        <span className="text-xs text-[var(--color-neutral-gray-600)]">solid</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <StackedButton style="outline-grey" label="Label" />
        <span className="text-xs text-[var(--color-neutral-gray-600)]">outline-grey</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <StackedButton style="grey" label="Label" />
        <span className="text-xs text-[var(--color-neutral-gray-600)]">grey</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <StackedButton style="transparent" label="Label" />
        <span className="text-xs text-[var(--color-neutral-gray-600)]">transparent</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <StackedButton style="white" label="Label" />
        <span className="text-xs text-[var(--color-neutral-gray-600)]">white</span>
      </div>
    </div>
  ),
}
export const State: Story = {
  name: 'State',
  render: () => (
    <div className="flex gap-3">
      <StackedButton label="default" />
      <StackedButton label="hover" className="brightness-[0.97]" />
      <StackedButton label="disabled" disabled />
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
            <div className="grid gap-3" style={{ gridTemplateColumns: `120px repeat(${states.length}, minmax(0, 1fr))` }}>
              <div />
              {states.map((state) => (
                <div key={`${style}-header-${state}`} className="text-center text-xs font-semibold capitalize text-[var(--color-neutral-gray-600)]">
                  {state}
                </div>
              ))}
              <div className="flex items-center text-xs font-semibold text-[var(--color-neutral-gray-700)]">Fixed size</div>
              {states.map((state) => (
                <div key={`${style}-${state}`} className="flex flex-col items-center gap-1">
                  <StackedButton style={style} disabled={state === 'disabled'} label="Label" className={state === 'hover' ? 'brightness-[0.97]' : ''} />
                  <details className="group text-xs leading-tight text-[var(--color-neutral-gray-600)]">
                    <summary className="cursor-pointer list-none rounded border border-[var(--color-neutral-gray-300)] px-2 py-1 font-semibold tracking-wide group-open:bg-[var(--color-neutral-gray-100)]">
                      <span className="group-open:hidden">Show code</span>
                      <span className="hidden group-open:inline">Hide code</span>
                    </summary>
                    <pre className="mt-1 max-w-[220px] overflow-x-auto rounded bg-[var(--color-neutral-gray-100)] p-1 text-[10px] text-[var(--color-neutral-gray-700)]">
                      {variationSnippet(style, state)}
                    </pre>
                  </details>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}
    </div>
  ),
}
