import _LewDialog from './LewDialog.vue';
type Options = {
    title: string;
    content: string;
    ok: Function;
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
    const { title, content, ok, cancel, layout, closeOnClickOverlay } = options;
    const div: HTMLDivElement = document.createElement('div');
    document.body.appendChild(div);
    const close = () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        app.unmount(div);
        div.remove();
    };
    console.log(closeOnClickOverlay);

    const app = createApp({
        render() {
            return h(
                _LewDialog,
                {
                    closeOnClickOverlay: closeOnClickOverlay,
                    type: type,
                    layout: layout,
                    visible: true,
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
