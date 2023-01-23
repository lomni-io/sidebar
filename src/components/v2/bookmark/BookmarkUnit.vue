<template>

    <div class="bookmark-info-container" ref="bookmark" id="bookmark">
      <div class="bookmark-info">
        <div class="bookmark-header">
          <div class="bookmark-header-left">
            <img :src="bookmark.favIconUrl" width="16">
            <small >{{bookmark.title}}</small>
          </div>
        </div>
      </div>
    </div>
</template>

<script lang="ts">

import {defineComponent} from "vue";

// TODO: copy link buttom
export default defineComponent( {
  name: "BookmarkUnit",
  components: {},
  props: ['bookmark'],
  data() {
    return {
    }
  },
  computed: {

  },
  methods: {

  }
})

</script>

<style scoped lang="scss">


.bookmark{
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

.bookmark-info-container{
  padding: 5px;
  background-color: var(--background_input);
  border: 1px solid var(--bookmark_border);
  border-radius: 5px;
  margin-bottom: 5px;
  position: relative;
  &:hover{
    cursor: pointer;
    filter: var(--hover);
  }
}

.current-selected{
  color: var(--purple);
}

.bookmark-header{
  display: flex;
  align-items: center;
  justify-content: space-between;

  .bookmark-header-left{
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


.bookmark-title{
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
.bookmark-tags{

}


.title-container{
  display: flex;
  align-items: center;
}


.tags{
  width: calc(100% - 10px);
}

</style>