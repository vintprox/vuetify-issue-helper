export default {
  generateMarkdown,
  generateBugMarkdown,
  generateFeatureMarkdown
}

export function generateMarkdown (data) {
  if (data.type === 'bug') {
    return generateBugMarkdown(data)
  }
  if (data.type === 'feature') {
    return generateFeatureMarkdown(data)
  }
  return ''
}

function generateBugMarkdown (data) {
  const other = data.other ? `### Other comments\n${data.other}\n\n` : ``
  const vuetifyVersion = data.vuetifyVersion ? `**Vuetify Version:** ${data.vuetifyVersion}` : ``
  const vueVersion = data.vueVersion ? `**Vue Version:** ${data.vueVersion}` : ``
  return `
### Environment
${vuetifyVersion}${data.previousVersion == null ? '' : `
**Last working version:** ${data.previousVersion}`}
${vueVersion}
**Browsers:** ${data.browsers.join(', ')}
**OS:** ${data.os.join(', ')}

### Steps to reproduce
${data.steps}

### Expected Behavior
${data.expected}

### Actual Behavior
${data.actual}

### Reproduction Link
<a href="${data.link}" target="_blank">${data.link}</a>

${other}
<!-- generated by vuetify-issue-helper. DO NOT REMOVE -->`
}

function generateFeatureMarkdown (data) {
  return `
### Problem to solve
${data.problem}

### Proposed solution
${data.solution}

<!-- generated by vuetify-issue-helper. DO NOT REMOVE -->`
}
