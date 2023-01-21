import {
    createTags,
    createWindows,
    enrichFrames,
    filterFramesBySelection,
    framesFiltered,
    framesSort,
    generateTagCardinality,
    getSuggestedFrames,
    GroupFrameRender,
    SimpleWeFrame,
    WebFrameData,
    WebFrameRender,
    WebTaggeable
} from "@/store/renderData";
import {FrameRender} from "@/entity/frame";

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
                groupId: -1,
                index: -1,
                windowId: -1,
                id: '',
                kind: 'web',
                domain: 'test2.ski.com',
                preProcessedTags: ['@ski', '@test2'],
                tags: ['#ski2023'],
                isPinned: false,
                audible: false,
                isOpened: false,
                isSelected: false,
            },
            {
                title: 'a',
                id: '',
                url: 'https://test.ski.com/abc',
                groupId: -1,
                index: -1,
                windowId: -1,
                favIconUrl: 'a',
                kind: 'web',
                domain: 'test.ski.com',
                preProcessedTags: ['@ski', '@test'],
                tags: ['#ski2023', '#24k', '#abcc'],
                isPinned: false,
                audible: false,
                isOpened: false,
                isSelected: false,
            },
            {
                title: 'a',
                id: '',
                groupId: -1,
                index: -1,
                windowId: -1,
                url: 'https://test2.ski.com/abc2',
                favIconUrl: 'a',
                kind: 'web',
                domain: 'test2.ski.com',
                preProcessedTags: ['@ski', '@test2'],
                tags: ['#ski2023', '#24k'],
                isPinned: false,
                audible: false,
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
                index: 1,
                title: 'abv',
                url: 'https://test.ski.com/abc',
                active: false,
                audible: false,
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
                groupId: -1,
                index: -1,
                windowId: -1,
                id: '',
                url: 'https://test2.ski.com',
                favIconUrl: 'a',
                kind: 'web',
                domain: 'test2.ski.com',
                preProcessedTags: ['@ski', '@test2'],
                tags: ['#ski2023'],
                isPinned: false,
                audible: false,
                isOpened: false,
                isSelected: false,
            },
            {
                title: 'a',
                groupId: -1,
                index: 1,
                windowId: 12,
                id: '12',
                url: 'https://test.ski.com/abc',
                favIconUrl: 'a',
                kind: 'web',
                domain: 'test.ski.com',
                preProcessedTags: ['@ski', '@test'],
                tags: ['#ski2023', '#abcc', '#24k'],
                isPinned: false,
                audible: false,
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
                index: 1,
                audible: false,
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
                index: 2,
                title: 'newHere',
                url: 'https://test.ski.com/newHere',
                active: false,
                audible: false,
                favIconUrl: 'url favicon new',
                pinned: false,
                windowId: 12,
                groupId: -1,
                selected: false
            },
            {
                id: '4',
                index: 3,
                title: 'not show this one',
                url: '',
                active: false,
                audible: false,
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
                groupId: -1,
                index: -1,
                windowId: -1,
                id: '',
                url: 'https://test2.ski.com',
                favIconUrl: 'a',
                kind: 'web',
                domain: 'test2.ski.com',
                preProcessedTags: ['@ski', '@test2'],
                tags: ['#ski2023'],
                isPinned: false,
                audible: false,
                isOpened: false,
                isSelected: false,
            },
            {
                title: 'a',
                groupId: -1,
                index: 1,
                windowId: 12,
                id: '1',
                url: 'https://test.ski.com/abc',
                favIconUrl: 'a',
                kind: 'web',
                domain: 'test.ski.com',
                preProcessedTags: ['@ski', '@test'],
                tags: ['#ski2023', '#abcc', '#24k'],
                isPinned: false,
                audible: false,
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
        ]
        const expected = [
            {
                title: 'a',
                groupId: -1,
                index: -1,
                windowId: -1,
                id: '',
                url: 'https://test2.ski.com',
                favIconUrl: 'a',
                kind: 'web',
                domain: 'test2.ski.com',
                isPinned: false,
                isOpened: false,
                isSelected: false,
                audible: false,
                preProcessedTags: ['@ski', '@test2'],
                tags: ['#ski2023'],
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
        ]
        const expected = [
            {
                title: 'a',
                id: '',
                groupId: -1,
                index: -1,
                windowId: -1,
                url: 'https://test2.ski.com',
                favIconUrl: 'a',
                kind: 'web',
                domain: 'test2.ski.com',
                preProcessedTags: ['@ski', '@test2'],
                isPinned: false,
                audible: false,
                isOpened: false,
                isSelected: false,
                tags: [],
            },
        ]
        expect(enrichFrames(frames)).toStrictEqual(expected)
    })
    test('test empty frames', () => {
        const frames: WebFrameData[] = []
        const expected: (GroupFrameRender|WebFrameRender)[] = []
        expect(enrichFrames(frames)).toStrictEqual(expected)
    })
})

