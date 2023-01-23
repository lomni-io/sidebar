<template>

  <div v-if="bookmark.children && bookmark.children.length > 0">
    <BookmarkScaffold :bookmark="bookmark">
      <div class="bookmark-children" v-for="children in bookmark.children" :key="children.id">
        <BookmarkContainer :bookmark="children"></BookmarkContainer>
      </div>
    </BookmarkScaffold>

  </div>

  <div v-if="!bookmark.children">
    <BookmarkUnit :bookmark="bookmark"></BookmarkUnit>
  </div>

</template>

<script lang="ts">
import {defineComponent} from "vue";
import BookmarkScaffold from "@/components/v2/bookmark/BookmarkScaffold.vue";
import BookmarkUnit from "@/components/v2/bookmark/BookmarkUnit.vue";

export default defineComponent( {
  components: {BookmarkUnit, BookmarkScaffold},
  props: ['bookmark'],
  name: "BookmarkContainer"
})

</script>

<style scoped>

</style>