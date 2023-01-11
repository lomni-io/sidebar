<template>
<!--  <div class="hover-area" ></div>-->
  <div class="hover-area" v-if="dragItem && dragItem.kind === 'frame'" @dragover="dragover"></div>
  <div v-if="isOver" class="drop-area">

  </div>
</template>

<script>
import {store} from "@/store";

export default {
  name: "FrameDropArea",
  components: {},
  data() {
    return {
      dragOver: false,
      currDate: Date.now(),
      lastOver: null,
      interval: null
    }
  },
  computed: {
    isOver(){
      // check if is current item here
      return this.currDate - 100 < this.lastOver
    },
    dragItem(){
      return store.getters.dragItem
    }
  },
  watch: {
    dragItem(item){
      if (item){
        if (!this.interval){
          const k = this
          this.interval = setInterval(function (){
            k.currDate = Date.now()
          }, 100)
        }
      }else{
        clearInterval(this.interval);
        this.interval = null
      }
    }
  },
  methods: {
    dragover(){
      this.lastOver = Date.now()
    },
  },
  mounted() {

  }
}
</script>

<style scoped>

.hover-area{
  width: 80%;
  height: 50px;
  position: absolute;
  /*background-color: red;*/
  margin-left: -5px;
  margin-top: -25px;
  z-index: 10000000;
}

.drop-area{
  height: 90px;
}

</style>