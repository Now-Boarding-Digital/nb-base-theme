import type { Meta, StoryObj } from '@storybook/react-vite'
import { Controls, Description, Primary, Stories, Title } from '@storybook/addon-docs/blocks'
import { Radio } from './Radio'

const sizes = ['default', 'large'] as const
const states = ['default', 'hover', 'disabled'] as const
const selectedStates = ['no', 'yes'] as const

function variationSnippet(
  size: (typeof sizes)[number],
  state: (typeof states)[number],
  selected: (typeof selectedStates)[number]
) {
  const selectedProp = selected === 'yes' ? ' checked={true}' : ''
  const stateProp = state !== 'default' ? ` state="${state}"` : ''
  return `<Radio aria-label="Example radio" size="${size}"${stateProp}${selectedProp} />`
}

const meta = {
  title: 'Design System/Controls/Radio',
  component: Radio,
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
          'Use `Radio` for single-choice options in a group. This story set mirrors Figma `State x Selected x Size` coverage.',
      },
    },
  },
  argTypes: {
    checked: { control: 'boolean' },
    defaultChecked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    size: {
      control: 'radio',
      options: ['default', 'large'],
    },
    state: {
      control: 'radio',
      options: ['default', 'hover', 'disabled'],
    },
    name: { control: 'text' },
    value: { control: 'text' },
    'aria-label': { control: 'text' },
    className: { table: { disable: true } },
    onChange: { table: { disable: true } },
  },
  args: {
    size: 'default',
    state: 'default',
    defaultChecked: false,
    disabled: false,
    name: 'playground-radio',
    value: 'one',
    'aria-label': 'Playground radio',
  },
} satisfies Meta<typeof Radio>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Sizes: Story = {
  parameters: {
    docs: {
      source: {
        code: `<div className="flex items-center gap-6">
  <Radio aria-label="Default size" size="default" />
  <Radio aria-label="Large size" size="large" />
</div>`,
      },
    },
  },
  render: () => (
    <div className="flex items-center gap-6">
      <Radio aria-label="Default size" size="default" />
      <Radio aria-label="Large size" size="large" />
    </div>
  ),
}

export const State: Story = {
  parameters: {
    docs: {
      source: {
        code: `<div className="flex items-center gap-6">
  <Radio aria-label="Default state" state="default" />
  <Radio aria-label="Hover state" state="hover" />
  <Radio aria-label="Disabled state" state="disabled" />
</div>`,
      },
    },
  },
  render: () => (
    <div className="flex items-center gap-6">
      <Radio aria-label="Default state" state="default" />
      <Radio aria-label="Hover state" state="hover" />
      <Radio aria-label="Disabled state" state="disabled" />
    </div>
  ),
}

export const Selection: Story = {
  parameters: {
    docs: {
      source: {
        code: `<div className="flex items-center gap-6">
  <Radio aria-label="Not selected" />
  <Radio aria-label="Selected" checked />
</div>`,
      },
    },
  },
  render: () => (
    <div className="flex items-center gap-6">
      <Radio aria-label="Not selected" />
      <Radio aria-label="Selected" checked />
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
      {sizes.map((size) => (
        <section key={size} className="space-y-4">
          <h3 className="text-sm font-semibold capitalize">{`size=${size}`}</h3>
          {selectedStates.map((selected) => (
            <div key={`${size}-${selected}`} className="space-y-3">
              <p className="text-xs font-medium text-slate-700">{`selected=${selected}`}</p>
              <div className="grid grid-cols-3 gap-6">
                {states.map((state) => (
                  <div key={`${size}-${selected}-${state}`} className="space-y-2 rounded-md border border-slate-300 bg-white p-4">
                    <p className="text-xs text-slate-600">{`state=${state}`}</p>
                    <Radio
                      aria-label={`${size} ${selected} ${state}`}
                      size={size}
                      state={state}
                      checked={selected === 'yes'}
                    />
                    <pre className="overflow-x-auto rounded bg-slate-50 p-2 text-xs leading-5 text-slate-700">
                      <code>{variationSnippet(size, state, selected)}</code>
                    </pre>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>
      ))}
    </div>
  ),
}
