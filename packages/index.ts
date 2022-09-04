import type { App } from 'vue';

export * from './components';
export * from './directives';

// tippy 样式
import 'tippy.js/dist/tippy.css'; // optional for styling
import 'tippy.js/animations/shift-away-subtle.css';
import 'tippy.js/themes/light.css';

// 引入样式
import './styles/reset.scss';
import './styles/main.scss';
import './styles/var.scss';

// 全局 => 定义 install 方法
import * as components from './components';
import * as directives from './directives';

const install: any = function (Vue: App): void {
    if (install.installed) return;

    const _components = Object.keys(components).map(
        (key) => components[key as keyof typeof components],
    );

    const _directives = Object.keys(directives).map(
        (key) => directives[key as keyof typeof directives],
    );

    _components.forEach((component: any) => {
        if (
            (component.hasOwnProperty('name') ||
                component.hasOwnProperty('__name')) &&
            component.hasOwnProperty('setup')
        ) {
            Vue.component(component.name || component.__name, component);
        }
    });

    _directives.forEach((directive: any) => {
        if (directive.hasOwnProperty('install')) {
            Vue.use(directive);
        } else if (directive.hasOwnProperty('name')) {
            const compName = directive.name.includes('Lew')
                ? directive.name
                : `Lew${directive.name}`;
            console.log(compName, 'compName');
            window[compName] = directive;
            Vue.config.globalProperties[compName] = directive;
            console.log(Vue.config.globalProperties, 'props');
        }
    });
};

export default {
    install,
};
