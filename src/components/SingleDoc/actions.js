import api from 'api/api';

/**
 *
 * @param {Object} data
 * @param {number} data.id
 * @returns {Promise<AxiosResponse<T>>}
 */
export function getDoc({ id }) {
  return api.post('docsAjax', 'getElement', {
    id,
  });
}
