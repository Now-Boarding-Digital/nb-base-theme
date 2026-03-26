import type { Meta, StoryObj } from '@storybook/react'
import { StackedButton } from './StackedButton'

const meta: Meta<typeof StackedButton> = {
  title: 'Design System/StackedButton',
  component: StackedButton,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Vertical stacked buttons (Figma 138:3677, Stacked Buttons).',
      },
    },
  },
}
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Label',
    style: 'solid',
    fullWidth: true,
  },
}

export const AllStyles: Story = {
  render: () => (
    <div className="flex flex-col gap-2 w-64 p-4">
      {(['solid', 'outline-grey', 'grey', 'transparent', 'white'] as const).map((style) => (
        <StackedButton key={style} style={style} label="Label" fullWidth />
      ))}
    </div>
  ),
}
