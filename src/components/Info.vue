<template>
  <v-container>
    <v-layout>
      <v-flex>
        <div class="elevation-2 pa-3 grey lighten-4">
          <div class="pt-2 body">
            <p>
              This form is to make submitting new issues to the <a href="https://www.github.com/vuetifyjs/vuetify">Vuetify Repo</a> easier.
            </p>
            <p>If you're just looking for help, ask the community! We're super helpful, come <a href="https://chat.vuetifyjs.com">chat</a> with us!</p>

            Before submitting an issue:
            <ol>
              <li>Create a codepen to illustrate the issue. Here's a <a href="https://template.vuetifyjs.com">template</a> to start you off.</li>
              <li>Search the repo and ensure your issue doesn't already exist. If so, it may:
                <ul>
                  <li>Have already been fixed in an unreleased version.</li>
                  <li>Need to be reopened if the issue is still present.</li>
                </ul>
              </li>
            </ol>
          </div>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
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
