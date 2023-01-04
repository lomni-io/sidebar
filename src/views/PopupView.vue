<template>
  <div class="popup">
    <div class="tag-input-container">
      <p class="domain">{{domain}}</p>
      <p class="tag-input" :class="{'selected': inputSelectionIndex === index}" v-for="(tag, index) in selectedTags" :key="index"><span>{{tag}}</span></p>
      <input ref="search" v-model="searchInput" v-on:keydown="inputKeydown"/>
    </div>
    <div class="options-container">
      <div class="options-list">
        <div class="option-item" :class="{'tag': frame.kind === 'tag', 'domain': frame.kind === 'domain', 'selected': searchSelectionIndex === index}" v-for="(frame, index) in allTags" :key="index">{{frame.name}}<span>{{frame.count}}</span></div>
      </div>
    </div>
  </div>
</template>

<script>

import { Octokit } from "octokit";
import {getData, storeData} from "@/views/data";
import {getDomainFromUrl} from "@/components/url";

export default {
  name: "PopupView",
  data() {
    return {
      data: {},
      frameUrl: '',
      hasChanges: false,
      searchInput: '',

      // this is related to option tags
      searchSelectionIndex: -1,

      // this is related to the input result over consolidated tags (&tag=?)
      inputSelectionIndex: -1
    }
  },
  watch: {
    data: {
      handler(newData) {
        storeData(newData)
      },
      deep: true
    },
  },
  computed: {
    domain(){
      return getDomainFromUrl(this.frameUrl)
    },
    frames(){
      if (this.data && this.data.frames) {
        const map = new Map(Object.entries(this.data.frames))
        return Array.from(map.values())
      }
      return []
    },
    // differ between all tags and SUGESTED TAGS (its historical connected)
    sugestedTags() {
      return []
    },
    allTags() {
      let finalList = []

      let frames = this.frames

      const selectedTags = this.selectedTags.filter(x => x.startsWith("#"))

      frames.forEach(frame => {

        frame.tags.forEach(tag => {
          if (this.searchInput.length > 1 && !tag.includes(this.searchInput)) {
            return
          }

          // remove if tag is on selected
          if (selectedTags.includes(tag)) {
            return;
          }

          const tagIdx = finalList.findIndex(x => x.name === tag)
          if (tagIdx === -1) {
            finalList.push({name: tag, count: 1, kind: 'tag'})
          }else {
            finalList[tagIdx].count++
          }
        })
      })


      return finalList
    },
    selectedTags(){
      const frame = this.frames.find(x => x.url === this.frameUrl)
      if (frame) {
        return frame.tags
      }
      return []
    },
  },
  methods: {
    cmdInputTab(e){
      if (e.key === 'Tab') {
        e.preventDefault()
        this.inputSelectionIndex = -1
        this.searchSelectionIndex++
        if (this.searchSelectionIndex >= this.allTags.length) {
          this.searchSelectionIndex = 0
        }
      }
    },
    cmdInputEnter(e){
      if (e.key === 'Enter') {
        e.preventDefault()
        if (this.searchSelectionIndex >= 0) {
          const tag = this.allTags[this.searchSelectionIndex]
          if (tag){
            const frame = this.data.frames[this.frameUrl]
            if (frame) {
              frame.tags.push(tag.name)
            }else {
              this.data.frames[this.frameUrl] = {
                url: this.frameUrl,
                tags: [this.formattedInput()]
              }
            }
          }
          this.searchSelectionIndex = -1
          this.searchInput = ''
        }else if (this.searchInput.length > 1) {
          const frame = this.data.frames[this.frameUrl]
          if (frame) {
            if (!frame.tags.find(x => x === this.formattedInput())){
              frame.tags.push(this.formattedInput())
            }
          }else {
            this.data.frames[this.frameUrl] = {
              url: this.frameUrl,
              tags: [this.formattedInput()]
            }
          }
          this.searchInput = ''
        }

      }
    },
    formattedInput(){
      if (this.searchInput.startsWith("#")) {
        return this.searchInput
      }
      return '#' + this.searchInput
    },
    cmdInputBackspace(e){
      if (this.searchInput.length > 0) {
        return;
      }
      if (e.key === 'Backspace') {

        let selectedTags = this.selectedTags
        if (this.inputSelectionIndex === -1) {
          this.inputSelectionIndex = selectedTags.length -1
          return
        }
        selectedTags.splice(this.inputSelectionIndex, 1)
        if (selectedTags.length === 0) {
          const frameIdx = this.frames.findIndex(x => x.md5 === this.frameUrl)
          this.frames.splice(frameIdx, 1)
        }
        this.inputSelectionIndex = -1
      }
    },
    cmdInputCtrlDown(e){
      if (e.code === 'ArrowDown' && e.composed) {
        e.preventDefault()
        this.$refs.main.focus()
      }
    },
    cmdInputArrowLeft(e){
      if (e.code === 'ArrowLeft' && this.inputSelectionIndex >= 0) {
        this.inputSelectionIndex--
        e.preventDefault()
      }
    },
    cmdInputArrowRight(e){
      if (e.code === 'ArrowRight' && this.inputSelectionIndex <= this.selectedTags.length) {
        this.inputSelectionIndex++
        e.preventDefault()
      }
    },
    inputKeydown(e){
      this.cmdInputCtrlDown(e)
      this.cmdInputTab(e)
      this.cmdInputEnter(e)
      this.cmdInputBackspace(e)
      this.cmdInputArrowLeft(e)
      this.cmdInputArrowRight(e)
    },
    async authenticate() {
      // Create a personal access token at https://github.com/settings/tokens/new?scopes=repo
      const octokit = new Octokit({ auth: `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` });
      console.log(octokit)
      const {data: { login }} = await octokit.rest.users.getAuthenticated();

      await octokit.rest.gists.update({
        gist_id: '36ef7553af513a41a9e7e39cd6175998',
        description: "I created this gist using Octokit!",
        public: false,
        files: {
          // "data.json": {
          //   "content": '{"hello":"world221"}'
          // },
          "data2.json": {
            "content": ''
          },
        },
      });

      console.log("Hello, %s", login);
    }
  },
  mounted() {
    this.frameUrl = this.$route.query.url

    if (this.domain){
      this.$refs.search.focus()

      this.data = getData()

      // this.authenticate()

      // this.github.login("da").then(res => {
      //   console.log("result ", res)
      // })
    }



  }
}
</script>


