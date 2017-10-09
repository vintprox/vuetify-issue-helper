<template>
<v-form class="full-width" v-model="isValid">
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
          :rules="[rules.required]"
          @change="searchIssues"
        ></v-text-field>
        <v-slide-y-transition>
          <PossibleIssues v-if="!isError && possibleIssues.length" :issues="possibleIssues"></PossibleIssues>
        </v-slide-y-transition>
      </v-flex>
    </v-layout>
    <v-slide-y-transition>
      <v-layout row wrap v-if="newIssue.type == 'bug'">
        <v-flex xs6>
          <v-select
            v-model="newIssue.vuetifyVersion"
            label="Vuetify Version"
            :rules="[rules.required]"
            :items="vuetifyVersions"
            :hint="vuetifyVersionHint"
            :persistent-hint="true"></v-select>
        </v-flex>
        <v-flex xs6>
          <v-select
            v-model="newIssue.vueVersion"
            label="Vue Version"
            :rules="[rules.required]"
            :items="vueVersions"></v-select>
        </v-flex>
        <v-flex xs6>
          <v-select
            multiple
            v-model="newIssue.os"
            label="Operating System"
            :rules="[rules.requiredMultiple]"
            :items="operatingSystems"></v-select>
        </v-flex>
        <v-flex xs6>
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
            :rules="[rules.required, rules.validRepro]"
            :hint="linkHint"
            :persistent-hint="true"></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field
            v-model="newIssue.steps"
            label="Steps to Reproduce"
            :rules="[rules.required]"
            textarea></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field
            v-model="newIssue.expected"
            label="Expected Functionality"
            :rules="[rules.required]"
            :rows="3"
            textarea></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field
            v-model="newIssue.actual"
            label="Actual Functionality"
            :rules="[rules.required]"
            :rows="3"
            textarea></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field
            v-model="newIssue.other"
            label="Comments"
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
            :rules="[rules.required]"
            textarea></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field
            v-model="newIssue.whatsImproved"
            label="How will it make current work-arounds straightforward?"
            :rows="3"
            :rules="[rules.required]"
            textarea></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field
            v-model="newIssue.whatsAvoided"
            label="What potential bugs and edge cases does it help to avoid?"
            :rows="3"
            :rules="[rules.required]"
            textarea></v-text-field>
        </v-flex>
      </v-layout>
    </v-slide-y-transition>
    <v-layout row justify-center>
      <v-btn dark color="primary" :disabled="!isValid" v-if="newIssue.type" @click.stop="preview">Preview</v-btn>
      <v-dialog width="640" v-model="isPreviewing">
        <v-card>
          <v-card-title class="headline">New Issue</v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout row wrap v-if="newIssue.type === 'bug'">
                <v-flex xs12>
                  <div class="title">Versions and Environment</div>
                  <div class="body text-xs-left">Vuetify Version: {{newIssue.vuetifyVersion}}</div>
                  <div class="body text-xs-left">Vue Version: {{newIssue.vueVersion}}</div>
                  <div class="body text-xs-left">Browsers: {{newIssue.browsers.join(', ')}}</div>
                  <div class="body text-xs-left">Operating Systems: {{newIssue.os.join(', ')}}</div>
                </v-flex>
                <v-flex xs12>
                  <div class="title">Steps to Reproduce</div>
                  <div class="body text-xs-left">{{newIssue.steps}}</div>
                </v-flex>
                <v-flex xs12>
                  <div class="title">Expected Behavior</div>
                  <div class="body text-xs-left">{{newIssue.expected}}</div>
                </v-flex>
                <v-flex xs12>
                  <div class="title">Actual Behavior</div>
                  <div class="body text-xs-left">{{newIssue.actual}}</div>
                </v-flex>
                <v-flex xs12>
                  <div class="title">Reproduction Link</div>
                  <div class="body text-xs-left"><a href="newIssue.link" target="_blank">{{newIssue.link}}</a></div>
                </v-flex>
                <v-flex xs12>
                  <div class="title">Comments</div>
                  <div class="body text-xs-left">{{newIssue.other}}</div>
                </v-flex>
              </v-layout>
              <v-layout row wrap v-if="newIssue.type === 'feature'">
                <v-flex xs12>
                  <div class="title">New Functionality</div>
                  <div class="body text-xs-left">{{newIssue.whatsNew}}</div>
                </v-flex>
                <v-flex xs12>
                  <div class="title">Improvements</div>
                  <div class="body text-xs-left">{{newIssue.whatsImproved}}</div>
                </v-flex>
                <v-flex xs12>
                  <div class="title">Bugs or Edge Cases it Helps Avoid</div>
                  <div class="body text-xs-left">{{newIssue.whatsAvoided}}</div>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat tag="a" :href="getGithubUrl()">Create</v-btn>
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
        'Microsoft Edge'
      ],
      linkHint: 'Please only use <a href="https://template.vuetifyjs.com" target="_blank">Codepen</a>, <a href="https://www.jsfiddle.com" target="_blank">JSFiddle</a>, <a href="https://codesandbox.io/s/vue">CodeSandbox</a> or a github repo',
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
  mounted () {
    let _this = this
    vuetifyRepo.get('/releases')
      .then(function (response) {
        _this.vuetifyVersions = response.data.map(function (release) {
          return release.tag_name
        })
        _this.vuetifyLatest = _this.vuetifyVersions.length && _this.vuetifyVersions[0]
      })
    axios.get('https://api.github.com/repos/vuejs/vue/releases')
      .then(function (response) {
        _this.vueVersions = response.data.map(function (release) {
          return release.tag_name
        })
      })
  },
  methods: {
    searchIssues () {
      let _this = this
      if (!this.newIssue.title) return

      axios.get('/api', {
        params: {
          q: this.newIssue.title
        }
      }).then(function (response) {
        _this.possibleIssues = response.data.issues
        _this.isError = false
      }).catch(function (response) {
        _this.isError = true
      })
    },
    preview () {
      this.isPreviewing = true
    },
    getGithubUrl () {
      let markdown = markdownGenerator.generateMarkdown(this.newIssue)
      let returnUrl = format({
        protocol: 'https',
        host: 'github.com',
        pathname: '/vuetifyjs/vuetify/issues/new',
        query: {
          title: this.newIssue.title,
          body: markdown
        }
      })
      let issueUrl = format({
        protocol: 'https',
        host: 'github.com',
        pathname: '/login',
        query: {
          return_to: returnUrl
        }
      })
      return issueUrl
    }
  },
  computed: {
    vuetifyVersionHint () {
      if (this.newIssue.vuetifyVersion && this.newIssue.vuetifyVersion !== this.vuetifyLatest) {
        return `Please check if bug exists on ${this.vuetifyLatest} before submitting`
      }
      return ''
    }
  }
}
</script>

<style scoped>
.full-width {
  width: 100%;
}
</style>
