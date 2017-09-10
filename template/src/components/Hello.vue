<template>
  <q-layout>
    <q-toolbar slot="header" class="glossy">
      <q-toolbar-title>
        Quasar + Express boilerplate
      </q-toolbar-title>
    </q-toolbar>

    <!--
      Replace following "div" with
      "<router-view class="layout-view">" component
      if using subRoutes
    -->
    <div class="layout-padding">
      <h1>Express routes</h1>
      <ul>
        <li>GET <a v-on:click="getUser()">/api/users</a></li>
        <li>GET <a v-on:click="getUser(1)">/api/users/1</a></li>
        <li>GET <a v-on:click="getUser(4)">/api/users/4</a></li>
        <li>GET <a v-on:click="getUser('1..3')">/api/users/1..3</a></li>
        <li>GET <a v-on:click="getUser('1..3.json')">/api/users/1..3.json</a></li>
        <li>DELETE <a v-on:click="deleteUser(4)">/api/users/4</a></li>
      </ul>
      <h1>Express response</h1>
      <textarea v-model="response" readonly class="full-width"></textarea>
    </div>
  </q-layout>
</template>

<script>
import {
  QLayout,
  QToolbar,
  QToolbarTitle
} from 'quasar'

export default {
  name: 'index',
  components: {
    QLayout,
    QToolbar,
    QToolbarTitle
  },
  data () {
    return {
      response: ''
    }
  },
  computed: {
  },
  methods: {
    getUser (id) {
      this.users.get({id: id}).then(response => {
        this.$data.response = JSON.stringify(response.body)
      })
    },
    deleteUser (id) {
      this.users.delete({id: id}).then(response => {
        this.$data.response = JSON.stringify(response.body)
      })
    }
  },
  mounted () {
    this.users = this.$resource('api/users{/id}')
  },
  beforeDestroy () {
  }
}
</script>

<style lang="styl">
</style>
