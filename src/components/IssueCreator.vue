<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <InformationBox class="mt-3"></InformationBox>
      </v-col>
      <v-col cols="12">
        <NewIssueForm></NewIssueForm>
      </v-col>
    </v-row>
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

<style lang="sass" scoped>
.container
  @media only screen and (min-width: 1264px)
    max-width: 600px

  @media only screen and (min-width: 960px)
    max-width: 800px
</style>
