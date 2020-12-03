import axios from "axios";

/**
 *
 * @param {Object} data
 * @returns {Promise<AxiosResponse<T>>}
 */
const addNewNote = ({txt}) => {
    return axios.post(process.env.REACT_APP_ENDPOINT_URL, {
        ajax_action: 'notesAjax',
        operation: 'addNote',
        txt
    })
        .then(response => response)
        .catch(error => console.error(error));
};

export default addNewNote;