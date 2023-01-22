<template>
  <div>
    <p>press here to migrate</p>
    <div v-for="(frame, index) in frames" :key="index">
      <p @click="migrate(frame)">{{frame.url}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['frames'],
  name: "TmpMigrate",
  methods:{
    migrate(frame){
      console.log(frame)
      const titleAndTags = frame.title + ' ' + frame.tags.join(' ')
      // @ts-ignore
      this.port.postMessage({kind: "upsert-bookmark", url: frame.url, title: titleAndTags});
    },
  }
}
</script>

<style scoped>

</style>