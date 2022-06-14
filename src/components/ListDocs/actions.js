import api from 'api/api';

/**
 *
 * @returns {Promise<AxiosResponse<T>>}
 */
export function getDocs() {
  return api.post('docsAjax', 'getData', {});
}
