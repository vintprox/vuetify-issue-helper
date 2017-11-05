<template>
  <v-dialog width="640" v-model="lazyValue" scrollable>
    <v-card>
      <v-card-title class="headline primary white--text">{{ issueTitle }}</v-card-title>
      <v-card-text class="markdown-body" v-html="issueHTML"></v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" flat @click="lazyValue = false"><v-icon>close</v-icon> Cancel</v-btn>
        <v-btn color="blue darken-1" flat tag="a" target="_blank" rel="noopener" :href="githubUrl">Create</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import { format } from 'url'
  import { generateMarkdown } from '@/lib/markdownGenerator'
  import marked from 'marked'

  export default {
    name: 'preview-dialog',

    props: {
      issue: {
        type: Object,
        required: true
      },
      value: Boolean
    },

    data: vm => ({
      issueHTML: '',
      githubUrl: ''
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
        }
      },
      issueTitle () {
        return `[${this.issue.type.text}] ${this.issue.title}`
      }
    },

    methods: {
      genIssueHTML () {
        const text = generateMarkdown(this.genTransformedIssue())
        this.issueHTML = marked(text, { breaks: true })
      },
      genGithubUrl () {
        const body = generateMarkdown(this.genTransformedIssue())
        const returnUrl = format({
          protocol: 'https',
          host: 'github.com',
          pathname: '/vuetifyjs/vuetify/issues/new',
          query: {
            title: this.issueTitle,
            body
          }
        })
        this.githubUrl = format({
          protocol: 'https',
          host: 'github.com',
          pathname: '/login',
          query: {
            return_to: returnUrl
          }
        })
      },
      genTransformedIssue () {
        const issue = Object.assign({}, this.issue)
        issue.browsers = issue.browsers.map(browser => (
          browser.replace('Current browser - ', '')
        ))
        return issue
      }
    }
  }
</script>
