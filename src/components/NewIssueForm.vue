<template>
  <v-form v-model="isValid" ref="form">
    <v-container grid-list-md class="mt-3">
      <v-layout row wrap>
        <v-flex xs12>
          <v-select
            v-model="newIssue.type"
            label="I am submitting a"
            max-height="auto"
            :items="types"
          >
          </v-select>
        </v-flex>
        <v-flex xs12>
          <v-text-field
            v-model="newIssue.title"
            label="Issue Title"
            :rules="[rules.requiredText]"
            @change="searchIssues"
          ></v-text-field>
          <v-slide-y-transition>
            <PossibleIssues v-if="!isError && possibleIssues.length" :issues="possibleIssues"></PossibleIssues>
          </v-slide-y-transition>
        </v-flex>
      </v-layout>
      <v-slide-y-transition>
        <v-layout row wrap v-if="newIssue.type == 'bug'">
          <v-flex xs12 sm6>
            <v-select
              v-model="newIssue.vuetifyVersion"
              label="Vuetify Version"
              :rules="[rules.required]"
              :items="vuetifyVersions"
              :hint="vuetifyVersionHint"
              :persistent-hint="true"></v-select>
          </v-flex>
          <v-flex xs12 sm6>
            <v-select
              v-model="newIssue.vueVersion"
              label="Vue Version"
              :rules="[rules.required]"
              :items="vueVersions"></v-select>
          </v-flex>
          <v-flex xs12 sm6>
            <v-select
              multiple
              v-model="newIssue.os"
              label="Operating System"
              :rules="[rules.requiredMultiple]"
              :items="operatingSystems"></v-select>
          </v-flex>
          <v-flex xs12 sm6>
            <v-select
              multiple
              v-model="newIssue.browsers"
              label="Affected Browsers"
              :rules="[rules.requiredMultiple]"
              :items="browsers"></v-select>
          </v-flex>
          <v-flex xs12>
            <v-text-field
              v-model="newIssue.link"
              label="Reproduction Link"
              :rules="[rules.requiredText, rules.validRepro]"
              :hint="linkHint"
              :persistent-hint="true"></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-text-field
              v-model="newIssue.steps"
              label="Steps to Reproduce"
              :rules="[rules.requiredText]"
              textarea></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-text-field
              v-model="newIssue.expected"
              label="Expected Functionality"
              :rules="[rules.requiredText]"
              :rows="3"
              textarea></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-text-field
              v-model="newIssue.actual"
              label="Actual Functionality"
              :rules="[rules.requiredText]"
              :rows="3"
              textarea></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-text-field
              v-model="newIssue.other"
              label="Comments (optional)"
              :rows="3"
              textarea></v-text-field>
          </v-flex>
        </v-layout>
      </v-slide-y-transition>
      <v-slide-y-transition mode="out-in">
        <v-layout row wrap v-if="newIssue.type == 'feature'">
          <v-flex xs12>
            <v-text-field
              v-model="newIssue.whatsNew"
              label="What will it allow you to do that you can't do today?"
              :rows="3"
              :rules="[rules.requiredText]"
              textarea></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-text-field
              v-model="newIssue.whatsImproved"
              label="How will it make current work-arounds straightforward?"
              :rows="3"
              :rules="[rules.requiredText]"
              textarea></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-text-field
              v-model="newIssue.whatsAvoided"
              label="What potential bugs and edge cases does it help to avoid?"
              :rows="3"
              :rules="[rules.requiredText]"
              textarea></v-text-field>
          </v-flex>
        </v-layout>
      </v-slide-y-transition>
      <v-layout row justify-center>
        <v-btn dark @click.stop="clearAll">Clear All</v-btn>
        <v-btn dark color="primary" :disabled="!isValid" v-if="newIssue.type" @click.stop="preview">Preview</v-btn>
        <v-dialog width="640" v-model="isPreviewing">
          <v-card>
            <v-card-title class="headline primary white--text">{{issueTitle}}</v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout row wrap v-if="newIssue.type === 'bug'">
                  <v-flex xs12 class="mb-2">
                    <h6>Versions and environment</h6>
                    <div class="body text-xs-left">Vuetify: {{newIssue.vuetifyVersion}}</div>
                    <div class="body text-xs-left">Vue: {{newIssue.vueVersion}}</div>
                    <div class="body text-xs-left">Browsers: {{newIssue.browsers.join(', ')}}</div>
                    <div class="body text-xs-left">Operating Systems: {{newIssue.os.join(', ')}}</div>
                  </v-flex>
                  <v-flex xs12 class="mb-2">
                    <h6>Steps to reproduce</h6>
                    <div class="body text-xs-left">{{newIssue.steps}}</div>
                  </v-flex>
                  <v-flex xs12 class="mb-2">
                    <h6>Expected Behavior</h6>
                    <div class="body text-xs-left">{{newIssue.expected}}</div>
                  </v-flex>
                  <v-flex xs12 class="mb-2">
                    <h6>Actual Behavior</h6>
                    <div class="body text-xs-left">{{newIssue.actual}}</div>
                  </v-flex>
                  <v-flex xs12 class="mb-2">
                    <h6>Reproduction Link</h6>
                    <div class="body text-xs-left"><a href="newIssue.link" rel="noopener" target="_blank">{{newIssue.link}}</a></div>
                  </v-flex>
                  <v-flex xs12 class="mb-2" v-if="newIssue.other">
                    <h6>Comments</h6>
                    <div class="body text-xs-left">{{newIssue.other}}</div>
                  </v-flex>
                </v-layout>
                <v-layout row wrap v-if="newIssue.type === 'feature'">
                  <v-flex xs12 class="mb-2">
                    <h6>New Functionality</h6>
                    <div class="body text-xs-left">{{newIssue.whatsNew}}</div>
                  </v-flex>
                  <v-flex xs12 class="mb-2">
                    <h6>Improvements</h6>
                    <div class="body text-xs-left">{{newIssue.whatsImproved}}</div>
                  </v-flex>
                  <v-flex xs12 class="mb-2">
                    <h6>Bugs or edge cases it helps avoid</h6>
                    <div class="body text-xs-left">{{newIssue.whatsAvoided}}</div>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="error" flat @click="isPreviewing = false"><v-icon>close</v-icon>Cancel</v-btn>
              <v-btn color="blue darken-1" flat tag="a" target="_blank" rel="noopener" :href="getGithubUrl()">Create</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
