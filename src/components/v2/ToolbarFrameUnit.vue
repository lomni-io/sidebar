<template>
  <a href="#" @click="click">

    <div class="frame-info-container" ref="frame" id="frame" >
      <div class="frame-info">
        <div class="frame-header">
          <div class="frame-header-left">
            <img v-if="frame.favIconUrl" :src="frame.favIconUrl" width="16">
            <small  :class="{'current-selected': frame.isSelected}" >{{frame.title}}</small>
          </div>
        </div>

        <div class="frame-footer">
          <div class="tags">
            <TagContainer :tags="frame.tags" :fixed-tags="frame.preProcessedTags"></TagContainer>
          </div>
        </div>
      </div>
    </div>

  </a>

</template>

<script lang="ts">

import {defineComponent} from "vue";
import TagContainer from "@/components/v2/TagContainer.vue";

// TODO: copy link buttom
export default defineComponent( {
  name: "ToolbarFrameUnit",
  emits: ['selected'],
  components: {TagContainer},
  props: ['frame'],
  data() {
    return {
    }
  },
  computed: {

  },
  methods: {
    click(e: any){
      this.$emit('selected', this.frame)
      e.preventDefault()
    }
  }
})

</script>

<style scoped lang="scss">


.frame{
}
a{
  text-decoration: none;
}

a:focus{
  filter: var(--hover);
  outline:none;
}

a:hover{
  filter: var(--hover);
  outline:none;
}

.frame-info-container{
  padding: 5px;
  background-color: var(--background_input);
  border: 1px solid var(--frame_border);
  border-radius: 5px;
  margin-bottom: 5px;
  position: relative;
  &.open{
    background-color: var(--background_frame_selected);
  }
}

.current-selected{
  color: var(--purple);
}

.frame-header{
  display: flex;
  align-items: center;
  justify-content: space-between;

  .frame-header-left{
    cursor: pointer;
    align-content: center;
    display: flex;
    img{
      margin-right: 5px;
    }
    .copy{
      margin-left: 5px;
      opacity: 0.7;
      &:hover{
        filter: var(--hover);
      }
    }
    small{
      font-size: 0.8em;
      color: var(--text_color);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 60vw;

      &.current-selected{
        color: var(--purple);
      }
    }
  }

}


.frame-title{
  display: inline-block;
  max-width: 100%;
  text-align: left;
  margin: 0;
}


h1{
  font-size: 1.1em;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-height: 2em;
  cursor: pointer;
}
h1:hover{
  filter: var(--hover);
}
.frame-tags{

}


.title-container{
  display: flex;
  align-items: center;
}


.tags{
  width: calc(100% - 10px);
}

</style>