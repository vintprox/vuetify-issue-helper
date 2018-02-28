var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  apiUrl: process.env.NOAPI ? undefined : '"/api"'
})
