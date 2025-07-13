import { shallowRef } from 'vue'
import type { App, DirectiveBinding } from 'vue'

const createBackTopHandler = (target?: string) => {
    const dom = shallowRef<HTMLElement>(document.documentElement)

    if (target) {
        const targetElement = document.querySelector<HTMLElement>(`.${target}`)
        if (!targetElement) {
            throw new Error(`目标元素不存在: ${target}`)
        }
        dom.value = targetElement
    }

    return () => {
        if (dom.value) {
            dom.value.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }
}

interface ExtendedHTMLElement extends HTMLElement {
    _backTopHandler?: () => void
}

export default {
    install(app: App) {
        app.directive('backtop', {
            mounted(el: ExtendedHTMLElement, binding: DirectiveBinding) {
                const backTopHandler = createBackTopHandler(binding.value)
                el.addEventListener('click', backTopHandler)
                el._backTopHandler = backTopHandler
            },
            unmounted(el: ExtendedHTMLElement) {
                if (el._backTopHandler) {
                    el.removeEventListener('click', el._backTopHandler)
                    delete el._backTopHandler
                }
            },
        })
    },
}
