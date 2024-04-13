import type { App } from 'vue';

// tippy 样式
import 'tippy.js/dist/tippy.css'; // optional for styling
import 'tippy.js/animations/shift-away-subtle.css';
import 'tippy.js/animations/scale.css';
import 'tippy.js/themes/light.css';

// 引入样式
import './styles/reset.scss';
import './styles/main.scss';
import './styles/var.scss';
import './styles/tippy.scss';

// 全局 => 定义 install 方法
import * as components from './components';
import * as directives from './directives';

export * from './components';
export * from './directives';
export * from './utils';

const install: any = function (Vue: App): void {
    if (install.installed) return;

    const _components = Object.keys(components).map(
        (key) => components[key as keyof typeof components]
    );

    const _directives = Object.keys(directives).map(
        (key) => directives[key as keyof typeof directives]
    );

    _components.forEach((component: any) => {
        if (component.hasOwnProperty('name') || component.hasOwnProperty('__name')) {
            Vue.component(`${component.name || component.__name}`, component);
        }
    });

    _directives.forEach((directive: any) => {
        if (directive.hasOwnProperty('install')) {
            Vue.use(directive);
        } else if (directive.hasOwnProperty('name')) {
            window[directive.name] = directive;
            Vue.config.globalProperties[directive.name] = directive;
        }
    });
};

export default {
    install
};
