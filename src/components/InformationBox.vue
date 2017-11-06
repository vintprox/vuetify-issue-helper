<template functional>
  <v-card class="grey lighten-4">
    <v-card-title><span class="title">Information</span></v-card-title>
    <v-card-text>
      <p>
        This form is for submitting new issues to the <a href="https://www.github.com/vuetifyjs/vuetify" target="_blank">Vuetify</a> repository. If you're just looking for help, ask the community instead. We're super helpful, come <a href="https://chat.vuetifyjs.com">chat</a> with us!
      </p>

      <p>
        Any issues not created using this form will be closed immediately.
      </p>

      Before submitting an issue:
      <ol>
        <li>Create a minimal reproduction to illustrate the issue. Here's a <a href="https://template.vuetifyjs.com">CodePen template</a> to start you off.
          <ul>
            <li>If you need a full project to reproduce, consider <a href="https://codesandbox.io/s/vue">CodeSandbox</a></li>
          </ul>
        </li>
        <li>Search the repo and ensure your issue doesn't already exist. If so, it may:
          <ul>
            <li>Have already been fixed in an unreleased version.</li>
            <li>Have been closed without a solution. Please create a new issue instead of commenting on the old one.</li>
          </ul>
        </li>
      </ol>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'information-box'
}
</script>
