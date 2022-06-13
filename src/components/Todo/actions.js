import api from '../../api/api';

/**
 *
 * @param {Object} data
 * @returns {Promise<AxiosResponse<T>>}
 */
export function addNewTodo({ txt, no_deadline, deadline }) {
  return api.post('tasksAjax', 'saveTask', {
    txt,
    no_deadline,
    deadline,
  });
}

/**
 *
 * @param {Object} data
 * @returns {Promise<AxiosResponse<T>>}
 */
export function deleteTodo({ id }) {
  return api.post('tasksAjax', 'deleteTask', {
    id,
  });
}
