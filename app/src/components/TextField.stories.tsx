import type { Meta, StoryObj } from '@storybook/react-vite'
import { Controls, Description, Primary, Stories, Title } from '@storybook/addon-docs/blocks'
import { TextField } from './TextField'

const sizes = ['large', 'small'] as const
const states = ['default', 'hover', 'focused', 'filled', 'error', 'disabled'] as const
const types = ['default', 'prefix', 'suffix'] as const

function variationSnippet(
  size: (typeof sizes)[number],
  state: (typeof states)[number],
  type: (typeof types)[number],
) {
  const valueProp = state === 'filled' || state === 'error' ? ' defaultValue="Input"' : ''
  const errorProp = state === 'error' ? ' errorText="Error text"' : ''
  return `<TextField size="${size}" state="${state}" type="${type}" label="Label" prefixText="Prefix" placeholder="Type here"${valueProp} showAction={true}${errorProp} />`
}

const meta = {
  title: 'Design System/Form/TextField',
  component: TextField,
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
          'Form text field primitive from the Forms section. Supports real typing, floating label behavior, and optional error text.',
      },
    },
  },
  argTypes: {
    size: { control: 'select', options: sizes },
    state: { control: 'select', options: states },
    type: { control: 'select', options: types },
    label: { control: 'text' },
    prefixText: { control: 'text' },
    placeholder: { control: 'text' },
    value: { control: 'text' },
    defaultValue: { control: 'text' },
    disabled: { control: 'boolean' },
    errorText: { control: 'text' },
    showLeadingIcon: { control: 'boolean' },
    showAction: { control: 'boolean' },
    onValueChange: { table: { disable: true } },
    className: { table: { disable: true } },
  },
  args: {
    size: 'large',
    state: 'default',
    type: 'default',
    label: 'Label',
    prefixText: 'Prefix',
    placeholder: 'Type here',
    defaultValue: '',
    disabled: false,
    errorText: '',
    showLeadingIcon: false,
    showAction: true,
  },
} satisfies Meta<typeof TextField>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  name: 'Playground',
  render: (args) => <TextField {...args} />,
}

export const Sizes: Story = {
  name: 'Sizes',
  render: () => (
    <div className="flex gap-3">
      <TextField size="large" label="Label" placeholder="Type here" />
      <TextField size="small" label="Label" placeholder="Type here" />
    </div>
  ),
}

export const State: Story = {
  name: 'State',
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <TextField state="default" label="Label" placeholder="Type here" />
      <TextField state="hover" label="Label" type="prefix" prefixText="Prefix" placeholder="Type here" />
      <TextField state="focused" label="Label" type="suffix" prefixText="Prefix" placeholder="Type here" />
      <TextField state="filled" label="Label" type="prefix" prefixText="Prefix" defaultValue="Input" />
      <TextField state="error" label="Label" defaultValue="Input" errorText="Error text" />
      <TextField state="disabled" label="Label" placeholder="Type here" />
    </div>
  ),
}

export const Types: Story = {
  name: 'Types',
  render: () => (
    <div className="flex flex-col gap-4 max-w-[420px]">
      <TextField type="default" label="Label" placeholder="Type here" />
      <TextField type="prefix" label="Label" prefixText="Prefix" state="focused" placeholder="Type here" />
      <TextField type="suffix" label="Label" prefixText="Suffix" state="focused" placeholder="Type here" />
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
    <div className="space-y-8 text-left">
      {sizes.map((size) => (
        <section key={size} className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wide text-[var(--color-neutral-gray-500)]">Size: {size}</h3>
          <div className="overflow-x-auto rounded-[var(--radius-control-medium)] border border-[var(--color-neutral-gray-200)] bg-[var(--color-neutral-white)] p-6">
            <div className="grid gap-x-6 gap-y-5" style={{ gridTemplateColumns: `120px repeat(${states.length}, minmax(290px, 1fr))` }}>
              <div />
              {states.map((state) => (
                <div key={`${size}-header-${state}`} className="text-center text-xs font-semibold capitalize text-[var(--color-neutral-gray-600)]">
                  {state}
                </div>
              ))}
              {types.map((type) => (
                <div key={`${size}-${type}`} className="contents">
                  <div className="flex items-center text-xs font-semibold capitalize text-[var(--color-neutral-gray-700)]">{type}</div>
                  {states.map((state) => {
                    return (
                      <div key={`${size}-${type}-${state}`} className="flex flex-col items-start gap-2">
                        <TextField
                          size={size}
                          state={state}
                          type={type}
                          label="Label"
                          prefixText="Prefix"
                          placeholder="Type here"
                          defaultValue={state === 'filled' || state === 'error' ? 'Input' : undefined}
                          errorText={state === 'error' ? 'Error text' : undefined}
                        />
                        {state !== 'error' && <div className="h-7" aria-hidden />}
                        <details className="group text-xs leading-tight text-[var(--color-neutral-gray-600)]">
                          <summary className="cursor-pointer list-none rounded border border-[var(--color-neutral-gray-300)] px-2 py-1 font-semibold tracking-wide group-open:bg-[var(--color-neutral-gray-100)]">
                            <span className="group-open:hidden">Show code</span>
                            <span className="hidden group-open:inline">Hide code</span>
                          </summary>
                          <pre className="mt-1 max-w-[260px] overflow-x-auto rounded bg-[var(--color-neutral-gray-100)] p-1 text-[10px] text-[var(--color-neutral-gray-700)]">
                            {variationSnippet(size, state, type)}
                          </pre>
                        </details>
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}
    </div>
  ),
}
