export default {
  generateMarkdown (data) {
    if (data.type === 'bug') {
      return this.generateBugMarkdown(data)
    } else if (data.type === 'feature') {
      return this.generateFeatureMarkdown(data)
    }
  },
  generateBugMarkdown (data) {
    let md = `
### Versions and Environment
Vuetify: ${data.vuetifyVersion}
Vue: ${data.vueVersion}
Browsers: ${data.browsers.join(', ')}
OS: ${data.os.join(', ')}

### Steps to reproduce
${data.steps.trim()}

### Expected Behavior
${data.expected.trim()}

### Actual Behavior
${data.actual.trim()}

### Reproduction Link
[${data.link}](${data.link})

${data.other.trim() ? '### Other comments' : ''}
${data.other.trim()}

<!-- generated by vuetify-issue-helper. DO NOT REMOVE -->
    `
    return md
  },
  generateFeatureMarkdown (data) {
    let md = `
### New Functionality
${data.whatsNew.trim()}

### Improvements
${data.whatsImproved.trim()}

### Bugs or Edge Cases it Helps Avoid
${data.whatsAvoided.trim()}

<!-- generated by vuetify-issue-helper. DO NOT REMOVE -->
    `
    return md
  }
}
