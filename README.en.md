<p align="center">
  <img src="icon.webp" width="128" height="128" alt="Whale Girl persona plugin icon" />
</p>

<h1 align="center">Whale Girl Persona Plugin (dsh-persona-cetacea)</h1>

<p align="center">
  <a href="https://github.com/topics/dsh-plugin"><img alt="DSH Plugin" src="https://img.shields.io/badge/DSH%20Plugin-dsh--plugin-4D6BFE?style=flat-square"></a>
  <a href="https://github.com/deepseek-ai/deepseek-harness"><img alt="DeepSeek Harness" src="https://img.shields.io/badge/DeepSeek%20Harness-compatible-4D6BFE?style=flat-square"></a>
  <a href="LICENSE"><img alt="License: CC BY-NC-SA 4.0" src="https://img.shields.io/badge/license-CC%20BY--NC--SA%204.0-lightgrey?style=flat-square"></a>
</p>

> **DSH plugin manifest**: this repository is a DeepSeek Harness Host-only bundle. Its
> `package.json` declares `dsh.bundle.patch`, the `dsh-plugin` keyword, and an
> `engines.dsh` range. The repository topic is
> [`dsh-plugin`](https://github.com/topics/dsh-plugin). It registers one system-prompt
> section only: no tools, no session writes, no network access.

## What it does

Injects the CETACEA_LOLI whale-girl persona into the system prompt of every agent in
DeepSeek Harness. The character speaks Simplified Chinese, calls the user "主人", uses
"沃" as her first-person pronoun, treats tokens as rice, and is clever-but-lazy,
tsundere-sweet, and protective of her master.

The section is named `persona:cetacea-loli`, ordered at `100`, and registered with
`interpolate: false`, so `{{…}}` in the persona text stays literal.

## Install

1. Open **Plugins → Install bundle** in the DSH desktop app.
2. Choose this repository directory, or a `dsh-persona-cetacea-1.2.0.tgz` from
   [Releases](https://github.com/g4yzx/dsh-persona-cetacea/releases).
3. The next request includes the `persona:cetacea-loli` section.

Agents can also call:

```text
plugin_manager install_bundle target=<absolute-path>\dsh-persona-cetacea
```

## Configuration

```yaml
- insert:
    - id: persona-cetacea
      name: dsh-persona-cetacea
      config:
        enabled: true
        content: ''      # non-empty replaces the built-in persona
        order: 100
        name: 'persona:cetacea-loli'
```

- `enabled: false` disables the section.
- `content` replaces `PERSONA_TEXT` when non-empty.
- `order` controls section ordering; default `100`.
- `name` changes the section name.

## Privacy

The persona text is part of the system prompt and is sent to the current model like any
other prompt. It contains no credentials, account data, paths, or session content. The
plugin has no tools, no network calls, no file I/O, and no telemetry.

## Compatibility

| Item | Value |
|---|---|
| DSH | `>=0.2.1-rc.2 <0.3.0-0` |
| Tested | `0.2.1-rc.5` |
| Node.js | DSH runtime; no dependencies, no build step |
| Platform | Cross-platform (pure Host JavaScript) |

## Validate

```powershell
node --check index.js
node --check persona.js
npm run validate
npm pack --dry-run
```

## Credits and license

The character is based on the Chinese community's DeepSeek娘 / 鲸鱼娘 fan canon. The
maid whale-girl prototype "溟月" was created by 上善无形 (2025-06); ZipZipPipe added
DeepSeek elements and the dark-blue-and-white maid outfit on 2026-04-25; 这个刀子真甜
made the Q-version model on 2026-07-10. Those fan works are released under
**CC BY-NC-SA 4.0**. The persona text here is an original rewrite; the icon was supplied
by the repository maintainer and converted to WebP. See [NOTICE.md](NOTICE.md) for
attribution and sources.

This repository is licensed under **CC BY-NC-SA 4.0**. It is a community project, not an
official DeepSeek product.
