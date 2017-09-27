import axios from 'axios'
import 'es6-promise/auto'

// create an axios instance
const http = axios.create({
  baseURL: 'https://api.github.com/repos/vuetifyjs/vuetify'
})

export default http
