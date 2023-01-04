<template>
  <div class="home">
    <img alt="Vue logo" src="../../public/logo_dark.png" width="140" height="120">
    <h1>Lomni</h1>
    <small>beta version</small>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

@Options({
  components: {
    HelloWorld,
  },
})
export default class HomeView extends Vue {}
</script>

<style>
img{
  text-align: center;
}
h1{
  text-align: center;
}
small{
  text-align: center;
}

</style>