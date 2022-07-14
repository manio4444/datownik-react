import api from 'api/api';

/**
 *
 * @param {Object} data
 * @returns {Promise<AxiosResponse<T>>}
 */
export function tryCode({ code }) {
  return api.post('lockscreenAjax', 'tryPasscode', {
    code,
  });
}

/**
 *
 * @param {Object} data
 * @returns {Promise<AxiosResponse<T>>}
 */
export function checkAuth({ token }) {
  return api.post('lockscreenAjax', 'checkAuth', {
    token,
  });
}
