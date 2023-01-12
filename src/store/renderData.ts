import {extractRootDomain, getDomainsFromUrl} from "@/components/url";

export interface RenderData {
    search: string[]
    tags: Tag[]
    windows: Window[]
    frames: (GroupFrameRender|WebFrameRender)[]
}

export interface Tag {
    name:  string
    count: number
    kind: string
}

export interface Tab{
    id: string
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

export interface GroupFrameData {
    title:  string
    color: string
    frames: string[] // only URL
    tags: string[]
    updatedAt: number
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

export interface WebFrameRender {
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

export function createRenderData(framesData: (GroupFrameData|WebFrameData)[], tabs: Tab[], tabGroups:TabGroup[], searchInput: string[]): RenderData{
    const enriched = enrichFrames(framesData, tabs)
    return {
        search: searchInput,
        tags: createTags(enriched),
        windows: createWindows(tabs, tabGroups, enriched),
        frames: enriched
    }
}

export interface Taggeable {
    tags: string[]
    preProcessedTags: string[]
}

export function createTags(framesData: Taggeable[]): Tag[]{
    const finalList: Tag[] = []

    framesData.forEach(frame => {

        frame.tags.forEach(tag => {

            const tagIdx = finalList.findIndex(x => x.name === tag)
            if (tagIdx === -1) {
                finalList.push({name: tag, count: 1, kind: 'tag'})
            }else {
                finalList[tagIdx].count++
            }
        })
        frame.preProcessedTags.forEach(tag => {
            const tagIdx = finalList.findIndex(x => x.name === tag)
            if (tagIdx === -1) {
                finalList.push({name: tag, count: 1, kind: 'preProcessed'})
            }else {
                finalList[tagIdx].count++
            }
        })
    })

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

export function enrichFrames(framesData: (GroupFrameData|WebFrameData)[], tabs: Tab[] = []): (GroupFrameRender|WebFrameRender)[]{

    if (framesData.length === 0){
        return []
    }

    const finalGroupFrames: GroupFrameRender[] = []
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

    framesData.forEach(frame => {
        const isGroupFrame = !!(<GroupFrameData>frame).color
        if (isGroupFrame){
            const groupFrame = (<GroupFrameData>frame)

            finalGroupFrames.push({
                id: -1,
                collapsed: false,
                title: groupFrame.title,
                color: groupFrame.color,
                preProcessedTags: ['@group'],
                tags: frame.tags,
                kind: 'group',
                frames: mountWebFrames(groupFrame.frames, finalWebFrames)
            })
        }

        frame.tags = frame.tags.sort((x,y) => (tagsCard.get(x)||0) < (tagsCard.get(y)||0) ? 1 : -1)
    })

    const finalFrames: (GroupFrameRender|WebFrameRender)[] = []
    finalFrames.push(...finalWebFrames)
    finalFrames.push(...finalGroupFrames)

    return finalFrames
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