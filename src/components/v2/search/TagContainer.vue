<template>
  <ul class="tags">
    <li v-for="(tag, index) in fixedTags" :key="index">
      <a class="tag fixed" @click="clickedTag(tag)">{{tag}}</a>
    </li>
    <li v-for="(tag, index) in tags" :key="index">
      <a class="tag" @click="clickedTag(tag)" draggable="true">{{tag}}</a>
    </li>
  </ul>
</template>

<script>
export default {
  name: "TagContainer",
  props: ['tags', 'fixedTags'],
  methods: {
    clickedTag(tag){
      this.$emit('clickedTag', tag)
    }
  }
}
</script>

<style scoped>

.tags {
  list-style: none;
  margin: 0;
  overflow: hidden;
  padding: 0;
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
  display: inline-block;
  padding: 0 0.5em 0 0.5em;
  text-decoration: none;
  -webkit-transition: color 0.2s;
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