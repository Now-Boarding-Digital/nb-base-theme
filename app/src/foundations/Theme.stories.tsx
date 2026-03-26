import type { Meta, StoryObj } from '@storybook/react-vite'
import { ThemeTokens } from './ThemeTokens'

const meta = {
  title: 'Foundations/Theme',
  component: ThemeTokens,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Live `@theme` tokens from `app/src/index.css` (read via computed styles in the preview).',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ThemeTokens>

export default meta

type Story = StoryObj<typeof meta>

export const Docs: Story = {
  render: () => (
    <div className="bg-[#e5e7eb] p-8">
      <ThemeTokens />
    </div>
  ),
}
