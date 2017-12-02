<template>
  <v-form v-model="isValid" ref="form" lazy-validation>
    <v-container grid-list-md class="mt-3">
      <v-layout row wrap>
        <v-flex xs12>
          <v-select
            v-model="newIssue.type"
            label="I am submitting a"
            :items="types"
            return-object
          ></v-select>
        </v-flex>
        <v-flex xs12>
          <v-text-field
            v-model="newIssue.title"
            label="Issue Title"
            :rules="[rules.requiredText]"
            @change="searchIssues"
          ></v-text-field>
          <similar-issues :issues="similarIssues"></similar-issues>
        </v-flex>
      </v-layout>
      <v-slide-y-transition mode="out-in">
        <v-layout row wrap v-if="newIssue.type.value === 'bug'">
          <v-flex xs12 sm6>
            <v-select
              v-model="newIssue.vuetifyVersion"
              label="Vuetify Version"
              :rules="[rules.required]"
              :items="vuetifyVersions"
              :hint="vuetifyVersionHint"
              persistent-hint
            >
              <v-list-tile-content
                slot="item"
                slot-scope="{ item }"
                :class="{
                  'orange--text text--darken-3': item === vuetifyTags.next,
                  'green--text': item === vuetifyTags.latest
                }"
              >
                <v-list-tile-title>{{ item }}</v-list-tile-title>
              </v-list-tile-content>
            </v-select>
          </v-flex>
          <v-flex xs12 sm6>
            <v-select
              v-model="newIssue.vueVersion"
              label="Vue Version"
              :rules="[rules.required]"
              :items="vueVersions"
            ></v-select>
          </v-flex>
          <v-flex xs12>
            <v-select
              multiple
              autocomplete
              v-model="newIssue.os"
              label="Operating System"
              :rules="[rules.requiredMultiple]"
              :items="operatingSystems"
            ></v-select>
          </v-flex>
          <v-flex xs12>
            <v-select
              multiple
              autocomplete
              v-model="newIssue.browsers"
              label="Affected Browsers"
              :rules="[rules.requiredMultiple]"
              :items="browsers"
            ></v-select>
          </v-flex>
          <v-flex xs12>
            <v-text-field
              v-model="newIssue.link"
              label="Reproduction Link"
              :rules="[rules.requiredText, rules.validRepro]"
              :hint="linkHint"
              persistent-hint
            ></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-text-field
              v-model="newIssue.steps"
              label="Steps to Reproduce"
              :rules="[rules.requiredText]"
              textarea
              :hint="markdownHint"
            ></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-text-field
              v-model="newIssue.expected"
              label="Expected Functionality"
              :rules="[rules.requiredText]"
              :rows="3"
              textarea
              :hint="markdownHint"
            ></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-text-field
              v-model="newIssue.actual"
              label="Actual Functionality"
              :rules="[rules.requiredText]"
              :rows="3"
              textarea
              :hint="markdownHint"
            ></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-text-field
              v-model="newIssue.other"
              label="Comments (optional)"
              :rows="3"
              textarea
              :hint="markdownHint"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row wrap v-else-if="newIssue.type.value === 'feature'">
          <v-flex xs12>
            <v-text-field
              v-model="newIssue.whatsNew"
              label="What will it allow you to do that you can't do today?"
              :rows="3"
              :rules="[rules.requiredText]"
              textarea
              :hint="markdownHint"
            ></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-text-field
              v-model="newIssue.whatsImproved"
              label="How will it make current work-arounds straightforward?"
              :rows="3"
              :rules="[rules.requiredText]"
              textarea
              :hint="markdownHint"
            ></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-text-field
              v-model="newIssue.whatsAvoided"
              label="What potential bugs and edge cases does it help to avoid?"
              :rows="3"
              :rules="[rules.requiredText]"
              textarea
              :hint="markdownHint"
            ></v-text-field>
          </v-flex>
        </v-layout>
      </v-slide-y-transition>
      <v-layout row justify-center>
        <v-btn dark @click="clearAll">Clear All</v-btn>
        <v-btn color="primary" :disabled="!isValid" v-if="newIssue.type" @click="preview">Preview</v-btn>
      </v-layout>
    </v-container>
    <preview-dialog v-model="isPreviewing" :issue="newIssue"></preview-dialog>
    <v-snackbar v-model="showError" color="error">
      <span>API request failed. Please report this on <a href="https://chat.vuetifyjs.com" target="_blank" class="white--text">Discord</a></span>
    </v-snackbar>
  </v-form>
