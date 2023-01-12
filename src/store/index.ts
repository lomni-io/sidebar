import {ActionContext, createStore} from 'vuex'
import {DragItem} from "@/store/dragItem";
import {createRenderData, enrichFrames, GroupFrameData, Tab, TabGroup, WebFrameData} from "@/store/renderData";

// import md5 from "md5";


// define your typings for the store state
export interface State {
  storage: any
  frames: (GroupFrameData|WebFrameData)[]
  tabs:   Tab[]
  tabGroups: TabGroup[]
  clipboard: string|null
  dragItem: DragItem|null,
  search: string[]
}

export const store = createStore<State>({
  state () {
    return {

      dragItem: null,

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

      tabs: [],
      tabGroups: [],
      search: []

    }
  },
  getters: {
    dragItem: function (state) {
      return state.dragItem
    },
    storage: function (state) {
      return state.storage
    },
    activeTab: function (state) {
      const tab = state.tabs.find(tab => tab.active)
      if (tab && tab.url){
        return tab
      }
      return null
    },

    allTabs: function (state) {
      return state.tabs
    },

    renderData: function (state) {
      return createRenderData(state.frames, state.tabs, state.tabGroups, state.search)
    },

    // add preProcessedTags
    frames: function (state) {
      return enrichFrames(state.frames, state.tabs)
    },
    rawFrames: function (state) {
      return state.frames
    },
  },
  mutations: {
    SET_DRAG_ITEM(state, item) {
      state.dragItem = item
    },
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

      const frameIdx = state.frames.findIndex((x:GroupFrameData|WebFrameData) => {
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
    SET_ALL_TAB_GROUPS(state, data){
      state.tabGroups = data
    },
    SET_NOTE(state, note) {
      note.updatedAt = Date.now()

      state.frames.push(note)
      localStorage.setItem('frames', JSON.stringify(state.frames))
    },
  },
  actions: {
    setDragItem(context, item){
      context.commit('SET_DRAG_ITEM', item)
    },
    setClipboard(context, clipboard){
      if (context.state.clipboard !== clipboard){
        context.commit('SET_CLIPBOARD', clipboard)
      }
    },
    setAllTabs(context, data){
      context.commit('SET_ALL_TABS', data)
    },
    setAllTabGroups(context, data){
      context.commit('SET_ALL_TAB_GROUPS', data)
    },
    upsertFrame(context, frame: WebFrameData){
      context.commit('SET_FRAME', frame)
    },
    setFrames(context, frames: GroupFrameData|WebFrameData){
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
