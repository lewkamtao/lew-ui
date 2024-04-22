import '../styles/index.scss';
import { useTimeoutFn } from '@vueuse/core';
import { LewIcon } from '../../../components';

export type NotificationParamsTyped = {
    title: string;
    content: string;
    delay?: number;
};

export type NotificationFn = (options: NotificationParamsTyped) => void;

export interface NotificationInstance {
    name: string;
    warning: NotificationFn;
    info: NotificationFn;
    normal: NotificationFn;
    success: NotificationFn;
    error: NotificationFn;
}

const warning = ({ title, content, delay = 3000 }: NotificationParamsTyped) => {
    notification('warning', title, content, delay);
};

const error = ({ title, content, delay = 3000 }: NotificationParamsTyped) => {
    notification('error', title, content, delay);
};

const info = ({ title, content, delay = 3000 }: NotificationParamsTyped) => {
    notification('info', title, content, delay);
};

const normal = ({ title, content, delay = 3000 }: NotificationParamsTyped) => {
    notification('normal', title, content, delay);
};

const success = ({ title, content, delay = 3000 }: NotificationParamsTyped) => {
    notification('success', title, content, delay);
};

const createMessageList = () => {
    const div: HTMLDivElement = document.createElement('div');
    div.setAttribute('id', 'lew-notification');
    document.body.appendChild(div);
};

const notification = (type: string, title: string, content: string, delay: number) => {
    if (!document.getElementById('lew-notification')) {
        createMessageList();
        notification(type, title, content, delay);
    } else {
        add(type, title, content, delay);
    }
};

const add = (type: string, title: string, content: string, delay: number) => {
    const LewMessageDom = document.getElementById('lew-notification');
    const newMessage = document.createElement('div');
    const svgArr: any = {
        success:
            '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path d="M256 48C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48zm106.5 150.5L228.8 332.8h-.1c-1.7 1.7-6.3 5.5-11.6 5.5-3.8 0-8.1-2.1-11.7-5.7l-56-56c-1.6-1.6-1.6-4.1 0-5.7l17.8-17.8c.8-.8 1.8-1.2 2.8-1.2 1 0 2 .4 2.8 1.2l44.4 44.4 122-122.9c.8-.8 1.8-1.2 2.8-1.2 1.1 0 2.1.4 2.8 1.2l17.5 18.1c1.8 1.7 1.8 4.2.2 5.8z" fill="currentColor"/></svg>',
        warning:
            '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path d="M228.9 79.9L51.8 403.1C40.6 423.3 55.5 448 78.9 448h354.3c23.3 0 38.2-24.7 27.1-44.9L283.1 79.9c-11.7-21.2-42.5-21.2-54.2 0zM273.6 214L270 336h-28l-3.6-122h35.2zM256 402.4c-10.7 0-19.1-8.1-19.1-18.4s8.4-18.4 19.1-18.4 19.1 8.1 19.1 18.4-8.4 18.4-19.1 18.4z" fill="currentColor"/></svg>',
        error: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path d="M256 48C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48zm52.7 283.3L256 278.6l-52.7 52.7c-6.2 6.2-16.4 6.2-22.6 0-3.1-3.1-4.7-7.2-4.7-11.3 0-4.1 1.6-8.2 4.7-11.3l52.7-52.7-52.7-52.7c-3.1-3.1-4.7-7.2-4.7-11.3 0-4.1 1.6-8.2 4.7-11.3 6.2-6.2 16.4-6.2 22.6 0l52.7 52.7 52.7-52.7c6.2-6.2 16.4-6.2 22.6 0 6.2 6.2 6.2 16.4 0 22.6L278.6 256l52.7 52.7c6.2 6.2 6.2 16.4 0 22.6-6.2 6.3-16.4 6.3-22.6 0z" fill="currentColor"/></svg>',
        normal: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path d="M256 48C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48zm17.2 109.6l-3.1 115.1c-.2 8.2-5.9 14.8-14.1 14.8s-13.9-6.6-14.1-14.8l-3.1-115.1c-.2-9.6 7.5-17.6 17.2-17.6 9.6 0 17.4 7.9 17.2 17.6zM256 354c-10.7 0-19.1-8.1-19.1-18.4s8.4-18.4 19.1-18.4c10.7 0 19.1 8.1 19.1 18.4S266.7 354 256 354z" fill="currentColor"/></svg>',
        info: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path d="M255.9 456c31.1 0 48.1-22 48.1-53h-96.3c0 31 17 53 48.2 53z" fill="currentColor"/><path d="M412 352.2c-15.4-20.3-45.7-32.2-45.7-123.1 0-93.3-41.2-130.8-79.6-139.8-3.6-.9-6.2-2.1-6.2-5.9v-2.9c0-13.4-11-24.7-24.4-24.6-13.4-.2-24.4 11.2-24.4 24.6v2.9c0 3.7-2.6 5-6.2 5.9-38.5 9.1-79.6 46.5-79.6 139.8 0 90.9-30.3 102.7-45.7 123.1-9.9 13.1-.5 31.8 15.9 31.8h280.1c16.3 0 25.7-18.8 15.8-31.8z" fill="currentColor"/></svg>',
        close: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x vue-feather__content"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>'
    };

    newMessage.innerHTML = `
                <div class="lew-notification-box"> 
                    <div class="lew-notification-icon">
                      ${svgArr[type]}
                    </div>
                    <div class="lew-notification-body">
                      <div class="lew-notification-title">${title}</div>
                     	 ${content ? `<div class="lew-notification-content">${content}</div>` : ''}
                    </div> 
                    <div class="lew-notification-close-icon">
						${svgArr.close}
                    </div>
                </div>
    `;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    LewMessageDom?.insertBefore(newMessage, LewMessageDom?.childNodes[0]);

    newMessage.setAttribute('class', `lew-notification lew-notification-${type}`);

    let timer: (() => void) | undefined;
    let lock = false; // 加上锁 避免 点击关闭和鼠标移出事件重叠 bug

    function startTimer() {
        if (delay > 0) {
            ({ stop: timer } = useTimeoutFn(() => {
                handleClose();
            }, delay));
        }
    }

    function clearTimer() {
        timer?.();
    }

    function handleClose() {
        if (lock) {
            return;
        }
        lock = true;

        newMessage.setAttribute(
            'class',
            `lew-notification lew-notification-${type} lew-notification-hidden`
        );
        if (newMessage) {
            if (LewMessageDom) {
                setTimeout(() => {
                    LewMessageDom.removeChild(newMessage);
                }, 250);
            }
        }
    }

    newMessage.children[0].children[2].addEventListener('click', handleClose);
    newMessage.addEventListener('mouseenter', clearTimer);
    newMessage.addEventListener('mouseleave', startTimer);

    setTimeout(() => {
        lock = false;
        newMessage.setAttribute(
            'class',
            `lew-notification lew-notification-${type} lew-notificatishow`
        );
        delay > 0 && startTimer();
    }, 10);
};

export default {
    name: 'LewNotification',
    warning,
    info,
    normal,
    success,
    error
} as NotificationInstance;
