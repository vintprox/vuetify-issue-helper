<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <information-box class="mt-3" />
      </v-col>
      <v-col cols="12">
        <new-issue-form />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import InformationBox from './InformationBox'
  import NewIssueForm from './NewIssueForm'

  export default {
    name: 'IssueCreator',

    components: {
      InformationBox,
      NewIssueForm,
    },
  }
</script>

<style lang="sass" scoped>
.container
  @media only screen and (min-width: 1264px)
    max-width: 600px

  @media only screen and (min-width: 960px)
    max-width: 800px
</style>
