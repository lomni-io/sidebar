<template>
   <div class="bookmark-info-container" ref="bookmark" id="bookmark" :draggable="bookmark.editable">
      <div class="bookmark-info">
        <div class="bookmark-header">
          <div class="bookmark-header-left">
            <img :src="bookmark.favIconUrl" width="16" height="16">
            <small v-if="!editMode" v-on:dblclick="editMode = true">{{bookmark.title}}</small>
<!--            <small v-if="editMode" contenteditable="true" >{{bookmark.titleRaw}}</small>-->
            <input v-model="newTitle" v-if="editMode" v-on:focusout="saveTitle()" :autofocus="true" ref="input">
            <div class="tags-container" v-if="!editMode">
              <div class="tag" v-for="(tag, index) in bookmark.tags" :key="index" draggable="true">
                {{tag}}
              </div>
            </div>
          </div>
          <div class="bookmark-header-right">
            <div class="edit" @click="editMode ? editMode = false : editMode = true" title="edit frame">
              <font-awesome-icon icon="edit" />
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script lang="ts">

import {defineComponent} from "vue";

// TODO: copy link buttom
export default defineComponent( {
  name: "BookmarkUnit",
  components: {},
  props: ['bookmark'],
  data() {
    return {
      editMode: false,
      newTitle: this.bookmark.title
    }
  },
  computed: {

  },
  methods: {
    saveTitle(){
      this.editMode = false
    }
  }
})

</script>

<style scoped lang="scss">


.bookmark{
}
a{
  text-decoration: none;
}

a:focus{
  filter: var(--hover);
  outline:none;
}

a:hover{
  filter: var(--hover);
  outline:none;
}

.bookmark-info-container{
  padding: 5px;
  background-color: var(--background_input);
  border: 1px solid var(--bookmark_border);
  border-radius: 5px;
  margin-bottom: 5px;
  position: relative;
  &:hover{
    cursor: pointer;
    filter: var(--hover);
  }
}

.current-selected{
  color: var(--purple);
}

.bookmark-header{
  display: flex;
  align-items: center;
  justify-content: space-between;

  .bookmark-header-left{
    flex: auto;
    cursor: pointer;
    overflow: hidden;
    align-content: center;
    display: flex;
    img{
      margin-right: 5px;
    }
    .copy{
      margin-left: 5px;
      opacity: 0.7;
      &:hover{
        filter: var(--hover);
      }
    }
    small{
      color: var(--text_color);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 60vw;

      &.current-selected{
        color: var(--purple);
      }
    }
  }

  .bookmark-header-right{
      font-size: 0.7em;

    .edit{
      color: var(--yellow);
      opacity: 0.4;
      &:hover{
        cursor: pointer;
        filter: var(--hover);
      }
    }
  }

}


.bookmark-title{
  display: inline-block;
  max-width: 100%;
  text-align: left;
  margin: 0;
}


h1{
  font-size: 1.1em;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-height: 2em;
  cursor: pointer;
}
h1:hover{
  filter: var(--hover);
}
.bookmark-tags{

}


.title-container{
  display: flex;
  align-items: center;
}


.tags{
  width: calc(100% - 10px);
}

.tags-container{
  display: flex;
  font-size: 0.8em;
  margin-right: 10px;

  .tag{
    background-color: var(--background_tag);
    color: var(--text_color);
    border-radius: 4px;
    padding-left: 3px;
    padding-right: 3px;
    margin-left: 5px;
  }
}

input{
  width: calc(100% - 40px);
  filter: var(--hover);
  outline:none;
}

</style>