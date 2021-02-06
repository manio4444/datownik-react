import axios from "axios";

/**
 *
 * @param {Object} values
 * @returns {Promise<AxiosResponse<T>>}
 */
export function addNewEvent ({txt, data}) {
    return axios.post(process.env.REACT_APP_ENDPOINT_URL, {
        ajax_action: 'calendarAjax',
        operation: 'saveEvent',
        txt,
        data,
    }).catch(error => console.error(error, error.response.data.message))
}