</template>

<script>
import api from '@/lib/api'
import UAParser from 'ua-parser-js'

import SimilarIssues from './SimilarIssues'
import PreviewDialog from './PreviewDialog'

const userAgent = UAParser()

const currentBrowser = userAgent.browser
const currentBrowserString = `${currentBrowser.name} ${currentBrowser.version}`
const currentBrowserItem = `Current browser - ${currentBrowserString}`

const currentOS = userAgent.os
const currentOSString = `${currentOS.name} ${currentOS.version}`
const currentOSItem = `Current OS - ${currentOSString}`

export default {
  name: 'new-issue-form',

  components: {
    SimilarIssues,
    PreviewDialog
  },

  data: vm => ({
    isValid: false,
    isPreviewing: false,
    rules: {
      required: v => !!v || 'This field is required',
      requiredText: v => !!v.trim().length || 'This field is required',
      requiredMultiple: v => !!v.length || 'This field is required',
      validRepro: v => /https?:\/\/.*(github|codepen|jsfiddle|codesandbox)/.test(v) || 'Please only use Codepen, JSFiddle, CodeSandbox or a github repo'
    },
    types: [
      {
        text: 'Bug Report',
        value: 'bug'
      }, {
        text: 'Feature Request',
        value: 'feature'
      }
    ],
    similarIssues: [],
    operatingSystems: [
      currentOSItem,
      'Windows',
      'Android',
      'iOS',
      'Mac OSX',
      'Linux'
    ],
    browsers: [
      currentBrowserItem,
      'Google Chrome',
      'Mozilla Firefox',
      'Safari',
      'Microsoft Edge',
      'Internet Explorer',
      'Opera',
      'Other'
    ],
    linkHint: 'Please only use <a href="https://template.vuetifyjs.com" rel="noopener" target="_blank" tabindex="-1">Codepen</a>, <a href="https://www.jsfiddle.com" rel="noopener" target="_blank" tabindex="-1">JSFiddle</a>, <a href="https://codesandbox.io/s/vue" target="_blank" rel="noopener" tabindex="-1">CodeSandbox</a> or a github repo',
    markdownHint: 'You can use <a href="https://guides.github.com/features/mastering-markdown/" rel="noopener" target="_blank" tabindex="-1">markdown</a>',
    newIssue: {
      type: '',
      title: '',
      vueVersion: '',
      vuetifyVersion: '',
      os: [currentOSItem],
      browsers: [currentBrowserItem],
      link: '',
      steps: '',
      expected: '',
      actual: '',
      other: '',
      whatsNew: '',
      whatsImproved: '',
      whatsAvoided: ''
    },
    vueVersions: [],
    vuetifyVersions: [],
    vuetifyLatest: '',
    vuetifyTags: {},
    showError: false
  }),

  computed: {
    vuetifyVersionHint () {
      return this.newIssue.vuetifyVersion && this.newIssue.vuetifyVersion !== this.vuetifyLatest
        ? `Please check if bug exists on ${this.vuetifyLatest} before submitting`
        : ''
    }
  },

  mounted () {
    api.get('versions/vuetify').then(res => {
      this.vuetifyTags = res.data.tags
      this.vuetifyVersions = res.data.versions
      this.vuetifyLatest = this.vuetifyVersions[0] || ''
    }).catch(err => {
      this.showError = true
      console.error(err.message)
    })

    api.get('versions/vue').then(res => {
      this.vueVersions = res.data.versions
    }).catch(err => {
      this.showError = true
      console.error(err.message)
    })
  },

  methods: {
    async searchIssues () {
      if (!this.newIssue.title) return

      try {
        const res = await api.get('search-issues', {
          params: { q: this.newIssue.title }
        })
        this.similarIssues = res.data.issues
      } catch (err) {
        this.similarIssues = []
        this.showError = true
        console.error(err.message)
      }
    },
    clearAll () {
      this.$refs.form.reset()
      this.newIssue = this.$options.data().newIssue
    },
    preview () {
      this.isPreviewing = this.$refs.form.validate()
    }
  }
}
</script>
