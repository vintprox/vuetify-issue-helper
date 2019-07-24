<template>
<v-card>
  <v-form v-model="isValid" ref="form" lazy-validation>
    <v-container class="mt-3">
      <v-row>
        <v-col cols="12" sm="12" md="6">
          <v-label class="body-2">I am submitting a</v-label>
          <br />
          <v-btn-toggle
            v-model="newIssue.type"
            mandatory
            rounded
            style="width:100%; min-width: 380px"
          >
            <v-btn style="width:50%" small value="bug">
              Bug Report
            </v-btn>
            <v-btn style="width:50%" small value="feature">
              Feature Request
            </v-btn>
          </v-btn-toggle>
        </v-col>
        <v-col cols="12" sm="12" md="6">
          <v-select
            v-model="newIssue.repository"
            label="For"
            :items="repositories"
            :rules="[rules.required]"
            item-text="name"
            return-object
          ></v-select>
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="newIssue.title"
            label="Issue Title"
            :rules="[rules.requiredText]"
            @change="searchIssues"
          ></v-text-field>
          <similar-issues v-if="newIssue.repository && newIssue.repository.value === 'vuetify'" :issues="similarIssues"></similar-issues>
        </v-col>
      </v-row>
      <v-slide-y-transition mode="out-in">
        <v-row v-if="newIssue.type === 'bug'">
          <template v-if="newIssue.repository.value === 'vuetify'">
            <v-col cols="12" sm="6">
              <v-select
                v-model="newIssue.vuetifyVersion"
                label="Vuetify Version"
                :rules="[rules.required]"
                :items="vuetifyVersions"
                :loading="vuetifyLoading"
                :hint="vuetifyVersionHint"
                persistent-hint
              >
                <v-list-item-content
                  slot="item"
                  slot-scope="{ item }"
                  :class="{
                    'orange--text text--darken-3': item === vuetifyTags.next,
                    'green--text': item === vuetifyTags.latest
                  }"
                >
                  <v-list-item-title>{{ item }}</v-list-item-title>
                </v-list-item-content>
              </v-select>
            </v-col>
            <v-col cols="12" sm="6">
              <v-select
                v-model="newIssue.vueVersion"
                label="Vue Version"
                :rules="[rules.required]"
                :items="vueVersions"
                :loading="vueLoading"
              ></v-select>
            </v-col>
          </template>
          <v-col cols="12">
            <v-select
              multiple
              autocomplete
              v-model="newIssue.os"
              label="Operating System"
              :rules="[rules.requiredMultiple]"
              :items="operatingSystems"
            ></v-select>
          </v-col>
          <v-col cols="12">
            <v-select
              multiple
              autocomplete
              v-model="newIssue.browsers"
              label="Affected Browsers"
              :rules="[rules.requiredMultiple]"
              :items="browsers"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              ref="repro"
              v-if="['vuetify', 'docs'].includes(newIssue.repository.value)"
              v-model="newIssue.link"
              label="Reproduction Link"
              :rules="[rules.requiredText, rules.validRepro]"
              :hint="reproductionHint"
              persistent-hint
            />
          </v-col>
          <v-col cols="12" v-if="newIssue.repository.value === 'vuetify'">
            <v-checkbox
              label="This used to work"
              :input-value="newIssue.previousVersion != null"
              @change="newIssue.previousVersion = newIssue.previousVersion == null ? '' : null"
              hide-details
            />
            <v-select
              v-if="newIssue.previousVersion != null"
              v-model="newIssue.previousVersion"
              label="Last known working version"
              :rules="[rules.required]"
              :items="vuetifyVersions"
              :loading="vuetifyLoading"
            >
              <v-list-item-content
                slot="item"
                slot-scope="{ item }"
                :class="{
                  'orange--text text--darken-3': item === vuetifyTags.next,
                  'green--text': item === vuetifyTags.latest
                }"
              >
                <v-list-item-title>{{ item }}</v-list-item-title>
              </v-list-item-content>
            </v-select>
          </v-col>
          <v-col cols="12">
            <v-textarea
              outlined
              v-model="newIssue.steps"
              label="Steps to Reproduce"
              :rules="[rules.requiredText]"
              :hint="markdownHint"
              persistent-hint
            />
          </v-col>
          <v-col cols="12">
            <v-textarea
              outlined
              v-model="newIssue.expected"
              label="Expected Functionality"
              :rules="[rules.requiredText]"
              :rows="3"
              :hint="markdownHint"
              persistent-hint
            />
          </v-col>
          <v-col cols="12">
            <v-textarea
              outlined
              v-model="newIssue.actual"
              label="Actual Functionality"
              :rules="[rules.requiredText]"
              :rows="3"
              :hint="markdownHint"
              persistent-hint
            />
          </v-col>
          <v-col cols="12">
            <v-textarea
              outlined
              v-model="newIssue.other"
              label="Comments (optional)"
              :rows="3"
              :hint="markdownHint"
              persistent-hint
            />
          </v-col>
        </v-row>
        <v-row v-else-if="newIssue.type === 'feature'">
          <v-col cols="12">
            <v-textarea
              v-model="newIssue.problem"
              outlined
              label="What problem does this feature solve?"
              :rows="3"
              :rules="[rules.requiredText]"
              :hint="problemHint"
            />
          </v-col>
          <v-col cols="12">
            <v-textarea
              v-model="newIssue.solution"
              outlined
              label="What is your proposed solution?"
              :rows="3"
              :rules="[rules.requiredText]"
              :hint="solutionHint"
            />
          </v-col>
        </v-row>
      </v-slide-y-transition>
      <v-row class="px-3 pt-10">
        <v-btn dark @click="clearAll">Clear All</v-btn>
        <div class="flex-grow-1"></div>
        <v-btn color="primary" :disabled="!isValid" v-if="newIssue.type" @click="preview">Preview</v-btn>
      </v-row>
    </v-container>
    <preview-dialog v-model="isPreviewing" :issue="newIssue"></preview-dialog>
    <v-snackbar v-model="showError" color="error">
      <span>API request failed. Please report this on <a href="https://chat.vuetifyjs.com" target="_blank" class="white--text">Discord</a></span>
    </v-snackbar>
  </v-form>
