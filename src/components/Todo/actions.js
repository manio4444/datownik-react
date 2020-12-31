import axios from "axios";

/**
 *
 * @param {Object} data
 * @returns {Promise<AxiosResponse<T>>}
 */
export function addNewTodo ({txt, no_deadline, deadline}) {
    return axios.post(process.env.REACT_APP_ENDPOINT_URL, {
        ajax_action: 'tasksAjax',
        operation: 'saveTask',
        txt,
        no_deadline,
        deadline,
    }).catch(error => console.error(error, error.response.data.message))
}