describe('createWindows', () => {
    test('test 1', () => {

        const activeTabs = [
            {
                id: '1',
                index: 1,
                title: 'abv',
                url: 'https://test.ski.com/abc',
                active: false,
                audible: true,
                favIconUrl: 'url favicon',
                pinned: false,
                windowId: 12,
                groupId: -1,
                selected: false
            },
            {
                id: '2',
                index: 2,
                title: 'newHere',
                url: 'https://test2.ski.com',
                active: false,
                audible: false,
                favIconUrl: 'favicon testing here',
                pinned: false,
                windowId: 12,
                groupId: -1,
                selected: false
            },
            {
                id: '4',
                index: 3,
                title: 'abv',
                url: 'https://test.ski.com/pinned',
                active: false,
                audible: false,
                favIconUrl: 'url favicon',
                pinned: true,
                windowId: 12,
                groupId: -1,
                selected: false
            },
            {
                id: '4',
                index: 4,
                title: 'abv',
                url: 'https://test.ski.com/otherWindow',
                active: false,
                audible: false,
                favIconUrl: 'url favicon',
                pinned: false,
                windowId: 13,
                groupId: -1,
                selected: false
            },
            {
                id: '4',
                index: 1,
                title: 'abv',
                url: 'https://test.ski.com/otherWindow',
                audible: false,
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

        const framesRender = [
            {
                url: 'https://test2.ski.com',
                tags: ['#myTag'],
            },
        ]

        const expected = [
            {
                name:  'main',
                id: 12,
                pinneds: [
                    {
                        title: 'abv',
                        id: "4",
                        groupId: -1,
                        index: 3,
                        windowId: 12,
                        url: 'https://test.ski.com/pinned',
                        audible: false,
                        active: false,
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
                        active: false,
                        audible: true,
                        id: "1",
                        groupId: -1,
                        index: 1,
                        windowId: 12,
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
                        active: false,
                        audible: false,
                        id: "1",
                        groupId: 5,
                        index: 1,
                        windowId: 1,
                        domain: "test2.ski.com",
                        favIconUrl: 'favicon testing here',
                        isOpened: false,
                        isPinned: false,
                        isSelected: false,
                        kind: "web",
                        preProcessedTags: ["@ski","@test2"],
                        tags: ['#myTag'],
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
                        groupId: -1,
                        index: 4,
                        windowId: 13,
                        url: 'https://test.ski.com/otherWindow',
                        id: "4",
                        domain: "test.ski.com",
                        favIconUrl: 'url favicon',
                        isOpened: true,
                        active: false,
                        audible: false,
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
                                id: "4",
                                groupId: 1,
                                index: 1,
                                windowId: 13,
                                url: 'https://test.ski.com/otherWindow',
                                domain: "test.ski.com",
                                favIconUrl: 'url favicon',
                                isOpened: true,
                                active: false,
                                audible: false,
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
        expect(createWindows(activeTabs, tabGroups, framesRender, [])).toStrictEqual(expected)
    })

    test('frame with tags inside a group', () => {

        const activeTabs = [
            {
                id: '1',
                index: 1,
                title: 'abv',
                url: 'https://test.ski.com/abc',
                active: false,
                audible: true,
                favIconUrl: 'url favicon',
                pinned: false,
                windowId: 12,
                groupId: 1,
                selected: false
            },
            {
                id: '2',
                index: 2,
                title: 'newHere',
                url: 'https://test2.ski.com',
                active: false,
                audible: false,
                favIconUrl: 'url favicon new again',
                pinned: false,
                windowId: 12,
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

        const groupsData = [
            {
                title: 'other title',
                color: 'blue',
                tags: [],
                preProcessedTags: []
            },
            {
                title: 'my group',
                color: 'yellow',
                tags: ['#myTag'],
                preProcessedTags: []
            }
        ]

        const framesRender = [
            {
                url: 'https://test2.ski.com',
                tags: ['#myTag'],
            },
            {
                url: 'https://test.ski.com/abc',//
                tags: ['#otherTag'],
            },
            {
                url: 'https://test.ski.com/notOpenedButHasTo',
                tags: ['#myTag'],
            },
        ]

        const expected = [
            {
                name:  'main',
                pinneds: [],
                id: 12,
                tabs: [
                    {
                        id: 1,
                        kind: "group",
                        title: 'my group',
                        collapsed: false,
                        color: 'yellow',
                        preProcessedTags: ["@group"],
                        tags: ['#myTag'],
                        frames: [
                            {
                                title: 'abv',
                                url: 'https://test.ski.com/abc',
                                domain: "test.ski.com",
                                active: false,
                                audible: true,
                                id: "1",
                                groupId: 1,
                                index: 1,
                                windowId: 12,
                                favIconUrl: 'url favicon',
                                isOpened: true,
                                isPinned: false,
                                isSelected: false,
                                kind: "web",
                                suggestedTags: ['#myTag'],
                                preProcessedTags: ["@test", "@ski"],
                                tags: ['#otherTag'],
                            },
                            {
                                title: 'newHere',
                                url: 'https://test2.ski.com',
                                active: false,
                                audible: false,
                                id: "2",
                                groupId: 1,
                                index: 2,
                                windowId: 12,
                                domain: "test2.ski.com",
                                favIconUrl: 'url favicon new again',
                                isOpened: true,
                                isPinned: false,
                                isSelected: false,
                                kind: "web",
                                suggestedTags: [],
                                preProcessedTags: ["@test2", "@ski"],
                                tags: ['#myTag'],
                            },
                        ],
                        suggestedFrames: [
                            {tags: ['#myTag'], url: "https://test.ski.com/notOpenedButHasTo"}
                        ]
                    },
                ],
            }
        ]
        expect(createWindows(activeTabs, tabGroups, framesRender, groupsData)).toStrictEqual(expected)
    })
})

describe('getSuggestedFrames', () => {
    test('test 1', () => {
        const frames = [
            {url: 'url1', title: 'hello',  favIconUrl: 'fav1', tags: ['#tag1']},
            {url: 'url2', title: 'hello closed',  favIconUrl: 'fav2', tags: ['#tag1']}
        ]

        const openTab = [
            {
                url: 'url1',
                groupId: 1,
            }
        ]

        const openGroups = [
            {
                id: 1,
                title: 'my title'
            }
        ]


        const savedGroupData = {
            tags: ['#tag1'],
            title:  'my title',
        }

        const expected = [
            {url: 'url2', title: 'hello closed',  favIconUrl: 'fav2', tags: ['#tag1']}
        ]
        expect(getSuggestedFrames(frames, openTab, openGroups, savedGroupData)).toStrictEqual(expected)
    })

    test('test 2', () => {
        const frames = [
            {url: 'url1', title: 'hello',  favIconUrl: 'fav1', tags: ['#tag1']},
            {url: 'url2', title: 'hello closed',  favIconUrl: 'fav2', tags: ['#tag1']},
            {url: 'url3', title: 'hello closed2',  favIconUrl: 'fav3', tags: ['#tag2']}
        ]

        const openTab = [
            {
                url: 'url1',
                groupId: 1,
            }
        ]

        const openGroups = [
            {
                id: 1,
                title: 'my title'
            }
        ]


        const savedGroupData = {
            tags: ['#tag1'],
            title:  'my title',
        }

        const expected = [
            {url: 'url2', title: 'hello closed',  favIconUrl: 'fav2', tags: ['#tag1']}
        ]
        expect(getSuggestedFrames(frames, openTab, openGroups, savedGroupData)).toStrictEqual(expected)
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

describe('createTags', () => {
    it('test_1', () => {
        const frames = [
            {tags: ['#tag1', '#tag3'], preProcessedTags: []}
        ]

        const selectedTags: string[] = []

        const expected = [
            {name: '#tag1', kind: 'tag', count: 1},
            {name: '#tag3', kind: 'tag', count: 1}
        ]

        expect(createTags(frames,selectedTags)).toStrictEqual(expected)
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

        expect(createTags(frames,selectedTags)).toStrictEqual(expected)
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

        expect(createTags(frames,selectedTags)).toStrictEqual(expected)
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

        expect(createTags(frames,selectedTags)).toStrictEqual(expected)
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

        expect(createTags(frames,selectedTags)).toStrictEqual(expected)
    })
})


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
})