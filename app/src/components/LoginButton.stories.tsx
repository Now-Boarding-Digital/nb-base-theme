import type { Meta, StoryObj } from '@storybook/react'
import { LoginButton } from './LoginButton'

const meta: Meta<typeof LoginButton> = {
  title: 'Design System/LoginButton',
  component: LoginButton,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Social / auth login buttons (Figma 138:3677, Login Buttons).',
      },
    },
  },
}
export default meta

type Story = StoryObj<typeof meta>

export const Google: Story = {
  args: { provider: 'google' },
}

export const Apple: Story = {
  args: { provider: 'apple' },
}

export const Facebook: Story = {
  args: { provider: 'facebook' },
}

export const Email: Story = {
  args: { provider: 'default' },
}

export const AllProviders: Story = {
  render: () => (
    <div className="flex flex-col gap-3 p-4 max-w-md">
      <LoginButton provider="google" />
      <LoginButton provider="apple" />
      <LoginButton provider="facebook" />
      <LoginButton provider="default" />
    </div>
  ),
}
