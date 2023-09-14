import { shallowRef } from 'vue';
import type { App as Application, DirectiveBinding } from 'vue';

let _toBackUp: any;
export default {
    install(app: Application) {
        app.directive('backtop', {
            mounted(el: HTMLElement, binding: DirectiveBinding) {
                const _target = binding.value;
                const dom = shallowRef<HTMLElement>();
                dom.value = document.documentElement;

                if (_target) {
                    dom.value =
                        document.querySelector<HTMLElement>(`.${_target}`) ??
                        undefined;
                    if (!dom.value) {
                        throw new Error(`target is not existed: ${_target}`);
                    }
                }
                _toBackUp = () => {
                    if (!dom.value) return;
                    const scrollDom = dom.value as HTMLElement;
                    scrollDom.scrollTop = 0;
                };
                el.addEventListener('click', _toBackUp);
            },
            unmounted(el) {
                el.removeEventListener('click', _toBackUp);
            },
        });
    },
};
