import api from 'api/api';

/**
 *
 * @returns {Promise<AxiosResponse<T>>}
 */
export function getDocs() {
  return api.post('docsAjax', 'getData', {});
}

/**
 *
 * @param {Object} data
 * @param {number} data.id
 * @returns {Promise<AxiosResponse<T>>}
 */
export function deleteDoc({ id }) {
  return api.post('docsAjax', 'deleteDoc', { id });
}
