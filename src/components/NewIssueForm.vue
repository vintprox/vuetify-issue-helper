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
            :rules="[rules.required]"
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
            :rules="[rules.required]"
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
            textarea></v-text-field>
        </v-flex>
      </v-layout>
    </v-slide-y-transition>
    <v-layout row justify-center>
      <v-btn color="primary" :disabled="!isValid" v-if="newIssue.type">Preview</v-btn>
    </v-layout>
  </v-container>
</v-form>
</template>

<script>
import vuetifyRepo from '@/lib/axios'
import axios from 'axios'

import PossibleIssues from './PossibleIssues'

export default {
  name: 'new-issue-form',
  components: {
    PossibleIssues
  },
  data () {
    return {
      isValid: false,
      rules: {
        required: (v) => !!v || 'This field is required',
        requiredMultiple: (v) => !!v.length || 'This field is required'
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
      linkHint: 'Please only use <a href="https://template.vuetifyjs.com" target="_blank">Codepen</a>, <a href="https://www.jsfiddle.com" target="_blank">JSFiddle</a>, or <a href="https://codesandbox.io/s/vue">CodeSandbox</a>',
      newIssue: {
        type: '',
        title: '',
        vueVersion: '',
        vuetifyVersion: '',
        os: '',
        browsers: '',
        link: '',
        steps: '1.\n2.\n3.\n4.\n5.',
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
