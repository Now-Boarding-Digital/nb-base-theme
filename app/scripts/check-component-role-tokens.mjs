import fs from 'node:fs'
import path from 'node:path'

const componentsDir = path.resolve('src/components')
const tokenPattern = /var\(--((?:color|shadow|opacity)-[a-z0-9-]+)\)/g

const rolePrefixesByFile = {
  'Button.tsx': ['color-button-', 'shadow-button-'],
  'Link.tsx': ['color-link-'],
  'IconButton.tsx': ['color-icon-button-'],
  'StackedButton.tsx': ['color-stacked-'],
  'LoginButton.tsx': ['color-login-'],
  'Dropdown.tsx': ['color-dropdown-'],
  'TextField.tsx': ['color-field-'],
}

const allowedSharedPrefixes = ['color-neutral-', 'color-semantic-', 'color-social-']

function listComponentFiles(dir) {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith('.tsx') && !entry.name.endsWith('.stories.tsx'))
    .map((entry) => path.join(dir, entry.name))
}

function isAllowedToken(fileName, tokenName) {
  const rolePrefixes = rolePrefixesByFile[fileName] ?? []
  if (rolePrefixes.some((prefix) => tokenName.startsWith(prefix))) return true
  if (allowedSharedPrefixes.some((prefix) => tokenName.startsWith(prefix))) return true
  return false
}

const violations = []

for (const filePath of listComponentFiles(componentsDir)) {
  const fileName = path.basename(filePath)
  if (!(fileName in rolePrefixesByFile)) continue

  const content = fs.readFileSync(filePath, 'utf8')
  const lines = content.split('\n')

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i]
    for (const match of line.matchAll(tokenPattern)) {
      const tokenName = match[1]
      if (isAllowedToken(fileName, tokenName)) continue
      violations.push({
        file: path.relative(process.cwd(), filePath),
        line: i + 1,
        token: tokenName,
        text: line.trim(),
      })
    }
  }
}

if (violations.length > 0) {
  console.error('Found non-role color/shadow/opacity tokens in component files.')
  console.error('Use component role tokens (for example, --color-button-*, --color-field-*) and map via index.css.')
  for (const violation of violations) {
    console.error(`${violation.file}:${violation.line} token=--${violation.token} ${violation.text}`)
  }
  process.exit(1)
}

console.log('Component role-token usage is valid.')
