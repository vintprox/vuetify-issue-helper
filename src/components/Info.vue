<template>
  <v-flex xs12>
    <v-card class="grey lighten-4">
      <v-card-title><span class="title">Information</span></v-card-title>
      <v-card-text>
        <p>
          This form is for submitting new issues to the <a href="https://www.github.com/vuetifyjs/vuetify">Vuetify</a> repository. If you're just looking for help, ask the community instead. We're super helpful, come <a href="https://chat.vuetifyjs.com">chat</a> with us!
        </p>

        <p>
          Any issues not created using this form will be closed immediately.
        </p>

        Before submitting an issue:
        <ol>
          <li>Create a codepen to illustrate the issue. Here's a <a href="https://template.vuetifyjs.com">template</a> to start you off.</li>
          <li>Search the repo and ensure your issue doesn't already exist. If so, it may:
            <ul>
              <li>Have already been fixed in an unreleased version.</li>
              <li>Have been closed without a solution. Please create a new issue instead of commenting on the old one.</li>
            </ul>
          </li>
        </ol>
      </v-card-text>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  name: 'info',
  data () {
    return {

    }
  }
}
</script>

<style scoped>

</style>