</v-card>
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

const markdownHint = 'You can use <a href="https://guides.github.com/features/mastering-markdown/" rel="noopener" target="_blank" tabindex="-1">markdown</a>'

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
      requiredText: v => (v && !!v.trim().length) || 'This field is required',
      requiredMultiple: v => !!v.length || 'This field is required',
      validRepro (v) {
        if (v.startsWith('https://codepen.io/johnjleider/pen/bgJOrX') || v.startsWith('https://codepen.io/pen')) {
          return 'Please save your codepen first'
        }
        if (vm.newIssue.repository.value === 'docs' && !/^https?:\/\/.*(vuetifyjs)/.test(v)) {
          return 'Please use vuetifyjs.com links for documentation issues'
        }
        if (vm.newIssue.repository.value !== 'docs' && !/^https?:\/\/.*(github|codepen|jsfiddle|codesandbox)/.test(v)) {
          return 'Please only use Codepen, JSFiddle, CodeSandbox or a github repo'
        }
        if (/^https?:\/\/github.com\/vuetifyjs\/?/.test(v)) {
          return 'That is not a valid reproduction link'
        }
        return true
      }
    },
    repositories: [
      {
        name: 'Vuetify',
        value: 'vuetify',
        url: '/vuetifyjs/vuetify/issues/new'
      },
      {
        name: 'Vuetify Documentation',
        value: 'docs',
        url: '/vuetifyjs/vuetify/issues/new'
      },
      {
        name: 'Vue CLI Plugin',
        value: 'vue-cli-plugin-vuetify',
        url: '/vuetifyjs/vue-cli-plugin-vuetify/issues/new'
      },
      {
        name: 'Vuetify Loader',
        value: 'vuetify-loader',
        url: '/vuetifyjs/vuetify-loader/issues/new'
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
    markdownHint: markdownHint,
    problemHint: `Please describe your use case, what this feature would solve, and the potential end user benefits of the request. ${markdownHint}`,
    solutionHint: `Please describe your potential solution or change needed to implement this feature. Code samples and API suggestions are welcome. ${markdownHint}`,
    newIssue: {
      type: 'bug',
      repository: '',
      title: '',
      vueVersion: '',
      vuetifyVersion: '',
      previousVersion: null,
      os: [currentOSItem],
      browsers: [currentBrowserItem],
      link: '',
      steps: '',
      expected: '',
      actual: '',
      other: '',
      problem: '',
      solution: ''
    },
    vueVersions: [],
    vuetifyVersions: [],
    vuetifyLatest: '',
    vuetifyTags: {},
    showError: false,
    vuetifyLoading: false,
    vueLoading: false
  }),

  computed: {
    vuetifyVersionHint () {
      return this.newIssue.vuetifyVersion && this.newIssue.vuetifyVersion !== this.vuetifyLatest
        ? `Please check if bug exists on ${this.vuetifyLatest} before submitting`
        : ''
    },
    reproductionHint () {
      switch (this.newIssue.repository.value) {
        case 'vuetify':
          return 'Please only use <a href="https://template.vuetifyjs.com" rel="noopener" target="_blank" tabindex="-1">Codepen</a>, <a href="https://www.jsfiddle.com" rel="noopener" target="_blank" tabindex="-1">JSFiddle</a>, <a href="https://codesandbox.io/s/vue" target="_blank" rel="noopener" tabindex="-1">CodeSandbox</a> or a github repo'
        case 'docs':
          return 'Please provide a link to the relevant documentation page.'
        default:
          return ''
      }
    }
  },

  mounted () {
    this.vuetifyLoading = true
    this.vueLoading = true

    api.get('versions/vuetify').then(res => {
      this.vuetifyTags = res.data.tags
      this.vuetifyVersions = res.data.versions
      this.vuetifyLatest = this.vuetifyVersions[0] || ''
    }).catch(err => {
      this.showError = true
      console.error(err.message)
    }).then(() => { this.vuetifyLoading = false })

    api.get('versions/vue').then(res => {
      this.vueVersions = res.data.versions
    }).catch(err => {
      this.showError = true
      console.error(err.message)
    }).then(() => { this.vueLoading = false })
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
      this.similarIssues = []
    },
    preview () {
      this.isPreviewing = this.$refs.form.validate()
      if (!this.isPreviewing) this.$vuetify.goTo(this.$refs.form)
    }
  }
}
</script>
