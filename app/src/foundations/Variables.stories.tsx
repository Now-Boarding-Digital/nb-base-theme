import type { Meta, StoryObj } from '@storybook/react-vite'
import { VariablesCatalog } from './VariablesCatalog'

const meta = {
  title: 'Foundations/Variables',
  component: VariablesCatalog,
  tags: ['autodocs'],
} satisfies Meta<typeof VariablesCatalog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
