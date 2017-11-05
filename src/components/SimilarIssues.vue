<template functional>
  <v-slide-y-transition>
    <v-card class="white" v-if="props.issues.length">
      <v-card-title primary-title class="title">
        <span>These issues look similar, did you mean...</span>
      </v-card-title>
      <v-card-text>
        <v-list>
          <template v-for="(issue, index) in props.issues">
            <v-divider v-if="index" :key="index"></v-divider>
            <v-list-tile :href="issue.url" target="_blank" :key="index">
              <v-list-tile-title>{{ issue.title }}</v-list-tile-title>
              <v-list-tile-actions><v-icon>open_in_new</v-icon></v-list-tile-actions>
            </v-list-tile>
          </template>
        </v-list>
      </v-card-text>
    </v-card>
  </v-slide-y-transition>
</template>

<script>
export default {
  name: 'similar-issues',

  props: {
    issues: {
      type: Array,
      required: true
    }
  }
}
</script>
