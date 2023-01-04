<template>
  <ul class="tags">
    <li v-for="(item, index) in items" :key="index">
      <a href="#" class="tag" :style="getCount(item.count)" v-on:click="selectTag($event, item)">{{item.name}}</a>
    </li>

    <li v-if="displayShow > 0">
      <a href="#" class="tag-add" @click="showMore">+{{displayShow}}</a>
    </li>
  </ul>
</template>

<script>

export default {
  name: "TagListContainer",
  emits: ['addTag'],
  props: ['tags', 'initialShow'],
  data(){
    return {
      styleObject: {'--count': "'12'"},
      moreToShow: 0
    }
  },
  computed: {
    displayShow(){
      return this.tags.length - this.initialShow - this.moreToShow
    },
    slice(){
      return this.initialShow + this.moreToShow
    },
    items(){
      const tags = JSON.parse(JSON.stringify(this.tags))
      return tags.splice(0, this.slice).sort((x,y) => x.count < y.count ? 1: -1)
    },
  },
  methods: {
    showMore(){
      this.moreToShow += 10
    },
    getCount(count){
      return {'--count': `'${count}'`}
    },
    selectTag(e, tag){
      this.$emit('addTag', tag)
      e.preventDefault()
    }
  }
}
</script>

<style scoped lang="scss">


.tags {
  list-style: none;
  margin: 0;
  overflow: hidden;
  padding: 0;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.tags li {
  float: left;
}

.tag-add {
  font-size: 0.7em;
  background-color: var(--bg1);
  border-radius: 3px;
  color: var(--text_color);
  display: inline-block;
  padding: 0 0.2em 0 0.2em;
  position: relative;
  margin: 0 7px 5px 0;
  text-decoration: none;
  -webkit-transition: color 0.2s;
}

.tag-add:hover {
  background-color: var(--gray_1);
  color: white;
}

.tag {
  font-size: 0.7em;
  background-color: var(--bg1);
  border-radius: 3px;
  color: var(--text_color);
  display: inline-block;
  padding: 0 0.2em 0 0.2em;
  position: relative;
  margin: 0 7px 5px 0;
  text-decoration: none;
  -webkit-transition: color 0.2s;

  --count: '20';

  &::after {
    background-color: var(--bg1);
    content: var(--count);
    font-weight: bold;
    font-size: 8px;
    position: absolute;
    text-align: center;
    right: -5px;
    top: 10px;
    width: 10px;
    border-radius: 10px;
    height: 10px;
  }
}

.tag:focus {
  outline: none;
  filter: var(--hover);
}


a{
  font-size: 0.8em;
}


.tag:hover {
  filter: var(--hover);
}

</style>