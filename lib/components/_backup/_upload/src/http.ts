import type { UploadRequestOptions, UploadProgressEvent } from './upload.type';

class UploadHttpError extends Error {
    name = 'UploadHttpError';

    status: number;

    method: string;

    url: string;

    constructor(message: string, xhr: XMLHttpRequest, options: UploadRequestOptions) {
        super(message);
        this.status = xhr.status;
        this.method = options.method;
        this.url = options.action;
    }
}

function getError(xhr: XMLHttpRequest, options: UploadRequestOptions) {
    let msg: string;

    if (xhr.response) {
        msg = `${xhr.response.error || xhr.response}`;
    } else if (xhr.responseText) {
        msg = `${xhr.responseText}`;
    } else {
        msg = `fail to ${options.method} ${options.action} ${xhr.status}`;
    }

    return new UploadHttpError(msg, xhr, options);
}

function getResponse(xhr: XMLHttpRequest) {
    const text = xhr.responseText || xhr.response;

    if (!text) {
        return text;
    }

    try {
        return JSON.parse(text);
    } catch {
        return text;
    }
}

export function http(options: UploadRequestOptions) {
    const xhr = new XMLHttpRequest();

    xhr.open(options.method, options.action, true);

    if (options.headers instanceof Headers) {
        options.headers.forEach((value, key) => xhr.setRequestHeader(key, value));
    } else {
        for (const [key, value] of Object.entries(options.headers)) {
            if (value === null || value === undefined) continue;
            xhr.setRequestHeader(key, String(value));
        }
    }

    const formData = new FormData();
    if (options.data) {
        for (const [key, value] of Object.entries(options.data)) {
            if (Array.isArray(value)) formData.append(key, ...value);
            else formData.append(key, value);
        }
    }
    formData.append(options.name, options.file);

    xhr.addEventListener('progress', (event: ProgressEvent) => {
        const progressEvent = event as UploadProgressEvent;
        progressEvent.percent = (event.loaded / event.total) * 100;
        options.onProgress(progressEvent);
    });

    xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
            options.onSuccess(getResponse(xhr));
            return;
        }
        options.onFail(getError(xhr, options));
    });

    xhr.addEventListener('error', () => {
        options.onFail(getError(xhr, options));
    });

    xhr.send(formData);
}
