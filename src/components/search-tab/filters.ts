import {FrameRender, TagsCounter} from "@/entity/frame";

interface FrameWithTags {
    tags: string[]
    preProcessedTags: string[]
}

export function framesFiltered(frames: FrameWithTags[], tags: string[]): FrameRender[]{
    let framesCopy = JSON.parse(JSON.stringify(frames)) as FrameRender[]
    const selectedTags = tags.filter(x => x.startsWith("#"))
    if (selectedTags.length > 0) {
        framesCopy = framesCopy.filter(frame => selectedTags.every(
            tag => frame.tags.includes(tag) || frame.preProcessedTags.includes(tag)
        ))
    }

    return framesSort(framesCopy)
}

export function framesSort(frames: FrameRender[]): FrameRender[]{
    return frames.sort((x,y) => x.tags.length > y.tags.length ? 1 : -1)
}

export function addHashTag(tag: string): string {
    if (tag.startsWith("#")){
        return tag
    }
    return '#' + tag
}

export function setVisibleTags(frames: FrameWithTags[], selectedTags: string[], input: string) {
    input = input.toLowerCase()
    let finalList = new Array<TagsCounter>()

    selectedTags = selectedTags.filter(x => x.startsWith("#"))
    if (selectedTags.length > 0) {
        frames = frames.filter(frame => selectedTags.every(tag =>
            frame.tags.includes(tag) || frame.preProcessedTags.includes(tag)))
    }

    frames.forEach(frame => {

        frame.tags.forEach(tag => {
            if (input.length > 1 && !tag.toLowerCase().includes(input)) {
                return
            }

            // remove if tag is on selected
            if (selectedTags.includes(tag)) {
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
            if (input.length > 1 && !tag.toLowerCase().includes(input)) {
                return
            }

            // remove if tag is on selected
            if (selectedTags.includes(tag)) {
                return;
            }

            const tagIdx = finalList.findIndex(x => x.name === tag)
            if (tagIdx === -1) {
                finalList.push({name: addHashTag(tag), count: 1, kind: 'preProcessed'})
            }else {
                finalList[tagIdx].count++
            }
        })
    })

    // filter items that not bring less results
    if (selectedTags.length > 0){
        finalList = finalList.filter(item => {
            return item.count < frames.length
        })
    }


    return finalList.sort((x,y) => x.count > y.count ? -1 : 1)
}

export function tagSugestionBySelection(frames: FrameWithTags[], selectedTags: string[]):TagsCounter[] {
    const finalList: TagsCounter[] = []

    selectedTags = selectedTags.filter(x => x.startsWith("#"))
    if (selectedTags.length > 0) {
        frames = frames.filter(frame => selectedTags.every(tag =>
            frame.tags.includes(tag) || frame.preProcessedTags.includes(tag)))
    }else {
        return []
    }

    frames.forEach(frame => {

        frame.tags.forEach(tag => {

            // remove if tag is on selected
            if (selectedTags.includes(tag)) {
                return;
            }

            const tagIdx = finalList.findIndex(x => x.name === tag)
            if (tagIdx === -1) {
                finalList.push({name: addHashTag(tag), count: 1, kind: 'tag'})
            }else {
                finalList[tagIdx].count++
            }
        })

    })


    return finalList.sort((x,y) => x.count > y.count ? -1 : 1)
}