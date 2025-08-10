import type { LewPlacement, LewTooltipDirectiveBinding, LewTrigger } from 'lew-ui/types'
import type { App as Application, DirectiveBinding } from 'vue'
import RenderComponent from 'lew-ui/render/components/RenderComponent.vue'
import tippy, { roundArrow } from 'tippy.js'
import { createApp, defineComponent, h } from 'vue'

// 默认值
const defaultDelay: [number, number] = [120, 120]
const defaultPlacement: LewPlacement = 'top'
const defaultTrigger: LewTrigger = 'mouseenter'

function createTooltipContent(renderFn: any) {
  const tooltipContainer = document.createElement('div')
  const contentRef = defineComponent({
    render() {
      return h(RenderComponent, {
        renderFn,
      })
    },
  })
  const vueApp = createApp(contentRef)
  vueApp.mount(tooltipContainer)

  return { tooltipContainer, vueApp }
}

export const LewTooltip = {
  install(app: Application) {
    app.directive('tooltip', {
      mounted(el: any, binding: DirectiveBinding<LewTooltipDirectiveBinding>) {
        const { trigger, content, placement, delay } = binding.value
        let _trigger = trigger
        if (trigger === 'hover') {
          _trigger = 'mouseenter'
        }

        if (!trigger) {
          _trigger = defaultTrigger
        }

        const { tooltipContainer, vueApp } = createTooltipContent(content)

        el.vueApp = vueApp

        el.instance = tippy(el, {
          theme: 'light',
          trigger: _trigger,
          content: tooltipContainer,
          animation: 'scale-subtle',
          interactive: true,
          appendTo: () => document.body,
          placement: placement || defaultPlacement,
          hideOnClick: _trigger === 'click',
          arrow: roundArrow,
          maxWidth: 250,
          duration: [250, 250],
          delay: _trigger === 'mouseenter' ? delay || defaultDelay : undefined,
        })

        el.instance?.popper.children[0].setAttribute('data-lew', 'tooltip')

        if (!binding?.value?.content) {
          el.instance?.disable()
        }
      },
      updated(el: any, binding: DirectiveBinding<LewTooltipDirectiveBinding>) {
        const { triggerFrom, content } = binding.value
        if (!content && content !== 0) {
          el.instance?.disable()
        }
        else {
          el.instance?.enable()

          if (el.vueApp) {
            el.vueApp.unmount()
          }

          const { tooltipContainer, vueApp } = createTooltipContent(content)
          el.vueApp = vueApp
          el.instance?.setContent(tooltipContainer)
        }
        if (triggerFrom === 'input-number') {
          if (content) {
            el.instance?.show()
          }
          else {
            el.instance?.disable()
          }
        }
      },
      unmounted(el: any) {
        if (el.vueApp) {
          el.vueApp.unmount()
          el.vueApp = null
        }

        el.instance?.hide()
        el.instance = null
      },
    })
  },
}
