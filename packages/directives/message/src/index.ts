import '../styles/index.scss';

const warning = (content: string) => {
    message('warning', content);
};

const error = (content: string) => {
    message('error', content);
};

const info = (content: string) => {
    message('info', content);
};

const normal = (content: string) => {
    message('normal', content);
};

const success = (content: string) => {
    message('success', content);
};

const createMessageList = () => {
    const div: any = document.createElement('div');
    div.setAttribute('id', 'lew-message');
    document.body.appendChild(div);
};

const message = (type: string, content: string) => {
    if (!document.getElementById('lew-message')) {
        createMessageList();
        message(type, content);
    } else {
        addMessage(type, content);
    }
};

const addMessage = (type: string, content: string) => {
    const LewMessageDom = document.getElementById('lew-message');
    const newMessage = document.createElement('div');

    const svgArr: any = {
        success: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check vue-feather__content"><polyline points="20 6 9 17 4 12"></polyline></svg>`,
        warning: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-triangle vue-feather__content"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`,
        error: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-circle vue-feather__content"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`,
        normal: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-info vue-feather__content"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`,
        info: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-bell vue-feather__content"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>`,
    };

    newMessage.innerHTML = `${svgArr[type]}<div class="content">${content}</div>`;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    LewMessageDom?.appendChild(newMessage, LewMessageDom?.childNodes[0]);

    newMessage.setAttribute('class', `message message-${type}`);
    setTimeout(() => {
        newMessage.setAttribute(
            'class',
            `message message-${type} message-show`
        );
        setTimeout(() => {
            newMessage.setAttribute(
                'class',
                `message message-${type} message-hidden`
            );
            setTimeout(() => {
                if (newMessage) LewMessageDom?.removeChild(newMessage);
            }, 250);
        }, 3000);
    }, 10);
};

export default {
    name: 'LewMessage',
    warning,
    info,
    normal,
    success,
    error,
};
