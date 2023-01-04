<template>
  <div class="sidebar" ref="sidebar">
    <div class="sidebar-content"><RadarView></RadarView></div>
    <div class="sidebar-divider" v-on:mousemove="mousemove" v-on:mouseleave="mouseleave" v-on:mousedown="mousedown" v-on:mouseup="mouseup"></div>
  </div>
</template>

<script>
import RadarView from "@/views/RadarView";
export default {
  name: "SidebarView",
  components: {RadarView},
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
        this.$refs.sidebar.style.width = e.clientX+60 + 'px'
      }
    }
  }
}
</script>

<style scoped>


.sidebar{
  position: fixed;
  top: 0;
  left: 0;
  width: 400px;
  height: 100%;
  display: flex;
  justify-content: space-between;
  min-width: 350px;
  max-width: 80vw;
}
.sidebar-content{
  width: 100%;
}


.sidebar-divider{
  width: 120px;
  /*background-color: red;*/
  height: 100%;
  background: linear-gradient(90deg, var(--background-sidebar), rgba(255,255,255,0));
  cursor: col-resize;
}

.container-background{
  width: 100px;
  height: 100%;
  background-color: red;
}

</style>