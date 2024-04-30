import type { App as Application, DirectiveBinding } from 'vue'
import { LewIcon } from 'lew-ui'

import { createApp } from 'vue'
import '../styles/index.scss'

let loadingWrapper: HTMLElement
let loadingBox: HTMLElement
export default {
  install(app: Application) {
    app.directive('loading', {
      mounted(el: HTMLElement, binding: DirectiveBinding) {
        const { tip, iconSize, visible } = binding.value

        loadingWrapper = document.createElement('div')
        loadingBox = document.createElement('div')
        loadingWrapper.classList.add('lew-loading-wrapper')
        loadingBox.classList.add('lew-loading-box')

        el.classList.add('lew-loading')
        //  add loading icon
        const loader = createApp(LewIcon, {
          type: 'loader',
          animation: 'spin',
          'animation-speed': 'fast',
          size: iconSize
        })
        loader.mount(loadingBox)
        // // add loading text
        loadingBox.setAttribute('data-after', tip || '')

        loadingWrapper.appendChild(loadingBox)
        el.appendChild(loadingWrapper)

        if (visible) {
          el.classList.add('lew-loading-show')
        }
      },
      updated(el: HTMLElement, binding: DirectiveBinding) {
        const { tip, visible } = binding.value
        loadingBox.setAttribute('data-after', tip || '')

        if (visible) {
          el.classList.add('lew-loading-show')
        } else {
          el.classList.remove('lew-loading-show')
        }
      }
    })
  }
}
