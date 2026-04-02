import fs from 'node:fs'
import path from 'node:path'

const root = path.resolve('src')
const targetExt = new Set(['.ts', '.tsx'])
const fallbackPattern = /var\(--[a-z0-9-]+,/g

/**
 * Recursively walk source files and fail if CSS variable
 * fallback syntax appears in TS/TSX. We want canonical tokens only.
 */
function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      walk(fullPath, files)
      continue
    }
    if (targetExt.has(path.extname(entry.name))) {
      files.push(fullPath)
    }
  }
  return files
}

function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8')
  const lines = content.split('\n')
  const violations = []

  for (let i = 0; i < lines.length; i += 1) {
    if (fallbackPattern.test(lines[i])) {
      violations.push({
        line: i + 1,
        text: lines[i].trim(),
      })
    }
    fallbackPattern.lastIndex = 0
  }

  return violations
}

const sourceFiles = walk(root)
const allViolations = []

for (const file of sourceFiles) {
  const violations = checkFile(file)
  if (violations.length === 0) continue

  for (const violation of violations) {
    allViolations.push({
      file: path.relative(process.cwd(), file),
      ...violation,
    })
  }
}

if (allViolations.length > 0) {
  console.error('Found fallback CSS vars. Use canonical tokens from index.css / variableManifest.')
  for (const violation of allViolations) {
    console.error(`${violation.file}:${violation.line} ${violation.text}`)
  }
  process.exit(1)
}

console.log('No fallback CSS vars found.')
