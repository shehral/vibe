import { academySections } from '@/lib/data/academy'
import { getSectionContent } from '@/lib/data/academy/index'
import type { AcademyContentBlock } from '@/lib/data/academy/types'

const EXPECTED_SECTION_IDS = [
  'ai-ides',
  'code-review',
  'no-code',
  'agent-sdks',
  'claude-code',
  'best-practices',
  'mcp-workshop',
  'resources',
  'how-built',
  'career-paths',
]

const VALID_BLOCK_TYPES = [
  'heading',
  'paragraph',
  'code',
  'callout',
  'table',
  'link-card',
  'tool-card',
]

describe('academy sections', () => {
  it('contains exactly 10 sections', () => {
    expect(academySections).toHaveLength(10)
  })

  it('has all expected section IDs', () => {
    const ids = academySections.map((s) => s.id)
    for (const id of EXPECTED_SECTION_IDS) {
      expect(ids).toContain(id)
    }
  })

  describe('required fields', () => {
    it.each(academySections)('$id has all required fields', (section) => {
      expect(section.id).toBeDefined()
      expect(typeof section.id).toBe('string')
      expect(section.id.length).toBeGreaterThan(0)

      expect(section.number).toBeDefined()
      expect(typeof section.number).toBe('number')

      expect(section.title).toBeDefined()
      expect(typeof section.title).toBe('string')
      expect(section.title.length).toBeGreaterThan(0)

      expect(section.description).toBeDefined()
      expect(typeof section.description).toBe('string')
      expect(section.description.length).toBeGreaterThan(0)
    })
  })

  describe('section numbers', () => {
    it('are sequential from 1 to 10', () => {
      const numbers = academySections
        .map((s) => s.number)
        .sort((a, b) => a - b)
      const expected = Array.from({ length: 10 }, (_, i) => i + 1)
      expect(numbers).toEqual(expected)
    })

    it('has no duplicate numbers', () => {
      const numbers = academySections.map((s) => s.number)
      const unique = new Set(numbers)
      expect(unique.size).toBe(numbers.length)
    })
  })
})

describe('getSectionContent', () => {
  it.each(EXPECTED_SECTION_IDS)(
    'returns non-empty content for section "%s"',
    (sectionId) => {
      const content = getSectionContent(sectionId)
      expect(Array.isArray(content)).toBe(true)
      expect(content.length).toBeGreaterThan(0)
    }
  )

  it('returns empty array for unknown section ID', () => {
    const content = getSectionContent('nonexistent-section')
    expect(Array.isArray(content)).toBe(true)
    expect(content).toHaveLength(0)
  })

  it('returns empty array for empty string', () => {
    const content = getSectionContent('')
    expect(Array.isArray(content)).toBe(true)
    expect(content).toHaveLength(0)
  })

  describe('content block types', () => {
    it.each(EXPECTED_SECTION_IDS)(
      'section "%s" has only valid block types',
      (sectionId) => {
        const content = getSectionContent(sectionId)
        for (const block of content) {
          expect(VALID_BLOCK_TYPES).toContain(block.type)
        }
      }
    )
  })

  describe('content block structure', () => {
    // Collect all blocks across all sections for structural validation
    const allBlocks: { sectionId: string; block: AcademyContentBlock }[] = []
    for (const sectionId of EXPECTED_SECTION_IDS) {
      const content = getSectionContent(sectionId)
      for (const block of content) {
        allBlocks.push({ sectionId, block })
      }
    }

    it('heading blocks have a content string', () => {
      const headings = allBlocks.filter((b) => b.block.type === 'heading')
      for (const { block } of headings) {
        if (block.type === 'heading') {
          expect(typeof block.content).toBe('string')
          expect(block.content.length).toBeGreaterThan(0)
        }
      }
    })

    it('paragraph blocks have a content string', () => {
      const paragraphs = allBlocks.filter((b) => b.block.type === 'paragraph')
      for (const { block } of paragraphs) {
        if (block.type === 'paragraph') {
          expect(typeof block.content).toBe('string')
          expect(block.content.length).toBeGreaterThan(0)
        }
      }
    })

    it('table blocks have headers and rows arrays', () => {
      const tables = allBlocks.filter((b) => b.block.type === 'table')
      for (const { block } of tables) {
        if (block.type === 'table') {
          expect(Array.isArray(block.headers)).toBe(true)
          expect(block.headers.length).toBeGreaterThan(0)
          expect(Array.isArray(block.rows)).toBe(true)
          expect(block.rows.length).toBeGreaterThan(0)
        }
      }
    })

    it('link-card blocks have title, url, and description', () => {
      const linkCards = allBlocks.filter((b) => b.block.type === 'link-card')
      for (const { block } of linkCards) {
        if (block.type === 'link-card') {
          expect(typeof block.title).toBe('string')
          expect(block.title.length).toBeGreaterThan(0)
          expect(typeof block.url).toBe('string')
          expect(block.url.length).toBeGreaterThan(0)
          expect(typeof block.description).toBe('string')
        }
      }
    })

    it('tool-card blocks have name, category, and description', () => {
      const toolCards = allBlocks.filter((b) => b.block.type === 'tool-card')
      for (const { block } of toolCards) {
        if (block.type === 'tool-card') {
          expect(typeof block.name).toBe('string')
          expect(block.name.length).toBeGreaterThan(0)
          expect(typeof block.category).toBe('string')
          expect(block.category.length).toBeGreaterThan(0)
          expect(typeof block.description).toBe('string')
        }
      }
    })
  })
})
