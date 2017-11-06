<template>
  <v-app light>
    <v-toolbar fixed app>
      <v-spacer></v-spacer>
      <img src="/static/favicon-32x32.png">
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <main>
      <v-content>
        <v-slide-y-transition mode="out-in">
          <router-view></router-view>
        </v-slide-y-transition>
      </v-content>
    </main>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        title: 'Vuetify Issue Creator'
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .toolbar__title
    font-weight: 100
</style>
