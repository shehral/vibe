import type { AcademyContentBlock } from './types'

export const mcpWorkshopContent: AcademyContentBlock[] = [
  // --- Introduction ---
  {
    type: 'heading',
    content: 'MCP Workshop: Connecting AI to Everything',
    level: 2,
  },
  {
    type: 'paragraph',
    content:
      'The Model Context Protocol (MCP) is an open standard created by Anthropic that lets AI assistants connect to external tools, data sources, and services. Think of it as the USB-C of AI — one universal connector that replaces dozens of custom integrations.',
  },
  {
    type: 'paragraph',
    content:
      'Before MCP, every AI tool needed its own bespoke integration for each data source. MCP changes that by providing a single protocol that any AI client can use to talk to any compatible server. This workshop walks you through understanding, configuring, and building MCP servers.',
  },

  // --- What is MCP ---
  {
    type: 'heading',
    content: 'What is MCP?',
    level: 3,
  },
  {
    type: 'paragraph',
    content:
      'MCP stands for Model Context Protocol. It is an open-source protocol that standardizes how AI applications connect to external data sources and tools. Instead of building a separate connector for every service your AI needs to access, you build one MCP server and any MCP-compatible client can use it.',
  },
  {
    type: 'callout',
    content:
      'The USB-C analogy: Before USB-C, every phone brand had its own charging cable. MCP does for AI integrations what USB-C did for device connectivity — one standard connector for everything.',
    variant: 'tip',
  },
  {
    type: 'paragraph',
    content:
      'MCP servers expose three core primitives: Resources (data the AI can read, like files or database records), Tools (actions the AI can perform, like running a query or creating a ticket), and Prompts (reusable prompt templates that guide the AI for specific tasks).',
  },

  // --- Architecture ---
  {
    type: 'heading',
    content: 'MCP Architecture',
    level: 3,
  },
  {
    type: 'paragraph',
    content:
      'The MCP architecture follows a client-server model. An MCP Host (like Claude Code, Cursor, or Windsurf) contains an MCP Client that communicates over a Transport layer with one or more MCP Servers. Each server exposes Resources, Tools, and Prompts to the AI.',
  },
  {
    type: 'code',
    content: `┌─────────────────────────────────────────┐
│  MCP Host (Claude Code, Cursor, etc.)   │
│                                         │
│  ┌─────────────┐   ┌─────────────┐      │
│  │ MCP Client  │   │ MCP Client  │      │
│  └──────┬──────┘   └──────┬──────┘      │
└─────────┼─────────────────┼─────────────┘
          │ Transport       │ Transport
          │ (stdio/HTTP)    │ (stdio/HTTP)
          │                 │
   ┌──────┴──────┐   ┌─────┴───────┐
   │ MCP Server  │   │ MCP Server  │
   │ (filesystem)│   │ (database)  │
   │             │   │             │
   │ Resources   │   │ Resources   │
   │ Tools       │   │ Tools       │
   │ Prompts     │   │ Prompts     │
   └─────────────┘   └─────────────┘`,
    language: 'text',
  },
  {
    type: 'table',
    headers: ['Component', 'Role', 'Example'],
    rows: [
      ['Host', 'The AI application that needs external data', 'Claude Code, Cursor, Windsurf'],
      ['Client', 'Manages the connection to a specific server', 'Built into the host application'],
      ['Transport', 'Communication channel between client and server', 'stdio (local) or HTTP/SSE (remote)'],
      ['Server', 'Exposes capabilities to the AI', 'Filesystem server, GitHub server, DB server'],
      ['Resources', 'Read-only data the AI can access', 'Files, database records, API responses'],
      ['Tools', 'Actions the AI can invoke', 'Search, create, update, delete operations'],
      ['Prompts', 'Reusable prompt templates', 'Code review template, bug report template'],
    ],
  },

  // --- Setting Up Servers (stdio) ---
  {
    type: 'heading',
    content: 'Setting Up Servers (stdio)',
    level: 3,
  },
  {
    type: 'paragraph',
    content:
      'The simplest way to run an MCP server is via stdio transport. The host application spawns the server as a child process and communicates through standard input/output. This is ideal for local servers that run on your machine.',
  },
  {
    type: 'paragraph',
    content:
      'Here is an example configuration that sets up a filesystem MCP server for Claude Code. This server gives the AI read/write access to a specific directory:',
  },
  {
    type: 'code',
    content: `{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/dir"]
    }
  }
}`,
    language: 'json',
  },
  {
    type: 'paragraph',
    content:
      'You can configure multiple servers at once. Each server gets a unique key and its own command configuration:',
  },
  {
    type: 'code',
    content: `{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/home/user/project"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "your-token-here"
      }
    },
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres", "postgresql://localhost/mydb"]
    }
  }
}`,
    language: 'json',
  },

  // --- Setting Up Servers (HTTP/SSE) ---
  {
    type: 'heading',
    content: 'Setting Up Servers (HTTP/SSE)',
    level: 3,
  },
  {
    type: 'paragraph',
    content:
      'For remote servers hosted on another machine or in the cloud, MCP supports HTTP with Server-Sent Events (SSE). Instead of specifying a command, you provide a URL:',
  },
  {
    type: 'code',
    content: `{
  "mcpServers": {
    "remote-db": {
      "url": "https://mcp.example.com/sse"
    }
  }
}`,
    language: 'json',
  },
  {
    type: 'paragraph',
    content:
      'Remote servers are useful for shared team resources, services that need to run continuously, or connecting to APIs hosted in the cloud. The HTTP/SSE transport handles reconnection and streaming automatically.',
  },
  {
    type: 'callout',
    content:
      'Security matters: Only connect to MCP servers you trust. A malicious server could expose sensitive data or execute harmful actions. Always verify the source and review what tools and resources a server exposes before granting access.',
    variant: 'warning',
  },

  // --- Connecting to Claude Code ---
  {
    type: 'heading',
    content: 'Connecting to Claude Code',
    level: 3,
  },
  {
    type: 'paragraph',
    content:
      'Claude Code reads MCP configuration from a JSON settings file. You can configure servers at the project level or globally for all projects.',
  },
  {
    type: 'paragraph',
    content:
      'To add an MCP server to your project, use the Claude Code CLI:',
  },
  {
    type: 'code',
    content: `# Add a stdio-based MCP server
claude mcp add filesystem npx -y @modelcontextprotocol/server-filesystem /path/to/dir

# Add a remote HTTP server
claude mcp add remote-api --url https://mcp.example.com/sse

# List configured servers
claude mcp list

# Remove a server
claude mcp remove filesystem`,
    language: 'bash',
  },
  {
    type: 'paragraph',
    content:
      'After adding a server, restart Claude Code. The AI will automatically discover the tools and resources exposed by your MCP servers. You can verify the connection by asking Claude to list its available tools.',
  },
  {
    type: 'callout',
    content:
      'To test MCP servers locally before connecting them to your AI tool, you can use the MCP Inspector. Run "npx @modelcontextprotocol/inspector" to launch a web UI that lets you browse a server\'s tools, resources, and prompts interactively.',
    variant: 'tip',
  },

  // --- Popular MCP Servers ---
  {
    type: 'heading',
    content: 'Popular MCP Servers',
    level: 3,
  },
  {
    type: 'paragraph',
    content:
      'The MCP ecosystem is growing rapidly. Here are some widely used servers you can set up today:',
  },
  {
    type: 'table',
    headers: ['Server', 'Purpose', 'Install Command'],
    rows: [
      ['Filesystem', 'Read/write local files', 'npx -y @modelcontextprotocol/server-filesystem /path'],
      ['GitHub', 'Manage repos, issues, PRs', 'npx -y @modelcontextprotocol/server-github'],
      ['PostgreSQL', 'Query and manage databases', 'npx -y @modelcontextprotocol/server-postgres connstr'],
      ['Slack', 'Read and send messages', 'npx -y @modelcontextprotocol/server-slack'],
      ['Google Drive', 'Search and read documents', 'npx -y @modelcontextprotocol/server-gdrive'],
      ['Puppeteer', 'Browser automation and scraping', 'npx -y @modelcontextprotocol/server-puppeteer'],
      ['Memory', 'Persistent knowledge graph', 'npx -y @modelcontextprotocol/server-memory'],
      ['Brave Search', 'Web search integration', 'npx -y @modelcontextprotocol/server-brave-search'],
    ],
  },

  // --- Building Your Own Server ---
  {
    type: 'heading',
    content: 'Building Your Own MCP Server',
    level: 3,
  },
  {
    type: 'paragraph',
    content:
      'When existing servers do not cover your use case, you can build your own. The MCP SDK is available in Python and TypeScript. Here is a basic Python server that exposes a documentation search tool:',
  },
  {
    type: 'code',
    content: `from mcp.server import Server
from mcp.types import Tool, TextContent

app = Server("my-server")

@app.tool()
async def search_docs(query: str) -> list[TextContent]:
    """Search project documentation."""
    results = do_search(query)
    return [TextContent(type="text", text=str(results))]

if __name__ == "__main__":
    app.run()`,
    language: 'python',
  },
  {
    type: 'paragraph',
    content:
      'You can also build MCP servers in TypeScript using the official SDK:',
  },
  {
    type: 'code',
    content: `import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "my-server",
  version: "1.0.0",
});

server.tool(
  "search-docs",
  "Search project documentation",
  { query: z.string() },
  async ({ query }) => {
    const results = await doSearch(query);
    return {
      content: [{ type: "text", text: JSON.stringify(results) }],
    };
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);`,
    language: 'typescript',
  },
  {
    type: 'callout',
    content:
      'Start small: Build a server with one or two tools first. Test it with the MCP Inspector, then connect it to Claude Code. You can always add more tools and resources later.',
    variant: 'tip',
  },

  // --- Enterprise Considerations ---
  {
    type: 'heading',
    content: 'Enterprise Considerations',
    level: 3,
  },
  {
    type: 'paragraph',
    content:
      'As MCP adoption grows within organizations, teams need to think about governance, security, and standardization. Here are the key areas to address when rolling out MCP at scale.',
  },
  {
    type: 'table',
    headers: ['Area', 'Concern', 'Recommendation'],
    rows: [
      ['Governance', 'Who approves new MCP servers?', 'Establish a review process similar to dependency approval'],
      ['Security', 'Servers can access sensitive data', 'Audit server permissions, use least-privilege access'],
      ['Authentication', 'Servers may need credentials', 'Use environment variables, never hardcode secrets'],
      ['Monitoring', 'Tracking server usage and errors', 'Log all tool invocations, set up alerting for failures'],
      ['Versioning', 'Server updates may break clients', 'Pin server versions, test updates in staging first'],
      ['Discovery', 'Teams need to find available servers', 'Maintain an internal server registry or catalog'],
    ],
  },
  {
    type: 'paragraph',
    content:
      'Organizations should maintain an approved server catalog — an internal marketplace where teams can discover, request, and deploy vetted MCP servers. This prevents shadow IT while still enabling teams to extend their AI tooling.',
  },
  {
    type: 'paragraph',
    content:
      'Security reviews should cover what data each server can access, what actions its tools can perform, and how authentication credentials are managed. Treat MCP server approval with the same rigor as approving a new third-party dependency in your codebase.',
  },
]
