<template>
  <div id="tab" ref="tab" class="tab">
    <input type="checkbox" ref="chck1">
    <label class="tab-label" :class="{'label-open': isActive, 'disabled': isDisabled, 'inner': isInner}" :style="{'padding-left': paddingLeft}" @click="openTab" draggable="true">{{title}}{{subtitle ? ' - ' +subtitle : ''}}</label>
    <div class="tab-content" :style="{'min-height': minHeight, 'padding': padding}" ref="content" v-show="isActive">
      <slot></slot>
    </div>
    <p class="resizer" ref="resizer" @drag="dragMove" draggable="true" v-if="canResize && isActive"></p>
  </div>
</template>

<script>
export default {
  name: "TabContainer",
  props: ['title', 'canResize', 'defaultActivation', 'minHeight', 'padding', 'subtitle','disabled', 'paddingLeft', 'isInner'],
  data() {
    return {
      isActiveButton: null,
      lastOffetY: null,
    }
  },
  watch: {
    disabled(){
      this.isActiveButton = null
    }
  },
  computed: {
    isDisabled(){
      return this.disabled
    },
    isActive(){
      if (this.isDisabled){
        return false
      }
      if (this.isActiveButton === null){
        return this.defaultActivation
      }
      return this.isActiveButton
    }
  },
  methods: {
    subtitleHere(){
      console.log("opaaa")
    },
    dragMove(e){
      if (!this.lastOffetY) {
        this.lastOffetY = e.clientY
        return
      }
      if (e.clientY !== this.lastOffetY && e.buttons === 1) {
        const absoluteY = e.clientY - this.lastOffetY
        this.lastOffetY = e.clientY
        this.$refs.content.style.maxHeight = this.$refs.content.clientHeight + absoluteY + 'px'
      }
    },
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
    background: var(--background_tab);
    border-bottom: solid var(--gray_1) 1px;
    font-size: 0.8em;
    font-weight: bold;
    max-height: 1.2em;
    overflow: hidden;
    cursor: pointer;

    &.inner{
      background-color: var(--background_inner_tab);
    }

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
  //min-height: 40px;
}


.resizer{
  //background-color: #343434;
  width: 100%;
  height: 2px;
  margin: 0;
  cursor: all-scroll;
}

</style>