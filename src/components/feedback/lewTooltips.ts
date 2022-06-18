import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css'; // optional for styling
import 'tippy.js/animations/scale-subtle.css';
import 'tippy.js/dist/svg-arrow.css';
import 'tippy.js/themes/light.css';

export default {
    install(app: any) {
        app.directive('tooltip', {
            mounted(el: any, binding: any) {
                tippy(el, {
                    theme: 'dark',
                    trigger: binding.value.trigger,
                    content: binding.value.content,
                    animation: 'scale-subtle',
                    interactive: true,
                    appendTo: 'parent',
                    placement: binding.value.placement,
                });
            },
        });
    },
};
