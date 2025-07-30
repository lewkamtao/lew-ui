import type { App as Application, DirectiveBinding } from 'vue'
import RenderComponent from 'lew-ui/_components/RenderComponent.vue'
import tippy, { roundArrow } from 'tippy.js'
import { createApp, defineComponent, h } from 'vue'

// 提取创建tooltip内容的函数
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
      mounted(el: any, binding: DirectiveBinding) {
        const { trigger, content, placement, delay } = binding.value
        let _trigger = trigger
        if (trigger === 'hover') {
          _trigger = 'mouseenter'
        }

        if (!trigger) {
          _trigger = 'mouseenter'
        }

        // 使用提取的函数创建tooltip内容
        const { tooltipContainer, vueApp } = createTooltipContent(content)

        // 将 Vue 应用实例保存到元素上，用于后续清理
        el.vueApp = vueApp

        el.instance = tippy(el, {
          theme: 'light',
          trigger: _trigger,
          content: tooltipContainer,
          animation: 'scale-subtle',
          interactive: true,
          appendTo: () => document.body,
          placement,
          hideOnClick: _trigger === 'click',
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
        }
        else {
          el.instance?.enable()

          // 清理旧的 Vue 应用实例
          if (el.vueApp) {
            el.vueApp.unmount()
          }

          // 使用提取的函数创建新的tooltip内容
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
        // 清理 Vue 应用实例
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
