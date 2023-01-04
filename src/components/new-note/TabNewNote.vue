<template>
  <TabContainer title="new note" :default-activation="false" padding="5px">
    <div contenteditable="true" class="text-area" aria-placeholder="note here" @focus="firstFocus" ref="textArea">add text here...</div>
  </TabContainer>
</template>

<script>
import TabContainer from "@/components/TabContainer";
export default {
  name: "TabNewNote",
  components: {TabContainer},
  data() {
    return {
    }
  },
  methods: {
    firstFocus(){
      if (this.$refs.textArea.innerText === 'add text here...'){
        this.$refs.textArea.innerText = ''
      }
    }
  }
}
</script>

<style scoped>

.text-area{
  color: var(--text_color);
  font-size: 0.9em;
  font-family: monospace;
  outline: none;
}

textarea{
  width: calc(100% - 5px);
  font-size: 0.8em;
  outline: none;
  background-color: transparent;
  color: var(--text_color);
  border: none;
}

</style>