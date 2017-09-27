<template>
  <v-container>
    <v-layout>
      <v-flex>
        <v-card>
          <v-card-title class="green white--text" primary-title>
            <span class="title">Success</span>
          </v-card-title>
          <v-card-text>
            <span>We've submitted your issue to the Vuetify team and it will be reviewed.</span>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn primary to="/">Submit Another</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>