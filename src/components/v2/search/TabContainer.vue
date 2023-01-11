<template>
  <div id="tab" ref="tab" class="tab">
    <input type="checkbox">
    <label class="tab-label" :class="{'label-open': isActive}" @click="openTab" draggable="true">{{title}}</label>
    <div class="tab-content" ref="content" v-show="isActive">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabContainer",
  props: ['title', 'defaultActivation'],
  data() {
    return {
      isActiveButton: null,
      lastOffetY: null,
    }
  },
  watch: {
  },
  computed: {
    isActive(){
      if (this.isActiveButton === null){
        return this.defaultActivation
      }
      return this.isActiveButton
    }
  },
  methods: {
    openTab() {
      if (this.isActiveButton === null && this.defaultActivation){
        this.isActiveButton = false
      }else if (this.isActiveButton){
        this.isActiveButton = false
      }else{
        this.isActiveButton = true
      }

    },
  }
}
</script>

<style scoped lang="scss">


input {
  position: absolute;
  opacity: 0;
  z-index: -1;
}

.tab {
  width: 100%;
  overflow: hidden;
  &-label {
    display: flex;
    color: var(--text_color);
    user-select: none;
    padding-left: 2px;
    padding-right: 2px;
    justify-content: space-between;
    text-overflow: ellipsis;
    background: var(--background_input);
    border-bottom: solid var(--background_input_border) 1px;
    font-size: 0.8em;
    font-weight: bold;
    overflow: hidden;
    cursor: pointer;

    /* Icon */
    &:hover {
      filter: var(--hover);
    }
    &::after {
      content: "\276F";
      width: 1em;
      height: 1em;
      text-align: center;
      transition: all .10s;
    }
  }
}

.disabled{
  opacity: 0.4;
}

.label-open::after{
  transform: rotate(90deg);

}


.tab-content{
  overflow-y: auto;
  padding: 0;
  border-bottom: solid var(--background_input_border) 1px;
  resize: vertical;
  //height: calc(100vh - 3.6em - 21px);
  //max-height: 25vh;
  //min-height: 40px;
}


</style>