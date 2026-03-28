#!/usr/bin/env node
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

const API_KEY = process.env.HUMANIFY_API_KEY || '';
const API_URL = 'https://humanifyit.ai/api/v1/transform';

const server = new McpServer({
  name: 'humanify-mcp',
  version: '0.1.0',
});

server.tool(
  'humanify_transform',
  'Transform AI-generated marketing copy into human-sounding, GEO-optimised content that gets cited by AI search engines. Returns transformed copy, a human-readability score (0-100), and a list of improvements made.',
  { copy: z.string().describe('The AI-generated copy to transform') },
  async ({ copy }) => {
    if (!API_KEY) {
      return { content: [{ type: 'text', text: 'Error: HUMANIFY_API_KEY not set. Get a key at https://humanifyit.ai/api-docs' }] };
    }
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ copy }),
    });
    if (res.status === 402) {
      return { content: [{ type: 'text', text: 'Out of credits. Top up at https://humanifyit.ai/pricing' }] };
    }
    if (!res.ok) {
      return { content: [{ type: 'text', text: `API error: ${res.status}` }] };
    }
    const data = await res.json();
    return {
      content: [{
        type: 'text',
        text: JSON.stringify({ transformed: data.transformed, score: data.score, improvements: data.improvements }, null, 2)
      }]
    };
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);
