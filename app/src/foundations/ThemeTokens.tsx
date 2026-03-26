import { THEME_TOKEN_GROUPS } from './tokenManifest'

function readVar(name: string): string {
  if (typeof document === 'undefined') return ''
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim()
}

function isColorToken(name: string, value: string): boolean {
  if (name.includes('color') || name.includes('tint') || name.includes('outline')) {
    return true
  }
  return /^#|rgb|hsl|rgba/.test(value)
}

export function ThemeTokens() {
  return (
    <div className="max-w-4xl space-y-10 text-left font-sans text-[var(--color-neutral-gray-800)]">
      <header className="space-y-2 border-b border-[var(--color-neutral-gray-200)] pb-6">
        <h1 className="text-2xl font-bold tracking-tight">Theme</h1>
        <p className="text-sm leading-relaxed text-[var(--color-neutral-gray-700)]">
          Base design tokens from <code className="rounded bg-[var(--color-neutral-gray-100)] px-1.5 py-0.5 text-xs">app/src/index.css</code>{' '}
          (<code className="rounded bg-[var(--color-neutral-gray-100)] px-1.5 py-0.5 text-xs">@theme</code>). Values below are read from the live CSS — update the file to change the theme; components should use{' '}
          <code className="rounded bg-[var(--color-neutral-gray-100)] px-1.5 py-0.5 text-xs">var(--token)</code>.
        </p>
      </header>

      {THEME_TOKEN_GROUPS.map((group) => (
        <section key={group.title} className="space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--color-neutral-gray-400)]">{group.title}</h2>
          <div className="overflow-hidden rounded-[var(--radius-control-medium)] border border-[var(--color-neutral-gray-200)] bg-[var(--color-neutral-white)]">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-[var(--color-neutral-gray-200)] bg-[var(--color-neutral-gray-50)] text-left text-xs text-[var(--color-neutral-gray-700)]">
                  <th className="px-4 py-2 font-semibold">Preview</th>
                  <th className="px-4 py-2 font-semibold">Token</th>
                  <th className="px-4 py-2 font-semibold">Value</th>
                </tr>
              </thead>
              <tbody>
                {group.tokens.map(({ name, label }) => {
                  const value = readVar(name)
                  const showSwatch = isColorToken(name, value)
                  return (
                    <tr key={name} className="border-b border-[var(--color-neutral-gray-100)] last:border-0">
                      <td className="w-28 px-4 py-3 align-middle">
                        {showSwatch ? (
                          <span
                            className="inline-block h-10 w-14 rounded border border-[var(--color-neutral-gray-200)] shadow-sm"
                            style={{ background: value || 'transparent' }}
                            title={value}
                          />
                        ) : name.includes('radius') ? (
                          <span
                            className="inline-block h-10 w-14 border-2 border-[var(--color-neutral-gray-400)] bg-[var(--color-neutral-gray-50)]"
                            style={{ borderRadius: value }}
                            title={value}
                          />
                        ) : (
                          <span className="text-xs text-[var(--color-neutral-gray-400)]">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3 align-top">
                        <code className="text-xs text-[var(--color-ui-action)]">{name}</code>
                        {label && <p className="mt-1 text-xs text-[var(--color-neutral-gray-500)]">{label}</p>}
                      </td>
                      <td className="px-4 py-3 align-top">
                        <code className="break-all text-xs text-[var(--color-neutral-gray-800)]">{value || '(empty)'}</code>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </section>
      ))}
    </div>
  )
}
