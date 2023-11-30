import api from 'api/api';

/**
 *
 * @returns {Promise<AxiosResponse<T>>}
 */
export function getSystemInfo() {
  return api.post('systemInfo', 'getSystemInfo', {});
}
