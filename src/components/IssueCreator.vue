<template>
  <v-container>
    <v-layout row wrap>
      <info></info>
      <new-issue-form></new-issue-form>
    </v-layout>
  </v-container>
</template>

<script>
import Info from './Info'
import NewIssueForm from './NewIssueForm'

export default {
  name: 'issue-creator',
  components: {
    Info,
    NewIssueForm
  }
}
</script>

<style scoped>

</style>
