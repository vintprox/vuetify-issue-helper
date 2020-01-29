<template functional>
  <v-slide-y-transition>
    <v-card
      v-if="props.issues.length"
      class="white"
    >
      <v-card-title
        primary-title
        class="title"
      >
        <span>These issues look similar, did you mean...</span>
      </v-card-title>
      <v-card-text>
        <v-list>
          <template v-for="(issue, index) in props.issues">
            <v-divider
              v-if="index"
              :key="`${index}-div`"
            />
            <v-list-item
              :key="index"
              :href="issue.url"
              target="_blank"
            >
              <v-list-item-title>{{ issue.title }}</v-list-item-title>
              <v-list-item-action><v-icon>mdi-launch</v-icon></v-list-item-action>
            </v-list-item>
          </template>
        </v-list>
      </v-card-text>
    </v-card>
  </v-slide-y-transition>
</template>

<script>
  export default {
    name: 'SimilarIssues',

    props: {
      issues: {
        type: Array,
        required: true,
      },
    },
  }
</script>
