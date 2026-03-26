#!/usr/bin/env node
/**
 * Removes Storybook story files so you can regenerate them (e.g. after a Figma sync).
 *
 * - Deletes src/stories/ recursively if it exists (classic Storybook layout).
 * - Deletes every *.stories.{tsx,ts,jsx,js,mdx} under src/ (this repo’s co-located layout).
 *
 * Usage: npm run clear-stories
 *        npm run clear-stories -- --dry-run   (list only; no deletes)
 *
 * Does not touch node_modules, components, or tests — only story files and src/stories/.
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const dryRun = process.argv.includes('--dry-run')

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const appRoot = path.join(__dirname, '..')
const srcRoot = path.join(appRoot, 'src')
const storiesDir = path.join(srcRoot, 'stories')

const storyPattern = /\.stories\.(mdx|tsx?|jsx?|mjs|js)$/

/** Co-located *.stories.* under src/, excluding src/stories/ (handled as one folder delete). */
function walk(dir, acc = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const e of entries) {
    const full = path.join(dir, e.name)
    if (e.isDirectory()) {
      if (full === storiesDir) continue
      walk(full, acc)
    } else if (storyPattern.test(e.name)) acc.push(full)
  }
  return acc
}

const wouldRemove = []

if (fs.existsSync(storiesDir)) {
  wouldRemove.push({ kind: 'dir', path: storiesDir })
}

const files = walk(srcRoot)
for (const f of files) {
  wouldRemove.push({ kind: 'file', path: f, rel: path.relative(appRoot, f) })
}

if (wouldRemove.length === 0) {
  console.log('No story files or src/stories/ found under', srcRoot)
  process.exit(0)
}

if (dryRun) {
  console.log('[dry-run] Would remove:')
  for (const item of wouldRemove) {
    if (item.kind === 'dir') console.log(' ', item.path + path.sep + '(entire folder)')
    else console.log(' ', item.rel)
  }
  console.log(`[dry-run] ${wouldRemove.length} item(s). Run without --dry-run to delete.`)
  process.exit(0)
}

for (const item of wouldRemove) {
  if (item.kind === 'dir') fs.rmSync(item.path, { recursive: true, force: true })
  else fs.unlinkSync(item.path)
}

console.log('Removed:')
for (const item of wouldRemove) {
  if (item.kind === 'dir') console.log(' ', item.path + path.sep + '(entire folder)')
  else console.log(' ', item.rel)
}
console.log(`Done (${wouldRemove.length} item(s)). Regenerate stories as needed.`)
