import type { Meta, StoryObj } from '@storybook/react-vite'
import { TestBadge } from './TestBadge'

const meta = {
  title: 'Design System/TestBadge',
  component: TestBadge,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '**Temporary** — used to verify Chromatic / branch previews. Remove when you no longer need it.',
      },
    },
  },
  args: {
    label: 'Chromatic test',
  },
} satisfies Meta<typeof TestBadge>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const CustomLabel: Story = {
  args: { label: 'Feature branch preview' },
}
