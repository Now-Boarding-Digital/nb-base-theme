import fs from 'node:fs'
import path from 'node:path'

const contractsDir = path.resolve('src/foundations/contracts/api/components')

function readContracts(dir) {
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith('.api.contract.json'))
    .map((entry) => path.join(dir, entry.name))
}

function parseProps(interfaceBody) {
  const props = new Map()
  const propPattern = /^\s*(?:'([^']+)'|"([^"]+)"|([a-zA-Z_][a-zA-Z0-9_-]*))\??\s*:\s*([^;\n]+)\s*;?\s*$/gm
  let match = propPattern.exec(interfaceBody)
  while (match) {
    const propName = match[1] ?? match[2] ?? match[3]
    const propType = (match[4] ?? '').trim()
    props.set(propName, propType)
    match = propPattern.exec(interfaceBody)
  }
  return props
}

const violations = []

for (const contractPath of readContracts(contractsDir)) {
  const contract = JSON.parse(fs.readFileSync(contractPath, 'utf8'))
  const componentFile = path.resolve(contract.componentFile)
  const componentRel = path.relative(process.cwd(), componentFile)
  const content = fs.readFileSync(componentFile, 'utf8')
  const contractRel = path.relative(process.cwd(), contractPath)

  const interfaceRegex = new RegExp(
    `export\\s+interface\\s+${contract.propsInterfaceName}\\s*\\{([\\s\\S]*?)\\n\\}`,
    'm'
  )
  const interfaceMatch = content.match(interfaceRegex)
  if (!interfaceMatch) {
    violations.push(`${contractRel} missing props interface in ${componentRel}: ${contract.propsInterfaceName}`)
    continue
  }

  const props = parseProps(interfaceMatch[1])

  for (const requiredProp of contract.requiredProps) {
    if (!props.has(requiredProp)) {
      violations.push(`${contractRel} missing required prop in ${componentRel}: ${requiredProp}`)
    }
  }

  const allowedNameRegexes = contract.allowedPropNamePatterns.map((pattern) => new RegExp(pattern))
  for (const propName of props.keys()) {
    const isAllowed = allowedNameRegexes.some((regex) => regex.test(propName))
    if (!isAllowed) {
      violations.push(`${contractRel} prop name violates naming convention in ${componentRel}: ${propName}`)
    }
  }

  for (const propName of contract.reservedBooleanProps) {
    const propType = props.get(propName)
    if (!propType) continue
    if (!/\bboolean\b/.test(propType)) {
      violations.push(`${contractRel} reserved boolean prop must include boolean type in ${componentRel}: ${propName}`)
    }
  }

  for (const [deprecatedProp, message] of Object.entries(contract.deprecatedProps)) {
    if (!props.has(deprecatedProp)) {
      violations.push(`${contractRel} deprecated compatibility prop missing in ${componentRel}: ${deprecatedProp} (${message})`)
    }
  }

  for (const forbiddenProp of contract.forbiddenPropNames) {
    if (props.has(forbiddenProp)) {
      violations.push(`${contractRel} forbidden prop present in ${componentRel}: ${forbiddenProp}`)
    }
  }

  for (const snippet of contract.requiredCompatibilitySnippets) {
    if (!content.includes(snippet)) {
      violations.push(`${contractRel} missing compatibility snippet in ${componentRel}: ${snippet}`)
    }
  }

  for (const propName of props.keys()) {
    if (propName.startsWith('on') && propName.length > 2 && !/^on[A-Z]/.test(propName)) {
      violations.push(`${contractRel} event prop must use onX convention in ${componentRel}: ${propName}`)
    }
  }
}

if (violations.length > 0) {
  console.error('Found component API contract violations.')
  for (const violation of violations) {
    console.error(violation)
  }
  process.exit(1)
}

console.log('Component API contract checks are valid.')
