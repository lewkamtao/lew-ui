import '../styles/index.scss';

export type NotificationParamsTyped = {
    title: string;
    content: string;
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
    const svgArr: any = {
        success: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none"><path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2zm0 1.5a8.5 8.5 0 1 0 0 17a8.5 8.5 0 0 0 0-17zm-1.25 9.94l4.47-4.47a.75.75 0 0 1 1.133.976l-.073.084l-5 5a.75.75 0 0 1-.976.073l-.084-.073l-2.5-2.5a.75.75 0 0 1 .976-1.133l.084.073l1.97 1.97l4.47-4.47l-4.47 4.47z" fill="currentColor"></path></g></svg>`,
        warning: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none"><path d="M10.91 2.782a2.25 2.25 0 0 1 2.975.74l.083.138l7.759 14.009a2.25 2.25 0 0 1-1.814 3.334l-.154.006H4.243a2.25 2.25 0 0 1-2.041-3.197l.072-.143L10.031 3.66a2.25 2.25 0 0 1 .878-.878zm9.505 15.613l-7.76-14.008a.75.75 0 0 0-1.254-.088l-.057.088l-7.757 14.008a.75.75 0 0 0 .561 1.108l.095.006h15.516a.75.75 0 0 0 .696-1.028l-.04-.086l-7.76-14.008l7.76 14.008zM12 16.002a.999.999 0 1 1 0 1.997a.999.999 0 0 1 0-1.997zM11.995 8.5a.75.75 0 0 1 .744.647l.007.102l.004 4.502a.75.75 0 0 1-1.494.103l-.006-.102l-.004-4.502a.75.75 0 0 1 .75-.75z" fill="currentColor"></path></g></svg>`,
        error: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none"><path d="M12 2c5.523 0 10 4.478 10 10s-4.477 10-10 10S2 17.522 2 12S6.477 2 12 2zm0 1.667c-4.595 0-8.333 3.738-8.333 8.333c0 4.595 3.738 8.333 8.333 8.333c4.595 0 8.333-3.738 8.333-8.333c0-4.595-3.738-8.333-8.333-8.333zm-.001 10.835a.999.999 0 1 1 0 1.998a.999.999 0 0 1 0-1.998zM11.994 7a.75.75 0 0 1 .744.648l.007.101l.004 4.502a.75.75 0 0 1-1.493.103l-.007-.102l-.004-4.501a.75.75 0 0 1 .75-.751z" fill="currentColor"></path></g></svg>`,
        normal: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none"><path d="M12 1.999c5.524 0 10.002 4.478 10.002 10.002c0 5.523-4.478 10.001-10.002 10.001C6.476 22.002 2 17.524 2 12.001C1.999 6.477 6.476 1.999 12 1.999zm0 1.5a8.502 8.502 0 1 0 0 17.003A8.502 8.502 0 0 0 12 3.5zm-.004 7a.75.75 0 0 1 .744.648l.007.102l.004 5.502a.75.75 0 0 1-1.494.102l-.006-.101l-.004-5.502a.75.75 0 0 1 .75-.75zm.005-3.497a.999.999 0 1 1 0 1.997a.999.999 0 0 1 0-1.997z" fill="currentColor"></path></g></svg>`,
        info: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none"><path d="M12 1.996a7.49 7.49 0 0 1 7.496 7.25l.004.25v4.097l1.38 3.156a1.249 1.249 0 0 1-1.145 1.75L15 18.502a3 3 0 0 1-5.995.177L9 18.499H4.275a1.251 1.251 0 0 1-1.147-1.747L4.5 13.594V9.496c0-4.155 3.352-7.5 7.5-7.5zM13.5 18.5l-3 .002a1.5 1.5 0 0 0 2.993.145l.007-.147zM12 3.496c-3.32 0-6 2.674-6 6v4.41L4.656 17h14.697L18 13.907V9.509l-.003-.225A5.988 5.988 0 0 0 12 3.496z" fill="currentColor"></path></g></svg>`,
    };
    newMessage.innerHTML = `
                <div class="lew-notification-box">
                    <div class="lew-notification-icon">
                    ${svgArr[type]}
                    </div>
                    <div class="lew-notification-body">
                    <div class="lew-notification-title">${title}</div>
                    ${
                        content
                            ? '<div class="lew-notification-content">' +
                              content +
                              '</div>'
                            : ''
                    }
                    </div> 
                </div>
    `;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    LewMessageDom?.appendChild(newMessage, LewMessageDom?.childNodes[0]);

    newMessage.setAttribute(
        'class',
        `lew-notification lew-notification-${type}`,
    );
    setTimeout(() => {
        newMessage.setAttribute(
            'class',
            `lew-notification lew-notification-${type} lew-notification-show`,
        );
        setTimeout(() => {
            newMessage.setAttribute(
                'class',
                `lew-notification lew-notification-${type} lew-notification-hidden`,
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
    error,
} as NotificationInstance;
