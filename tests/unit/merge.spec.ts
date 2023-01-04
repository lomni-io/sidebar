import {generateDiff, mergeData} from "@/components/sync-options/merge";
import {compress, decompress} from "compress-json";


describe('mergeData', () => {
    it('add one item - 1', () => {
        const localData = [
            {
                url: 'url1',
                favIconUrl: 'a',
                title: 'a',
                tags: ['#tag1'],
                updatedAt: 12
            }
        ]

        const remoteData = new Array<any>()

        const expected = {
            frames: [
                {
                    url: 'url1',
                    favIconUrl: 'a',
                    title: 'a',
                    tags: ['#tag1'],
                    updatedAt: 12
                }
            ],
            itemsAdded: [
                {
                    url: 'url1',
                    favIconUrl: 'a',
                    title: 'a',
                    tags: ['#tag1'],
                    updatedAt: 12
                }
            ],
            itemsModified: [],
            itemsRemoved: [],
            hasChanges: true,
        }

        expect(mergeData(localData, remoteData)).toStrictEqual(expected)
    })
    it('add one item - 2', () => {
        const localData = [
            {
                url: 'url1',
                favIconUrl: 'a',
                title: 'a',
                tags: ['#tag1'],
                updatedAt: 12
            }
        ]

        const remoteData = [
            {
                url: 'url2',
                favIconUrl: 'a',
                title: 'b',
                tags: ['#tag1'],
                updatedAt: 12
            }
        ]

        const expected = {
            frames: [
                {
                    url: 'url1',
                    favIconUrl: 'a',
                    title: 'a',
                    tags: ['#tag1'],
                    updatedAt: 12
                }
            ],
            itemsAdded: [
                {
                    url: 'url1',
                    favIconUrl: 'a',
                    title: 'a',
                    tags: ['#tag1'],
                    updatedAt: 12
                }
            ],
            itemsModified: [],
            itemsRemoved: [
                {
                    url: 'url2',
                    favIconUrl: 'a',
                    title: 'b',
                    tags: ['#tag1'],
                    updatedAt: 12
                }
            ],
            hasChanges: true,
        }

        expect(mergeData(localData, remoteData)).toStrictEqual(expected)
    })
    it('modify one item', () => {
        const localData = [
            {
                url: 'url1',
                favIconUrl: 'a',
                title: 'a',
                tags: ['#tag1', '#tag3'],
                updatedAt: 12
            }
        ]

        const remoteData = [
            {
                url: 'url1',
                favIconUrl: 'a',
                title: 'a',
                tags: ['#tag1', '#tag2'],
                updatedAt: 11
            },
            {
                url: 'url2',
                favIconUrl: 'a',
                title: 'b',
                tags: ['#tag1'],
                updatedAt: 12
            }
        ]

        const expected = {
            frames: [
                {
                    url: 'url1',
                    favIconUrl: 'a',
                    title: 'a',
                    tags: ['#tag1', '#tag3'],
                    updatedAt: 12
                }
            ],
            itemsAdded: [],
            itemsModified: [
                {
                    url: 'url1',
                    newComment: null,
                    newTitle: null,
                    oldComment: null,
                    oldTitle: null,
                    tagsToAdd: ['#tag3'],
                    tagsToRemove: ['#tag2'],
                }
            ],
            itemsRemoved: [
                {
                    url: 'url2',
                    favIconUrl: 'a',
                    title: 'b',
                    tags: ['#tag1'],
                    updatedAt: 12
                }
            ],
            hasChanges: true,
        }

        expect(mergeData(localData, remoteData)).toStrictEqual(expected)
    })
    it('not modify any item - 1', () => {
        const localData = [
            {
                url: 'url1',
                favIconUrl: 'a',
                title: 'a',
                tags: ['#tag1', '#tag3'],
                updatedAt: 10
            }
        ]

        const remoteData = [
            {
                url: 'url1',
                favIconUrl: 'a',
                title: 'a',
                tags: ['#tag1', '#tag2'],
                updatedAt: 12
            },
            {
                url: 'url2',
                favIconUrl: 'a',
                title: 'b',
                tags: ['#tag1'],
                updatedAt: 12
            }
        ]

        const expected = {
            frames: [
                {
                    url: 'url1',
                    favIconUrl: 'a',
                    title: 'a',
                    tags: ['#tag1', '#tag2'],
                    updatedAt: 12
                },
            ],
            itemsAdded: [],
            itemsModified: [],
            itemsRemoved: [
                {
                    url: 'url2',
                    favIconUrl: 'a',
                    title: 'b',
                    tags: ['#tag1'],
                    updatedAt: 12
                }
            ],
            hasChanges: true,
        }

        expect(mergeData(localData, remoteData)).toStrictEqual(expected)
    })
    it('not modify any item - 2', () => {
        const localData = [
            {
                url: 'url1',
                favIconUrl: 'a',
                title: 'a',
                tags: ['#tag1', '#tag3'],
                updatedAt: 12
            },
            {
                url: 'url2',
                favIconUrl: 'a',
                title: 'b',
                tags: ['#tag1'],
                updatedAt: 12
            }
        ]

        const remoteData = [
            {
                url: 'url1',
                favIconUrl: 'a',
                title: 'a',
                tags: ['#tag1', '#tag2'],
                updatedAt: 12
            },
            {
                url: 'url2',
                favIconUrl: 'a',
                title: 'b',
                tags: ['#tag1'],
                updatedAt: 12
            }
        ]

        const expected = {
            frames: [
                {
                    url: 'url1',
                    favIconUrl: 'a',
                    title: 'a',
                    tags: ['#tag1', '#tag2'],
                    updatedAt: 12
                },
                {
                    url: 'url2',
                    favIconUrl: 'a',
                    title: 'b',
                    tags: ['#tag1'],
                    updatedAt: 12
                }
            ],
            itemsAdded: [],
            itemsModified: [],
            itemsRemoved: [],
            hasChanges: false,
        }

        expect(mergeData(localData, remoteData)).toStrictEqual(expected)
    })
    it('modify one item - 1', () => {
        const localData = [
            {
                url: 'url1',
                favIconUrl: 'a',
                title: 'a',
                tags: ['#tag1', '#tag3'],
                updatedAt: 13
            },
        ]

        const remoteData = [
            {
                url: 'url1',
                favIconUrl: 'a',
                title: 'a',
                tags: ['#tag1', '#tag2'],
                updatedAt: 12
            },
            {
                url: 'url2',
                favIconUrl: 'a',
                title: 'b',
                tags: ['#tag1'],
                updatedAt: 12
            }
        ]

        const expected = {
            frames: [
                {
                    url: 'url1',
                    favIconUrl: 'a',
                    title: 'a',
                    tags: ['#tag1', '#tag3'],
                    updatedAt: 13
                },
            ],
            itemsAdded: [],
            itemsModified: [
                {
                    url: 'url1',
                    newComment: null,
                    newTitle: null,
                    oldComment: null,
                    oldTitle: null,
                    tagsToAdd: ['#tag3'],
                    tagsToRemove: ['#tag2'],
                }
            ],
            itemsRemoved: [
                {
                    url: 'url2',
                    favIconUrl: 'a',
                    title: 'b',
                    tags: ['#tag1'],
                    updatedAt: 12
                }
            ],
            hasChanges: true,
        }

        expect(mergeData(localData, remoteData)).toStrictEqual(expected)
    })
    it('add one note, remove url1', () => {
        const localData = [
            {
                id: '1',
                content: 'my content here',
                tags: ['#tag1', '#tag3'],
                updatedAt: 13
            },
        ]

        const remoteData = [
            {
                url: 'url1',
                favIconUrl: 'a',
                title: 'a',
                tags: ['#tag1', '#tag2'],
                updatedAt: 12
            },
        ]

        const expected = {
            frames: [
                {
                    id: '1',
                    content: 'my content here',
                    tags: ['#tag1', '#tag3'],
                    updatedAt: 13
                },
            ],
            itemsAdded: [
                {
                    id: '1',
                    content: 'my content here',
                    tags: ['#tag1', '#tag3'],
                    updatedAt: 13
                },
            ],
            itemsModified: [],
            itemsRemoved: [
                {
                    url: 'url1',
                    favIconUrl: 'a',
                    title: 'a',
                    tags: ['#tag1', '#tag2'],
                    updatedAt: 12
                }
            ],
            hasChanges: true,
        }

        expect(mergeData(localData, remoteData)).toStrictEqual(expected)
    })

    it('modify one note, remove other and url1', () => {
        const localData = [
            {
                id: '1',
                content: 'my content here modified',
                tags: ['#tag1', '#tag3', '#tag4'],
                updatedAt: 15
            },
        ]

        const remoteData = [
            {
                id: '1',
                content: 'my content here',
                tags: ['#tag1', '#tag3'],
                updatedAt: 13
            },
            {
                id: '2',
                content: 'remove here',
                tags: ['#tag1', '#tag3'],
                updatedAt: 13
            },
            {
                url: 'url1',
                favIconUrl: 'a',
                title: 'a',
                tags: ['#tag1', '#tag2'],
                updatedAt: 12
            },
        ]

        const expected = {
            frames: [
                {
                    id: '1',
                    content: 'my content here modified',
                    tags: ['#tag1', '#tag3', '#tag4'],
                    updatedAt: 15
                },
            ],
            itemsAdded: [],
            itemsModified: [
                {
                    oldContent: 'my content here',
                    newContent: 'my content here modified',
                    tagsToAdd: ['#tag4'],
                    tagsToRemove: [],
                }
            ],
            itemsRemoved: [
                {
                    id: '2',
                    content: 'remove here',
                    tags: ['#tag1', '#tag3'],
                    updatedAt: 13
                },
                {
                    url: 'url1',
                    favIconUrl: 'a',
                    title: 'a',
                    tags: ['#tag1', '#tag2'],
                    updatedAt: 12
                },
            ],
            hasChanges: true,
        }

        expect(mergeData(localData, remoteData)).toStrictEqual(expected)
    })

    it('modify one note', () => {
        const localData = [
            {
                id: '1',
                content: 'my content here modified',
                tags: ['#tag1', '#tag3'],
                updatedAt: 15
            },
        ]

        const remoteData = [
            {
                id: '1',
                content: 'my content here',
                tags: ['#tag1', '#tag3'],
                updatedAt: 13
            },
        ]

        const expected = {
            frames: [
                {
                    id: '1',
                    content: 'my content here modified',
                    tags: ['#tag1', '#tag3'],
                    updatedAt: 15
                },
            ],
            itemsAdded: [],
            itemsModified: [
                {
                    oldContent: 'my content here',
                    newContent: 'my content here modified',
                    tagsToAdd: [],
                    tagsToRemove: [],
                }
            ],
            itemsRemoved: [],
            hasChanges: true,
        }

        expect(mergeData(localData, remoteData)).toStrictEqual(expected)
    })

    it('modify one note, isPull', () => {
        const localData = [
            {
                id: '1',
                content: 'my content here modified',
                tags: ['#tag1', '#tag2'],
                updatedAt: 15
            },
        ]

        const remoteData = [
            {
                id: '1',
                content: 'my content here',
                tags: ['#tag1', '#tag3'],
                updatedAt: 13
            },
        ]

        const expected = {
            frames: [
                {
                    id: '1',
                    content: 'my content here',
                    tags: ['#tag1', '#tag3'],
                    updatedAt: 13
                },
            ],
            itemsAdded: [],
            itemsModified: [
                {
                    oldContent: 'my content here modified',
                    newContent: 'my content here',
                    tagsToAdd: ['#tag3'],
                    tagsToRemove: ['#tag2'],
                }
            ],
            itemsRemoved: [],
            hasChanges: true,
        }

        expect(mergeData(remoteData, localData, true)).toStrictEqual(expected)
    })

    it('modify two item - 2', () => {
        const localData = [
            {url: 'url1', tags: ['tag1', 'tag3'], updatedAt: 13, title: 'a', favIconUrl: 'a'},
            {url: 'url3', tags: ['tag1'], updatedAt: 13, title: 'b', favIconUrl: 'b'}
        ]

        const remoteData = [
            {url: 'url1', tags: ['tag1', 'tag2'], updatedAt: 12, title: 'a', favIconUrl: 'a'},
            {url: 'url2', tags: ['tag1', 'tag4'], updatedAt: 12, title: 'c', favIconUrl: 'c'}
        ]

        const expected = {
            frames: [
                {url: 'url1', tags: ['tag1', 'tag3'], updatedAt: 13, title: 'a', favIconUrl: 'a'},
                {url: 'url3', tags: ['tag1'], updatedAt: 13, title: 'b', favIconUrl: 'b'}
            ],
            itemsAdded: [
                {url: 'url3', tags: ['tag1'], updatedAt: 13, title: 'b', favIconUrl: 'b'}
            ],
            itemsModified: [
                {
                    url: 'url1',
                    newComment: null,
                    newTitle: null,
                    oldComment: null,
                    oldTitle: null,
                    tagsToAdd: ['tag3'],
                    tagsToRemove: ['tag2'],
                }
            ],
            itemsRemoved: [
                {'url': 'url2', tags: ['tag1', 'tag4'], updatedAt: 12, title: 'c', favIconUrl: 'c'}
            ],
            hasChanges: true,
        }

        expect(mergeData(localData, remoteData)).toStrictEqual(expected)
    })
})