<style scoped lang="scss">

p{
  margin-block-start: 0em;
  margin-block-end: 0em;
}

.header{
  width: calc(100% - 40px);
  background-color: var(--background_main);
  margin: 20px;
  height: 70px;

  .tag-input-container{
    display: flex;

    .domain{
      color: var(--blue_60);
    }

    input{
      background-color: transparent;
      border-color: transparent;
      border-bottom: var(--red_40_40) solid 1px;
      outline:none;
      color: var(--text_color);
      font-size: 0.9em;
      width: 100%;
    }

    .selected{
      background-color: var(--red_40_40);
      //border-left: 1px dashed red;
    }

    .tag-input{
      border-bottom: var(--red_40_40) solid 1px;
      margin-right: -2px;
      padding-right: 5px;
      color: var(--text_color);
      font-size: 0.9em;
      margin-top: 1px;

      span{
        color: #e3dec3;
        white-space: nowrap;
        border-radius: 5px;
        padding-left: 5px;
      }
    }
  }
}


.options-container{
  display: flex;
  margin-top: 5px;
  margin-bottom: 20px;
  justify-content: center;

  .options-list{
    display: flex;
    flex-wrap: wrap;
    place-self: flex-start;
    justify-content: center;

    .tag{
      background-color: var(--background-tag-list);
      color: var(--text_color);
    }

    .domain{
      background-color: var(--background-domain-list);
      color: var(--text_color);
    }

    .selected {
      background-color: var(--gray_1);
    }

    .option-item{
      font-size: 0.7em;
      margin-right: 12px;
      border-radius: 4px;

      padding: 1px;
      margin-bottom: 8px;

      span{
        font-size: 8px;
        margin-top: 10px;
        margin-left: -2px;
        position: absolute;
        border-radius: 20px;
        width: 10px;
        height: 10px;
        text-align: center;
        background-color: var(--background-tag-list);
        border-color: black;
        color: var(--blue_60);
      }
    }
  }
}


</style>