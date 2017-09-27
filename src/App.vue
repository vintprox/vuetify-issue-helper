<template>
  <v-app light>
    <v-toolbar fixed>
      <v-spacer></v-spacer>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <main>
      <v-container fluid>
        <v-slide-y-transition mode="out-in">
          <router-view></router-view>
        </v-slide-y-transition>
      </v-container>
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
