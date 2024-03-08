import '../styles/index.scss';
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

const svgArr: any = {
    success: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check vue-feather__content"><polyline points="20 6 9 17 4 12"></polyline></svg>`,
    warning: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-triangle vue-feather__content"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`,
    error: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-circle vue-feather__content"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`,
    normal: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-info vue-feather__content"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`,
    info: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-bell vue-feather__content"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>`,
    loading: `<svg xmlns="http://www.w3.org/2000/svg" class="vue-feather--spin vue-feather--fast" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-loader vue-feather__content"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>`
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
