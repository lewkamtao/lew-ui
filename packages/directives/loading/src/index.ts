import type { App as Application, DirectiveBinding } from 'vue';
import '../styles/index.scss';

let loadingBox: HTMLElement;
export default {
    install(app: Application) {
        app.directive('loading', {
            mounted(el: HTMLElement, binding: DirectiveBinding) {
                const _target = binding.value;
                el.classList.add('lew-loading');
                loadingBox = document.createElement('div');
                loadingBox.classList.add('lew-loading-box');
                loadingBox.setAttribute('data-after', _target.title || '');
                el.appendChild(loadingBox);
                if (_target.isShow) {
                    el.classList.add('lew-loading-show');
                }
            },
            updated(el: HTMLElement, binding: DirectiveBinding) {
                const _target = binding.value;
                loadingBox.setAttribute('data-after', _target.title || '');
                if (_target.isShow) {
                    el.classList.add('lew-loading-show');
                } else {
                    el.classList.remove('lew-loading-show');
                }
            },
        });
    },
};
