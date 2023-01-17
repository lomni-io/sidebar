<template>
  <div class="scafold-container">
    <div class="header" :class="color" draggable="true">
      <div class="header-left">
        <div class="input" v-if="!collapsed" @click="collapse(true)" :class="color">-</div>
        <div class="input" v-if="collapsed" @click="collapse(false)" :class="color">+</div>
        <input v-model="newTitle" :class="color" v-if="editTitleMode" v-on:focusout="saveNewTitle()" placeholder="(empty)" ref="input">
        <label :class="color" v-if="!editTitleMode" ref="label" @click="editTitle()">{{title.length > 0 ? title : '(empty)'}} <span v-if="collapsed"> - {{countFrames}} item(s)</span></label>
      </div>

      <div class="frame-footer-drag">
        <font-awesome-icon icon="bars" />
      </div>

      <div class="header-right">
        <div class="color-picker" :class="color" @click="changeColor">color</div>
      </div>

    </div>
    <div class="content" :class="color" v-if="!collapsed">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent( {
  name: "TabGroupScaffold",
  props: ['title', 'color', 'collapsed', 'groupId', 'countFrames'],
  data() {
    return {
      newTitle: this.title,
      editTitleMode: false
    }
  },
  methods: {
    collapse(collapsed: boolean){
      // @ts-ignore
      this.port.postMessage({kind: "collapse-tab-groups", group: this.groupId, collapse: collapsed});
    },
    editTitle(){
      this.editTitleMode = true
      this.$nextTick(() => {
        const html = this.$refs.input as HTMLInputElement
        html.focus()
      });
    },
    changeColor(){
      let newColor = this.color
      if (this.color === 'grey'){
        newColor = 'blue'
      }
      if (this.color === 'blue'){
        newColor = 'red'
      }
      if (this.color === 'red'){
        newColor = 'yellow'
      }
      if (this.color === 'yellow'){
        newColor = 'green'
      }
      if (this.color === 'green'){
        newColor = 'pink'
      }
      if (this.color === 'pink'){
        newColor = 'purple'
      }
      if (this.color === 'purple'){
        newColor = 'cyan'
      }
      if (this.color === 'cyan'){
        newColor = 'orange'
      }
      if (this.color === 'orange'){
        newColor = 'grey'
      }

      // @ts-ignore
      this.port.postMessage({kind: "color-tab-groups", group: this.groupId, color: newColor});
    },
    saveNewTitle(){
      if (this.newTitle){
        // @ts-ignore
        this.port.postMessage({kind: "title-tab-groups", group: this.groupId, title: this.newTitle});
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

  &.blue{
    border-bottom: 1px dashed var(--blue);
  }
  &.cyan{
    border-bottom: 1px dashed var(--cyan);
  }
  &.pink{
    border-bottom: 1px dashed var(--pink);
  }
  &.purple{
    border-bottom: 1px dashed var(--purple);
  }
  &.orange{
    border-bottom: 1px dashed var(--orange);
  }
  &.yellow{
    border-bottom: 1px dashed var(--yellow);
  }
  &.green{
    border-bottom: 1px dashed var(--green);
  }
  &.red{
    border-bottom: 1px dashed var(--red);
  }
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

.color-picker{
  cursor: pointer;
  border-radius: 1em;
  padding-left: 5px;
  padding-right: 5px;
  color: var(--background_dark);
  &:hover{
    filter: var(--hover);
  }

  &.grey{
    background-color: var(--white);
  }
  &.blue{
    background-color: var(--blue);
  }
  &.cyan{
    background-color: var(--cyan);
  }
  &.pink{
    background-color: var(--pink);
  }
  &.purple{
    background-color: var(--purple);
  }
  &.orange{
    background-color: var(--orange);
  }
  &.yellow{
    background-color: var(--yellow);
  }
  &.green{
    background-color: var(--green);
  }
  &.red{
    background-color: var(--red);
  }
}

.content{
  border-left: 1px solid var(--text_color);
  margin-top: 5px;
  margin-left: 6px;
  padding-left: 5px;

  &.blue{
    border-left: 1px solid var(--blue);
  }
  &.cyan{
    border-left: 1px solid var(--cyan);
  }
  &.pink{
    border-left: 1px solid var(--pink);
  }
  &.purple{
    border-left: 1px solid var(--purple);
  }
  &.orange{
    border-left: 1px solid var(--orange);
  }
  &.yellow{
    border-left: 1px solid var(--yellow);
  }
  &.green{
    border-left: 1px solid var(--green);
  }
  &.red{
    border-left: 1px solid var(--red);
  }
}

.frame-footer-drag{
  position: absolute;
  right: 50%;
  color: var(--text_color);
  &:hover{
    cursor: pointer;
    filter: var(--hover)
  }
}

label{
  color: var(--background_dark);
  border-radius: 5px;
  cursor: pointer;
  padding-right: 5px;
  padding-left: 5px;

  &.grey{
    background-color: var(--white);
  }
  &.blue{
    background-color: var(--blue);
  }
  &.cyan{
    background-color: var(--cyan);
  }
  &.pink{
    background-color: var(--pink);
  }
  &.purple{
    background-color: var(--purple);
  }
  &.orange{
    background-color: var(--orange);
  }
  &.yellow{
    background-color: var(--yellow);
  }
  &.green{
    background-color: var(--green);
  }
  &.red{
    background-color: var(--red);
  }
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


  &.grey{
    color: var(--white);
    border: 1px solid var(--white);
  }
  &.blue{
    color: var(--blue);
    border: 1px solid var(--blue);
  }
  &.cyan{
    color: var(--cyan);
    border: 1px solid var(--cyan);
  }
  &.pink{
    color: var(--pink);
    border: 1px solid var(--pink);
  }
  &.purple{
    color: var(--purple);
    border: 1px solid var(--purple);
  }
  &.orange{
    color: var(--orange);
    border: 1px solid var(--orange);
  }
  &.yellow{
    color: var(--yellow);
    border: 1px solid var(--yellow);
  }
  &.green{
    color: var(--green);
    border: 1px solid var(--green);
  }
  &.red{
    color: var(--red);
    border: 1px solid var(--red);
  }
}

.edit-mode{
  &.grey{
    background-color: var(--gray_1);
  }
  &.blue{
    background-color: var(--blue);
    border: 1px solid var(--blue);
  }
  &.cyan{
    background-color: var(--cyan);
    border: 1px solid var(--cyan);
  }
  &.pink{
    background-color: var(--pink);
    border: 1px solid var(--pink);
  }
  &.purple{
    background-color: var(--purple);
    border: 1px solid var(--purple);
  }
  &.orange{
    background-color: var(--orange);
    border: 1px solid var(--orange);
  }
  &.yellow{
    background-color: var(--yellow);
    border: 1px solid var(--yellow);
  }
  &.green{
    background-color: var(--green);
    border: 1px solid var(--green);
  }
  &.red{
    background-color: var(--red);
    border: 1px solid var(--red);
  }
}

input{
  outline: none;
  font-size: 0.9em;
  &.blue{
    color: var(--blue);
  }
  &.cyan{
    color: var(--cyan);
  }
  &.pink{
    color: var(--pink);
  }
  &.purple{
    color: var(--purple);
  }
  &.orange{
    color: var(--orange);
  }
  &.yellow{
    color: var(--yellow);
  }
  &.green{
    color: var(--green);
  }
  &.red{
    color: var(--red);
  }
}

.edit-mode-container{
  display: flex;
}

</style>