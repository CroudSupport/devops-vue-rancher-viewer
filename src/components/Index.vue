<template>
<div>

     <semantic-modal v-model="showModal"  :settings="{content_classes: {content: true}, closeable: true, closeable_button: true}" :title="modalTitle" @close-modal="showModal = false">
        <VueObjectView v-model="modalContent" :options="{maxDepth: 3}" />
    </semantic-modal>


<table class="ui celled padded table">
<thead>
<tr>
<th>Stack Name<input v-model="stackFilter" /><span>{{stackFilter}}</span></th>
<th>Services<input v-model="serviceFilter"/></th>
</tr></thead>
<tbody>
<tr v-for="stack in orderedStacks" :key="stack.uuid">
<td class="single line">
<span>{{stack.name}}</span>
<button @click="ShowModal(stack.raw)" class="ui button">Show</button>
</td>
<td class="center aligned">
<stack :stack="stack"></stack>
</td>
</tr>
</tbody>
</table>
</div>
</template>

<script>
// import _ from 'lodash'

import VueObjectView from "vue-object-view";
// Vue.use(TreeView)
import Stack from "./Stack";

export default {
  name: "HelloWorld",
  components: { Stack, VueObjectView },
  data() {
    return {
      stackFilter: "",
      serviceFilter: "",
      currentStack: null,
      showModal: false,
      modalContent: null,
      modalTitle: null,
      data: []
    };
  },
  methods: {
    ShowModal(stack) {
      this.modalContent = stack;
      this.modalTitle = stack.name;
      this.showModal = true;
    }
  },
  computed: {
    orderedStacks() {
      const result = this.data
        .map(stack => ({
          ...stack,
          raw: stack,
          services: stack.services
            .filter(service => service.name.indexOf(this.serviceFilter) > -1)
            .map(service => {
              // TODO get this from metadata
              let port = "";
              if (service.name.indexOf("flower") > -1) {
                port = ":5555";
              } else if (service.name.indexOf("pgadmin") > -1) {
                port = ":5050";
              }
              return {
                name: service.name,
                serviceLink: `http://${service.name}.${stack.name}${port}/`
              };
            })
        }))
        .filter(
          stack =>
            stack.name.indexOf(this.stackFilter) > -1 &&
            stack.services.length > 0
        );
      return result;
    }
  },
  mounted() {
    this.$http
      .get("http://rancher-metadata.rancher.internal/latest/stacks", {
        headers: { Accept: "application/json" }
      })
      .then(response => {
        this.data = response.data;
      });
  }
};
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
