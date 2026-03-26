import type { Meta, StoryObj } from '@storybook/react'
import { IconButton } from './IconButton'

const meta: Meta<typeof IconButton> = {
  title: 'Design System/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Circular icon buttons (Figma 138:3677, Icon Buttons).',
      },
    },
  },
}
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    'aria-label': 'Add',
    style: 'solid',
    size: 'large',
  },
}

export const AllStyles: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 p-4 items-end">
      {(['solid', 'outline', 'transparent', 'white'] as const).map((style) => (
        <div key={style} className="flex gap-2 items-end">
          {(['large', 'medium', 'small'] as const).map((size) => (
            <IconButton key={`${style}-${size}`} aria-label="Add" style={style} size={size} />
          ))}
        </div>
      ))}
    </div>
  ),
}
