import api from '../../api/api'

/**
 *
 * @param {Object} values
 * @returns {Promise<AxiosResponse<T>>}
 */
export function addNewEvent ({txt, data}) {
    return api.post(
        'calendarAjax',
        'saveEvent',
        {
            txt,
            data,
        });
}
