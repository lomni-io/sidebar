import {filterFramesBySelection, framesFiltered, framesSort, setVisibleTags} from "@/components/search-tab/filters";
import {FrameRender, TagsCounter} from "@/entity/frame";

describe('framesFiltered', () => {
    it('test_1', () => {
        const frames = [
            {tags: ['#tag1', '#tag3'], preProcessedTags: []}
        ]

        const tags = ['#tag1']

        const expected = [
            {tags: ['#tag1', '#tag3'], preProcessedTags: []}
        ]

        expect(framesFiltered(frames,tags)).toStrictEqual(expected)
    })
    it('test_2', () => {
        const frames = [
            {tags: ['#tag1', '#tag3'], preProcessedTags: ['@domain1'], title: 'a'}
        ]

        const tags = ['@domain1']

        const expected = [
            {tags: ['#tag1', '#tag3'], preProcessedTags: ['@domain1'], title: 'a'}
        ]

        expect(framesFiltered(frames,tags)).toStrictEqual(expected)
    })
    it('test_3', () => {
        const frames = [
            {tags: ['#tag1', '#tag3'], preProcessedTags: ['@domain1']},
            {tags: ['#tag1', '#tag4'], preProcessedTags: ['@domain1']},
            {tags: ['#tag1', '#tag3'], preProcessedTags: ['@domain2']}
        ]

        const tags = ['@domain1']

        const expected = [
            {tags: ['#tag1', '#tag4'], preProcessedTags: ['@domain1']},
            {tags: ['#tag1', '#tag3'], preProcessedTags: ['@domain1']},
        ]

        expect(framesFiltered(frames,tags)).toStrictEqual(expected)
    })
    it('test_4', () => {
        const frames = [
            {tags: ['#tag1', '#tag3'], preProcessedTags: ['@domain1']},
            {tags: ['#tag1', '#tag4'], preProcessedTags: ['@domain1']},
            {tags: ['#tag1', '#tag3'], preProcessedTags: ['@domain2']}
        ]

        const tags = ['@domain1', '#tag4']

        const expected = [
            {tags: ['#tag1', '#tag4'], preProcessedTags: ['@domain1']},
        ]

        expect(framesFiltered(frames,tags)).toStrictEqual(expected)
    })
    it('test_5', () => {
        const frames = [
            {tags: ['#tag1', '#tag3'], preProcessedTags: ['@domain1']},
            {tags: ['#tag1', '#tag4'], preProcessedTags: ['@domain1']},
            {tags: ['#tag1', '#tag3'], preProcessedTags: ['@domain2']}
        ]

        const tags = ['@domain2', '#tag4']

        const expected: FrameRender[] = [
        ]

        expect(framesFiltered(frames,tags)).toStrictEqual(expected)
    })
    it('test_6 wieh pinned', () => {
        const frames = [
            {tags: ['#tag1', '#tag3'], preProcessedTags: ['@domain1'], pinned: true},
            {tags: ['#tag1', '#tag4'], preProcessedTags: ['@domain1']},
            {tags: ['#tag1', '#tag3'], preProcessedTags: ['@domain2']}
        ]

        const tags = ['@domain2', '#tag4']

        const expected = [
            {tags: ['#tag1', '#tag3'], preProcessedTags: ['@domain1'], pinned: true},
        ]

        expect(framesFiltered(frames,tags)).toStrictEqual(expected)
    })
})

