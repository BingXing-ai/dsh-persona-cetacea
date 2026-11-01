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

console.log(`OK ${packageJson.name}@${packageJson.version} icon=${icon.size}B`)
