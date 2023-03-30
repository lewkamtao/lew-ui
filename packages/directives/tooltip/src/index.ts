import tippy from 'tippy.js';
import type { App as Application, DirectiveBinding } from 'vue';

export default {
    install(app: Application) {
        app.directive('tooltip', {
            mounted(el: any, binding: DirectiveBinding) {
                let trigger = binding.value.trigger;
                if (trigger === 'hover') {
                    trigger = 'mouseenter';
                }
                el.instance = tippy(el, {
                    trigger: trigger || 'mouseenter',
                    content: binding.value.content,
                    animation: 'shift-away-subtle',
                    interactive: true,
                    appendTo: () => document.body,
                    placement: binding.value.placement,
                    allowHTML: binding.value.allowHTML,
                    arrow: binding.value.arrow,
                    maxWidth: 250,
                });
                el.instance.popper.children[0].setAttribute(
                    'data-lew',
                    'tooltip'
                );
            },
            updated(el: any, binding: DirectiveBinding) {
                el.instanceContent = binding.value.content;
            },
            unmounted(el: any) {
                el.instance = null;
            },
        });
    },
};
