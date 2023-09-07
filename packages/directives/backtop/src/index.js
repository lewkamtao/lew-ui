import { shallowRef } from 'vue';

let _toBackUp;
export default {
    install(app) {
        app.directive('backtop', {
            mounted(el, binding) {
                const _target = binding.value;
                const dom = shallowRef();
                dom.value = document.documentElement;

                if (_target) {
                    dom.value =
                        document.querySelector < HTMLElement > `.${_target}` ? ?
                        undefined;
                    if (!dom.value) {
                        throw new Error(`target is not existed: ${_target}`);
                    }
                }
                _toBackUp = () => {
                    if (!dom.value) return;
                    const scrollDom = dom.value;
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