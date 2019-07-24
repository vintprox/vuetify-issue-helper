<template>
  <v-card class="grey lighten-4">
    <v-card-title><span class="title">Information</span></v-card-title>
    <v-card-text>
      <p>
        This form is for submitting new issues to <a href="https://www.github.com/vuetifyjs" target="_blank">Vuetifyjs</a> repositories. If you're just looking for help, try asking the <a href="https://community.vuetifyjs.com" target="_blank" >community</a>!
      </p>

      <p>
        Any issues not created using this form will be closed immediately.
      </p>

      Before submitting an issue:
      <ul>
        <li>Search the repo and ensure your issue doesn't already exist. If so, it may:
          <ul>
            <li>Have already been fixed in an unreleased version.</li>
            <li>Have been closed without a solution. Please create a new issue instead of commenting on the old one.</li>
          </ul>
        </li>
        <li>Create a minimal reproduction to illustrate the issue. Here's a <a href="https://template.vuetifyjs.com">CodePen template</a> to start you off.
          <ul>
            <li>If you need a full project to reproduce, consider <a href="https://codesandbox.io/s/vue">CodeSandbox</a></li>
          </ul>
        </li>
      </ul>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'information-box'
}
</script>
