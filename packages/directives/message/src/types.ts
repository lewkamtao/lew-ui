import type { ComponentInternalInstance, VNode } from 'vue';

export type MessageType = 'success' | 'warning' | 'error' | 'info' | 'normal';

export interface IMessage {
    message?: string | VNode;
    type?: MessageType;
    duration?: number;
    icon?: string | VNode;
    onClose?: () => void;
}

export interface MessageHadler {
    close: () => void;
}

export type MessageFn = {
    (options: IMessage): MessageHadler;
};

export interface Message {
    success: (message: Partial<Pick<IMessage, 'message'>>) => void;
    warning: (message: Partial<Pick<IMessage, 'message'>>) => void;
    info: (message: Partial<Pick<IMessage, 'message'>>) => void;
    normal: (message: Partial<Pick<IMessage, 'message'>>) => void;
    error: (message: Partial<Pick<IMessage, 'message'>>) => void;
}

export interface MessageInstance {
    id: string;
    vnode: VNode;
    vm: ComponentInternalInstance;
    handler: MessageHadler;
    props: MessageProps | undefined;
}

export interface MessageProps {
    id: string;
    appendTo: string;
    type: MessageType;
    message: string | VNode;
    duration: number;
    icon: string | VNode;
    top: number;
    onClose: () => void;
    onDestory: () => void;
}
