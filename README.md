# @morebetterclaw/humanify-mcp

MCP server for [Humanify](https://humanifyit.ai) — transform AI-generated marketing copy into human-sounding, GEO-optimised content that gets cited by AI search engines.

## What it does

Exposes a single tool (`humanify_transform`) that takes AI-generated copy and returns:
- **Transformed copy** — rewritten to sound human and rank in AI search
- **Score (0–100)** — human-readability rating
- **Improvements** — list of changes made

## Install

```bash
npx @morebetterclaw/humanify-mcp
```

## Configuration

Set your API key as an environment variable:

```bash
export HUMANIFY_API_KEY=hfy_live_xxxx
```

Get a key at [https://humanifyit.ai/api-docs](https://humanifyit.ai/api-docs)

## Claude Desktop

Add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "humanify": {
      "command": "npx",
      "args": ["-y", "@morebetterclaw/humanify-mcp"],
      "env": {
        "HUMANIFY_API_KEY": "hfy_live_xxxx"
      }
    }
  }
}
```

## Pricing

- **Free:** 50 credits on signup (no card required)
- **Pay-as-you-go:** $10 = 1,000 transforms (~$0.01 each)
- **Pro subscribers:** Unlimited API calls

## License

MIT
