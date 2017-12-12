export default {
  generateMarkdown,
  generateBugMarkdown,
  generateFeatureMarkdown
}

export function generateMarkdown (data) {
  if (data.type.value === 'bug') {
    return generateBugMarkdown(data)
  }
  if (data.type.value === 'feature') {
    return generateFeatureMarkdown(data)
  }
  return ''
}

function generateBugMarkdown (data) {
  const other = data.other ? `### Other comments\n${data.other}\n\n` : ``
  return `
### Versions and Environment
**Vuetify:** ${data.vuetifyVersion}
**Vue:** ${data.vueVersion}
**Browsers:** ${data.browsers.join(', ')}
**OS:** ${data.os.join(', ')}

### Steps to reproduce
${data.steps}

### Expected Behavior
${data.expected}

### Actual Behavior
${data.actual}

### Reproduction Link
[${data.link}](${data.link})

${other}
<!-- generated by vuetify-issue-helper. DO NOT REMOVE -->`
}

function generateFeatureMarkdown (data) {
  return `
### New Functionality
${data.whatsNew}

### Improvements
${data.whatsImproved}

### Proposed Implementation
${data.implementation}

### Bugs or Edge Cases it Helps Avoid
${data.whatsAvoided}

<!-- generated by vuetify-issue-helper. DO NOT REMOVE -->`
}