import vuetifyRepo from '@/lib/axios'
import markdownGenerator from '@/lib/markdownGenerator'
import axios from 'axios'
import { format } from 'url'

import PossibleIssues from './PossibleIssues'

export default {
  name: 'new-issue-form',

  components: {
    PossibleIssues
  },

  data () {
    return {
      isValid: false,
      isPreviewing: false,
      rules: {
        required: (v) => !!v || 'This field is required',
        requiredText: (v) => (v.trim().length > 0) || 'This field is required',
        requiredMultiple: (v) => !!v.length || 'This field is required',
        validRepro: (v) => /.*?(github|codepen|jsfiddle|codesandbox).*?/.test(v) || 'Please only use Github, Codepen, CodeSandbox or JSFiddle'
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
      isError: false,
      possibleIssues: [],
      operatingSystems: [
        'Mac OSX',
        'Windows',
        'Linux'
      ],
      browsers: [
        'Chrome',
        'Safari',
        'Firefox',
        'Opera',
        'Internet Explorer',
        'Microsoft Edge',
        'Other'
      ],
      linkHint: 'Please only use <a href="https://template.vuetifyjs.com" rel="noopener" target="_blank">Codepen</a>, <a href="https://www.jsfiddle.com" rel="noopener" target="_blank">JSFiddle</a>, <a href="https://codesandbox.io/s/vue" target="_blank" rel="noopener">CodeSandbox</a> or a github repo',
      newIssue: {
        type: '',
        title: '',
        vueVersion: '',
        vuetifyVersion: '',
        os: [],
        browsers: [],
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
      vuetifyLatest: ''
    }
  },

  computed: {
    issueTitle () {
      return this.newIssue.type ? `[${this.typesByValue[this.newIssue.type]}] ${this.newIssue.title}` : this.newIssue.title
    },
    typesByValue () {
      const typesByValue = {}
      this.types.forEach(({ text, value }) => typesByValue[value] = text)
      return typesByValue
    },
    vuetifyVersionHint () {
      return this.newIssue.vuetifyVersion && this.newIssue.vuetifyVersion !== this.vuetifyLatest
        ? `Please check if bug exists on ${this.vuetifyLatest} before submitting`
        : ''
    }
  },

  mounted () {
    vuetifyRepo.get('/releases').then(res => {
      this.vuetifyVersions = res.data.map(release => release.tag_name)
      this.vuetifyLatest = this.vuetifyVersions[0] || ''
    })

    axios.get('https://api.github.com/repos/vuejs/vue/releases').then(res => {
      this.vueVersions = res.data.map(release => release.tag_name)
    })
  },

  methods: {
    searchIssues () {
      if (!this.newIssue.title) return

      axios.get('https://issue-helper-api-ndqljbkywa.now.sh', {
        params: {
          q: this.newIssue.title
        }
      }).then(res => {
        this.possibleIssues = res.data.issues
        this.isError = false
      }).catch(err => {
        this.isError = true
        console.error(err)
      })
    },
    clearAll () {
      this.newIssue = {
        type: '',
        title: '',
        vueVersion: '',
        vuetifyVersion: '',
        os: [],
        browsers: [],
        link: '',
        steps: '',
        expected: '',
        actual: '',
        other: '',
        whatsNew: '',
        whatsImproved: '',
        whatsAvoided: ''
      }
      this.$refs.form.reset()
    },
    preview () {
      this.isPreviewing = true
    },
    getGithubUrl () {
      const body = markdownGenerator.generateMarkdown(Object.assign({}, this.newIssue, { title: this.issueTitle }))
      const returnUrl = format({
        protocol: 'https',
        host: 'github.com',
        pathname: '/vuetifyjs/vuetify/issues/new',
        query: {
          title: this.newIssue.title,
          body
        }
      })
      const issueUrl = format({
        protocol: 'https',
        host: 'github.com',
        pathname: '/login',
        query: {
          return_to: returnUrl
        }
      })
      return issueUrl
    }
  }
}
</script>
