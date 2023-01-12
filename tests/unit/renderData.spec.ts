import {
    createTags, createWindows,
    enrichFrames, generateTagCardinality,
    GroupFrameData,
    GroupFrameRender,
    WebFrameData,
    WebFrameRender
} from "@/store/renderData";

describe('createTags', () => {
    test('test_1', () => {
        const frames = [
            {
                tags: ['#tag1'],
                preProcessedTags: ['@teste']
            }
        ]
        const expected = [
            {name: '#tag1', count: 1, kind: 'tag'},
            {name: '@teste', count: 1, kind: 'preProcessed'}
        ]
        expect(createTags(frames)).toStrictEqual(expected)
    })
    test('test_2', () => {
        const frames = [
            {
                tags: ['#tag1'],
                preProcessedTags: ['@teste']
            },
            {
                tags: ['#tag1', '#tag2'],
                preProcessedTags: []
            }
        ]
        const expected = [
            {name: '#tag1', count: 2, kind: 'tag'},
            {name: '@teste', count: 1, kind: 'preProcessed'},
            {name: '#tag2', count: 1, kind: 'tag'},
        ]
        expect(createTags(frames)).toStrictEqual(expected)
    })
})

describe('enrichFrames', () => {
    test('test sort tags by cardinality', () => {
        const frames = [
            {
                title: 'a',
                favIconUrl: 'a',
                url: 'https://test2.ski.com',
                tags: ['#ski2023'],
                updatedAt: 1,
            },
            {
                title: 'a',
                favIconUrl: 'a',
                url: 'https://test.ski.com/abc',
                tags: ['#24k', '#ski2023', '#abcc'],
                updatedAt: 1,
            },
            {
                title: 'a',
                favIconUrl: 'a',
                url: 'https://test2.ski.com/abc2',
                tags: ['#24k', '#ski2023'],
                updatedAt: 1,
            }
        ]
        const expected = [
            {
                title: 'a',
                url: 'https://test2.ski.com',
                favIconUrl: 'a',
                kind: 'web',
                domain: 'test2.ski.com',
                preProcessedTags: ['@ski', '@test2'],
                tags: ['#ski2023'],
                isPinned: false,
                isOpened: false,
                isSelected: false,
            },
            {
                title: 'a',
                url: 'https://test.ski.com/abc',
                favIconUrl: 'a',
                kind: 'web',
                domain: 'test.ski.com',
                preProcessedTags: ['@ski', '@test'],
                tags: ['#ski2023', '#24k', '#abcc'],
                isPinned: false,
                isOpened: false,
                isSelected: false,
            },
            {
                title: 'a',
                url: 'https://test2.ski.com/abc2',
                favIconUrl: 'a',
                kind: 'web',
                domain: 'test2.ski.com',
                preProcessedTags: ['@ski', '@test2'],
                tags: ['#ski2023', '#24k'],
                isPinned: false,
                isOpened: false,
                isSelected: false,
            }
        ]
        expect(enrichFrames(frames)).toStrictEqual(expected)
    })
    test('test add activeTab pre processed', () => {
        const frames = [
            {
                title: 'a',
                favIconUrl: 'a',
                url: 'https://test2.ski.com',
                tags: ['#ski2023'],
                updatedAt: 1,
            },
            {
                title: 'a',
                favIconUrl: 'a',
                url: 'https://test.ski.com/abc',
                tags: ['#24k', '#ski2023', '#abcc'],
                updatedAt: 1,
            },
        ]

        const activeTabs = [
            {
                id: '12',
                title: 'abv',
                url: 'https://test.ski.com/abc',
                active: false,
                favIconUrl: 'url favicon',
                pinned: false,
                windowId: 12,
                groupId: -1,
                selected: false
            }
        ]

        const expected = [
            {
                title: 'a',
                url: 'https://test2.ski.com',
                favIconUrl: 'a',
                kind: 'web',
                domain: 'test2.ski.com',
                preProcessedTags: ['@ski', '@test2'],
                tags: ['#ski2023'],
                isPinned: false,
                isOpened: false,
                isSelected: false,
            },
            {
                title: 'a',
                url: 'https://test.ski.com/abc',
                favIconUrl: 'a',
                kind: 'web',
                domain: 'test.ski.com',
                preProcessedTags: ['@ski', '@test'],
                tags: ['#ski2023', '#24k', '#abcc'],
                isPinned: false,
                isOpened: true,
                isSelected: false,
            },
        ]
        expect(enrichFrames(frames, activeTabs)).toStrictEqual(expected)
    })
    test('test show new frame', () => {
        const frames = [
            {
                title: 'a',
                favIconUrl: 'a',
                url: 'https://test2.ski.com',
                tags: ['#ski2023'],
                updatedAt: 1,
            },
            {
                title: 'a',
                favIconUrl: 'a',
                url: 'https://test.ski.com/abc',
                tags: ['#24k', '#ski2023', '#abcc'],
                updatedAt: 1,
            },
        ]

        const activeTabs = [
            {
                id: '1',
                title: 'abv',
                url: 'https://test.ski.com/abc',
                active: false,
                favIconUrl: 'url favicon',
                pinned: false,
                windowId: 12,
                groupId: -1,
                selected: false
            },
            {
                id: '2',
                title: 'newHere',
                url: 'https://test.ski.com/newHere',
                active: false,
                favIconUrl: 'url favicon new',
                pinned: false,
                windowId: 12,
                groupId: -1,
                selected: false
            },
            {
                id: '4',
                title: 'not show this one',
                url: '',
                active: false,
                favIconUrl: 'url favicon new',
                pinned: false,
                windowId: 12,
                groupId: -1,
                selected: false
            }
        ]

        const expected = [
            {
                title: 'a',
                url: 'https://test2.ski.com',
                favIconUrl: 'a',
                kind: 'web',
                domain: 'test2.ski.com',
                preProcessedTags: ['@ski', '@test2'],
                tags: ['#ski2023'],
                isPinned: false,
                isOpened: false,
                isSelected: false,
            },
            {
                title: 'a',
                url: 'https://test.ski.com/abc',
                favIconUrl: 'a',
                kind: 'web',
                domain: 'test.ski.com',
                preProcessedTags: ['@ski', '@test'],
                tags: ['#ski2023', '#24k', '#abcc'],
                isPinned: false,
                isOpened: true,
                isSelected: false,
            },
        ]
        expect(enrichFrames(frames, activeTabs)).toStrictEqual(expected)
    })
    test('test web and group frame', () => {
        const frames = [
            {
                title: 'a',
                favIconUrl: 'a',
                url: 'https://test2.ski.com',
                tags: ['#ski2023'],
                updatedAt: 1,
            },
            {
                id: 12,
                title: '123',
                color: 'red',
                frames: ['https://test2.ski.com'],
                tags: ['#myGroup'],
                updatedAt: 1,
            },
        ]
        const expected = [
            {
                title: 'a',
                url: 'https://test2.ski.com',
                favIconUrl: 'a',
                kind: 'web',
                domain: 'test2.ski.com',
                isPinned: false,
                isOpened: false,
                isSelected: false,
                preProcessedTags: ['@ski', '@test2'],
                tags: ['#ski2023'],
            },
            {
                title: '123',
                id: -1,
                color: 'red',
                collapsed: false,
                frames: [
                    {
                        title: 'a',
                        url: 'https://test2.ski.com',
                        favIconUrl: 'a',
                        kind: 'web',
                        domain: 'test2.ski.com',
                        isPinned: false,
                        isOpened: false,
                        isSelected: false,
                        preProcessedTags: ['@ski', '@test2'],
                        tags: ['#ski2023'],
                    }
                ],
                tags: ['#myGroup'],
                kind: 'group',
                preProcessedTags: ['@group'],
            },
        ]
        expect(enrichFrames(frames)).toStrictEqual(expected)
    })
    test('test web and note frame and empty tags', () => {
        const frames = [
            {
                title: 'a',
                favIconUrl: 'a',
                url: 'https://test2.ski.com',
                tags: [],
                updatedAt: 1,
            },
            {
                id: 12,
                title: '123',
                color: 'red',
                frames: ['https://test2.ski.com/nops'],
                tags: [],
                updatedAt: 1,
            },
        ]
        const expected = [
            {
                title: 'a',
                url: 'https://test2.ski.com',
                favIconUrl: 'a',
                kind: 'web',
                domain: 'test2.ski.com',
                preProcessedTags: ['@ski', '@test2'],
                isPinned: false,
                isOpened: false,
                isSelected: false,
                tags: [],
            },
            {
                id: -1,
                title: '123',
                collapsed: false,
                color: 'red',
                frames: [],
                tags: [],
                preProcessedTags: ['@group'],
                kind: 'group',
            },
        ]
        expect(enrichFrames(frames)).toStrictEqual(expected)
    })
    test('test empty frames', () => {
        const frames: (GroupFrameData|WebFrameData)[] = []
        const expected: (GroupFrameRender|WebFrameRender)[] = []
        expect(enrichFrames(frames)).toStrictEqual(expected)
    })
})

