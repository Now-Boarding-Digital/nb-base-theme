import fs from 'node:fs'
import path from 'node:path'

const contractsDir = path.resolve('src/foundations/contracts/components')

function readContracts(dir) {
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith('.contract.json'))
    .map((entry) => path.join(dir, entry.name))
}

function getLineForIndex(content, index) {
  const prefix = content.slice(0, index)
  return prefix.split('\n').length
}

const violations = []

for (const contractPath of readContracts(contractsDir)) {
  const raw = fs.readFileSync(contractPath, 'utf8')
  const contract = JSON.parse(raw)
  const componentFile = path.resolve(contract.componentFile)
  const componentRel = path.relative(process.cwd(), componentFile)
  const componentContent = fs.readFileSync(componentFile, 'utf8')
  const usedRoleTokens = new Set(
    Array.from(componentContent.matchAll(/var\(--([a-z0-9-]+)\)/g), (match) => `--${match[1]}`)
  )

  for (const roleToken of contract.requiredSemanticRoleTokens) {
    if (!usedRoleTokens.has(roleToken)) {
      violations.push(
        `${path.relative(process.cwd(), contractPath)} missing required semantic role token in ${componentRel}: ${roleToken}`
      )
    }
  }

  const allowedPatterns = contract.allowedRoleTokenPatterns.map((pattern) => new RegExp(pattern))
  for (const roleToken of usedRoleTokens) {
    const isAllowed = allowedPatterns.some((regex) => regex.test(roleToken))
    if (!isAllowed) {
      violations.push(
        `${path.relative(process.cwd(), contractPath)} role token violates naming schema in ${componentRel}: ${roleToken}`
      )
    }
  }

  for (const snippet of contract.requiredBehaviorSnippets) {
    if (!componentContent.includes(snippet)) {
      violations.push(
        `${path.relative(process.cwd(), contractPath)} missing required behavior snippet in ${componentRel}: ${snippet}`
      )
    }
  }

  for (const snippet of contract.forbiddenSnippets) {
    if (componentContent.includes(snippet)) {
      violations.push(
        `${path.relative(process.cwd(), contractPath)} found forbidden snippet in ${componentRel}: ${snippet}`
      )
    }
  }

  for (const pattern of contract.forbiddenUtilityRegex) {
    const regex = new RegExp(pattern, 'g')
    let match = regex.exec(componentContent)
    while (match) {
      const line = getLineForIndex(componentContent, match.index)
      violations.push(
        `${path.relative(process.cwd(), contractPath)} found forbidden utility in ${componentRel}:${line} ${match[0]}`
      )
      match = regex.exec(componentContent)
    }
  }
}

if (violations.length > 0) {
  console.error('Found component contract violations.')
  for (const violation of violations) {
    console.error(violation)
  }
  process.exit(1)
}

console.log('Component contract checks are valid.')
