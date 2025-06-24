import { BASE_URL, TIME_OUT } from './config';
import xwlRequest from './index';

// eslint-disable-next-line new-cap
const xwlRequests = new xwlRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
});
export default xwlRequests;
