import type { Meta, StoryObj } from '@storybook/react-vite'
import { StackedButton } from './StackedButton'

const meta = {
  title: 'Design System/StackedButton',
  component: StackedButton,
  tags: ['autodocs'],
  args: {
    label: 'Label',
    style: 'solid',
    disabled: false,
  },
} satisfies Meta<typeof StackedButton>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const OutlineGrey: Story = {
  args: { style: 'outline-grey' },
}

export const Disabled: Story = {
  args: { disabled: true },
}
