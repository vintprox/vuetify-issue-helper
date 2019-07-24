<template>
  <v-app>
    <v-app-bar app elevate-on-scroll>
      <div class="flex-grow-1"></div>
      <div class="mr-2">
        <v-img :src="require('./assets/v.png')" width="32" contain />
      </div>
      <v-toolbar-title class="font-weight-light" v-text="title" />
      <div class="flex-grow-1"></div>
    </v-app-bar>
    <v-content class="white">
      <v-slide-y-transition mode="out-in">
        <router-view></router-view>
      </v-slide-y-transition>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      title: 'Vuetify Issue Creator'
    }
  }
}
</script>
