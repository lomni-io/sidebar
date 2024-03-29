import {extractRootDomain, getDomainsFromUrl} from "@/components/url";

export interface RenderData {
    search: string[]
    tabs: Tab[]
    tags: Tag[]
    windows: Window[]
    frames: WebFrameClosed[]
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
    id: number
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
    tabs: (GroupFrameRender|WebFrameRender)[]
}


export interface WebFrameData{
    url:   string
    tags: string[]
    title?: string
    bookmarkId?: string
}

export interface GroupFrameRender {
    id: number
    title:  string
    color: string
    collapsed: boolean
    frames: WebFrameRender[]
    suggestedFrames: WebFrameClosed[]
    suggestedTags: string[]
    tags: string[]
    preProcessedTags: string[]
    kind: string
}

export interface GroupWithTags {
    id: number
    tags: string[]
}


export interface WebFrameRender {
    id: number
    windowId: number
    groupId: number
    index: number
    url: string
    favIconUrl: string
    tags: string[]
    domain: string
    audible: boolean
    preProcessedTags: string[]
    suggestedTags: string[]
    isPinned: boolean
    isOpened: boolean
    isSelected: boolean
    active: boolean
    kind: string
    bookmarkId?: string
    title?: string
}


export interface WebFrameClosed {
    url: string
    favIconUrl: string
    tags: string[]
    preProcessedTags: string[]
    title: string
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

export function createRenderData(bookmarkTreeNode: BookmarkTreeNode, tabs: Tab[], tabGroups:TabGroup[], searchInput: string[]): RenderData{
    const bookmarks = transformTreeIntoNode(bookmarkTreeNode)

    return {
        tabs: tabs,
        search: searchInput,
        tags: createTags(bookmarks, searchInput),
        windows: createWindows(tabs, tabGroups, bookmarks, searchInput),
        frames: createFrames(bookmarks)
    }
}

export function createTags(bookmarks: {title: string, url: string}[], searchTags: string[] = []): Tag[]{
    let finalList: Tag[] = []

    const framesFiltered = filterFramesBySelection(bookmarks, searchTags)

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

export interface WindowBookmarkNode {
    id: string
    title: string
    url: string
}

export function createWindows(tabs: Tab[], tabGroups: TabGroup[], bookmarks: WindowBookmarkNode[], search: string[] = []): Window[]{
    const windows: Window[] = []
    tabs.forEach(tab => {
        let window = windows.find(w => w.id === tab.windowId)
        if (!window){
            window = {
                name: 'main',
                id: tab.windowId,
                tabs: []
            }
            windows.push(window)
        }

        const bookmark = bookmarks.find(bm => bm.url === tab.url)

        if (tab.pinned){
            window.tabs.push(mountWebFrame(tab, bookmark, search))
            return
        }
        if (tab.groupId === -1){
            window.tabs.push(mountWebFrame(tab, bookmark, search))
        }

        const tabGroup = tabGroups.find(tabGroup => tabGroup.id === tab.groupId)
        if (tabGroup){
            const groupRender = window.tabs.find(wTab => (<GroupFrameRender>wTab).id === tab.groupId) as GroupFrameRender
            const webFrame = mountWebFrame(tab, bookmark, search)
            if (groupRender){
                webFrame.suggestedTags = groupRender.tags.filter((groupTag: string) => {
                    return !webFrame.tags.includes(groupTag)
                })
                groupRender.suggestedTags.push(...webFrame.tags)
                groupRender.suggestedTags = groupRender.suggestedTags.filter((t,i) =>
                    groupRender.suggestedTags.indexOf(t) === i && !groupRender.tags.includes(t))
                groupRender.frames.push(webFrame)
            }else{
                const groupTags = extractTags(tabGroup.title)
                let suggestedFrames: WebFrameClosed[] = []
                if (groupTags.length > 0){
                    webFrame.suggestedTags = groupTags.filter(t => !webFrame.tags.includes(t) && !webFrame.suggestedTags.includes(t))
                    suggestedFrames = getSuggestedFrames({
                        bookmarks: bookmarks,
                        tabs: tabs,
                        openGroup :tabGroup,
                        groupTags: groupTags,
                    })

                }
                // mount group here
                window.tabs.push({
                    id: tab.groupId,
                    title:  tabGroup.title,
                    color: tabGroup.color,
                    collapsed: tabGroup.collapsed,
                    suggestedFrames: suggestedFrames,
                    frames: [webFrame],
                    suggestedTags: webFrame.tags.filter(t => !groupTags.includes(t)),
                    // suggestedTags: webFrame.tags,
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


export interface GroupDataTaggeable {
    title: string
    tags: string[]
}

export interface TabGroupSimple{
    id: number
    title: string
}

export interface SuggestedFramesRequest {
    bookmarks: {
        title: string
        url: string|null
    }[]
    tabs: OpenTab[],
    openGroup :TabGroupSimple,
    groupTags: string[]
}

export function getSuggestedFrames(request: SuggestedFramesRequest): WebFrameClosed[]{
    if (request.groupTags.length === 0){
        return []
    }

    // find all frames that has the tags of group
    let bookmarksFiltered = request.bookmarks.filter(bookmark => {
        return request.groupTags.every(t => extractTags(bookmark.title).includes(t))
    })

    const urlsInGroup: string[] = request.tabs.filter(tab => tab.groupId === request.openGroup.id).map(x => x.url)

    // remove all that is oppened in current group
    bookmarksFiltered = bookmarksFiltered.filter(bm => !urlsInGroup.includes(bm.url ? bm.url : ''))

    const framesClosed: WebFrameClosed[] = []

    bookmarksFiltered.forEach(bookmark => {
        if (!bookmark.url){
            return
        }
        framesClosed.push({
            url: bookmark.url,
            favIconUrl: getFavicon(bookmark.url),
            tags: extractTags(bookmark.title),
            title: extractTitle(bookmark.title),
            preProcessedTags: getDomainsFromUrl(bookmark.url).map(t => '@' + t)
        })
    })

    return framesClosed
}

export function enrichFrames(framesData: WebFrameData[], tabs: Tab[] = [], search: string[] = []): WebFrameRender[]{

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
                id: tab ? tab.id : 0,
                index: tab ? tab.index : -1,
                groupId: tab ? tab.groupId : -1,
                windowId: tab ? tab.windowId : -1,
                favIconUrl: getFavicon(webFrame.url),
                title: webFrame.title,
                audible: tab ? tab.audible : false,
                suggestedTags: search,
                preProcessedTags: processedTags,
                tags: frame.tags,
                domain: extractRootDomain(webFrame.url),
                bookmarkId: webFrame.bookmarkId,
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

export function mountWebFrame(tab:Tab, bookmark: WindowBookmarkNode|undefined, search: string[] = []): WebFrameRender{
    let tags: string[] = []
    let bookmarkId = undefined
    let title = tab.title
    if (bookmark){
        const e = extractTitleAndTags(bookmark.title)
        bookmarkId = bookmark.id
        title = e.title
        tags = e.tags
    }
    return {
        id: tab.id,
        windowId: tab ? tab.windowId : -1,
        groupId: tab ? tab.groupId : -1,
        index: tab ? tab.index : -1,
        url: tab.url,
        favIconUrl: tab.favIconUrl,
        suggestedTags: search.filter(t => !tags.includes(t) && t.startsWith("#")),
        bookmarkId: bookmarkId,
        title: title,
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

export function filterFramesBySelection(bookmarks: {title: string,url: string}[], tags: string[]): FrameWithTags[] {
    if (!bookmarks){
        return []
    }

    const tagsHash = tags.filter(x => x.startsWith("#"))
    const tagsAt = tags.filter(x => x.startsWith("@"))

    return bookmarks.filter(bookmark => {
        const domains = '@' + getDomainsFromUrl(bookmark.url)
        const tags = extractTags(bookmark.title)
        const hasTagAt = tagsAt.length > 0 ? tagsAt.every(tag => domains.includes(tag)) : true
        const hasTagHash = tagsHash.length > 0 ? tagsHash.every(tag => tags.includes(tag)) : true
        return hasTagAt && hasTagHash
    }).map(b => ({preProcessedTags: getDomainsFromUrl(b.url).map(t => '@'+ t), tags: extractTags(b.title)}))
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

function getFavicon(u: string) {
    const url = new URL(`chrome-extension://${process.env.VUE_APP_CHROME_EXTENSION_ID}/_favicon/`);
    url.searchParams.set("pageUrl", u);
    url.searchParams.set("size", "16");
    return url.toString();
}

interface extractResponse {
    title: string
    tags: string[]
}

export const extractTitleAndTags = (title: string): extractResponse => {
    const regex = /\s#[a-z0-9/-]+/gi
    const tags = title.match(regex);
    return {
        title: title.replace(regex, '').trim(),
        tags: tags ? tags.map(t => t.trim()) : []
    }
}

export const extractTitle = (title: string): string => {
    return title.replace(/\s#[a-z0-9/-]+/gi, '').trim()
}

export const extractTags = (title: string): string[] => {
    if (!title){
        return []
    }
    const tags = title.match(/\s#[a-z0-9/-]+/gi);
    return tags ? tags.map(t => t.trim()) : []
}

export const joinTitleAndTags = (title: string, tags: string[]): string => {
    return `${title} ${tags.join(' ')}`
}

export const transformTreeIntoNode = (treeNode: BookmarkTreeNode): WindowBookmarkNode[] => {
    const bookmarks: WindowBookmarkNode[] = []
    bookmarks.push({
        id: treeNode.id,
        title: treeNode.title,
        url: treeNode.url
    })
    if (treeNode.children && treeNode.children.length > 0){
        treeNode.children.forEach(tn => {
            bookmarks.push(...transformTreeIntoNode(tn))
        })
    }
    return bookmarks
}

export const createFrames = (bookmarks: WindowBookmarkNode[]): WebFrameClosed[] => {
    return bookmarks.filter(bm => bm.url && bm.title).map(bookmark => ({
        url: bookmark.url,
        favIconUrl: getFavicon(bookmark.url),
        tags: extractTags(bookmark.title),
        title: extractTitle(bookmark.title),
        preProcessedTags: getDomainsFromUrl(bookmark.url).map((x:string) => '@'+ x)
    }))
}

export function framesInputFiltered(frames: {title: string,url: string}[], inputStr: string): {title: string,url: string}[]{
    const input = inputStr.toLowerCase()
    const filtered = frames.filter(f => f.title.toLowerCase().includes(input))

    return filtered.sort((a,b) => a.title.indexOf(input) > b.title.indexOf(input) ? 1 : -1)
}


// TODO refazer, simplificar
// 1. verificar se é moved ou added, caso

export const getFinalDragAction = (ev: any, frames: any[], groupId: number): any => {
    const element = ev.moved ? ev.moved.element : ev.added ? ev.added.element : null
    if (!element){
        return null
    }

    frames = removeById(frames, element.id)
    if (ev.moved){
        if (groupId === -1){
            frames.splice(ev.moved.newIndex, 0, element)
        }else{
            // add to group
            const gFrame = frames.find(f => f.id === groupId)
            gFrame.frames.splice(ev.moved.newIndex, 0, element)
        }

    }else if (ev.added){

        if (groupId === -1){
            frames.splice(ev.added.newIndex, 0, element)
        }else{
            // add to group
            const gFrame = frames.find(f => f.id === groupId)
            gFrame.frames.splice(ev.added.newIndex, 0, element)
        }
    }
    // apply flattern
    const framesFlatten = flatten(frames, -1)


    if (element.kind === 'web'){
        const idx = framesFlatten.findIndex(f => f.id === element.id)
        return {kind: "move-tab", tab: element.id, windowId: element.windowId, index: idx, groupId: groupId}
    }else{
        const idx = framesFlatten.findIndex(f => f.groupId === element.id)
        return {kind: "move-group", id: element.id, windowId: element.windowId, index: idx}
    }
}


export const removeById = (list: any[], id: number): any[] => {
    list = list.filter(item => item.id !== id)
    list.forEach(f => {
        if (f.frames){
            f.frames = removeById(f.frames, id)
        }
    })

    return list
}

export const flatten = (list: any[], groupId: number): any[] => {
    const finalList:any[] = []
    list.forEach(f => {
        if (f.frames){
            finalList.push(...flatten(f.frames, f.id))
        }else{
            finalList.push({
                id: f.id,
                groupId: groupId,
            })
        }
    })

    return finalList
}