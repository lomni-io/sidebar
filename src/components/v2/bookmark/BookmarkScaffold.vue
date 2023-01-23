<template>
  <div class="scafold-container">
    <div class="header" draggable="true">
<!--    TODO why is not saved?  -->
      <div class="header-left">
        <div class="input" v-if="!collapsed" @click="collapsed = true">-</div>
        <div class="input" v-if="collapsed" @click="collapsed = false">+</div>
        <input v-model="newTitle" v-if="editTitleMode" v-on:focusout="saveNewTitle()" placeholder="(empty)" ref="input">
        <label v-if="!editTitleMode" ref="label" @click="editTitle()">{{bookmark.title}} <span v-if="collapsed"> - {{bookmark.children.length}} item(s)</span></label>
      </div>

      <div class="header-right">
        <div class="frame-footer-drag">
          <font-awesome-icon icon="bars" />
        </div>
      </div>

    </div>
    <div class="content" v-if="!collapsed">
      <slot></slot>
    </div>

    <div class="footer">
<!--      <TagContainer :tags="group.tags" :color="group.color" @addTag="addTag" @removeTag="removeTag"></TagContainer>-->
    </div>


  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {store} from "@/store";

export default defineComponent( {
  name: "BookmarkScaffold",
  components: {},
  props: ['bookmark'],
  data() {
    return {
      collapsed:false,
      newTitle: this.title,
      editTitleMode: false
    }
  },
  methods: {
    addTag(tag: string){
      console.log('TODO add tags', tag)
    },
    removeTag(tag: string){
      console.log('TODO remove tag', tag)
    },
    editTitle(){
      this.editTitleMode = true
      this.$nextTick(() => {
        const html = this.$refs.input as HTMLInputElement
        html.focus()
      });
    },
    removeGroup(){
      store.dispatch('removeGroup', this.bookmark.title)
    },
    saveNewTitle(){
      if (this.newTitle){
        // @ts-ignore
        this.port.postMessage({kind: "title-tab-groups", group: this.group.id, title: this.newTitle});
      }
      this.editTitleMode = false
    },
  }
})

</script>

<style scoped lang="scss">


.scafold-container{
  user-select: none;
  margin-bottom: 5px;
}

.collapsed{
  flex: 1;
  margin-left: 10px;

}

.header{
  flex-wrap: wrap;
  justify-content: space-between;
  display: flex;
  align-items: center;
  font-size: 0.7em;
}

.header-left{
  display: flex;
}

.header-right{
  margin-right: 5px;
  display: flex;
}

.content{
  border-left: 1px solid var(--text_color);
  margin-top: 5px;
  margin-left: 6px;
  padding-left: 5px;

}

.frame-footer-drag{
  color: var(--text_color);
  &:hover{
    cursor: pointer;
    filter: var(--hover)
  }
}

label{
  color: var(--background_input);
  color: var(--text_color);
  border-radius: 5px;
  cursor: pointer;
  padding-right: 5px;
  padding-left: 5px;

}

.input{
  width: 12px;
  height: 12px;
  border: 1px solid var(--text_color);
  vertical-align: center;
  border-radius: 4px;
  color: var(--text_color);
  cursor: pointer;
  display: grid;
  justify-content: center;
  align-content: center;
  margin-right: 5px;

}

.edit-mode{
}

input{
  outline: none;
  font-size: 0.9em;

}

.edit-mode-container{
  display: flex;
}

.footer{
  display: flex;
}

</style>