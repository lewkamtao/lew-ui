import { LewIcon } from '../../../components';
import '../styles/index.scss';
import { h, render } from 'vue';
type MessageFnOptions = {
    id: string;
    content: string;
    duration: number;
    onClose: Function;
};

type MessageOptions = {
    type: string;
    e: MessageFnOptions;
};
const iconTypeMap: any = {
    success: 'check-circle',
    warning: 'alert-triangle',
    error: 'alert-circle',
    normal: 'info',
    info: 'bell',
    loading: 'loader'
};

const createMessageList = () => {
    const messageContainer = document.createElement('div');
    messageContainer.setAttribute('id', 'lew-message');
    document.body.appendChild(messageContainer);
};

const showMessage = ({ type, e }: MessageOptions) => {
    const messageContainer: any = document.getElementById('lew-message');
    const hasMessageById = e.id ? document.getElementById(`message-id-${e.id}`) : false;
    const messageElement = hasMessageById || document.createElement('div');
    const svgArr: any = {
        success:
            '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path d="M256 48C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48zm106.5 150.5L228.8 332.8h-.1c-1.7 1.7-6.3 5.5-11.6 5.5-3.8 0-8.1-2.1-11.7-5.7l-56-56c-1.6-1.6-1.6-4.1 0-5.7l17.8-17.8c.8-.8 1.8-1.2 2.8-1.2 1 0 2 .4 2.8 1.2l44.4 44.4 122-122.9c.8-.8 1.8-1.2 2.8-1.2 1.1 0 2.1.4 2.8 1.2l17.5 18.1c1.8 1.7 1.8 4.2.2 5.8z" fill="currentColor"/></svg>',
        warning:
            '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path d="M228.9 79.9L51.8 403.1C40.6 423.3 55.5 448 78.9 448h354.3c23.3 0 38.2-24.7 27.1-44.9L283.1 79.9c-11.7-21.2-42.5-21.2-54.2 0zM273.6 214L270 336h-28l-3.6-122h35.2zM256 402.4c-10.7 0-19.1-8.1-19.1-18.4s8.4-18.4 19.1-18.4 19.1 8.1 19.1 18.4-8.4 18.4-19.1 18.4z" fill="currentColor"/></svg>',
        error: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path d="M256 48C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48zm52.7 283.3L256 278.6l-52.7 52.7c-6.2 6.2-16.4 6.2-22.6 0-3.1-3.1-4.7-7.2-4.7-11.3 0-4.1 1.6-8.2 4.7-11.3l52.7-52.7-52.7-52.7c-3.1-3.1-4.7-7.2-4.7-11.3 0-4.1 1.6-8.2 4.7-11.3 6.2-6.2 16.4-6.2 22.6 0l52.7 52.7 52.7-52.7c6.2-6.2 16.4-6.2 22.6 0 6.2 6.2 6.2 16.4 0 22.6L278.6 256l52.7 52.7c6.2 6.2 6.2 16.4 0 22.6-6.2 6.3-16.4 6.3-22.6 0z" fill="currentColor"/></svg>',
        normal: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path d="M256 48C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48zm17.2 109.6l-3.1 115.1c-.2 8.2-5.9 14.8-14.1 14.8s-13.9-6.6-14.1-14.8l-3.1-115.1c-.2-9.6 7.5-17.6 17.2-17.6 9.6 0 17.4 7.9 17.2 17.6zM256 354c-10.7 0-19.1-8.1-19.1-18.4s8.4-18.4 19.1-18.4c10.7 0 19.1 8.1 19.1 18.4S266.7 354 256 354z" fill="currentColor"/></svg>',
        info: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path d="M255.9 456c31.1 0 48.1-22 48.1-53h-96.3c0 31 17 53 48.2 53z" fill="currentColor"/><path d="M412 352.2c-15.4-20.3-45.7-32.2-45.7-123.1 0-93.3-41.2-130.8-79.6-139.8-3.6-.9-6.2-2.1-6.2-5.9v-2.9c0-13.4-11-24.7-24.4-24.6-13.4-.2-24.4 11.2-24.4 24.6v2.9c0 3.7-2.6 5-6.2 5.9-38.5 9.1-79.6 46.5-79.6 139.8 0 90.9-30.3 102.7-45.7 123.1-9.9 13.1-.5 31.8 15.9 31.8h280.1c16.3 0 25.7-18.8 15.8-31.8z" fill="currentColor"/></svg>',
        loading: `<svg xmlns="http://www.w3.org/2000/svg" class="vue-feather--spin vue-feather--fast" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-loader vue-feather__content"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>`
    };
    messageElement.innerHTML = `${svgArr[type]}<div class="content">${e.content || e}</div>`;

    if (!hasMessageById) {
        if (e.id) {
            messageElement.setAttribute('id', `message-id-${e.id}`);
        }
        messageContainer?.appendChild(messageElement, messageContainer?.childNodes[0]);
    } else {
        clearTimeout(LewMessage.timer[e.id]);
    }

    messageElement.setAttribute('class', `message message-${type} message-id-${e.id}`);

    setTimeout(() => {
        messageElement.setAttribute('class', `message message-${type} message-show`);
        LewMessage.timer[e.id] = setTimeout(() => {
            messageElement.setAttribute('class', `message message-${type} message-hidden`);
            setTimeout(() => {
                try {
                    if (messageElement) messageContainer?.removeChild(messageElement);
                } catch {}
            }, 350);
        }, e.duration || 3000);
    }, 10);
};
const removeClass = (element: any, className: any) => {
    element.classList.remove(className);
};
const addClass = (element: any, className: any) => {
    element.classList.add(className);
};

