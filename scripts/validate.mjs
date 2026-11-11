import assert from 'node:assert/strict'
import { readFile, stat } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const packageJson = JSON.parse(await readFile(join(root, 'package.json'), 'utf8'))

assert.equal(typeof packageJson.name, 'string')
assert.match(packageJson.name, /^[a-z0-9][a-z0-9._-]*$/)
assert.equal(packageJson.dsh?.bundle?.patch, './cordis.patch.yml')
assert.ok(packageJson.keywords?.includes('dsh-plugin'), 'keywords must include dsh-plugin')
assert.ok(packageJson.engines?.dsh, 'engines.dsh is required by the DSH community manifest')
assert.match(
  packageJson.engines.dsh,
  />=0\.2\.2-0/,
  'engines.dsh needs an explicit 0.2.2+ branch: a prerelease such as 0.2.2-rc.1 satisfies no range that lacks a prerelease-tagged comparator on that tuple',
)
assert.ok(
  packageJson.engines?.node,
  'engines.node is required: DSH 0.2.2 runs on Node ^22.19.0 || >=24.9.0',
)
assert.ok(packageJson.repository?.url, 'repository.url is required for the community directory')
assert.ok(packageJson.license, 'license is required')

const patch = await readFile(join(root, 'cordis.patch.yml'), 'utf8')
assert.match(patch, /id:\s*persona-cetacea/)
assert.match(patch, new RegExp(`name:\\s*['"]?${packageJson.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['"]?`))

for (const locale of ['en', 'zh']) {
  const data = JSON.parse(await readFile(join(root, 'locale', `${locale}.json`), 'utf8'))
  assert.equal(typeof data.meta?.title, 'string')
  assert.equal(typeof data.meta?.description, 'string')
}

const icon = await stat(join(root, 'icon.webp'))
assert.ok(icon.size > 0, 'icon.webp is empty')
assert.ok(icon.size <= 256 * 1024, 'icon.webp must be <= 256 KiB')

const { PERSONA_TEXT } = await import('../persona.js')
const personaBytes = Buffer.byteLength(PERSONA_TEXT, 'utf8')
assert.ok(
  personaBytes <= 9600,
  `PERSONA_TEXT is ${personaBytes}B, over the 9600B budget: the text is paid on every single request`,
)

console.log(`OK ${packageJson.name}@${packageJson.version} icon=${icon.size}B persona=${personaBytes}B`)
