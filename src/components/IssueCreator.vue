<template>
  <v-container>
    <v-layout column>
      <InformationBox></InformationBox>
      <NewIssueForm></NewIssueForm>
    </v-layout>
  </v-container>
</template>

<script>
import InformationBox from './InformationBox'
import NewIssueForm from './NewIssueForm'

export default {
  name: 'issue-creator',

  components: {
    InformationBox,
    NewIssueForm
  }
}
</script>
