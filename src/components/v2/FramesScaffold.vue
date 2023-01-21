<template>
  <div class="scafold-container">
    <div class="header">

      <div class="left-header">
        <div class="input" v-if="!finalCollapsed" @click="collapse(true)" :class="color">-</div>
        <div class="input" v-if="finalCollapsed" @click="collapse(false)" :class="color">+</div>
        <label :class="color">{{pinned.isDefault ? 'default' : tags.join(',')}} <span v-if="finalCollapsed"> - {{pinned.frames.length}} item(s)</span></label>
        <div class="collapsed" v-if="finalCollapsed" :class="color"></div>
      </div>

      <div class="right-header">
<!--        <div class="right-open" v-if="tags && tags.length > 0" @click="openAll">-->
<!--          <span><font-awesome-icon icon="tv" /> open</span>-->
<!--        </div>-->
        <div class="right-pin" v-if="!pinned.isDefault && !pinned.pinned" @click="save">
          <span><font-awesome-icon icon="thumbtack"/> pin</span>
        </div>
        <div class="right-pin" v-if="!pinned.isDefault && pinned.pinned" @click="save">
          <span><font-awesome-icon icon="thumbtack"/> unpin</span>
        </div>
      </div>

    </div>
    <div class="content" :class="color" v-if="!finalCollapsed">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {PinnedSearchData} from "@/store/renderData";
import {store} from "@/store";

export default defineComponent( {
  name: "FramesScaffold",
  props: ['groupId', 'pinned'],
  data() {
    return {
      color: 'grey',
      forceCollapse: null as boolean|null,
    }
  },
  computed: {
    finalCollapsed(){
      if (this.pinned.isDefault){
        return false
      }
      return this.forceCollapse !== null ? this.forceCollapse : this.pinned.collapsed
    },
    tags(){
      return this.pinned.tags.concat(this.pinned.preProcessedTags)
    },
  },
  methods: {
    save(){
      const newPinned: PinnedSearchData = {
        color: this.color,
        tags: this.pinned.tags,
        preProcessedTags: this.pinned.preProcessedTags
      }
      store.dispatch('upsertPinned', newPinned)
    },
    collapse(collapsed: boolean){
      this.forceCollapse = collapsed
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
      this.color = newColor
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
  justify-content: space-between;

  .left-header{
    display: flex;
  }
  .right-header{
    display: flex;

    .right-cancel{
      cursor: pointer;
      color: var(--scroll);
      margin-right: 5px;
    }
    .right-pin{
      cursor: pointer;
      color: var(--blue);
      margin-right: 5px;
    }
    .right-open{
      cursor: pointer;
      color: var(--blue);
      margin-right: 5px;
    }
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
    background-color: var(--scroll);
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