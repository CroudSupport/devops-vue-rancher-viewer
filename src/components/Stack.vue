<template>
      <div class="ui list">
<div v-for="service in stack.services" :key="service.uuid" class="item">
  <a v-bind:href="service.serviceLink" target="_newwin">
{{service.serviceLink}}
  </a>
  <croud-copy-button :text="service.serviceLink" class="ui icon button">
    <i class="cloud icon"></i>
  </croud-copy-button>
</div>
          </div>
</template>

<script>
// import _ from 'lodash'
import CroudCopyButton from 'croud-style-guide/src/components/shared/buttons/CopyButton'

export default {
    name: 'stack',
    components: { CroudCopyButton },
    props: {
        stack: Object,
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
