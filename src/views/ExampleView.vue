<template>
  <div id="example" >
    <div class="plugin" ref="plugin">
      <div class="plugin-content"></div>
      <div class="plugin-divider" v-on:mousemove="mousemove" v-on:mouseleave="mouseleave" v-on:mousedown="mousedown" v-on:mouseup="mouseup">
      </div>
    </div>
    <div class="container">
      <h1>This is a example</h1>
      <p>This is how it works</p>
    </div>
  </div>
</template>

<script>

export default {
  name: "ExampleView",
  data() {
    return {
      isMouseDown: false
    }
  },
  methods: {
    mousedown(e){
      this.isMouseDown = true
      e.preventDefault()
    },
    mouseup(e){
      this.isMouseDown = false
      e.preventDefault()
    },
    mouseleave(e){
      this.isMouseDown = false
      e.preventDefault()
    },
    mousemove(e){
      e.preventDefault()
      if (this.isMouseDown){
        this.$refs.plugin.style.width = e.clientX+15 + 'px'
      }
    }
  }
}
</script>

<style scoped>

.plugin{
  background-color: red;
  position: fixed;
  top: 0;
  left: 0;
  width: 250px;
  height: 100%;
  display: flex;
  justify-content: space-between;
  min-width: 200px;
  max-width: 80vw;

}


.plugin-divider{
  width: 30px;
  height: 100%;
  border-right: #42b983 5px solid;
  cursor: col-resize;
}
</style>