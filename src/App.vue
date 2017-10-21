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

<style lang="stylus">
  main > .content > .container
    @media only screen and (min-width: 1264px)
      max-width: 600px

    @media only screen and (min-width: 960px)
      max-width: 800px

  .toolbar__content > .toolbar__title
    font-weight: 100

  h6
    margin-bottom: 8px
</style>
