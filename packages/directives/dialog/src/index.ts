import _LewDialog from './LewDialog.vue';
import { h, createApp } from 'vue';
type Options = {
    title: string;
    content: string;
    // eslint-disable-next-line @typescript-eslint/ban-types
    ok: Function;
    // eslint-disable-next-line @typescript-eslint/ban-types
    cancel: Function;
    layout: string;
    closeOnClickOverlay?: boolean;
};

const warning = (options: Options) => {
    dialog('warning', options);
};

const error = (options: Options) => {
    dialog('error', options);
};

const info = (options: Options) => {
    dialog('info', options);
};

const normal = (options: Options) => {
    dialog('normal', options);
};

const success = (options: Options) => {
    dialog('success', options);
};

const dialog = (type: string, options: Options) => {
    const {
        title,
        content,
        ok,
        cancel,
        layout,
        closeOnClickOverlay = true,
    } = options;
    const div: HTMLDivElement = document.createElement('div');
    document.body.appendChild(div);
    const close = () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        app.unmount(div);
        div.remove();
    };
    const app = createApp({
        render() {
            return h(
                _LewDialog,
                {
                    closeOnClickOverlay: closeOnClickOverlay,
                    type: type,
                    layout: layout,
                    visible: true,
                    'onUpdate:visible': (newVisible: boolean) => {
                        if (newVisible === false) {
                            close();
                        }
                    },
                    ok: ok,
                    cancel: cancel,
                },
                {
                    title: () => title,
                    content: () => content,
                }
            );
        },
    });
    app.mount(div);
};

export default {
    name: 'LewDialog',
    warning,
    info,
    normal,
    success,
    error,
};
