import api from 'api/api';

/**
 *
 * @param {Object} data
 * @param {number} data.limit
 * @returns {Promise<AxiosResponse<T>>}
 */
export function getFutureEvents({ limit }) {
  return api.post('calendarAjax', 'getFutureEvents', {
    limit,
  });
}

/**
 *
 * @param {Object} data
 * @param {number} data.month
 * @param {number} data.year
 * @returns {Promise<AxiosResponse<T>>}
 */
export function getMonthEvents({ month, year }) {
  return api.post('calendarAjax', 'getMonthEvents', {
    month,
    year,
  });
}

/**
 *
 * @param {Object} values
 * @returns {Promise<AxiosResponse<T>>}
 */
export function addNewEvent({ txt, data }) {
  return api.post('calendarAjax', 'saveEvent', {
    txt,
    data,
  });
}

/**
 *
 * @returns {Promise<AxiosResponse<T>>}
 */
export function getBirthdaysAll() {
  return api.post('calendarAjax', 'getBirthdaysAll', {});
}

/**
 *
 * @param {Object} values
 * @returns {Promise<AxiosResponse<T>>}
 */
export function addNewBirthday({ txt, data }) {
  return api.post('calendarAjax', 'saveBirthday', {
    txt,
    data,
  });
}
