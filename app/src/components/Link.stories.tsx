import type { Meta, StoryObj } from '@storybook/react-vite'
import { Link } from './Link'

const meta = {
  title: 'Design System/Link',
  component: Link,
  tags: ['autodocs'],
  args: {
    href: '#',
    label: 'Label',
    size: 'large',
    icon: 'none',
    bold: true,
    disabled: false,
  },
} satisfies Meta<typeof Link>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithIcon: Story = {
  args: { icon: 'right' },
}

export const Disabled: Story = {
  args: { disabled: true },
}
