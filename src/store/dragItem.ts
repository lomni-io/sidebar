import {FrameRender} from "@/entity/frame";

export interface DragItem{
    draggerId: string,
    dropperId?: string|null,
    lastUpdate?: number
    kind: string
    object: FrameRender
}