import {FrameRender, TagsCounter} from "@/entity/frame";

interface FrameWithTags {
    pinned?: boolean
    tags: string[]
    preProcessedTags: string[]
}

export function framesFiltered(frames: FrameWithTags[], tags: string[]): FrameRender[]{
    let framesCopy = JSON.parse(JSON.stringify(frames)) as FrameRender[]
    // const selectedTags = tags.filter(x => x.startsWith("#"))
    if (tags.length > 0) {
        framesCopy = framesCopy.filter(frame => tags.every(
            tag => frame.tags.includes(tag) || frame.preProcessedTags.includes(tag) || frame.pinned
        ))
    }

    return framesSort(framesCopy)
}

export function framesSort(frames: FrameRender[]): FrameRender[]{
    return frames.sort((x,y) => {
        if (x.pinned || y.pinned){
            return x.pinned ? -1 : 1
        }
        const tagLength = x.tags.length > y.tags.length
        return tagLength ? 1 : -1
    })
}

export function addHashTag(tag: string): string {
    if (tag.startsWith("#")){
        return tag
    }
    return '#' + tag
}

export function setVisibleTags(frames: FrameWithTags[], tags: string[], input: string):TagsCounter[] {
    input = input.toLowerCase()
    let finalList = new Array<TagsCounter>()

    frames = filterFramesBySelection(frames, tags)

    frames.forEach(frame => {

        frame.tags.forEach(tag => {
            if (input.length >= 1 && !tag.toLowerCase().includes(input)) {
                return
            }

            // remove if tag is on selected
            if (tags.includes(tag)) {
                return;
            }

            const tagIdx = finalList.findIndex(x => x.name === tag)
            if (tagIdx === -1) {
                finalList.push({name: addHashTag(tag), count: 1, kind: 'tag'})
            }else {
                finalList[tagIdx].count++
            }
        })
        frame.preProcessedTags.forEach(tag => {
            if (input.length >= 1 && !tag.toLowerCase().includes(input)) {
                return
            }

            // remove if tag is on selected
            if (tags.includes(tag)) {
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
    if (tags.length > 0){
        finalList = finalList.filter(item => {
            return item.count < frames.length
        })
    }


    return finalList.sort((x,y) => x.count > y.count ? -1 : 1)
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
