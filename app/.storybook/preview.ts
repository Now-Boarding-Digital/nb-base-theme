import '../src/index.css'
import './preview.css'
import type { Preview } from '@storybook/react-vite'

const preview: Preview = {
  parameters: {
    options: {
      // Storybook evals this as JS — no TypeScript types on parameters (Unexpected token ':').
      storySort: (a, b) => {
        const rank = (title) => {
          if (title.startsWith('Foundations')) return 0
          if (title.startsWith('Design System')) return 1
          return 2
        }
        const ra = rank(a.title)
        const rb = rank(b.title)
        if (ra !== rb) return ra - rb
        if (a.title !== b.title) return a.title.localeCompare(b.title, undefined, { numeric: true })

        if (a.title === 'Design System/Button') {
          const order = ['Styles', 'Sizes', 'Icon', 'State', 'All Combinations']
          const ia = order.indexOf(a.name)
          const ib = order.indexOf(b.name)
          if (ia !== -1 && ib !== -1) return ia - ib
          if (ia !== -1) return -1
          if (ib !== -1) return 1
        }
        if (a.title === 'Design System/Link') {
          const order = ['Sizes', 'Icon', 'Weight', 'State', 'All Combinations']
          const ia = order.indexOf(a.name)
          const ib = order.indexOf(b.name)
          if (ia !== -1 && ib !== -1) return ia - ib
          if (ia !== -1) return -1
          if (ib !== -1) return 1
        }
        return a.name.localeCompare(b.name, undefined, { numeric: true })
      },
    },
    docs: {
      source: {
        type: 'code',
        language: 'tsx',
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'gray',
      values: [
        { name: 'gray', value: '#e5e7eb' },
        { name: 'white', value: '#ffffff' },
      ],
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    }
  },
}

export default preview