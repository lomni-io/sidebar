<template>
  <ul class="tags">
    <li v-for="(tag, index) in fixedTags" :key="index">
      <a class="tag fixed" @click="clickedTag(tag)">{{tag}}</a>
    </li>
    <li v-for="(tag, index) in tags" :key="index">
      <a class="tag" @click="clickedTag(tag)" draggable="true" @dragstart="dragstart" id="tag" :class="color">{{tag}}</a>
    </li>
  </ul>
</template>

<script>
export default {
  name: "TagContainer",
  props: ['tags', 'fixedTags', 'color'],
  methods: {
    clickedTag(tag){
      this.$emit('clickedTag', tag)
    },
    dragstart(){
    }
  }
}
</script>

<style scoped lang="scss">

.tags {
  list-style: none;
  margin: 0;
  display: flex;
  overflow-x: auto;
  padding: 0;
}

.tags::-webkit-scrollbar {
  display: none;  /* Safari and Chrome */
}

.tags li {
  float: left;
  cursor: pointer;
  margin-right: 5px;
}

.tag {
  background-color: var(--background_tag);
  border-radius: 3px;
  color: var(--text_color);
  padding: 0 0.5em 0 0.5em;
  text-decoration: none;
  -webkit-transition: color 0.2s;

  &.red{
    color: var(--red_60);
  }
}

.fixed{
  filter: var(--hover);
  font-weight: bold;
}

a{
  font-size: 0.8em;
}


.tag:hover {
  filter: var(--hover);
}


</style>