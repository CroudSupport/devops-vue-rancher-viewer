<template>
  <div class="hello">
    <!-- <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
      <br>
      <li><a href="http://vuejs-templates.github.io/webpack/" target="_blank">Docs for This Template</a></li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul> -->
    <!-- <semantic-form-dropdown ref="currentStack"  > -->
<!-- <option v-for="option in data" :value="option.uuid" :key="option.uuid">
  {{ option.name }}
</option> -->
<!-- <option v-for="d in data" v-bind:value="d" :key="d.uuid" >{{d.name}}</option>
    </semantic-form-dropdown> -->

    <select v-model="currentStack" >
  <!-- inline object literal -->
  <option v-for="d in orderedStacks" v-bind:value="d" :key="d.uuid" >{{d.name}}</option>
</select>
    <div>
      {{ currentStack.uuid }}
      </div>
    <!-- <div v-for="d in data" :key="d.id">{{ d.title }}</div> -->
  <!-- <stack></stack> -->
  </div>

</template>

<script>
import _ from 'lodash'
import Stack from './Stack'
export default {
  name: "HelloWorld",
  components: { Stack },
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      test: "test",
      currentStack: {
        uuid: null
      },
      thing: null,
      data: []
    };
  },
  computed: {
    orderedStacks: function() {
      return _.orderBy(this.data, "name");
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
