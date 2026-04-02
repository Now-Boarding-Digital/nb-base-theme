import { Button } from './components/Button'
import { IconButton } from './components/IconButton'
import { Link } from './components/Link'
import { StackedButton } from './components/StackedButton'
import { LoginButton } from './components/LoginButton'
import { Dropdown } from './components/Dropdown'

function DemoSection({ title, subtitle, keyContent, children }: { title: string; subtitle?: string; keyContent?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-[#111] mb-1">{title}</h2>
          {subtitle && <p className="text-[0.8125rem] text-[#666]">{subtitle}</p>}
        </div>
        {keyContent && <div className="shrink-0 min-w-[180px]">{keyContent}</div>}
      </div>
      {children}
    </section>
  )
}

function DemoSubsection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <h3 className="text-xs font-semibold text-[#888] uppercase tracking-wider mb-2">{label}</h3>
      {children}
    </div>
  )
}

const sharedDropdownItems = [
  { label: 'Edit', onSelect: () => console.log('Edit') },
  { label: 'Duplicate', onSelect: () => console.log('Duplicate') },
  { label: 'Delete', onSelect: () => console.log('Delete') },
]

function App() {
  return (
    <main className="p-8 max-w-[900px] mx-auto">
      <h1 className="text-3xl font-bold leading-tight">Components</h1>
      <p className="text-[#666] mb-8">Design system — Buttons preview</p>

      <DemoSection
        title="1. Buttons"
        subtitle="Every combination: Size × Style × Icon + States"
        keyContent={
          <dl className="text-xs text-[#666] m-0 py-3 px-4 bg-[var(--color-neutral-gray-100)] rounded-[var(--radius-control-medium)]">
            <dt className="font-semibold text-[var(--color-neutral-gray-700)] mt-2 first:mt-0">Label format:</dt>
            <dd className="mt-1"><code className="text-[0.6875rem] bg-[var(--color-neutral-gray-200)] px-1.5 py-0.5 rounded">size / style / icon</code></dd>
            <dt className="font-semibold text-[var(--color-neutral-gray-700)] mt-2">Size:</dt>
            <dd className="mt-1">large, medium, small</dd>
            <dt className="font-semibold text-[var(--color-neutral-gray-700)] mt-2">Style:</dt>
            <dd className="mt-1">solid, white, outline</dd>
            <dt className="font-semibold text-[var(--color-neutral-gray-700)] mt-2">Icon:</dt>
            <dd className="mt-1">none, left, right</dd>
          </dl>
        }
      >
        <DemoSubsection label="All 27 combinations (size × style × icon)">
          <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 p-4 bg-[var(--color-neutral-gray-50)] rounded-[var(--radius-control-large)]">
            {(['large', 'medium', 'small'] as const).map((size) =>
              (['solid', 'white', 'outline'] as const).map((style) =>
                (['none', 'left', 'right'] as const).map((icon) => (
                  <div key={`${size}-${style}-${icon}`} className="flex flex-col gap-2 items-start">
                    <Button size={size} style={style} icon={icon} />
                    <span className="text-[0.6875rem] text-[#888] font-medium uppercase tracking-wide">{size} / {style} / {icon}</span>
                  </div>
                ))
              )
            )}
          </div>
        </DemoSubsection>
        <DemoSubsection label="States">
          <div className="flex flex-wrap gap-4 items-center">
            <Button style="solid" />
            <Button style="solid" disabled />
            <Button style="solid" loading />
          </div>
        </DemoSubsection>
      </DemoSection>

      <DemoSection
        title="2. Links"
        subtitle="Every combination: Size × Icon × Bold + States"
        keyContent={
          <dl className="text-xs text-[#666] m-0 py-3 px-4 bg-[var(--color-neutral-gray-100)] rounded-[var(--radius-control-medium)]">
            <dt className="font-semibold text-[var(--color-neutral-gray-700)] mt-2 first:mt-0">Label format:</dt>
            <dd className="mt-1"><code className="text-[0.6875rem] bg-[var(--color-neutral-gray-200)] px-1.5 py-0.5 rounded">size / icon / bold</code></dd>
            <dt className="font-semibold text-[var(--color-neutral-gray-700)] mt-2">Size:</dt>
            <dd className="mt-1">large, medium, small</dd>
            <dt className="font-semibold text-[var(--color-neutral-gray-700)] mt-2">Icon:</dt>
            <dd className="mt-1">none, left, right</dd>
            <dt className="font-semibold text-[var(--color-neutral-gray-700)] mt-2">Bold:</dt>
            <dd className="mt-1">true, false</dd>
          </dl>
        }
      >
        <DemoSubsection label="All 18 combinations (size × icon × bold)">
          <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 p-4 bg-[var(--color-neutral-gray-50)] rounded-[var(--radius-control-large)]">
            {(['large', 'medium', 'small'] as const).map((size) =>
              (['none', 'left', 'right'] as const).map((icon) =>
                ([true, false] as const).map((bold) => (
                  <div key={`${size}-${icon}-${bold}`} className="flex flex-col gap-2 items-start">
                    <Link size={size} icon={icon} bold={bold} />
                    <span className="text-[0.6875rem] text-[#888] font-medium uppercase tracking-wide">{size} / {icon} / bold={String(bold)}</span>
                  </div>
                ))
              )
            )}
          </div>
        </DemoSubsection>
        <DemoSubsection label="States">
          <div className="flex flex-wrap gap-4 items-center">
            <Link />
            <Link disabled />
          </div>
        </DemoSubsection>
      </DemoSection>

      <DemoSection title="3. Icon Buttons" subtitle="Circle + plus icon • Sizes: Large (40px), Medium (32px), Small (24px) • Styles: Solid, Outline, Transparent, White • States: Default, Hover, Disabled">
        <DemoSubsection label="Sizes">
          <div className="flex flex-wrap gap-4 items-center">
            <IconButton aria-label="Add" style="solid" size="large" />
            <IconButton aria-label="Add" style="solid" size="medium" />
            <IconButton aria-label="Add" style="solid" size="small" />
          </div>
        </DemoSubsection>
        <DemoSubsection label="Styles">
          <div className="flex flex-wrap gap-4 items-center">
            <IconButton aria-label="Add" style="solid" size="large" />
            <IconButton aria-label="Add" style="outline" size="large" />
            <IconButton aria-label="Add" style="transparent" size="large" />
            <IconButton aria-label="Add" style="white" size="large" />
          </div>
        </DemoSubsection>
        <DemoSubsection label="States">
          <div className="flex flex-wrap gap-4 items-center">
            <IconButton aria-label="Add" style="solid" size="large" />
            <IconButton aria-label="Add" style="solid" size="large" disabled />
          </div>
        </DemoSubsection>
      </DemoSection>

      <DemoSection title="4. Stacked Buttons" subtitle="64×56px (Figma) • Styles: Solid, Outline Grey, Grey, Transparent, White • States: Default, Hover, Disabled">
        <DemoSubsection label="Styles">
          <div className="flex flex-col gap-3 w-fit p-4 bg-[var(--color-neutral-gray-50)] rounded-[var(--radius-control-large)]">
            <StackedButton style="solid" />
            <StackedButton style="outline-grey" />
            <StackedButton style="grey" />
            <StackedButton style="transparent" />
            <StackedButton style="white" />
          </div>
        </DemoSubsection>
        <DemoSubsection label="States">
          <div className="flex flex-col gap-3 w-fit p-4 bg-[var(--color-neutral-gray-50)] rounded-[var(--radius-control-large)]">
            <StackedButton style="solid" />
            <StackedButton style="solid" disabled />
          </div>
        </DemoSubsection>
        <DemoSubsection label="Full width (optional)">
          <div className="flex flex-col gap-3 max-w-[320px] p-4 bg-[var(--color-neutral-gray-50)] rounded-[var(--radius-control-large)]">
            <StackedButton style="solid" fullWidth />
            <StackedButton style="outline-grey" fullWidth />
          </div>
        </DemoSubsection>
      </DemoSection>

      <DemoSection title="5. Login Buttons" subtitle="Full-width (56px, max 398px) • Types: Google, Apple, Facebook, Default • States: Default, Hover, Disabled">
        <DemoSubsection label="All 4 types (Google=white, Apple=dark, Facebook=dark, Email=blue)">
          <div className="flex flex-col gap-3 max-w-[398px] p-4 bg-[var(--color-neutral-gray-50)] rounded-[var(--radius-control-large)]">
            <LoginButton provider="google" />
            <LoginButton provider="apple" />
            <LoginButton provider="facebook" />
            <LoginButton provider="default" />
          </div>
        </DemoSubsection>
        <DemoSubsection label="States (default + disabled)">
          <div className="flex flex-col gap-3 max-w-[398px] p-4 bg-[var(--color-neutral-gray-50)] rounded-[var(--radius-control-large)]">
            <LoginButton provider="apple" />
            <LoginButton provider="apple" disabled />
          </div>
        </DemoSubsection>
      </DemoSection>

      <DemoSection title="6. Dropdown Buttons" subtitle="Radix UI + design tokens • Sizes: Large (40px), Small (32px) • Variants: Default, With plus icon">
        <DemoSubsection label="Default (label + chevron)">
          <div className="flex flex-wrap gap-4 items-center">
            <Dropdown
              label="Select option"
              size="large"
              items={[
                { label: 'Option 1', onSelect: () => console.log('Option 1') },
                { label: 'Option 2', onSelect: () => console.log('Option 2') },
                { label: 'Option 3', onSelect: () => console.log('Option 3') },
              ]}
            />
            <Dropdown
              label="Actions"
              size="large"
              items={sharedDropdownItems}
            />
            <Dropdown
              label="Small dropdown"
              size="small"
              items={sharedDropdownItems}
            />
          </div>
        </DemoSubsection>
        <DemoSubsection label="With plus icon (label + chevron)">
          <div className="flex flex-wrap gap-4 items-center">
            <Dropdown
              label="Add item"
              size="large"
              variant="with-plus-icon"
              items={sharedDropdownItems}
            />
            <Dropdown
              label="Add"
              size="small"
              variant="with-plus-icon"
              items={sharedDropdownItems}
            />
          </div>
        </DemoSubsection>
      </DemoSection>
    </main>
  )
}

export default App
