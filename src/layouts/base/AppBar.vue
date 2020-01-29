<template>
  <v-app-bar
    app
    color="white"
    elevate-on-scroll
  >
    <v-responsive
      class="mx-auto px-3"
      max-width="800"
    >
      <div class="d-flex align-center">
        <v-img
          :src="require('@/assets/v.png')"
          class="mr-3"
          contain
          max-width="40"
        />

        <v-toolbar-title class="font-weight-light">
          Vuetify Issue Creator
        </v-toolbar-title>

        <v-spacer />

        <v-btn
          color="primary"
          depressed
          href="https://vuetifyjs.com/?ref=issues.vuetifyjs.com"
          target="_blank"
        >
          Documentation

          <v-icon right>
            mdi-open-in-new
          </v-icon>
        </v-btn>
      </div>
    </v-responsive>
  </v-app-bar>
</template>

<script>
  export default { name: 'BaseAppBar' }
</script>
