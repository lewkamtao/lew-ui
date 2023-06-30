import _LewDialog from './LewDialog.vue';
import { ButtonColor } from '../../../components/button/src/button';

type Options = {
    title: string;
    content: string;
    ok: Function;
    cancel: Function;
    layout: String;
    iconType: String;
    closeOnClickOverlay?: boolean;
    okText: String;
    cancelText: String;
    okButtonColor: ButtonColor;
    cancelButtonColor: ButtonColor;
};

const LewDialog = (options: Options) => {
    const {
        title,
        content,
        ok,
        cancel,
        okText,
        iconType,
        cancelText,
        okButtonColor,
        cancelButtonColor,
        layout,
        closeOnClickOverlay,
    } = options;
    const div: HTMLDivElement = document.createElement('div');
    document.body.appendChild(div);
    const app = createApp({
        render() {
            return h(
                _LewDialog,
                {
                    closeOnClickOverlay,
                    layout,
                    okText,
                    cancelText,
                    okButtonColor,
                    cancelButtonColor,
                    iconType,
                    ok:
                        ok ||
                        (() => {
                            return true;
                        }),
                    onClose: () => {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        app.unmount(div);
                        div.remove();
                    },
                    cancel:
                        cancel ||
                        (() => {
                            return true;
                        }),
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

export default LewDialog;
