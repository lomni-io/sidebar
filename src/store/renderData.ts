import {extractRootDomain, getDomainsFromUrl} from "@/components/url";
import {FrameRender} from "@/entity/frame";

export interface RenderData {
    search: string[]
    tags: Tag[]
    windows: Window[]
    frames: WebFrameRender[]
}

export interface Tag {
    name:  string
    count: number
    kind: string
}

export interface Tab{
    id: string
    index: number
    url: string
    active: boolean,
    title: string,
    favIconUrl: string
    pinned: boolean
    windowId: number
    selected: boolean
    groupId: number
}

export interface TabGroup{
    id: number
    windowId: number
    title: string
    collapsed: boolean
    color: string
}

export interface Window {
    name:  string
    id: number
    pinneds: WebFrameRender[]
    tabs: (GroupFrameRender|WebFrameRender)[]
}

export interface WebFrameData{
    url:   string
    title: string
    favIconUrl: string
    tags: string[]
    updatedAt: number
}

export interface GroupFrameRender {
    id: number
    title:  string
    color: string
    collapsed: boolean
    frames: WebFrameRender[]
    tags: string[]
    preProcessedTags: string[]
    kind: string
}

export interface SearchPinned {
    isDefault: boolean
    title:  string
    color: string
    frames: WebFrameRender[]
}

export interface WebFrameRender {
    id: string
    windowId: number
    groupId: number
    index: number
    url: string
    favIconUrl: string
    title: string
    tags: string[]
    domain: string
    preProcessedTags: string[]
    isPinned: boolean
    isOpened: boolean
    isSelected: boolean
    kind: string
}

export function createRenderData(framesData: WebFrameData[], tabs: Tab[], tabGroups:TabGroup[], searchInput: string[]): RenderData{
    const enriched = enrichFrames(framesData, tabs)
    return {
        search: searchInput,
        tags: createTags(enriched, searchInput),
        windows: createWindows(tabs, tabGroups, enriched),
        frames: framesFiltered(enriched, searchInput) as WebFrameRender[]
    }
}

export interface Taggeable {
    tags: string[]
    preProcessedTags: string[]
}

export function createTags(framesData: Taggeable[], searchTags: string[] = []): Tag[]{
    let finalList: Tag[] = []

    const framesFiltered = filterFramesBySelection(framesData, searchTags)

    framesFiltered.forEach(frame => {

        frame.tags.forEach(tag => {

            // remove if tag is on selected
            if (searchTags.includes(tag)) {
                return;
            }

            const tagIdx = finalList.findIndex(x => x.name === tag)
            if (tagIdx === -1) {
                finalList.push({name: tag, count: 1, kind: 'tag'})
            }else {
                finalList[tagIdx].count++
            }
        })
        frame.preProcessedTags.forEach(tag => {

            // remove if tag is on selected
            if (searchTags.includes(tag)) {
                return;
            }

            const tagIdx = finalList.findIndex(x => x.name === tag)
            if (tagIdx === -1) {
                finalList.push({name: tag, count: 1, kind: 'preProcessed'})
            }else {
                finalList[tagIdx].count++
            }
        })
    })

    // filter items that not bring less results
    if (searchTags.length > 0){
        finalList = finalList.filter(item => {
            return item.count < framesFiltered.length
        })
    }

    return finalList.sort((x,y) => x.count > y.count ? -1 : 1)
}

export function createWindows(tabs: Tab[], tabGroups: TabGroup[], framesRendered: (GroupFrameRender|WebFrameRender)[]): Window[]{
    const windows: Window[] = []
    tabs.forEach(tab => {
        let window = windows.find(w => w.id === tab.windowId)
        if (!window){
            window = {
                name: 'main',
                id: tab.windowId,
                pinneds: [],
                tabs: []
            }
            windows.push(window)
        }

        if (tab.pinned){
            window.pinneds.push(mountWebFrame(tab, framesRendered))
            return
        }
        if (tab.groupId === -1){
            window.tabs.push(mountWebFrame(tab, framesRendered))
        }

        const tabGroup = tabGroups.find(tabGroup => tabGroup.id === tab.groupId)
        if (tabGroup){
            const groupRender = window.tabs.find(wTab => (<GroupFrameRender>wTab).id === tab.groupId) as GroupFrameRender
            if (groupRender){
                groupRender.frames.push(mountWebFrame(tab, framesRendered))
            }else{
                window.tabs.push({
                    id: tab.groupId,
                    title:  tabGroup.title,
                    color: tabGroup.color,
                    collapsed: tabGroup.collapsed,
                    frames: [mountWebFrame(tab, framesRendered)],
                    tags: [],
                    preProcessedTags: ['@group'],
                    kind: 'group',
                })
            }
        }
    })

    return windows
}

