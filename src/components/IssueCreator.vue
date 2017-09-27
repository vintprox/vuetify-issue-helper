<template>
  <div>
    <info></info>
    <new-issue-form></new-issue-form>
  </div>
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
