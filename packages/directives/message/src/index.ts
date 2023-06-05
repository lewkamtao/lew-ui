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

const warning = (e: MessageFnOptions) => {
    message({
        type: 'warning',
        e,
    });
};

const error = (e: MessageFnOptions) => {
    message({
        type: 'error',
        e,
    });
};

const info = (e: MessageFnOptions) => {
    message({
        type: 'info',
        e,
    });
};

const normal = (e: MessageFnOptions) => {
    message({
        type: 'normal',
        e,
    });
};

const success = (e: MessageFnOptions) => {
    message({
        type: 'success',
        e,
    });
};

const loading = (e: MessageFnOptions) => {
    message({
        type: 'loading',
        e,
    });
};

const clear = (id?: number) => {
    const LewMessageDom = document.getElementById('lew-message');
    if (id) {
        const messageDom = document.getElementById(`message-id-${id}`);
        messageDom && messageDom.classList.add('message-hidden');
        setTimeout(() => {
            if (messageDom) LewMessageDom?.removeChild(messageDom);
        }, 120);
    } else if (LewMessageDom?.childNodes) {
        Array.from(LewMessageDom?.children).forEach((e) => {
            e && e.classList.add('message-hidden');
            setTimeout(() => {
                try {
                    if (e) LewMessageDom?.removeChild(e);
                } catch {}
            }, 350);
        });
    }
};

const createMessageList = () => {
    const div: any = document.createElement('div');
    div.setAttribute('id', 'lew-message');
    document.body.appendChild(div);
};

const message = ({ type, e }: MessageOptions) => {
    if (!document.getElementById('lew-message')) {
        createMessageList();
        message({ type, e });
    } else {
        setMessage({ type, e });
    }
};

const timer = {} as any;

const setMessage = ({ type, e }: MessageOptions) => {
    const LewMessageDom = document.getElementById('lew-message');
    const hasMessageById = e.id
        ? document.getElementById(`message-id-${e.id}`)
        : false;
    const messageDom = hasMessageById || document.createElement('div');
    const svgArr: any = {
        success: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check vue-feather__content"><polyline points="20 6 9 17 4 12"></polyline></svg>`,
        warning: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-triangle vue-feather__content"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`,
        error: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-circle vue-feather__content"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`,
        normal: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-info vue-feather__content"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`,
        info: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-bell vue-feather__content"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>`,
        loading: `<svg xmlns="http://www.w3.org/2000/svg" class="vue-feather--spin vue-feather--fast" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-loader vue-feather__content"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>`,
    };
    messageDom.innerHTML = `${svgArr[type]}<div class="content">${
        e.content || e
    }</div>`;
    if (!hasMessageById) {
        if (e.id) {
            messageDom.setAttribute('id', `message-id-${e.id}`);
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        LewMessageDom?.appendChild(messageDom, LewMessageDom?.childNodes[0]);
    } else {
        clearTimeout(timer[e.id]);
    }
    messageDom.setAttribute(
        'class',
        `message message-${type} message-id-${e.id}`
    );
    setTimeout(() => {
        messageDom.setAttribute(
            'class',
            `message message-${type} message-show`
        );
        timer[e.id] = setTimeout(() => {
            messageDom.setAttribute(
                'class',
                `message message-${type} message-hidden`
            );
            setTimeout(() => {
                try {
                    if (messageDom) LewMessageDom?.removeChild(messageDom);
                } catch {}
            }, 350);
        }, e.duration || 3000);
    }, 10);
};

export default {
    name: 'LewMessage',
    warning,
    info,
    normal,
    success,
    error,
    loading,
    clear,
};
