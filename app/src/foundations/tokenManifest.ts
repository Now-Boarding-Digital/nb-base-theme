/**
 * Token names to show on Foundations/Theme — values always come from `index.css` @theme
 * (read via getComputedStyle in the browser; this file is display order + grouping only).
 */
export type TokenGroup = {
  title: string
  tokens: { name: string; label?: string }[]
}

export const THEME_TOKEN_GROUPS: TokenGroup[] = [
  {
    title: 'Colors',
    tokens: [
      { name: '--color-ui-action', label: 'UI / Action' },
      { name: '--color-ui-action-hover', label: 'UI / Action hover' },
      { name: '--color-text-link', label: 'Text / Link' },
      { name: '--color-neutral-white', label: 'Neutral / White' },
      { name: '--color-neutral-gray-50', label: 'Neutral / Gray 50' },
      { name: '--color-neutral-gray-100', label: 'Neutral / Gray 100' },
      { name: '--color-neutral-gray-200', label: 'Neutral / Gray 200' },
      { name: '--color-neutral-gray-300', label: 'Neutral / Gray 300' },
      { name: '--color-neutral-gray-400', label: 'Neutral / Gray 400' },
      { name: '--color-neutral-gray-700', label: 'Neutral / Gray 700' },
      { name: '--color-neutral-gray-800', label: 'Neutral / Gray 800' },
      { name: '--color-action-tint', label: 'Action tint' },
      { name: '--color-action-outline', label: 'Action outline' },
      { name: '--color-focus-ring', label: 'Focus ring' },
    ],
  },
  {
    title: 'Radius',
    tokens: [
      { name: '--radius-control-large', label: 'Control large' },
      { name: '--radius-control-medium', label: 'Control medium' },
      { name: '--radius-control-small', label: 'Control small' },
    ],
  },
  {
    title: 'Typography',
    tokens: [{ name: '--font-primary', label: 'Primary font stack' }],
  },
  {
    title: 'Motion',
    tokens: [{ name: '--animate-btn-spin', label: 'Button spinner animation' }],
  },
]
