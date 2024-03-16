import { BASE_URL, TIME_OUT } from './config';
import xwlRequest from './index';
const xwlRequests = new xwlRequest({
    baseURL: BASE_URL,
    timeout: TIME_OUT
});
export default xwlRequests;
