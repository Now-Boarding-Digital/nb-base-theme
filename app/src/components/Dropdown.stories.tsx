import type { Meta, StoryObj } from '@storybook/react-vite'
import { Dropdown } from './Dropdown'

const sampleItems = [
  { label: 'Option one', onSelect: () => undefined },
  { label: 'Option two', onSelect: () => undefined },
  { label: 'Option three', onSelect: () => undefined },
]

const meta = {
  title: 'Design System/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  args: {
    label: 'Select',
    items: sampleItems,
    size: 'large',
    variant: 'default' as const,
  },
} satisfies Meta<typeof Dropdown>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Small: Story = {
  args: { size: 'small' },
}

export const IconOnly: Story = {
  args: { variant: 'icon-only', label: 'Open menu' },
}

export const WithPlusIcon: Story = {
  args: { variant: 'with-plus-icon', label: 'Actions' },
}
