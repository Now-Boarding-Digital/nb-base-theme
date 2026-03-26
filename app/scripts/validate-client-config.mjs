#!/usr/bin/env node
/**
 * Parses `agents/_config/client.schema.json` and every `agents/_config/clients/*.json`.
 * Fails fast if any file is invalid JSON.
 *
 * Usage (from app/): npm run validate:client-config
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.join(__dirname, '..', '..')
const configDir = path.join(repoRoot, 'agents', '_config')
const clientsDir = path.join(configDir, 'clients')

function parseJsonFile(label, absPath) {
  const raw = fs.readFileSync(absPath, 'utf8')
  try {
    JSON.parse(raw)
  } catch (e) {
    console.error(`${label}: invalid JSON — ${e.message}`)
    process.exit(1)
  }
  console.log(`OK ${label}`)
}

const schemaPath = path.join(configDir, 'client.schema.json')
if (!fs.existsSync(schemaPath)) {
  console.error(`Missing ${schemaPath}`)
  process.exit(1)
}
parseJsonFile('agents/_config/client.schema.json', schemaPath)

const entries = fs.readdirSync(clientsDir, { withFileTypes: true })
const jsonFiles = entries.filter((d) => d.isFile() && d.name.endsWith('.json')).map((d) => d.name)
if (jsonFiles.length === 0) {
  console.error(`No *.json in ${clientsDir}`)
  process.exit(1)
}
for (const name of jsonFiles.sort()) {
  parseJsonFile(`agents/_config/clients/${name}`, path.join(clientsDir, name))
}
