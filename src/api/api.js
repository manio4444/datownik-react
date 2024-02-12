import axios from 'axios';

const RequestMethod = {
  GET: 'get',
  POST: 'post',
};

/**
 *
 * @param {RequestMethod} requestMethod
 * @param {Object} data
 * @returns {Promise<AxiosResponse<T>>}
 */
function apiShot(requestMethod, data) {
  return axios[requestMethod](process.env.REACT_APP_ENDPOINT_URL, data);
}

/**
 *
 * @param {AxiosError} error
 * @returns {string}
 */
export function getApiErrorMessage(error) {
  if (error?.response?.data?.message) {
    return error?.response?.data?.message;
  } else if (error?.message) {
    return error?.message;
  } else {
    return 'Error, check logs';
  }
}

export default {
  /**
   * @param {string} ajax_action
   * @param {string} operation
   * @param {Object} data
   * @returns {Promise<AxiosResponse<T>>}
   */
  get(ajax_action, operation, data) {
    return apiShot(RequestMethod.GET, { ajax_action, operation, ...data });
  },
  /**
   * @param {string} ajax_action
   * @param {string} operation
   * @param {Object} data
   * @returns {Promise<AxiosResponse<T>>}
   */
  post(ajax_action, operation, data) {
    return apiShot(RequestMethod.POST, { ajax_action, operation, ...data });
  },
};
