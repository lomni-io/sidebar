import {GroupData} from "@/store/renderData";


export interface FrameRender {
    id?: string|null
    url?: string|null
    favIconUrl?: string|null
    title?: string|null
    tags: string[]
    kind: string
    domain?: string|null
    preProcessedTags: string[]
    content?: string|null
    comment?: string|null
    pinned: boolean
    updatedAt: number
}

export type FramesData = (WebFrameData|NoteFrameData|GroupData)[]

export interface WebFrameData{
    url:   string
    title: string
    comment?: string|null
    favIconUrl: string
    tags: string[]
    updatedAt: number
}

export interface NoteFrameData{
    id:      string
    content: string
    tags: string[]
    updatedAt: number
}

export interface TagsCounter {
    name:string
    count:number
    kind: string
}