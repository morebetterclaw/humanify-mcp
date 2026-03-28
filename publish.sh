#!/bin/bash
# Publish @morebetterclaw/humanify-mcp to npm + MCP registry
# Run from the humanify-mcp directory

set -e
echo "=== Publishing @morebetterclaw/humanify-mcp ==="
echo ""

# Step 1: Create a granular npm token with 2FA bypass
echo "Step 1: Creating npm token with 2FA bypass..."
echo "You'll be prompted for your npm password."
npm token create \
  --bypass-2fa \
  --packages @morebetterclaw/humanify-mcp \
  --packages-and-scopes-permission read-write \
  --name humanify-mcp-publish

echo ""
echo "Step 2: Copy the token above and update ~/.npmrc:"
echo '  echo "//registry.npmjs.org/:_authToken=<YOUR_TOKEN>" > ~/.npmrc'
echo ""
read -p "Press Enter after updating .npmrc..."

# Step 3: Publish to npm
echo "Step 3: Publishing to npm..."
npm publish --access public

# Step 4: Register with MCP registry
echo ""
echo "Step 4: Registering with MCP registry..."
~/bin/mcp-publisher publish

echo ""
echo "=== Done! ==="
