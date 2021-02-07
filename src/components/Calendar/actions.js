import api from '../../api/api'

/**
 *
 * @param {Object} data
 * @param {number} data.limit
 * @returns {Promise<AxiosResponse<T>>}
 */
export function getFutureEvents({limit}) {
    return api.post(
        'calendarAjax',
        'getFutureEvents',
        {
            limit,
        }
    );
}

/**
 *
 * @param {Object} values
 * @returns {Promise<AxiosResponse<T>>}
 */
export function addNewEvent({txt, data}) {
    return api.post(
        'calendarAjax',
        'saveEvent',
        {
            txt,
            data,
        });
}
