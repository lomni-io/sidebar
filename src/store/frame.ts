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
            const processedTags = getDomainsFromUrl(webFrame.url)
            const openTabTag = generateActiveTag(webFrame.url, tabs)
            if (openTabTag) {
                processedTags.push(openTabTag)
            }
            finalFrameList.push({
                favIconUrl: webFrame.favIconUrl,
                title: webFrame.title,
                preProcessedTags: processedTags.map((x:string) => addPreprocessedPrefix(x)).sort((x,y) => tagsCard.get(x)||0 < (tagsCard.get(y)||0) ? 1 : -1),
                tags: frame.tags,
                domain: extractRootDomain(webFrame.url),
                updatedAt: frame.updatedAt,
                url: webFrame.url,
                kind: 'url'
            })
        }

        const isNoteFrame = !!(<NoteFrameData>frame).content
        if (isNoteFrame){
            const noteFrame = (<NoteFrameData>frame)
            finalFrameList.push({
                id: noteFrame.id,
                content: noteFrame.content,
                preProcessedTags: ['@note'],
                tags: frame.tags,
                updatedAt: frame.updatedAt,
                kind: 'note'
            })
        }

        frame.tags = frame.tags.sort((x,y) => (tagsCard.get(x)||0) < (tagsCard.get(y)||0) ? 1 : -1)
    })
    return finalFrameList
}

function addPreprocessedPrefix(value: string): string{
    return '@'+value
}

export function generateActiveTag(url: string, tabs: Tab[]): string|null{
    if (tabs.some(x => x.url === url)) {
        return 'openTab'
    }
    return null
}

export function generateTagCardinality(tags: string[]){
    const count = new Map<String, number>()
    tags.forEach(i => { count.set(i, (count.get(i)||0) + 1)});
    return count
}