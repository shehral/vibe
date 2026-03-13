import { items } from '@/lib/data/items'

const EXPECTED_ITEM_IDS = [
  'ship-voice',
  'context-adapter',
  'agent-blueprint',
  'fleet-comm',
  'security-shield',
  'local-core',
  'skill-chips',
]

const VALID_CATEGORIES = ['tool', 'protocol', 'pattern', 'defense'] as const

describe('items', () => {
  it('contains exactly 7 items', () => {
    expect(items).toHaveLength(7)
  })

  it('has all expected item IDs', () => {
    const ids = items.map((i) => i.id)
    for (const id of EXPECTED_ITEM_IDS) {
      expect(ids).toContain(id)
    }
  })

  describe('required fields', () => {
    it.each(items)('$id has all required fields', (item) => {
      expect(item.id).toBeDefined()
      expect(typeof item.id).toBe('string')
      expect(item.id.length).toBeGreaterThan(0)

      expect(item.name).toBeDefined()
      expect(typeof item.name).toBe('string')
      expect(item.name.length).toBeGreaterThan(0)

      expect(item.realWorldTool).toBeDefined()
      expect(typeof item.realWorldTool).toBe('string')
      expect(item.realWorldTool.length).toBeGreaterThan(0)

      expect(item.description).toBeDefined()
      expect(typeof item.description).toBe('string')
      expect(item.description.length).toBeGreaterThan(0)

      expect(item.icon).toBeDefined()
      expect(typeof item.icon).toBe('string')

      expect(item.acquiredAt).toBeDefined()
      expect(typeof item.acquiredAt).toBe('string')
      expect(item.acquiredAt.length).toBeGreaterThan(0)

      expect(item.category).toBeDefined()
      expect(typeof item.category).toBe('string')
    })
  })

  describe('categories', () => {
    it('all items have a valid category', () => {
      for (const item of items) {
        expect(VALID_CATEGORIES).toContain(item.category)
      }
    })

    it('covers all 4 categories: tool, protocol, pattern, defense', () => {
      const categories = new Set(items.map((i) => i.category))
      for (const cat of VALID_CATEGORIES) {
        expect(categories.has(cat)).toBe(true)
      }
    })
  })

  describe('icon paths follow convention', () => {
    it.each(items)(
      '$id has icon path /images/items/$id.svg',
      (item) => {
        expect(item.icon).toBe(`/images/items/${item.id}.svg`)
      }
    )
  })
})