describe('setVisibleTags', () => {
    it('test_1', () => {
        const frames = [
            {tags: ['#tag1', '#tag3'], preProcessedTags: []}
        ]

        const selectedTags: string[] = []

        const expected = [
            {name: '#tag1', kind: 'tag', count: 1},
            {name: '#tag3', kind: 'tag', count: 1}
        ]

        expect(setVisibleTags(frames,selectedTags, '')).toStrictEqual(expected)
    })
    it('test_2', () => {
        const frames = [
            {tags: ['#tag1', '#tag3'], preProcessedTags: ['@domain1']}
        ]

        const selectedTags: string[] = []

        const expected = [
            {name: '#tag1', kind: 'tag', count: 1},
            {name: '#tag3', kind: 'tag', count: 1},
            {name: '@domain1', kind: 'preProcessed', count: 1}
        ]

        expect(setVisibleTags(frames,selectedTags, '')).toStrictEqual(expected)
    })
    it('test_3', () => {
        const frames = [
            {tags: ['#tag1', '#tag3'], preProcessedTags: ['@domain1']},
            {tags: ['#tag1', '#tag4'], preProcessedTags: ['@domain1']},
            {tags: ['#tag6', '#tag7'], preProcessedTags: ['@domain2']},
        ]

        const selectedTags: string[] = []

        const expected = [
            {name: '#tag1', kind: 'tag', count: 2},
            {name: '@domain1', kind: 'preProcessed', count: 2},
            {name: '#tag3', kind: 'tag', count: 1},
            {name: '#tag4', kind: 'tag', count: 1},
            {name: '#tag6', kind: 'tag', count: 1},
            {name: '#tag7', kind: 'tag', count: 1},
            {name: '@domain2', kind: 'preProcessed', count: 1}
        ]

        expect(setVisibleTags(frames,selectedTags, '')).toStrictEqual(expected)
    })
    it('test_3 with input', () => {
        const frames = [
            {tags: ['#tag1', '#tag3'], preProcessedTags: ['@domain1']},
            {tags: ['#tag1', '#tag4'], preProcessedTags: ['@domain1']},
            {tags: ['#tag6', '#tag7'], preProcessedTags: ['@domain2']},
        ]

        const selectedTags: string[] = []

        const expected = [
            {name: '#tag1', kind: 'tag', count: 2},
            {name: '#tag3', kind: 'tag', count: 1},
            {name: '#tag4', kind: 'tag', count: 1},
            {name: '#tag6', kind: 'tag', count: 1},
            {name: '#tag7', kind: 'tag', count: 1},
        ]

        expect(setVisibleTags(frames,selectedTags, '#tag')).toStrictEqual(expected)
    })
    it('test_3 with input tag4', () => {
        const frames = [
            {tags: ['#tag1', '#tag3'], preProcessedTags: ['@domain1']},
            {tags: ['#tag1', '#tag4'], preProcessedTags: ['@domain1']},
            {tags: ['#tag6', '#tag7'], preProcessedTags: ['@domain2']},
        ]

        const selectedTags: string[] = []

        const expected = [
            {name: '#tag4', kind: 'tag', count: 1},
        ]

        expect(setVisibleTags(frames,selectedTags, '#tag4')).toStrictEqual(expected)
    })
    it('test_3 with selected', () => {
        const frames = [
            {tags: ['#tag1', '#tag3'], preProcessedTags: ['@domain1']},
            {tags: ['#tag1', '#tag4'], preProcessedTags: ['@domain1']},
            {tags: ['#tag6', '#tag7'], preProcessedTags: ['@domain2']},
        ]

        const selectedTags = ['#tag1']

        const expected = [
            {name: '#tag3', kind: 'tag', count: 1},
            {name: '#tag4', kind: 'tag', count: 1},
        ]

        expect(setVisibleTags(frames,selectedTags, '')).toStrictEqual(expected)
    })
    it('test_3 with selected domain1', () => {
        const frames = [
            {tags: ['#tag1', '#tag3'], preProcessedTags: ['@domain1']},
            {tags: ['#tag1', '#tag4'], preProcessedTags: ['@domain1']},
            {tags: ['#tag6', '#tag7'], preProcessedTags: ['@domain2']},
        ]

        const selectedTags = ['@domain1']

        const expected = [
            {name: '#tag3', kind: 'tag', count: 1},
            {name: '#tag4', kind: 'tag', count: 1},
        ]

        expect(setVisibleTags(frames,selectedTags, '')).toStrictEqual(expected)
    })
    it('test_only first @', () => {
        const frames = [
            {tags: ['#tag1', '#tag3'], preProcessedTags: ['@domain1']},
            {tags: ['#tag1', '#tag4'], preProcessedTags: ['@domain1']},
            {tags: ['#tag6', '#tag7'], preProcessedTags: ['@domain2']},
        ]

        const selectedTags: string[] = []

        const expected = [
            {name: '@domain1', kind: 'preProcessed', count: 2},
            {name: '@domain2', kind: 'preProcessed', count: 1},
        ]

        expect(setVisibleTags(frames,selectedTags, '@')).toStrictEqual(expected)
    })
    it('test_3 with input domain', () => {
        const frames = [
            {tags: ['#tag1', '#tag3'], preProcessedTags: ['@domain1']},
            {tags: ['#tag1', '#tag4'], preProcessedTags: ['@domain1']},
            {tags: ['#tag6', '#tag7'], preProcessedTags: ['@domain2']},
        ]

        const selectedTags: string[] = []

        const expected = [
            {name: '@domain1', kind: 'preProcessed', count: 2},
            {name: '@domain2', kind: 'preProcessed', count: 1}
        ]

        expect(setVisibleTags(frames,selectedTags, 'domain')).toStrictEqual(expected)
    })
    it('test_3 with input uppercase', () => {
        const frames = [
            {tags: ['#ApiHsmNotHealthy', '#tag3'], preProcessedTags: ['@domain1']},
        ]

        const selectedTags: string[] = []

        const expected = [
            {name: '#ApiHsmNotHealthy', kind: 'tag', count: 1},
        ]

        expect(setVisibleTags(frames,selectedTags, 'api')).toStrictEqual(expected)
    })
})

