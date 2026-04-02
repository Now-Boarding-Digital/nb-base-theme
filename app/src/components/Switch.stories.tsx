import type { Meta, StoryObj } from '@storybook/react-vite'
import { Controls, Description, Primary, Stories, Title } from '@storybook/addon-docs/blocks'
import { Switch } from './Switch'

const states = ['off', 'on'] as const
const enabledStates = ['enabled', 'disabled'] as const

function variationSnippet(state: (typeof states)[number], enabled: (typeof enabledStates)[number]) {
  const checkedProp = state === 'on' ? ' checked={true}' : ''
  const disabledProp = enabled === 'disabled' ? ' disabled={true}' : ''
  return `<Switch aria-label="Example switch"${checkedProp}${disabledProp} />`
}

const meta = {
  title: 'Design System/Controls/Switch',
  component: Switch,
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
          'Use `Switch` for boolean settings and on/off toggles. Radix provides accessibility and keyboard behavior; visual styling is token-driven.',
      },
    },
  },
  argTypes: {
    checked: { control: 'boolean' },
    defaultChecked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    'aria-label': { control: 'text' },
    className: { table: { disable: true } },
    onCheckedChange: { table: { disable: true } },
  },
  args: {
    defaultChecked: false,
    disabled: false,
    'aria-label': 'Playground switch',
  },
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Sizes: Story = {
  parameters: {
    docs: {
      source: {
        code: `<Switch aria-label="Default switch size" />`,
      },
    },
  },
  render: () => (
    <div className="space-y-2">
      <Switch aria-label="Default switch size" />
      <p className="text-xs text-slate-600">Default size from Figma: 40 x 20</p>
    </div>
  ),
}

export const State: Story = {
  parameters: {
    docs: {
      source: {
        code: `<div className="flex items-center gap-6">
  <Switch aria-label="Off enabled" />
  <Switch aria-label="On enabled" checked />
  <Switch aria-label="Off disabled" disabled />
  <Switch aria-label="On disabled" checked disabled />
</div>`,
      },
    },
  },
  render: () => (
    <div className="flex items-center gap-6">
      <Switch aria-label="Off enabled" />
      <Switch aria-label="On enabled" checked />
      <Switch aria-label="Off disabled" disabled />
      <Switch aria-label="On disabled" checked disabled />
    </div>
  ),
}

export const AllCombinations: Story = {
  parameters: {
    docs: {
      disable: true,
      source: { code: '' },
    },
  },
  render: () => (
    <div className="space-y-10">
      {enabledStates.map((enabled) => (
        <section key={enabled} className="space-y-4">
          <h3 className="text-sm font-semibold capitalize">{enabled}</h3>
          <div className="grid grid-cols-2 gap-6">
            {states.map((state) => (
              <div key={`${enabled}-${state}`} className="space-y-2 rounded-md border border-slate-300 bg-white p-4">
                <p className="text-xs text-slate-600">{`state=${state}, enabled=${enabled}`}</p>
                <Switch
                  aria-label={`${state} ${enabled}`}
                  checked={state === 'on'}
                  disabled={enabled === 'disabled'}
                />
                <pre className="overflow-x-auto rounded bg-slate-50 p-2 text-xs leading-5 text-slate-700">
                  <code>{variationSnippet(state, enabled)}</code>
                </pre>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  ),
}