const LewMessage: any = {
    name: 'LewMessage',

    message: ({ type, e }: MessageOptions) => {
        if (!document.getElementById('lew-message')) {
            createMessageList();
            LewMessage.message({ type, e });
        } else {
            showMessage({ type, e });
        }
    },

    close: ({ id }: { id: string }) => {
        const messageElement = document.getElementById(`message-id-${id}`);

        if (messageElement) {
            removeClass(messageElement, 'message-show');
            addClass(messageElement, 'message-hidden');
            setTimeout(() => {
                clearTimeout(LewMessage.timer[id]);
                messageElement.remove();
            }, 350);
        }
    },

    request: async ({ loadingMessage }: { loadingMessage: string }, asyncFn: Function) => {
        try {
            // 显示loading消息
            LewMessage.loading({
                id: 'request-loading',
                content: loadingMessage,
                duration: 0
            });

            // 执行异步方法
            asyncFn()
                .then(
                    ({
                        content = '请求成功！',
                        duration = 3000
                    }: {
                        content: string;
                        duration: number;
                    }) => {
                        // 隐藏loading消息
                        LewMessage.close({ id: 'request-loading' });

                        // 显示success消息
                        LewMessage.success({
                            id: 'request-success',
                            content,
                            duration
                        });
                    }
                )
                .catch(
                    ({
                        content = '加载失败！',
                        duration = 3000
                    }: {
                        content: string;
                        duration: number;
                    }) => {
                        // 隐藏loading消息
                        LewMessage.close({ id: 'request-loading' });

                        // 显示success消息
                        LewMessage.error({
                            id: 'request-fail',
                            content,
                            duration: duration
                        });
                    }
                );
        } catch (error) {
            // 处理异步方法执行出错的情况
            LewMessage.error({
                id: 'request-loading',
                content: 'An error occurred',
                duration: 3000,
                onClose: () => {
                    // 可以选择性地处理错误消息关闭时的逻辑
                }
            });
        }
    },

    timer: {} as any
};

LewMessage.warning = (e: MessageFnOptions) => LewMessage.message({ type: 'warning', e });
LewMessage.error = (e: MessageFnOptions) => LewMessage.message({ type: 'error', e });
LewMessage.info = (e: MessageFnOptions) => LewMessage.message({ type: 'info', e });
LewMessage.normal = (e: MessageFnOptions) => LewMessage.message({ type: 'normal', e });
LewMessage.success = (e: MessageFnOptions) => LewMessage.message({ type: 'success', e });
LewMessage.loading = (e: MessageFnOptions) => LewMessage.message({ type: 'loading', e });

export default LewMessage;
