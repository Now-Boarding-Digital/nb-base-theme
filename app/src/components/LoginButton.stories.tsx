import type { Meta, StoryObj } from '@storybook/react-vite'
import { Controls, Description, Primary, Stories, Title } from '@storybook/addon-docs/blocks'
import { LoginButton } from './LoginButton'

const providers = ['google', 'apple', 'facebook', 'default'] as const
const states = ['default', 'hover', 'disabled'] as const

function variationSnippet(
  provider: (typeof providers)[number],
  state: (typeof states)[number],
) {
  const className = state === 'hover' ? ' className="brightness-[0.97]"' : ''
  return `<LoginButton provider="${provider}" disabled={${state === 'disabled'}} label="Label"${className} />`
}

const meta = {
  title: 'Design System/LoginButton',
  component: LoginButton,
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
          'Use `LoginButton` for auth/provider entry points. Switch provider and disabled state to match your login flow.',
      },
    },
  },
  argTypes: {
    provider: { control: 'select', options: providers },
    label: { control: 'text' },
    disabled: { control: 'boolean' },
    className: { table: { disable: true } },
    onClick: { table: { disable: true } },
  },
  args: { provider: 'google', disabled: false },
} satisfies Meta<typeof LoginButton>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  name: 'Playground',
  render: (args) => <LoginButton {...args} />,
}

export const Provider: Story = { name: 'Provider', render: () => <div className="flex flex-col gap-2">{providers.map((p) => <LoginButton key={p} provider={p} />)}</div> }
export const State: Story = {
  name: 'State',
  render: () => (
    <div className="flex flex-col gap-2">
      <LoginButton label="default" />
      <LoginButton label="hover" className="brightness-[0.97]" />
      <LoginButton label="disabled" disabled />
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
      {providers.map((provider) => (
        <section key={provider} className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wide text-[var(--color-neutral-gray-500)]">Provider: {provider}</h3>
          <div className="overflow-x-auto rounded-[var(--radius-control-medium)] border border-[var(--color-neutral-gray-200)] bg-[var(--color-neutral-white)] p-4">
            <div className="grid gap-3" style={{ gridTemplateColumns: `120px repeat(${states.length}, minmax(0, 1fr))` }}>
              <div />
              {states.map((state) => (
                <div key={`${provider}-header-${state}`} className="text-center text-xs font-semibold capitalize text-[var(--color-neutral-gray-600)]">
                  {state}
                </div>
              ))}
              <div className="flex items-center text-xs font-semibold text-[var(--color-neutral-gray-700)]">Label</div>
              {states.map((state) => (
                <div key={`${provider}-${state}`} className="flex flex-col items-center gap-1">
                  <LoginButton provider={provider} disabled={state === 'disabled'} className={state === 'hover' ? 'brightness-[0.97]' : ''} label="Label" />
                  <details className="group text-xs leading-tight text-[var(--color-neutral-gray-600)]">
                    <summary className="cursor-pointer list-none rounded border border-[var(--color-neutral-gray-300)] px-2 py-1 font-semibold tracking-wide group-open:bg-[var(--color-neutral-gray-100)]">
                      <span className="group-open:hidden">Show code</span>
                      <span className="hidden group-open:inline">Hide code</span>
                    </summary>
                    <pre className="mt-1 max-w-[240px] overflow-x-auto rounded bg-[var(--color-neutral-gray-100)] p-1 text-[10px] text-[var(--color-neutral-gray-700)]">
                      {variationSnippet(provider, state)}
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
