<template>
  <div class="scafold-container" v-on:focusout="goToViewMode">
    <div class="header">
      <div class="input" v-if="!isFolded && !editMode" @click="fold" :class="color">+</div>
      <div class="input" v-if="isFolded && !editMode" @click="unFold" :class="color">-</div>
      <label :class="color" @click="goToEditMode" v-if="!editMode">{{title}}</label>
      <div class="edit-mode-container" v-if="editMode" ref="input">
        <div class="input edit-mode" :class="color" >e</div>
        <input v-model="newTitle" :class="color" >
      </div>

<!--      <div :class="color" class="color-picker"></div>-->
    </div>
    <div class="content" :class="color" v-if="!isFolded">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent( {
  name: "ScafoldBar",
  props: ['title', 'color'],
  data() {
    return {
      editMode: false,
      newTitle: null,
      isFolded: false
    }
  },
  methods: {
    fold(){
      this.isFolded = true
    },
    unFold(){
      this.isFolded = false
    },
    goToViewMode(){
      this.editMode = false
    },
    goToEditMode(){
      this.editMode = true
      this.newTitle = this.title

      this.$nextTick(() => {
        const html = this.$refs.input as HTMLInputElement
        html.focus()
      });

    }
  }
})

</script>

<style scoped lang="scss">

.scafold-container{
  user-select: none;
  margin-bottom: 5px;
}

.header{
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
    border-left: 1px solid var(--blue_60);
  }
  &.red{
    border-left: 1px solid var(--red_60);
  }
}

label{
  color: var(--text_color);
  cursor: pointer;
  &.red{
    color: var(--red_60);
  }
  &.blue{
    color: var(--blue_60);
  }
}

.color-picker{
  cursor: pointer;
  width: 25px;
  height: 6px;
  border-radius: 4px;
  margin-left: 20px;
  &.blue{
    background-color: var(--blue_60);
  }
  &.red{
    background-color: var(--red_60);
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
    color: var(--blue_60);
    border: 1px solid var(--blue_60);
  }
  &.red{
    color: var(--red_60);
    border: 1px solid var(--red_60);
  }
}

.edit-mode{
  &.blue{
    background-color: var(--blue_60);
    border: 1px solid var(--blue_60);
  }
  &.red{
    background-color: var(--red_60);
    border: 1px solid var(--red_60);
  }
}

input{
  outline: none;
  font-size: 0.9em;
  &.red{
    color: var(--red_60);
  }
  &.blue{
    color: var(--blue_60);
  }
}

.edit-mode-container{
  display: flex;
}

</style>