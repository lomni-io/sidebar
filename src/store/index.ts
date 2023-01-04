import {ActionContext, createStore} from 'vuex'
import {extractRootDomain} from "@/components/url";
import {enrichFrames} from "@/store/frame";
import retryTimes = jest.retryTimes;
import {FramesData, NoteFrameData, WebFrameData} from "@/entity/frame";

// import md5 from "md5";


// define your typings for the store state
export interface State {
  storage: any,
  frames: FramesData,
  tabs:   any[],
  clipboard: string|null
}

export const store = createStore<State>({
  state () {
    return {

      storage: {
        kind: 'local',
        accessKey: '',
        gistID: ''
      },

      // to sync data
      frames: [],

      clipboard: null,

      head: {
        input: ''
      },

      frameContainer: {
        currentSelectedFrameIdx: -1,
      },

      tabs: []

    }
  },
  getters: {
    storage: function (state) {
      return state.storage
    },
    activeTab: function (state) {
      const tab = state.tabs.find(tab => tab.active)
      if (tab && tab.url){
        tab.domain = extractRootDomain(tab.url)
        return tab
      }
      return null
    },

    allTabs: function (state) {
      return state.tabs
    },

    // add preProcessedTags
    frames: function (state) {
      return enrichFrames(state.frames)
    },
  },
  mutations: {
    SET_STORAGE(state, storage) {
      localStorage.setItem('storage', JSON.stringify(storage))
      state.storage = storage
    },
    SET_DATA(state, payload) {
      state.frames = payload.frames
      state.storage = payload.storage
    },
    SET_CLIPBOARD(state, clipboard) {
      state.clipboard = clipboard
    },
    SET_FRAMES(state, frames) {
      state.frames = frames
      localStorage.setItem('frames', JSON.stringify(frames))
    },
    SET_FRAME(state, frame:WebFrameData) {
      frame.updatedAt = Date.now()

      const frameIdx = state.frames.findIndex((x:WebFrameData|NoteFrameData) => {
        return (<WebFrameData>x).url === frame.url
      })
      if (~frameIdx){
        // has frame
        state.frames[frameIdx] = frame
      }else{
        // new frame
        state.frames.push(frame)
      }
      // persist state on storage
      localStorage.setItem('frames', JSON.stringify(state.frames))
    },
    SET_ALL_TABS(state, data) {
      state.tabs = data
    },
    SET_NOTE(state, note) {
      note.updatedAt = Date.now()

      state.frames.push(note)
      localStorage.setItem('frames', JSON.stringify(state.frames))
    },
    UPDATE_NOTE(state, note: NoteFrameData){
      const frameIdx = state.frames.findIndex(x => {
        return (<NoteFrameData>x).id === note.id
      })
      if (~frameIdx) {
        // has frame
        state.frames[frameIdx] = note
      }
      localStorage.setItem('frames', JSON.stringify(state.frames))
    },
    REMOVE_NOTE(state, note){
      const index = state.frames.findIndex(x => {
        return (<NoteFrameData>x).id === note.id
      })
      if (~index){
        state.frames.splice(index, 1)
      }
      localStorage.setItem('frames', JSON.stringify(state.frames))
    }
  },
  actions: {
    setClipboard(context, clipboard){
      if (context.state.clipboard !== clipboard){
        context.commit('SET_CLIPBOARD', clipboard)
      }
    },
    setAllTabs(context, data){
      context.commit('SET_ALL_TABS', data)
    },
    upsertFrame(context, frame: WebFrameData){
      context.commit('SET_FRAME', frame)
    },
    insertNote(context, note: NoteFrameData){
      context.commit('SET_NOTE', note)
    },
    updateNote(context, note: NoteFrameData){
      context.commit('UPDATE_NOTE', note)
    },
    removeNote(context, note: NoteFrameData){
      context.commit('REMOVE_NOTE', note)
    },
    setFrames(context, frames: FramesData){
      context.commit('SET_FRAMES', frames)
    },

    // process of loading and save

    loadState(context){
      let frames = []
      const framesRaw = localStorage.getItem('frames')
      if (framesRaw){
        frames = JSON.parse(framesRaw)
      }

      let storage = {kind: 'local'}
      const storageRaw = localStorage.getItem('storage')
      if (storageRaw){
        storage = JSON.parse(storageRaw)
      }

      context.commit('SET_DATA', {frames: frames, storage: storage})
    },
    setStorage(context, storage){
      context.commit('SET_STORAGE', storage)
    }
  },
  modules: {
  }
})
