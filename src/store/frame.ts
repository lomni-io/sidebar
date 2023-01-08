// eslint-disable-next-line no-unused-vars
import {extractRootDomain, getDomainsFromUrl} from "@/components/url";
import {addHashTag} from "@/components/search-tab/filters";
import {FrameRender, FramesData, NoteFrameData, WebFrameData} from "@/entity/frame";
import {Tab} from "@/store/entity";

export function enrichFrames(frames : FramesData, tabs: Tab[] = []): FrameRender[]{
    const finalFrameList = new Array<FrameRender>()
    if (frames.length === 0){
        return []
    }
    const tags = frames.map(frame => frame.tags).reduce((acc, val) => {
        acc = acc.concat(val)
        return acc
    });
    const tagsCard = generateTagCardinality(tags)
    frames.forEach(frame => {
        const isWebFrame = !!(<WebFrameData>frame).url
        if (isWebFrame){
            const webFrame = (<WebFrameData>frame)

            let processedTags = getDomainsFromUrl(webFrame.url).map((x:string) => addPreprocessedPrefix(x)).sort((x,y) => tagsCard.get(x)||0 < (tagsCard.get(y)||0) ? 1 : -1)

            const openTabTag = generateActiveTag(webFrame.url, tabs)
            if (openTabTag) {
                processedTags = [openTabTag, ...processedTags]
            }
            if (frame.tags.length === 0){
                processedTags = ['@emptyTags', ...processedTags]
            }

            finalFrameList.push({
                favIconUrl: webFrame.favIconUrl,
                title: webFrame.title,
                preProcessedTags: processedTags,
                tags: frame.tags,
                domain: extractRootDomain(webFrame.url),
                updatedAt: frame.updatedAt,
                url: webFrame.url,
                kind: 'url',
            })
        }

        const isNoteFrame = !!(<NoteFrameData>frame).content
        if (isNoteFrame){
            const noteFrame = (<NoteFrameData>frame)

            let processedTags = ['@note']
            if (noteFrame.tags.length === 0){
                processedTags = ['@emptyTags', ...processedTags]
            }
            finalFrameList.push({
                id: noteFrame.id,
                content: noteFrame.content,
                preProcessedTags: processedTags,
                tags: frame.tags,
                updatedAt: frame.updatedAt,
                kind: 'note',
            })
        }

        frame.tags = frame.tags.sort((x,y) => (tagsCard.get(x)||0) < (tagsCard.get(y)||0) ? 1 : -1)
    })

    tabs.filter(tab => tab.url && !frames.some(frame => (<WebFrameData>frame).url === tab.url)).forEach(notAddedTab => {
        const processedTags = getDomainsFromUrl(notAddedTab.url).map((x:string) => addPreprocessedPrefix(x)).sort((x,y) => tagsCard.get(x)||0 < (tagsCard.get(y)||0) ? 1 : -1)

        const finalTags = ['@openTab', '@newTab']
        finalTags.push(...processedTags)

        finalFrameList.push({
            favIconUrl: notAddedTab.favIconUrl,
            title: notAddedTab.title,
            preProcessedTags: finalTags,
            tags: [],
            domain: extractRootDomain(notAddedTab.url),
            updatedAt: 0,
            url: notAddedTab.url,
            kind: 'url',
        })
    })

    return finalFrameList
}

function addPreprocessedPrefix(value: string): string{
    return '@'+value
}

export function generateActiveTag(url: string, tabs: Tab[]): string|null{
    if (tabs.some(x => x.url === url)) {
        return '@openTab'
    }
    return null
}

export function generateTagCardinality(tags: string[]){
    const count = new Map<String, number>()
    tags.forEach(i => { count.set(i, (count.get(i)||0) + 1)});
    return count
}