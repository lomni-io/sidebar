<template>
  <div class="switch-container">
    <label class="switch">
      <input @click="click" type="checkbox">
      <span class="slider round"></span>
    </label>
    <small v-if="isClicked">{{textOn}}</small>
    <small v-if="!isClicked">{{textOff}}</small>
  </div>
</template>

<script>
export default {
  name: "SwitchComponent",
  emits: ['clicked'],
  props: ['textOn', 'textOff'],
  data() {
    return {
      isClicked: false
    }
  },
  methods: {
    click(){
      if (this.isClicked){
        this.isClicked = false
      }else{
        this.isClicked = true
      }
      this.$emit('clicked', this.isClicked)
    }
  }
}
</script>

<style scoped>

.switch-container{
  display: flex;
  justify-items: center;
}

small{
  color: #8f969b;
  margin-left: 5px;
  user-select: none;
}

.switch {
  position: relative;
  display: inline-block;
  width: 30px;
  height: 17px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #4a586c;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 13px;
  width: 13px;
  left: 2px;
  bottom: 2px;
  background-color: #a0aabd;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  /*background-color: #7d8ba4;*/
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(13px);
  -ms-transform: translateX(13px);
  transform: translateX(13px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>