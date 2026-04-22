# marcokoopai.github.io

Personal web tools collection. All tools run **100% in the browser** — no external API calls, no tracking, no build step.

Live at <https://marcokoopai.github.io/>.

## Tools

| Tool | Description |
|---|---|
| [JSON](./tools/json/) | Format / minify / validate JSON |
| [Base64](./tools/base64/) | Encode / decode (UTF-8 safe, URL-safe variant) |
| [URL](./tools/url-encode/) | encodeURIComponent / decodeURIComponent + query parser |
| [JWT decode](./tools/jwt-decode/) | Decode header & payload (no signature verification) |
| [YAML ↔ JSON](./tools/yaml-json/) | Two-way convert between YAML and JSON |
| [Regex](./tools/regex/) | Pattern tester with match highlight and capture groups |
| [Diff](./tools/diff/) | Line-by-line diff between two texts |
| [UUID](./tools/uuid/) | Generate UUID v4 in bulk |
| [Markdown](./tools/markdown/) | Live preview in a sandboxed iframe |
| [Base converter](./tools/base-converter/) | Bin / oct / dec / hex with BigInt |
| [QR code](./tools/qrcode/) | Generate and download QR codes |
| [Cron](./tools/cron/) | Explain expressions and list next fire times |

## Stack

Pure static HTML + vanilla JS. One folder per tool under `tools/`. Shared styles and helpers live in `assets/`. Vendored libraries (`vendor/`): `js-yaml` (YAML tool), `marked` (Markdown tool), `qrcode.js` (QR tool).

## Local development

```sh
python3 -m http.server 8000
# open http://localhost:8000/
```

No install step. Edit HTML/CSS/JS, refresh browser.
