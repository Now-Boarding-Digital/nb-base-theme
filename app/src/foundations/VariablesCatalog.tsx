import { VARIABLE_COLLECTIONS } from './variableManifest'

function readVar(name: string): string {
  if (typeof document === 'undefined') return ''
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim()
}

function isColor(value: string): boolean {
  return /^#|rgb|hsl|rgba/i.test(value)
}

function normalizeLength(value: string): string {
  if (!value) return value
  return /^\d+(\.\d+)?$/.test(value) ? `${value}px` : value
}

function renderPreview(value: string, group?: string) {
  const normalized = value.trim()
  const lowerGroup = (group ?? '').toLowerCase()

  if (isColor(normalized)) {
    return (
      <span
        className="inline-block h-8 w-12 rounded border border-[var(--color-neutral-gray-200)]"
        style={{ background: normalized }}
        title={normalized}
      />
    )
  }

  if (lowerGroup === 'radius') {
    return (
      <span
        className="inline-block h-8 w-12 border border-[var(--color-neutral-gray-300)] bg-[var(--color-neutral-gray-50)]"
        style={{ borderRadius: normalizeLength(normalized) }}
        title={normalized}
      />
    )
  }

  if (lowerGroup === 'opacity') {
    const numeric = Number(normalized)
    const percent = Number.isFinite(numeric) ? (numeric > 1 ? numeric : numeric * 100) : 0
    return (
      <span className="flex h-8 w-16 items-end rounded border border-[var(--color-neutral-gray-300)] bg-[var(--color-neutral-gray-50)] p-1">
        <span className="block w-full rounded-sm bg-[var(--color-ui-action)]" style={{ height: `${Math.max(4, Math.min(100, percent))}%` }} />
      </span>
    )
  }

  if (lowerGroup === 'shadows' && /rgba?\(/i.test(normalized)) {
    return <span className="inline-block h-8 w-12 rounded bg-[var(--color-neutral-white)]" style={{ boxShadow: normalized }} />
  }

  if (lowerGroup === 'fonts' || lowerGroup === 'content' || lowerGroup === 'headings' || lowerGroup === 'weights') {
    return <span className="text-sm font-semibold text-[var(--color-neutral-gray-700)]">Aa</span>
  }

  return <span className="text-xs text-[var(--color-neutral-gray-400)]">—</span>
}

export function VariablesCatalog() {
  const rows = VARIABLE_COLLECTIONS.flatMap((collection) => collection.rows)
  const total = rows.length
  const mapped = rows.filter((row) => Boolean(row.mappedToken)).length
  const darkReady = rows.filter((row) => Boolean(row.darkValue)).length
  const mappedPct = total > 0 ? Math.round((mapped / total) * 100) : 0
  const darkPct = total > 0 ? Math.round((darkReady / total) * 100) : 0

  return (
    <div className="max-w-5xl space-y-10 text-left font-sans text-[var(--color-neutral-gray-800)]">
      <header className="space-y-2 border-b border-[var(--color-neutral-gray-200)] pb-6">
        <h1 className="text-2xl font-bold tracking-tight">Variables</h1>
        <p className="text-sm leading-relaxed text-[var(--color-neutral-gray-700)]">
          Figma variable collections mapped into Storybook for review. Token-backed rows show live values from{' '}
          <code className="rounded bg-[var(--color-neutral-gray-100)] px-1.5 py-0.5 text-xs">app/src/index.css</code>; unmapped rows are visible so we can keep the system DRY as mapping evolves. Light/Dark columns are mode-ready and populate dark values when MCP returns mode-specific variable defs.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="inline-flex items-center rounded-full border border-[var(--color-neutral-gray-200)] bg-[var(--color-neutral-gray-50)] px-3 py-1 text-xs font-medium text-[var(--color-neutral-gray-700)]">
            Total: {total}
          </span>
          <span className="inline-flex items-center rounded-full border border-[var(--color-neutral-gray-200)] bg-[var(--color-neutral-gray-50)] px-3 py-1 text-xs font-medium text-[var(--color-neutral-gray-700)]">
            Mapped: {mapped}/{total} ({mappedPct}%)
          </span>
          <span className="inline-flex items-center rounded-full border border-[var(--color-neutral-gray-200)] bg-[var(--color-neutral-gray-50)] px-3 py-1 text-xs font-medium text-[var(--color-neutral-gray-700)]">
            Dark values: {darkReady}/{total} ({darkPct}%)
          </span>
        </div>
      </header>

      {VARIABLE_COLLECTIONS.map((collection) => (
        <section key={collection.title} className="space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--color-neutral-gray-400)]">{collection.title}</h2>
          <div className="overflow-hidden rounded-[var(--radius-control-medium)] border border-[var(--color-neutral-gray-200)] bg-[var(--color-neutral-white)]">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-[var(--color-neutral-gray-200)] bg-[var(--color-neutral-gray-50)] text-left text-xs text-[var(--color-neutral-gray-700)]">
                  <th className="px-4 py-2 font-semibold">Figma Variable</th>
                  <th className="px-4 py-2 font-semibold">Group</th>
                  <th className="px-4 py-2 font-semibold">Light</th>
                  <th className="px-4 py-2 font-semibold">Dark</th>
                  <th className="px-4 py-2 font-semibold">Mapped Token</th>
                  <th className="px-4 py-2 font-semibold">Token Live</th>
                  <th className="px-4 py-2 font-semibold">Preview</th>
                  <th className="px-4 py-2 font-semibold">Notes</th>
                </tr>
              </thead>
              <tbody>
                {collection.rows.map((row) => {
                  const liveValue = row.mappedToken ? readVar(row.mappedToken) : ''
                  const lightValue = row.lightValue || row.sampleValue || ''
                  const darkValue = row.darkValue || ''
                  const valueForPreview = liveValue || lightValue || darkValue || ''
                  return (
                    <tr key={`${collection.title}-${row.figmaName}`} className="border-b border-[var(--color-neutral-gray-100)] last:border-0">
                      <td className="px-4 py-3 align-top">
                        <span className="font-medium text-[var(--color-neutral-gray-800)]">{row.figmaName}</span>
                      </td>
                      <td className="px-4 py-3 align-top">
                        <span className="text-[var(--color-neutral-gray-600)]">{row.figmaGroup ?? '—'}</span>
                      </td>
                      <td className="px-4 py-3 align-top">
                        <code className="break-all text-xs text-[var(--color-neutral-gray-800)]">{lightValue || '(empty)'}</code>
                      </td>
                      <td className="px-4 py-3 align-top">
                        <code className="break-all text-xs text-[var(--color-neutral-gray-800)]">{darkValue || '—'}</code>
                      </td>
                      <td className="px-4 py-3 align-top">
                        {row.mappedToken ? (
                          <code className="text-xs text-[var(--color-ui-action)]">{row.mappedToken}</code>
                        ) : (
                          <span className="text-xs text-[var(--color-neutral-gray-500)]">Unmapped</span>
                        )}
                      </td>
                      <td className="px-4 py-3 align-top">
                        <code className="break-all text-xs text-[var(--color-neutral-gray-800)]">{liveValue || '(unmapped)'}</code>
                      </td>
                      <td className="w-24 px-4 py-3 align-top">{renderPreview(valueForPreview, row.figmaGroup)}</td>
                      <td className="px-4 py-3 align-top text-xs text-[var(--color-neutral-gray-500)]">{row.notes ?? '—'}</td>
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
