import type { Meta, StoryObj } from '@storybook/react'
import { Link } from './Link'

const meta: Meta<typeof Link> = {
  title: 'Design System/Link',
  component: Link,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Text links — size, icon, bold (Figma 138:3677, Links).',
      },
    },
  },
}
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Label',
    size: 'large',
    icon: 'none',
    bold: true,
    href: '#',
  },
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-4">
      {(['large', 'medium', 'small'] as const).map((size) => (
        <div key={size} className="flex flex-wrap gap-6 items-center">
          <Link size={size} />
          <Link size={size} icon="left" />
          <Link size={size} icon="right" />
          <Link size={size} bold={false} />
        </div>
      ))}
    </div>
  ),
}
