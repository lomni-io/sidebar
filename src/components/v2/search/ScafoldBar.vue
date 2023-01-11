<template>
  <div class="scafold-container">
    <div class="header">
      <div class="input" :class="color">+</div>
      <label :class="color">{{title}}</label>
    </div>
    <div class="content" :class="color" >
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent( {
  name: "ScafoldBar",
  props: ['title', 'color']
})

</script>

<style scoped lang="scss">

.scafold-container{
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

</style>