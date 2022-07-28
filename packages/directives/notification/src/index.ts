import '../styles/index.scss';

export type NotificationParamsTyped = {
    title: string,
    content: string
}

export type NotificationFn = ((
    options: NotificationParamsTyped
) => void)

export interface NotificationInstance {
    name: string,
    warning: NotificationFn,
    info: NotificationFn,
    normal: NotificationFn,
    success: NotificationFn,
    error: NotificationFn,
}

const warning = ({ title, content }: NotificationParamsTyped) => {
    notification('warning', title, content);
};

const error = ({ title, content }: NotificationParamsTyped) => {
    notification('error', title, content);
};

const info = ({ title, content }: NotificationParamsTyped) => {
    notification('info', title, content);
};

const normal = ({ title, content }: NotificationParamsTyped) => {
    notification('normal', title, content);
};

const success = ({ title, content }: NotificationParamsTyped) => {
    notification('success', title, content);
};

const createMessageList = () => {
    const div: any = document.createElement('div');
    div.setAttribute('id', 'lew-notification');
    document.body.appendChild(div);
};

const notification = (type: string, title: string, content: string) => {
    if (!document.getElementById('lew-notification')) {
        createMessageList();
        notification(type, title, content);
    } else {
        add(type, title, content);
    }
};

const add = (type: string, title: string, content: string) => {
    const LewMessageDom = document.getElementById('lew-notification');
    const newMessage = document.createElement('div');

    newMessage.innerHTML = `
    <div class="main">
    <div class="lew-notification-title">${title}</div>
   ${
       content
           ? '<div class="lew-notification-content">' + content + '</div>'
           : ''
   } 
    </div>
    `;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    LewMessageDom?.appendChild(newMessage, LewMessageDom?.childNodes[0]);

    newMessage.setAttribute('class', `notification notification-${type}`);
    setTimeout(() => {
        newMessage.setAttribute(
            'class',
            `notification notification-${type} notification-show`,
        );
        setTimeout(() => {
            newMessage.setAttribute(
                'class',
                `notification notification-${type} notification-hidden`,
            );
            setTimeout(() => {
                LewMessageDom?.removeChild(newMessage);
            }, 250);
        }, 3000);
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
