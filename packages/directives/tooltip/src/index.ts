import tippy from 'tippy.js';
import type { App as Application, DirectiveBinding } from 'vue';

export default {
    install(app: Application) {
        app.directive('tooltip', {
            mounted(el: any, binding: DirectiveBinding) {
                let { trigger } = binding.value;
                if (trigger === 'hover') {
                    trigger = 'mouseenter';
                }
                el.instance = tippy(el, {
                    theme: 'light',
                    trigger: trigger || 'mouseenter',
                    content: binding.value.content,
                    animation: 'shift-away-subtle',
                    interactive: true,
                    appendTo: () => document.body,
                    placement: binding.value.placement,
                    allowHTML: binding.value.allowHTML,
                    arrow: false,
                    duration: [150, 150],
                    maxWidth: 250,
                    delay: trigger === 'mouseenter' ? [150, 150] : undefined,
                });
                el.instance.popper.children[0].setAttribute(
                    'data-lew',
                    'tooltip'
                );
                if (!binding?.value?.content) {
                    el.instance.disable();
                }
            },
            updated(el: any, binding: DirectiveBinding) {
                if (!binding?.value?.content) {
                    el.instance.disable();
                } else {
                    el.instance.enable();
                    el.instance.setContent(binding.value.content);
                }
            },
            unmounted(el: any) {
                el.instance = null;
            },
        });
    },
};
