// Entry point for the build script in your package.json
import "@hotwired/turbo-rails"
import "./controllers"

import { createApp } from 'vue'

import 'stylesheets/application'

const context = require.context(
  'components',
  true,
  /.+.vue$/
)

const components = {}
context.keys().forEach(key => {
  const name = key.match(/.+\/(.+)\.vue$/)[1]
  components[name] = context(key).default
})

window.addEventListener('load', () => {
  [...document.querySelectorAll('[data-vue]')].forEach(el => {
    const type = Object.assign(components[el.dataset.vue], { el })
    const vm = createApp(type)
    vm.mount(el)
  })
})
