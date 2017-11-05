<template>
  <v-container>
    <v-layout column>
      <InformationBox class="mt-3"></InformationBox>
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

<style lang="stylus" scoped>
.container
  @media only screen and (min-width: 1264px)
    max-width: 600px

  @media only screen and (min-width: 960px)
    max-width: 800px
</style>