describe('generateDiff', () => {
    it('no diff', () => {
        const fromFrame = {
            url: 'url1',
            favIconUrl: 'a',
            title: 'a',
            tags: ['#tag1', '#tag3'],
            updatedAt: 13
        }


        const toFrame = {
            url: 'url1',
            favIconUrl: 'a',
            title: 'a',
            tags: ['#tag1', '#tag3'],
            updatedAt: 13
        }

        const expected = {
            url: 'url1',
            newComment: null,
            newTitle: null,
            oldComment: null,
            oldTitle: null,
            tagsToAdd: [],
            tagsToRemove: [],
        }

        expect(generateDiff(fromFrame, toFrame)).toStrictEqual(expected)
    })
    it('old title diff', () => {

        const fromFrame = {
            url: 'url1',
            favIconUrl: 'a',
            title: 'new title',
            tags: ['#tag1', '#tag3'],
            updatedAt: 13
        }


        const toFrame = {
            url: 'url1',
            favIconUrl: 'a',
            title: '',
            tags: ['#tag1', '#tag3'],
            updatedAt: 13
        }

        const expected = {
            url: 'url1',
            newComment: null,
            newTitle: 'new title',
            oldComment: null,
            oldTitle: null,
            tagsToAdd: [],
            tagsToRemove: [],
        }

        expect(generateDiff(fromFrame, toFrame)).toStrictEqual(expected)
    })
    it('new title diff', () => {

        const fromFrame = {
            url: 'url1',
            favIconUrl: 'a',
            title: 'new title',
            tags: ['#tag1', '#tag3'],
            updatedAt: 13
        }


        const toFrame = {
            url: 'url1',
            favIconUrl: 'a',
            title: 'old title',
            tags: ['#tag1', '#tag3'],
            updatedAt: 13
        }

        const expected = {
            url: 'url1',
            newComment: null,
            newTitle: 'new title',
            oldComment: null,
            oldTitle: 'old title',
            tagsToAdd: [],
            tagsToRemove: [],
        }

        expect(generateDiff(fromFrame, toFrame)).toStrictEqual(expected)
    })
    it('new comment diff', () => {

        const fromFrame = {
            url: 'url1',
            favIconUrl: 'a',
            title: 'new title',
            comment:  'new comment',
            tags: ['#tag1', '#tag3'],
            updatedAt: 13
        }

        const toFrame = {
            url: 'url1',
            favIconUrl: 'a',
            title: 'old title',
            tags: ['#tag1', '#tag3'],
            comment: 'old comment',
            updatedAt: 13
        }

        const expected = {
            url: 'url1',
            newComment: 'new comment',
            newTitle: 'new title',
            oldComment: 'old comment',
            oldTitle: 'old title',
            tagsToAdd: [],
            tagsToRemove: [],
        }

        expect(generateDiff(fromFrame, toFrame)).toStrictEqual(expected)
    })
    it('new tags', () => {

        const fromFrame = {
            url: 'url1',
            favIconUrl: 'a',
            title: 'new title',
            comment:  'new comment',
            tags: ['#tag1'],
            updatedAt: 13
        }

        const toFrame = {
            url: 'url1',
            favIconUrl: 'a',
            title: 'old title',
            tags: [],
            comment: 'old comment',
            updatedAt: 13
        }

        const expected = {
            url: 'url1',
            newComment: 'new comment',
            newTitle: 'new title',
            oldComment: 'old comment',
            oldTitle: 'old title',
            tagsToAdd: ['#tag1'],
            tagsToRemove: [],
        }

        expect(generateDiff(fromFrame, toFrame)).toStrictEqual(expected)
    })

    it('tags to remove', () => {
        const fromFrame = {
            url: 'url1',
            favIconUrl: 'a',
            comment:  'new comment',
            title: 'new title',
            tags: [],
            kind: 'url',
            preProcessedTags: [],
            updatedAt: 12
        }

        const toFrame = {
            url: 'url1',
            favIconUrl: 'a',
            title: 'old title',
            comment: 'old comment',
            tags: ['#tag1'],
            kind: 'url',
            preProcessedTags: [],
            updatedAt: 12
        }

        const expected = {
            url: 'url1',
            newComment: 'new comment',
            newTitle: 'new title',
            oldComment: 'old comment',
            oldTitle: 'old title',
            tagsToAdd: [],
            tagsToRemove: ['#tag1'],
        }

        expect(generateDiff(fromFrame, toFrame)).toStrictEqual(expected)
    })

    it('tags to remove and add', () => {
        const fromFrame = {
            url: 'url1',
            favIconUrl: 'a',
            kind: 'url',
            comment:  'new comment',
            title: 'new title',
            tags: ['#tag3','#tag1'],
            preProcessedTags: [],
            updatedAt: 12
        }

        const toFrame = {
            url: 'url1',
            favIconUrl: 'a',
            kind: 'url',
            title: 'old title',
            comment: 'old comment',
            tags: ['#tag1', '#tag2'],
            preProcessedTags: [],
            updatedAt: 12
        }

        const expected = {
            url: 'url1',
            newComment: 'new comment',
            newTitle: 'new title',
            oldComment: 'old comment',
            oldTitle: 'old title',
            tagsToAdd: ['#tag3'],
            tagsToRemove: ['#tag2'],
        }

        expect(generateDiff(fromFrame, toFrame)).toStrictEqual(expected)
    })
})

describe('compress', () => {
    it('test', () => {
        const a = [{'hello': 'world'}]
        const aCompr = compress(a)
        const aStr = JSON.stringify(aCompr)
        const aPars = JSON.parse(aStr)
        const aDec = decompress(aPars)
        expect(JSON.stringify(a) === JSON.stringify(aDec)).toBe(true)
    })
})