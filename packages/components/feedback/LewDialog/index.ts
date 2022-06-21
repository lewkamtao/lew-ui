import LewDialog from './LewDialog.vue';
import { h, createApp } from 'vue';
type Options = {
    title: string;
    content: string;
    // eslint-disable-next-line @typescript-eslint/ban-types
    ok: Function;
    // eslint-disable-next-line @typescript-eslint/ban-types
    cancel: Function;
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
    const { title, content, ok, cancel } = options;
    const div: any = document.createElement('div');
    document.body.appendChild(div);
    const close = () => {
        app.unmount(div);
        div.remove(); 
    };
    const app = createApp({
        render() {
            return h(
                LewDialog,
                {
                    closeOnClickOverlay: false,
                    visible: true,
                    'onUpdate:visible': (newVisible: any) => {
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
                },
            );
        },
    });
    app.mount(div);
};

export default { warning, info, normal, success, error };
