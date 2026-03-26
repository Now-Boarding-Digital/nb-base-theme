import type { Meta, StoryObj } from '@storybook/react'
import { Dropdown } from './Dropdown'

const sampleItems = [
  { label: 'Option one', onSelect: () => {} },
  { label: 'Option two', onSelect: () => {} },
  { label: 'Option three', onSelect: () => {} },
]

const meta: Meta<typeof Dropdown> = {
  title: 'Design System/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Dropdown trigger + menu (Figma 138:3677, Dropdown Buttons).',
      },
    },
  },
}
export default meta

type Story = StoryObj<typeof meta>

export const DefaultLarge: Story = {
  args: {
    label: 'Select',
    items: sampleItems,
    size: 'large',
    variant: 'default',
  },
}

export const Small: Story = {
  args: {
    ...DefaultLarge.args,
    size: 'small',
  },
}

export const IconOnly: Story = {
  args: {
    label: 'Open menu',
    items: sampleItems,
    size: 'large',
    variant: 'icon-only',
  },
}

export const WithPlusIcon: Story = {
  args: {
    label: 'Select',
    items: sampleItems,
    size: 'large',
    variant: 'with-plus-icon',
  },
}
