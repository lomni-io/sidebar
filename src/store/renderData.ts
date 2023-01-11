
export interface RenderData {
    search: string[]
    tags: Tag[]
    windows: Window[]
    frames: (FrameGroupData|FrameRender)[]
}

export interface Tag {
    name:  string
    count: number
}

export interface Window {
    name:  string
    pinneds: FrameRender[]
    tabs: (FrameGroup|FrameRender)[]
}

export interface FrameGroup {
    name:  string
    color: string
    frames: FrameRender[]
    tags: string[]
}

export interface FrameGroupData {
    name:  string
    color: string
    frames: string[] // only URL
    tags: string[]
}

export interface FrameRender {
    url: string
    favIconUrl: string
    title: string
    tags: string[]
    domain: string
    preProcessedTags: string[]
    isPinned: boolean
    isOpened: boolean
    isSelected: boolean
    updatedAt: number
}