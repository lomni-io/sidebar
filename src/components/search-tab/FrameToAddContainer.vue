<template>
    <div class="frame" v-if="tabDetail">
      <div class="frame-info">

        <div class="frame-header">
          <div class="frame-header-left">
            <img :src="tabDetail.favIconUrl" width="16">
            <small>{{getDomainFromUrl(tabDetail.url)}}</small>
          </div>
          <div class="frame-header-right">
            <div class="frame-header-add" @click="addNew" v-if="tags.length > 0" title="add new frame">
              <font-awesome-icon icon="fa-arrow-up-right-from-square" />
            </div>
          </div>
        </div>

        <h1 class="frame-title">{{tabDetail.title}}</h1>
        <div class="tags">
          <TagViewContainer :tags="tags" :fixed-tags="getDomainsFromUrl(tabDetail.url)"></TagViewContainer>
        </div>
        <small v-if="tags.length === 0">(need to add tags before save)</small>
      </div>
    </div>

</template>

<script>
import {getDomainFromUrl, getDomainsFromUrl} from "@/components/url";
import TagViewContainer from "@/components/search-tab/TagViewContainer";
import {store} from "@/store";

export default {
  name: "FrameToAddContainer",
  components: {TagViewContainer},
  props: ['tags'],
  methods: {
    getDomainFromUrl(url){
      return getDomainFromUrl(url)
    },
    getDomainsFromUrl(url){
      return getDomainsFromUrl(url)
    },
    addNew(){
      store.dispatch('upsertFrame', {
        url: this.tabDetail.url,
        title: this.tabDetail.title,
        tags: this.tags,
        favIconUrl: this.tabDetail.favIconUrl,
      })
    }
  },
  computed: {
    tabDetail(){
      const currentTab = this.$store.getters.activeTab
      const frames = this.$store.getters.frames

      if (!currentTab){
        return null
      }
      if (!currentTab.url){
        return null
      }

      // if has current frame
      if (frames.findLast(x => x.url === currentTab.url)) {
        return null
      }

      if (!currentTab.url){
        return null
      }

      return {
        url: currentTab.url,
        title: currentTab.title,
        favIconUrl: currentTab.favIconUrl,
        newFrame: true
      }
    }
  },
  watch: {

  },
}
</script>

<style scoped lang="scss">

.drag-icon{
  color: #e3dec3;
  background-color: #3c3c3c;
  padding: 0px;
  border-radius: 5px;
  cursor: pointer;
}

.frame{
  margin-bottom: 10px;

  small{
    font-size: 0.9em;
    color: var(--text_color);

    img{
      margin-right: 5px;
      vertical-align: middle;
    }
  }
  h1{
    font-size: 1.1em;
    color: var(--pink1);
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-height: 2em;
    cursor: pointer;
  }
  h1:hover{
    text-decoration-line: underline;
  }
}

.frame-title{
  text-align: left;
}


.frame-header{
  display: flex;
  align-items: center;
  justify-content: space-between;

  .frame-header-left{
    align-content: center;
    display: flex;
    img{
      margin-right: 5px;
    }
    small{
      font-size: 0.8em;
      color: var(--text_color);
    }
  }

  .frame-header-right{
    div{
      margin-right: 5px;
    }

    .frame-header-add{
      width: 12px;
      height: 12px;
      color:  var(--green_60_60);
      border-radius: 10px;
      font-size: 0.8em;
      &:hover{
        cursor: pointer;
        filter: var(--hover);
      }
    }
  }

}

</style>