<template>
  <div class="loading-container">
    <div class="ring-container">
      <div class="lds-dual-ring"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoadingContainer"
}
</script>

<style scoped>

.loading-container{
  top: 0;
  position: absolute;
  background-color: var(--background_main);
  opacity: 0.8;
  width: 100%;
  height: 100%;
  z-index: 1000;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.ring-container{
  width: 100%;
  display: flex;
  justify-content: center;
}

.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 24px;
  height: 24px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid var(--text_color);
  border-color: var(--text_color) transparent var(--text_color) transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

</style>