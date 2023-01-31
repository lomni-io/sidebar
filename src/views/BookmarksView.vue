<template>
<!--  <TabContainer class="sticky" title="search bar" :default-activation="true">-->
<!--    <SearchBar :render-data="renderData"></SearchBar>-->
<!--  </TabContainer>-->
<!-- TODO: change here to folder structure, with easy drag and drop and tags -->
<!-- this will help to see what to do next -->

  <div class="bookmarks" v-for="bookmark in bookmarkWindow.treeNode" :key="bookmark.id">
    <BookmarkContainer :bookmark="bookmark"></BookmarkContainer>

<!--    <div v-if="bookmark.children">-->
<!--      <BookmarkScaffold :bookmark="bookmark">-->
<!--        <div class="bookmark-children" v-for="children in bookmark.children" :key="children.id">-->
<!--        </div>-->
<!--      </BookmarkScaffold>-->
<!--    </div>-->

<!--    <div v-if="bookmark.url">-->
<!--    </div>-->

  </div>

</template>

<script>

import BookmarkContainer from "@/components/v2/bookmark/BookmarkContainer";
export default {
  name: "BookmarksView",
  props: ['bookmarkWindow'],
  components: {BookmarkContainer}
}
</script>

<style scoped>

.bookmarks{
  margin: 5px 0 0 5px;
}

</style>