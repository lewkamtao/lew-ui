import type { App } from 'vue';

export * from './components';
export * from './directives';
export * from './directives';

// 引入样式
import './styles/reset.scss';
import './styles/main.scss';
import './styles/var.scss';

// fancybox
import '@fancyapps/ui/dist/fancybox.css';

// plyr
import 'plyr/dist/plyr.css';

// 全局 => 定义 install 方法
import * as components from './components';

const install: any = function (Vue: App): void {
    if (install.installed) return;
    const _components = Object.keys(components).map(
        (key) => components[key as keyof typeof components],
    );
    _components.forEach((component: any) => {
        if (
            component.hasOwnProperty('name') &&
            component.hasOwnProperty('setup')
        ) {
            Vue.component(component.name, component);
        }
    });
};

export default {
    install,
};
