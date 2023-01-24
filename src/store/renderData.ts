import {extractRootDomain, getDomainsFromUrl} from "@/components/url";

export interface RenderData {
    search: string[]
    tabs: Tab[]
    tags: Tag[]
    windows: Window[]
    frames: WebFrameRender[]
    groupsData: GroupRender[]
}

// TODO: create a migrate folder to help on that
// migrate will get the default frames and put inside default folder
export interface BookmarkNode {
    id: string
    title: string
    index: number
    parentId: string
    url: string|null // when null is a folder
}

export interface BookmarkTreeNode {
    children: BookmarkTreeNode[]
    id: string
    parentId: string
    index: number
    title: string
    url: string
}

export interface BookmarkTreeNodeRender {
    children: BookmarkTreeNode[]
    id: string
    parentId: string
    index: number
    title: string
    titleRaw: string
    url: string
    favIconUrl?: string
    editable: boolean
    tags: string[]
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
    audible: boolean
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

export interface TraceGroupFrameData {
    id: string
    tags: string[]
    frames: TraceWebFrameData[]
}

export interface TraceWebFrameData {
    url:   string
    title: string
    favIconUrl: string
}

export interface WebFrameData{
    url:   string
    title: string
    tags: string[]
}

export interface GroupFrameRender {
    id: number
    title:  string
    color: string
    collapsed: boolean
    frames: WebFrameRender[]
    suggestedFrames: WebTaggeable[]
    tags: string[]
    preProcessedTags: string[]
    kind: string
}

export interface GroupRender {
    title: string
    color: string
    tags: string[]
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
    audible: boolean
    preProcessedTags: string[]
    suggestedTags?: string[]
    isPinned: boolean
    isOpened: boolean
    isSelected: boolean
    active: boolean
    kind: string
}

export interface BookmarkWindow {
    treeNode: BookmarkTreeNodeRender[]
}


export function createBookmarkWindow(treeNode: BookmarkTreeNode): BookmarkWindow{
    return {
        treeNode: treeNode.id === '0' ? transformTreeNode(treeNode.children) : []
    }
}

export const transformTreeNode = (nodes: BookmarkTreeNode[]): BookmarkTreeNodeRender[] => {
    const newNodes: BookmarkTreeNodeRender[] = []
    nodes.forEach(n => {
        const titleAndTags = extractTitleAndTags(n.title)
        if (n.children && n.children.length > 0){
            newNodes.push({
                children: transformTreeNode(n.children),
                id: n.id,
                parentId: n.parentId,
                index: n.index,
                title: titleAndTags.title,
                titleRaw: n.title,
                url: n.url,
                editable: n.parentId !== '0' && n.id !== '0',
                tags: titleAndTags.tags
            })
        }else{
            newNodes.push({
                children: [] as BookmarkTreeNodeRender[],
                parentId: n.parentId,
                id: n.id,
                index: n.index,
                title: titleAndTags.title,
                titleRaw: n.title,
                url: n.url,
                favIconUrl: getFavicon(n.url),
                editable: true,
                tags: titleAndTags.tags
            })
        }

    })
    return newNodes
}

export function createRenderData(bookmarks: BookmarkNode[], tabs: Tab[], tabGroups:TabGroup[], searchInput: string[]): RenderData{
    const webFrames = getFrames(bookmarks)
    const groups = getGroups(bookmarks)
    const enriched = enrichFrames(webFrames, tabs)

    return {
        tabs: tabs,
        search: searchInput,
        tags: createTags(enriched, searchInput),
        windows: createWindows(tabs, tabGroups, webFrames, groups),
        frames: enriched as WebFrameRender[],
        groupsData: groups,
    }
}

export interface Taggeable {
    tags: string[]
    preProcessedTags: string[]
}


export interface WebTaggeable {
    url: string
    tags: string[]
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

export function createWindows(tabs: Tab[], tabGroups: TabGroup[], webData: WebTaggeable[], groupsData: GroupRender[]): Window[]{
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
            window.pinneds.push(mountWebFrame(tab, webData))
            return
        }
        if (tab.groupId === -1){
            window.tabs.push(mountWebFrame(tab, webData))
        }

