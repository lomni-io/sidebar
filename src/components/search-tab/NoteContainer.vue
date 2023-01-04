<template>
  <div class="text-area" contenteditable="true">hello world</div>
</template>

<script>
export default {
  name: "NoteContainer"
}
</script>

<style scoped>
.text-area{
  color: var(--text_color);
  font-size: 0.9em;
  font-family: monospace;
  outline: none;
}
</style>