describe('framesSort', () => {
    it('test_1', () => {
        const frames = [
            {
                url: 'url1_a',
                kind: 'url',
                tags: ['#tag4', '#tag1'],
                preProcessedTags: [],
                updatedAt: 10,
                pinned: false
            },
            {
                url: 'url1_b',
                kind: 'url',
                tags: ['#tag1', '#tag3'],
                preProcessedTags: [],
                updatedAt: 12,
                pinned: false
            },
            {
                url: 'url4_parent',
                kind: 'url',
                tags: ['#tag4'],
                preProcessedTags: [],
                updatedAt: 10,
                pinned: false
            },
            {
                url: 'url1_parent',
                kind: 'url',
                tags: ['#tag1'],
                preProcessedTags: [],
                updatedAt: 10,
                pinned: false
            },
        ]


        const expected = [
            {
                url: 'url1_parent',
                kind: 'url',
                tags: ['#tag1'],
                preProcessedTags: [],
                pinned: false,
                updatedAt: 10
            },
            {
                url: 'url4_parent',
                kind: 'url',
                tags: ['#tag4'],
                preProcessedTags: [],
                pinned: false,
                updatedAt: 10
            },
            {
                url: 'url1_b',
                kind: 'url',
                tags: ['#tag1', '#tag3'],
                preProcessedTags: [],
                pinned: false,
                updatedAt: 12
            },
            {
                url: 'url1_a',
                kind: 'url',
                tags: ['#tag4', '#tag1'],
                preProcessedTags: [],
                pinned: false,
                updatedAt: 10
            },
        ]

        expect(framesSort(frames)).toStrictEqual(expected)
    })

    it('test_2 with pinned', () => {
        const frames = [
            {
                url: 'url1_a',
                kind: 'url',
                tags: ['#tag4', '#tag1'],
                preProcessedTags: [],
                updatedAt: 10,
                pinned: false
            },
            {
                url: 'url1_b',
                kind: 'url',
                tags: ['#tag1', '#tag3'],
                preProcessedTags: [],
                updatedAt: 12,
                pinned: true
            },
            {
                url: 'url4_parent',
                kind: 'url',
                tags: ['#tag4'],
                preProcessedTags: [],
                updatedAt: 10,
                pinned: false
            },
            {
                url: 'url1_parent',
                kind: 'url',
                tags: ['#tag1'],
                preProcessedTags: [],
                updatedAt: 10,
                pinned: false
            },
        ]


        const expected = [
            {
                url: 'url1_b',
                kind: 'url',
                tags: ['#tag1', '#tag3'],
                preProcessedTags: [],
                pinned: true,
                updatedAt: 12
            },
            {
                url: 'url1_parent',
                kind: 'url',
                tags: ['#tag1'],
                preProcessedTags: [],
                pinned: false,
                updatedAt: 10
            },
            {
                url: 'url4_parent',
                kind: 'url',
                tags: ['#tag4'],
                preProcessedTags: [],
                pinned: false,
                updatedAt: 10
            },
            {
                url: 'url1_a',
                kind: 'url',
                tags: ['#tag4', '#tag1'],
                preProcessedTags: [],
                pinned: false,
                updatedAt: 10
            },
        ]

        expect(framesSort(frames)).toStrictEqual(expected)
    })
})

describe('filterFramesBySelection', () => {
    it('test_1', () => {
        const frames = [
            {tags: ['#tag1', '#tag3'], preProcessedTags: []}
        ]

        const tags = ['#tag1']

        const expected = [
            {tags: ['#tag1', '#tag3'], preProcessedTags: []}
        ]

        expect(filterFramesBySelection(frames, tags)).toStrictEqual(expected)
    })
    it('test_1 with domain', () => {
        const frames = [
            {tags: ['#tag1', '#tag3'], preProcessedTags: ['@domain']},
            {tags: ['#tag1', '#tag3'], preProcessedTags: []}
        ]

        const tags = ['@domain']

        const expected = [
            {tags: ['#tag1', '#tag3'], preProcessedTags: ['@domain']},
        ]

        expect(filterFramesBySelection(frames, tags)).toStrictEqual(expected)
    })
    it('test_2 with domain', () => {
        const frames = [
            {tags: ['#tag1', '#tag3'], preProcessedTags: ['@domain1']},
            {tags: ['#tag1', '#tag4'], preProcessedTags: ['@domain1']},
            {tags: ['#tag1', '#tag3'], preProcessedTags: ['@domain2']}
        ]

        const tags = ['@domain1']

        const expected = [
            {tags: ['#tag1', '#tag3'], preProcessedTags: ['@domain1']},
            {tags: ['#tag1', '#tag4'], preProcessedTags: ['@domain1']},
        ]

        expect(filterFramesBySelection(frames, tags)).toStrictEqual(expected)
    })
    it('test_3 with domain', () => {
        const frames = [
            {tags: ['#tag1', '#tag3'], preProcessedTags: ['@domain1']},
            {tags: ['#tag1', '#tag4'], preProcessedTags: ['@domain1']},
            {tags: ['#tag1', '#tag3'], preProcessedTags: ['@domain2']}
        ]

        const tags = ['@domain1', '#tag4']

        const expected = [
            {tags: ['#tag1', '#tag4'], preProcessedTags: ['@domain1']},
        ]

        expect(filterFramesBySelection(frames, tags)).toStrictEqual(expected)
    })
})