describe('createWindows', () => {
    test('test 1', () => {

        const activeTabs = [
            {
                id: '1',
                title: 'abv',
                url: 'https://test.ski.com/abc',
                active: false,
                favIconUrl: 'url favicon',
                pinned: false,
                windowId: 12,
                groupId: -1,
                selected: false
            },
            {
                id: '2',
                title: 'newHere',
                url: 'https://test2.ski.com',
                active: false,
                favIconUrl: 'url favicon new',
                pinned: false,
                windowId: 12,
                groupId: -1,
                selected: false
            },
            {
                id: '4',
                title: 'abv',
                url: 'https://test.ski.com/pinned',
                active: false,
                favIconUrl: 'url favicon',
                pinned: true,
                windowId: 12,
                groupId: -1,
                selected: false
            },
            {
                id: '4',
                title: 'abv',
                url: 'https://test.ski.com/otherWindow',
                active: false,
                favIconUrl: 'url favicon',
                pinned: false,
                windowId: 13,
                groupId: -1,
                selected: false
            },
            {
                id: '4',
                title: 'abv',
                url: 'https://test.ski.com/otherWindow',
                active: false,
                favIconUrl: 'url favicon',
                pinned: false,
                windowId: 13,
                groupId: 1,
                selected: false
            },
        ]

        const tabGroups = [
            {
                id: 1,
                title: 'my group',
                collapsed: false,
                color: 'red',
                windowId: 12,
            },
        ]

        const frames = [
            {
                id: '1',
                title: 'a',
                url: 'https://test2.ski.com',
                favIconUrl: 'a',
                kind: 'web',
                domain: 'test2.ski.com',
                preProcessedTags: ['@ski', '@test2'],
                isPinned: false,
                isOpened: false,
                isSelected: false,
                tags: [],
            },
        ]

        const expected = [
            {
                name:  'main',
                id: 12,
                pinneds: [
                    {
                        title: 'abv',
                        url: 'https://test.ski.com/pinned',
                        domain: "test.ski.com",
                        favIconUrl: 'url favicon',
                        isOpened: true,
                        isPinned: true,
                        isSelected: false,
                        kind: "web",
                        preProcessedTags: ["@test", "@ski"],
                        tags: [],
                    },
                ],
                tabs: [
                    {
                        title: 'abv',
                        url: 'https://test.ski.com/abc',
                        domain: "test.ski.com",
                        favIconUrl: 'url favicon',
                        isOpened: true,
                        isPinned: false,
                        isSelected: false,
                        kind: "web",
                        preProcessedTags: ["@test", "@ski"],
                        tags: [],
                    },
                    {
                        title: 'a',
                        url: 'https://test2.ski.com',
                        domain: "test2.ski.com",
                        favIconUrl: 'a',
                        isOpened: false,
                        isPinned: false,
                        isSelected: false,
                        kind: "web",
                        preProcessedTags: ["@ski","@test2"],
                        tags: [],
                    },
                ],
            },
            {
                name:  'main',
                id: 13,
                pinneds: [],
                tabs: [
                    {
                        title: 'abv',
                        url: 'https://test.ski.com/otherWindow',
                        domain: "test.ski.com",
                        favIconUrl: 'url favicon',
                        isOpened: true,
                        isPinned: false,
                        isSelected: false,
                        kind: "web",
                        preProcessedTags: ["@test", "@ski"],
                        tags: [],
                    },
                    {
                        id: 1,
                        kind: "group",
                        title: 'my group',
                        collapsed: false,
                        color: 'red',
                        preProcessedTags: ["@group"],
                        tags: [],
                        frames: [
                            {
                                title: 'abv',
                                url: 'https://test.ski.com/otherWindow',
                                domain: "test.ski.com",
                                favIconUrl: 'url favicon',
                                isOpened: true,
                                isPinned: false,
                                isSelected: false,
                                kind: "web",
                                preProcessedTags: ["@test", "@ski"],
                                tags: [],
                            },
                        ]
                    },
                ],
            }
        ]
        expect(createWindows(activeTabs, tabGroups, frames)).toStrictEqual(expected)
    })
})

describe('generateTagCardinality', () => {
    test('generateTagCardinality 1', () => {
        const tags = ['#tag1', '#tag2', '#tag2']

        const expected = new Map<string, number>([
            ['#tag1', 1],
            ['#tag2', 2]
        ])
        expect(generateTagCardinality(tags)).toStrictEqual(expected)
    })
    test('generateTagCardinality 2', () => {
        const tags = ['#tag1', '#tag2', '#tag2', '#tag3']

        const expected = new Map<string, number>([
            ['#tag1', 1],
            ['#tag2', 2],
            ['#tag3', 1]
        ])
        expect(generateTagCardinality(tags)).toStrictEqual(expected)
    })
})