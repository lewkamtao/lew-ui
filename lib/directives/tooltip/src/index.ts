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
                if (!trigger) {
                    trigger = 'mouseenter';
                }
                el.instance = tippy(el, {
                    theme: 'light',
                    trigger: trigger || 'mouseenter',
                    content: binding.value.content,
                    hideOnClick: trigger === 'mouseenter' ? false : true,
                    animation: 'shift-away-subtle',
                    interactive: true,
                    appendTo: () => document.body,
                    placement: binding.value.placement,
                    allowHTML: binding.value.allowHtml,
                    arrow: false,
                    duration: [120, 120],
                    maxWidth: 250,
                    delay: trigger === 'mouseenter' ? [120, 120] : undefined,
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
