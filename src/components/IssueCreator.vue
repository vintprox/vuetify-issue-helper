<template>
  <v-responsive
    class="mx-auto"
    max-width="800"
  >
    <v-container class="py-12">
      <v-row>
        <v-col cols="12">
          <information-box />
        </v-col>

        <v-col cols="12">
          <new-issue-form />
        </v-col>
      </v-row>
    </v-container>
  </v-responsive>
</template>

<script>
  export default {
    name: 'IssueCreator',

    components: {
      InformationBox: () => import('./InformationBox'),
      NewIssueForm: () => import('./NewIssueForm'),
    },
  }
</script>
