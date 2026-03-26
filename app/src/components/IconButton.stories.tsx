import type { Meta, StoryObj } from '@storybook/react-vite'
import { IconButton } from './IconButton'

const meta = {
  title: 'Design System/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  args: {
    'aria-label': 'Add',
    style: 'solid',
    size: 'large',
    disabled: false,
  },
} satisfies Meta<typeof IconButton>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Outline: Story = {
  args: { style: 'outline' },
}

export const Disabled: Story = {
  args: { disabled: true },
}
