<template>
  <div class="smart">
    <smart-tagz
        input-placeholder="Select Countries ..."
        autosuggest
        editable
        :sources="['dada']"
        :default-tags="['United Kingdom', 'Uruguay', 'Uzbekistan', 'Venezuela', 'Vietnam', 'Virgin Islands (US)', 'Yemen', 'Zambia', 'Zimbabwe']"
    />
  </div>
</template>

<script>
import {SmartTagz} from "smart-tagz";
import "smart-tagz/dist/smart-tagz.css";

export default {
  name: "WithSmartView",
  components: {
    SmartTagz
  }
}
</script>

<style scoped>

</style>