import {createStore} from 'vuex'
import {DragItem} from "@/store/dragItem";
import {
  Bookmark, BookmarkTreeNode, createBookmarkWindow,
  createRenderData,
  enrichFrames,
  Tab,
  TabGroup,
  WebFrameData
} from "@/store/renderData";

// import md5 from "md5";


// define your typings for the store state
export interface State {
  storage: any
  tabs:   Tab[]
  tabGroups: TabGroup[]
  clipboard: string|null
  dragItem: DragItem|null,
  search: string[],
  bookmarks: Bookmark[]
  bookmarkTreeNode: BookmarkTreeNode
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

      clipboard: null,

      head: {
        input: ''
      },

      frameContainer: {
        currentSelectedFrameIdx: -1,
      },

      tabs: [] as Tab[],
      tabGroups: [] as TabGroup[],
      bookmarks: [] as Bookmark[],
      bookmarkTreeNode: {} as BookmarkTreeNode,
      search: []

    }
  },
  getters: {
    dragItem: function (state) {
      return state.dragItem
    },
    bookmarkWindow: function (state){
      console.log(createBookmarkWindow(state.bookmarkTreeNode))
      return createBookmarkWindow(state.bookmarkTreeNode)
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
      return createRenderData(state.bookmarks, state.tabs, state.tabGroups, state.search)
    },
  },
  mutations: {
    ADD_SEARCH_ITEM(state, item){
      if (!state.search.some(x => x === item)){
        state.search.push(item)
      }
    },
    REMOVE_SEARCH_ITEM(state, item){
      const idx = state.search.findIndex(x => x === item)
      if (~idx){
        state.search.splice(idx, 1)
      }
    },
    SET_DRAG_ITEM(state, item) {
      state.dragItem = item
    },
    SET_DROPER_ID(state, id){
      setTimeout(function (){
        if (state.dragItem && state.dragItem.lastUpdate){
          if (Date.now() - 200 > state.dragItem.lastUpdate){
            state.dragItem.dropperId = null
          }
        }
      }, 300)
      if (state.dragItem){
        state.dragItem.dropperId = id
        state.dragItem.lastUpdate = Date.now()
      }
    },
    SET_STORAGE(state, storage) {
      localStorage.setItem('storage', JSON.stringify(storage))
      state.storage = storage
    },
    SET_CLIPBOARD(state, clipboard) {
      state.clipboard = clipboard
    },
    SET_ALL_TABS(state, data) {
      state.tabs = data
    },
    SET_ALL_TAB_GROUPS(state, newTabGroups: TabGroup[]){
      state.tabGroups = newTabGroups
    },
    SET_ALL_BOOKMARKS(state, bookmarks: Bookmark[]){
      state.bookmarks = bookmarks
    },
    SET_BOOKMARK_TREE(state, bookmark: BookmarkTreeNode[]){
      state.bookmarkTreeNode = bookmark[0]
    }
  },
  actions: {
    addSearchItem(context, item){
      context.commit('ADD_SEARCH_ITEM', item)
    },
    removeSearchItem(context, item){
      context.commit('REMOVE_SEARCH_ITEM', item)
    },
    setDragItem(context, item){
      context.commit('SET_DRAG_ITEM', item)
    },
    setDropperId(context, id){
      context.commit('SET_DROPER_ID', id)
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
    setAllBookmarks(context, data){
      context.commit('SET_ALL_BOOKMARKS', data)
    },
    setBookmarkTree(context, data){
      context.commit('SET_BOOKMARK_TREE', data)
    },
    removeGroup(context, title: string){
      context.commit('REMOVE_SAVED_GROUP', title)
    },
  },
  modules: {
  }
})
