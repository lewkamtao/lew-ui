import tippy, { roundArrow } from 'tippy.js'
import type { App as Application, DirectiveBinding } from 'vue'

export const LewTooltip = {
  install(app: Application) {
    app.directive('tooltip', {
      mounted(el: any, binding: DirectiveBinding) {
        const { trigger, content, placement, allowHTML, delay } = binding.value
        let _trigger = trigger
        if (trigger === 'hover') {
          _trigger = 'mouseenter'
        }

        if (!trigger) {
          _trigger = 'mouseenter'
        }

        el.instance = tippy(el, {
          theme: 'light',
          trigger: _trigger,
          content: content,
          animation: 'scale-subtle',
          interactive: true,
          appendTo: () => document.body,
          placement,
          allowHTML,
          hideOnClick: _trigger === 'click' ? true : false,
          arrow: roundArrow,
          maxWidth: 250,
          duration: [250, 250],
          delay: _trigger === 'mouseenter' ? delay || [120, 120] : undefined,
        })

        el.instance?.popper.children[0].setAttribute('data-lew', 'tooltip')

        if (!binding?.value?.content) {
          el.instance?.disable()
        }
      },
      updated(el: any, binding: DirectiveBinding) {
        const { triggerFrom, content } = binding.value
        if (!content && content !== 0) {
          el.instance?.disable()
        } else {
          el.instance?.enable()
          el.instance?.setContent(content)
        }
        if (triggerFrom === 'input-number') {
          if (content) {
            el.instance?.show()
          } else {
            el.instance?.disable()
          }
        }
      },
      unmounted(el: any) {
        el.instance?.hide()
        el.instance = null
      },
    })
  },
}
