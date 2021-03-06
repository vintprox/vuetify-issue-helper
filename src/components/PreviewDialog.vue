<template>
  <v-dialog
    v-model="lazyValue"
    width="640"
    scrollable
  >
    <v-card>
      <v-card-title class="headline primary white--text">
        {{ issueTitle }}
      </v-card-title>
      <v-card-text
        class="markdown-body"
        v-html="issueHTML"
      />
      <v-card-actions>
        <div class="flex-grow-1" />
        <v-btn
          color="error"
          text
          @click="lazyValue = false"
        >
          <v-icon>mdi-close</v-icon> Cancel
        </v-btn>
        <v-btn
          color="blue darken-1"
          text
          tag="a"
          target="_blank"
          rel="noopener"
          :href="githubUrl"
          @click="ensureCreation"
        >
          Create
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import { format } from 'url'
  import { generateMarkdown } from '@/lib/markdownGenerator'
  import marked from 'marked'

  export default {
    name: 'PreviewDialog',

    props: {
      issue: {
        type: Object,
        required: true,
      },
      value: Boolean,
    },

    data: vm => ({
      issueHTML: '',
      githubUrl: '',
      typeLabels: {
        bug: 'Bug Report',
        feature: 'Feature Request',
      },
    }),

    computed: {
      lazyValue: {
        get () {
          if (this.value) {
            this.genIssueHTML()
            this.genGithubUrl()
          }
          return this.value
        },
        set (val) {
          this.$emit('input', val)
        },
      },
      issueTitle () {
        if (this.issue.repository.value === 'docs') return `[Documentation] ${this.issue.title}`
        return `[${this.typeLabels[this.issue.type]}] ${this.issue.title}`
      },
    },

    methods: {
      genIssueHTML () {
        const text = generateMarkdown(this.genTransformedIssue())
        this.issueHTML = marked(text, { breaks: true })
      },
      genGithubUrl () {
        const body = generateMarkdown(this.genTransformedIssue())
        this.githubUrl = format({
          protocol: 'https',
          host: 'github.com',
          pathname: this.issue.repository.url,
          query: {
            title: this.issueTitle,
            body,
          },
        })
      },
      genTransformedIssue () {
        const issue = Object.assign({}, this.issue)
        issue.browsers = issue.browsers.map(browser => (
          browser.replace('Current browser - ', '')
        ))
        issue.os = issue.os.map(os => (
          os.replace('Current OS - ', '')
        ))
        return issue
      },
      ensureCreation () {
        console.log('ENSURE')
      },
    },
  }
</script>
