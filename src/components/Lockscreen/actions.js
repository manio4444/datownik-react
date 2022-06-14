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