export function enrichFrames(framesData: WebFrameData[], tabs: Tab[] = []): WebFrameRender[]{

    if (framesData.length === 0){
        return []
    }
    const finalWebFrames: WebFrameRender[] = []

    const tags = framesData.map(frame => frame.tags).reduce((acc, val) => {
        acc = acc.concat(val)
        return acc
    });
    const tagsCard = generateTagCardinality(tags)

    framesData.forEach(frame => {
        const isWebFrame = !!(<WebFrameData>frame).url
        if (isWebFrame){
            const webFrame = (<WebFrameData>frame)

            const processedTags = getDomainsFromUrl(webFrame.url).map((x:string) => '@'+ x).sort((x,y) => tagsCard.get(x)||0 < (tagsCard.get(y)||0) ? 1 : -1)

            const tab = tabs.find(tab => tab.url === webFrame.url)

            finalWebFrames.push({
                id: tab ? tab.id : '',
                index: tab ? tab.index : -1,
                groupId: tab ? tab.groupId : -1,
                windowId: tab ? tab.windowId : -1,
                favIconUrl: webFrame.favIconUrl,
                title: webFrame.title,
                preProcessedTags: processedTags,
                tags: frame.tags,
                domain: extractRootDomain(webFrame.url),
                url: webFrame.url,
                isPinned: tab ? tab.pinned : false,
                isSelected: tab ? tab.selected : false,
                isOpened: !!tab,
                kind: 'web',
            })

        }

        frame.tags = frame.tags.sort((x,y) => (tagsCard.get(x)||0) < (tagsCard.get(y)||0) ? 1 : -1)
    })

    return finalWebFrames
}

export function mountWebFrames(urls:string[], webFrames: WebFrameRender[]): WebFrameRender[]{
    const finalWebFrames: WebFrameRender[] = []
    urls.forEach(url => {
        const webFrame = webFrames.find(frame => frame.url === url)
        if (webFrame){
            finalWebFrames.push(webFrame)
        }
    })
    return finalWebFrames
}

export function mountWebFrame(tab:Tab, webFrames: (GroupFrameRender|WebFrameRender)[]): WebFrameRender{
    const webFrame = webFrames.find(frame => (<WebFrameRender>frame).url === tab.url)
    if (webFrame){
        return (<WebFrameRender>webFrame)
    }
    return {
        id: tab.id,
        windowId: tab ? tab.windowId : -1,
        groupId: tab ? tab.groupId : -1,
        index: tab ? tab.index : -1,
        url: tab.url,
        favIconUrl: tab.favIconUrl,
        title: tab.title,
        tags: [],
        domain: extractRootDomain(tab.url),
        preProcessedTags: getDomainsFromUrl(tab.url).map((x:string) => '@'+ x),
        isPinned: tab.pinned,
        isOpened: true,
        isSelected: tab.selected,
        kind: 'web'
    }
}

export function generateTagCardinality(tags: string[]){
    const count = new Map<String, number>()
    tags.forEach(i => { count.set(i, (count.get(i)||0) + 1)});
    return count
}

interface FrameWithTags {
    tags: string[]
    preProcessedTags: string[]
}

export function filterFramesBySelection(frames: FrameWithTags[], tags: string[]): FrameWithTags[] {
    const tagsHash = tags.filter(x => x.startsWith("#"))
    const tagsAt = tags.filter(x => x.startsWith("@"))
    return frames = frames.filter(frame => {
        const hasTagAt = tagsAt.length > 0 ? tagsAt.every(tag => frame.preProcessedTags.includes(tag)) : true
        const hasTagHash = tagsHash.length > 0 ? tagsHash.every(tag => frame.tags.includes(tag)) : true
        return hasTagAt && hasTagHash
    })
}

export function framesFiltered(frames: FrameWithTags[], tags: string[]): FrameWithTags[]{
    if (tags.length > 0) {
        frames = frames.filter(frame => tags.every(
            tag => frame.tags.includes(tag) || frame.preProcessedTags.includes(tag)
        ))
    }

    return framesSort(frames)
}

export function framesSort(frames: FrameWithTags[]): FrameWithTags[]{
    return frames.sort((x,y) => {
        const tagLength = x.tags.length > y.tags.length
        return tagLength ? 1 : -1
    })
}