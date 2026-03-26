import type { Meta, StoryObj } from '@storybook/react'
import { ThemeTokens } from './ThemeTokens'

/**
 * Mirrors the idea of [Grafana’s Foundations / Theme docs](https://developers.grafana.com/ui/latest/index.html?path=/docs/foundations-theme--docs):
 * one place to see **all base variables** before building components (e.g. Button).
 */
const meta = {
  title: 'Foundations/Theme',
  component: ThemeTokens,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Canonical list of CSS variables from `app/src/index.css` (@theme). Establish and validate tokens here before expanding past **Button**.',
      },
    },
  },
} satisfies Meta<typeof ThemeTokens>

export default meta

type Story = StoryObj<typeof meta>

export const Docs: Story = {
  name: 'Docs',
  render: () => <ThemeTokens />,
}
