import type { Meta, StoryObj } from '@storybook/react-vite'
import { ThemeTokens } from './ThemeTokens'

const meta = {
  title: 'Foundations/Theme',
  component: ThemeTokens,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Base design tokens sourced from `app/src/index.css` (`@theme`).',
      },
    },
  },
} satisfies Meta<typeof ThemeTokens>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
