import tippy, { roundArrow } from 'tippy.js'
import type { App as Application, DirectiveBinding } from 'vue'

export const LewTooltip = {
  install(app: Application) {
    app.directive('tooltip', {
      mounted(el: any, binding: DirectiveBinding) {
        let { trigger } = binding.value
        if (trigger === 'hover') {
          trigger = 'mouseenter'
        }
        if (!trigger) {
          trigger = 'mouseenter'
        }
        el.instance = tippy(el, {
          theme: 'light',
          trigger: trigger || 'mouseenter',
          content: binding.value.content,
          hideOnClick: trigger !== 'mouseenter',
          animation: 'scale',
          interactive: true,
          appendTo: () => document.body,
          placement: binding.value.placement,
          allowHTML: binding.value.allowHtml,
          arrow: roundArrow,
          maxWidth: 250,
          duration: [250, 250],
          delay: trigger === 'mouseenter' ? binding.value.delay || [80, 80] : undefined
        })
        el.instance.popper.children[0].setAttribute('data-lew', 'tooltip')
        if (!binding?.value?.content) {
          el.instance.disable()
        }
      },
      updated(el: any, binding: DirectiveBinding) {
        if (!binding?.value?.content) {
          el.instance.disable()
        } else {
          el.instance.enable()
          el.instance.setContent(binding.value.content)
        }
      },
      unmounted(el: any) {
        el.instance.hide()
        el.instance = null
      }
    })
  }
}
