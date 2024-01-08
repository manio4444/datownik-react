import api from 'api/api';

/**
 *
 * @param {Object} data
 * @returns {Promise<AxiosResponse<T>>}
 */
export function addNewNote({ txt }) {
  return api.post('notesAjax', 'addNote', {
    txt,
  });
}

/**
 *
 * @param {Object} data
 * @returns {Promise<AxiosResponse<T>>}
 */
export function getSingleNote({ id }) {
  return api.post('notesAjax', 'getSingleNoteData', {
    id,
  });
}