        const tabGroup = tabGroups.find(tabGroup => tabGroup.id === tab.groupId)
        if (tabGroup){
            const groupRender = window.tabs.find(wTab => (<GroupFrameRender>wTab).id === tab.groupId) as GroupFrameRender
            const webFrame = mountWebFrame(tab, webData)
            if (groupRender){
                webFrame.suggestedTags = groupRender.tags.filter((groupTag: string) => {
                    return !webFrame.tags.includes(groupTag)
                })
                groupRender.frames.push(webFrame)
            }else{
                const groupData = groupsData.find(x => x.title === tabGroup.title)
                let groupTags: string[] = []
                let suggestedFrames: WebTaggeable[] = []
                if (groupData){
                    groupTags = [...groupData.tags]
                    webFrame.suggestedTags = groupTags.filter(t => !webFrame.tags.includes(t))
                    suggestedFrames = getSuggestedFrames(webData, tabs, tabGroups, groupData)
                }
                // mount group here
                window.tabs.push({
                    id: tab.groupId,
                    title:  tabGroup.title,
                    color: tabGroup.color,
                    collapsed: tabGroup.collapsed,
                    suggestedFrames: suggestedFrames,
                    frames: [webFrame],
                    tags: groupTags,
                    preProcessedTags: ['@group'],
                    kind: 'group',
                })
            }
        }
    })
    return windows
}

export interface OpenTab {
    url: string
    groupId: number
}


export interface SimpleWeFrame {
    url:   string
    title: string
    favIconUrl: string
}

export interface GroupDataTaggeable {
    title: string
    tags: string[]
}

export interface TabGroupSimple{
    id: number
    title: string
}

export function getSuggestedFrames(framesData: WebTaggeable[], tabs: OpenTab[], openGroups :TabGroupSimple[], groupData: GroupDataTaggeable): WebTaggeable[]{
    if (groupData.tags.length === 0){
        return []
    }
    const openGroup = openGroups.find(g => g.title === groupData.title)
    if (!openGroup){
        return []
    }

    // find all frames that has the tags of group
    let framesFiltered = framesData.filter(frameData => {
        return groupData.tags.every(t => frameData.tags.includes(t))
    })

    const urlsInGroup: string[] = tabs.filter(tab => tab.groupId === openGroup.id).map(x => x.url)

    // remove all that is oppened in current group
    framesFiltered = framesFiltered.filter(frameData => !urlsInGroup.includes(frameData.url))

    return framesFiltered
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
                favIconUrl: getFavicon(webFrame.url),
                title: webFrame.title,
                audible: tab ? tab.audible : false,
                preProcessedTags: processedTags,
                tags: frame.tags,
                domain: extractRootDomain(webFrame.url),
                url: webFrame.url,
                isPinned: tab ? tab.pinned : false,
                isSelected: tab ? tab.selected : false,
                active: tab ? tab.active : false,
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

export function mountWebFrame(tab:Tab, webData: WebTaggeable[]): WebFrameRender{
    const webFrame = webData.find(frame => frame.url === tab.url)
    let tags: string[] = []
    if (webFrame){
        tags = webFrame.tags
    }
    return {
        id: tab.id,
        windowId: tab ? tab.windowId : -1,
        groupId: tab ? tab.groupId : -1,
        index: tab ? tab.index : -1,
        url: tab.url,
        favIconUrl: tab.favIconUrl,
        title: tab.title,
        tags: tags,
        audible: tab ? tab.audible : false,
        domain: extractRootDomain(tab.url),
        preProcessedTags: getDomainsFromUrl(tab.url).map((x:string) => '@'+ x),
        isPinned: tab.pinned,
        active: tab.active,
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

export const getFavicon = (url:string) => {
    let newUrl = url
    try {
        const u = new URL(url)
        newUrl = `${u.protocol}//${u.hostname}`
    }catch (e) {
        //
    }

    return `chrome-extension://${process.env.VUE_APP_CHROME_EXTENSION_ID}/_favicon/?pageUrl=${newUrl}&size=16`
}

export const getFaviconOld = (url:string) => {
    return `chrome-extension://${process.env.VUE_APP_CHROME_EXTENSION_ID}/_favicon/?pageUrl=${url}&size=16`
}

export const getFrames = (bookmarks:BookmarkNode[]):WebFrameData[] => {
    const frames: WebFrameData[] = []
    bookmarks.forEach(bookmark => {
        if (bookmark.url){
            const titleAndtags = extractTitleAndTags(bookmark.title)
            frames.push({
                url: bookmark.url,
                title: titleAndtags.title,
                tags: titleAndtags.tags
            })
        }
    })
    return frames
}

export const getGroups = (bookmarks:BookmarkNode[]):GroupRender[] => {
    return []
}

interface extractResponse {
    title: string
    tags: string[]
}

export const extractTitleAndTags = (title: string): extractResponse => {
    const tags = title.match(/#[a-z]+/gi);
    return {
        title: title.replace(/#[a-z]+/gi, '').trim(),
        tags: tags ? tags : []
    }
}