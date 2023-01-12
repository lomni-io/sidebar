<template>
  <div class="scafold-container">
    <div class="header">
      <div class="input" v-if="!collapsed && !editMode" @click="collapse(true)" :class="color">-</div>
      <div class="input" v-if="collapsed && !editMode" @click="collapse(false)" :class="color">+</div>
      <label :class="color" v-if="!editMode">{{title}} <span v-if="collapsed"> - {{countFrames}} item(s)</span></label>
      <div class="collapsed" v-if="collapsed" :class="color"></div>
    </div>
    <div class="content" :class="color" v-if="!collapsed">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent( {
  name: "FramesScaffold",
  props: ['title', 'color', 'countFrames'],
  data() {
    return {
      collapsed: false,
      editMode: false,
      newTitle: null,
    }
  },
  methods: {
    collapse(collapsed: boolean){
      this.collapsed = collapsed
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
  display: flex;
  align-items: center;
  font-size: 0.7em;

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

label{
  color: var(--text_color);
  cursor: pointer;

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

.color-picker{
  cursor: pointer;
  width: 25px;
  height: 6px;
  border-radius: 4px;
  margin-left: 20px;

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