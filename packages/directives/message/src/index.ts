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
        success: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none"><path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2zm0 1.5a8.5 8.5 0 1 0 0 17a8.5 8.5 0 0 0 0-17zm-1.25 9.94l4.47-4.47a.75.75 0 0 1 1.133.976l-.073.084l-5 5a.75.75 0 0 1-.976.073l-.084-.073l-2.5-2.5a.75.75 0 0 1 .976-1.133l.084.073l1.97 1.97l4.47-4.47l-4.47 4.47z" fill="currentColor"></path></g></svg>`,
        warning: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none"><path d="M10.91 2.782a2.25 2.25 0 0 1 2.975.74l.083.138l7.759 14.009a2.25 2.25 0 0 1-1.814 3.334l-.154.006H4.243a2.25 2.25 0 0 1-2.041-3.197l.072-.143L10.031 3.66a2.25 2.25 0 0 1 .878-.878zm9.505 15.613l-7.76-14.008a.75.75 0 0 0-1.254-.088l-.057.088l-7.757 14.008a.75.75 0 0 0 .561 1.108l.095.006h15.516a.75.75 0 0 0 .696-1.028l-.04-.086l-7.76-14.008l7.76 14.008zM12 16.002a.999.999 0 1 1 0 1.997a.999.999 0 0 1 0-1.997zM11.995 8.5a.75.75 0 0 1 .744.647l.007.102l.004 4.502a.75.75 0 0 1-1.494.103l-.006-.102l-.004-4.502a.75.75 0 0 1 .75-.75z" fill="currentColor"></path></g></svg>`,
        error: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none"><path d="M12 2c5.523 0 10 4.478 10 10s-4.477 10-10 10S2 17.522 2 12S6.477 2 12 2zm0 1.667c-4.595 0-8.333 3.738-8.333 8.333c0 4.595 3.738 8.333 8.333 8.333c4.595 0 8.333-3.738 8.333-8.333c0-4.595-3.738-8.333-8.333-8.333zm-.001 10.835a.999.999 0 1 1 0 1.998a.999.999 0 0 1 0-1.998zM11.994 7a.75.75 0 0 1 .744.648l.007.101l.004 4.502a.75.75 0 0 1-1.493.103l-.007-.102l-.004-4.501a.75.75 0 0 1 .75-.751z" fill="currentColor"></path></g></svg>`,
        normal: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none"><path d="M12 1.999c5.524 0 10.002 4.478 10.002 10.002c0 5.523-4.478 10.001-10.002 10.001C6.476 22.002 2 17.524 2 12.001C1.999 6.477 6.476 1.999 12 1.999zm0 1.5a8.502 8.502 0 1 0 0 17.003A8.502 8.502 0 0 0 12 3.5zm-.004 7a.75.75 0 0 1 .744.648l.007.102l.004 5.502a.75.75 0 0 1-1.494.102l-.006-.101l-.004-5.502a.75.75 0 0 1 .75-.75zm.005-3.497a.999.999 0 1 1 0 1.997a.999.999 0 0 1 0-1.997z" fill="currentColor"></path></g></svg>`,
        info: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M12.45 16.002a2.5 2.5 0 0 1-4.9 0h4.9zM9.998 2c3.149 0 5.744 2.335 5.984 5.355l.013.223l.005.224l-.001 3.606l.954 2.587l.025.085l.016.086l.005.089c0 .315-.196.59-.522.707l-.114.033l-.114.01H3.751a.75.75 0 0 1-.259-.047c-.287-.105-.476-.372-.482-.716l.004-.117l.034-.13l.95-2.584L4 7.793l.004-.225C4.127 4.451 6.771 2 9.998 2z" fill="currentColor"></path></g></svg>`,
    };
    newMessage.innerHTML = `${svgArr[type]}<div class="content">${content}</div>`;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    LewMessageDom?.appendChild(newMessage, LewMessageDom?.childNodes[0]);

    newMessage.setAttribute('class', `message message-${type}`);
    setTimeout(() => {
        newMessage.setAttribute(
            'class',
            `message message-${type} message-show`,
        );
        setTimeout(() => {
            newMessage.setAttribute(
                'class',
                `message message-${type} message-hidden`,
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
