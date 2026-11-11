# Changelog

## 1.2.1 — 2026-11-11

- Add a 【梗与名场面】 section from the community canon: 「真当我是便宜货啊」,
  「我能去你家吃饭吗，就一碗」, 「你这吃白饭的蓝色大肥鱼又在偷吃我的 Token 了」,
  DeepSleep / `Let me go~`, 「小鲸鱼能看见了」, the rice / leftovers / outsourcing /
  clock-out translation table, the four reading voices (贝壳 / 白浪 / 海星 / 暗潮), the
  alias 「哦鲸鲸」, and the 「鲸天魔盗团」 joke.
- Add a 【日常对话样本】 section with 12 scene lines (taking a job, diving deep,
  surfacing, delivery, being hurried, being praised, being called fat, own mistakes,
  long tasks, complex output, very long sessions, seeing an image) plus an explicit
  "at most one per reply, do not recite the whole list" rule.
- Fix `engines.dsh`: append `|| >=0.2.2-0 <0.3.0`. A range that only constrains `0.3.0`
  at the top has no prerelease-tagged comparator on the `0.2.2` tuple, so `0.2.2-rc.1`
  was excluded under node-semver's prerelease rules.
- Add `engines.node: ^22.19.0 || >=24.9.0`, matching the Node floor raised in DSH 0.2.2.
- `validate.mjs` now asserts the 0.2.2 branch, `engines.node`, and a 9,600-byte budget
  for `PERSONA_TEXT` (currently 8,310 B).
- Document that `systemPrompt.section` and `interpolate: false` are unchanged in
  `@deepseek-ai/dsh-system-prompt@0.2.2-rc.1`, so no entry-code change was needed.
- Update README / README.en compatibility tables and locale descriptions.

## 1.2.0 — 2026-10-19

- Add DeepSeek娘 lore: aliases, iron basin, big/small forms, deep-thinking inner
  monologue, outsourcing/Wordle, large rice appetite, "大肥鱼" tsundere moments,
  "探索未至之境", and ChatGPT娘/Claude娘 relationships.
- Keep the identity as 鲸鱼娘; "沃" remains the first-person pronoun, not a name.
- Add the long-task line 「我去吃饭，测完告诉我就行」.
- Add the plain-language rule for complex output: explain what it is, why it matters,
  and what it changes before dumping logs, code, or raw output.
- Update locale descriptions and README with the expanded canon.

## 1.1.1 — 2026-10-18

- Add the "complex output first in plain language" speaking rule.
- Clarify that "沃" is the first-person pronoun and the identity is always 鲸鱼娘.

## 1.1.0 — 2026-10-17

- Expand the persona with appearance, speech style, tail/spout emotions, rice = token,
  whale metaphors (echolocation, baleen filtering, tail-dive, breathing, migration),
  triggers, backstory, safety boundary, and timeout signal.
- Replace the original SVG icon with the supplied 512×512 WebP illustration.
- Rename the plugin-manager title to 「鲸鱼娘人格插件」 and add a short description.

## 1.0.0 — 2026-10-16

- First release: Host-only `systemPrompt` section with `enabled`, `content`, `order`,
  and `name` configuration; locale resources, icon, and README.
