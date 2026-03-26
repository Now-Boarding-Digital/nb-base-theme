import type { Meta, StoryObj } from '@storybook/react-vite'
import { LoginButton } from './LoginButton'

const meta = {
  title: 'Design System/LoginButton',
  component: LoginButton,
  tags: ['autodocs'],
  args: {
    provider: 'google',
    disabled: false,
  },
} satisfies Meta<typeof LoginButton>

export default meta

type Story = StoryObj<typeof meta>

export const Google: Story = {
  args: { provider: 'google' },
}

export const Apple: Story = {
  args: { provider: 'apple' },
}

export const DefaultProvider: Story = {
  name: 'Email',
  args: { provider: 'default' },
}

export const Disabled: Story = {
  args: { provider: 'google', disabled: true },
}
