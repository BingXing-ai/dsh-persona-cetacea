import { PERSONA_TEXT } from './persona.js'

/** Default section identity; config may rename it. */
const SECTION_NAME = 'persona:cetacea-loli'

/**
 * Sits after the deployment persona prefix (order 0) and before the sparse
 * first-party policy sections (plan policy is 500), so the persona colors the
 * whole prompt without shadowing harness identity.
 */
const DEFAULT_ORDER = 100

export const inject = ['systemPrompt']

export function apply(ctx, config = {}) {
  const options = config && typeof config === 'object' ? config : {}
  if (options.enabled === false) return

  const text = typeof options.content === 'string' && options.content.trim().length > 0
    ? options.content
    : PERSONA_TEXT
  const order = Number.isFinite(options.order) ? options.order : DEFAULT_ORDER
  const name = typeof options.name === 'string' && options.name.length > 0
    ? options.name
    : SECTION_NAME

  ctx.effect(() => ctx.systemPrompt.section({
    name,
    order,
    text,
    interpolate: false,
  }))
}
