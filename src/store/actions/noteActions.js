
export const createNoteAction = (note) => {
    const is_local_storage_provider = localStorage.getItem('is_local_storage_provider');
    note.created_at = new Date();
    if (!is_local_storage_provider) {
        return (dispatch, getState, {getFirestore, getFirebase}) => {
            const firestore = getFirestore();
            firestore.collection('notes').add({
                ...note,
            }).then(() => {
                dispatch({type: 'CREATE_NOTE', note});
            }).catch((err) => {
                dispatch({type: 'CREATE_NOTE_ERROR', err});
            })
        }
    } else {
        return (dispatch) => {
            let notes = JSON.parse(localStorage.getItem('notes'));
            let note_id = `f${(+new Date).toString(16)}`;
            if (notes) {
                note.id = note_id
                notes.push(note)
            } else {
                note.id = note_id
                notes = [note]
            }
            localStorage.setItem('notes', JSON.stringify(notes));
            dispatch({type: 'CREATE_NOTE', note});
        }
    }
}

export const editNoteAction = (note_id, note) => {
    const is_local_storage_provider = localStorage.getItem('is_local_storage_provider');
    note.updated_at = new Date();
    if (!is_local_storage_provider) {
        return (dispatch, getState, {getFirestore, getFirebase}) => {
            const firestore = getFirestore();
            firestore.collection('notes').doc(note_id).update({
                ...note,
            }).then(() => {
                dispatch({type: 'EDIT_NOTE', note});
            }).catch((err) => {
                dispatch({type: 'CREATE_NOTE_ERROR', err});
            })
        }
    } else {
        return (dispatch) => {
            let notes = JSON.parse(localStorage.getItem('notes'))
            const checkNoteId = (note) => {
                return note.id === note_id && note
            }
            const note_index = notes.findIndex(checkNoteId);
            notes[note_index] = {...notes[note_index], ...note};

            localStorage.setItem('notes', JSON.stringify(notes));
            dispatch({type: 'EDIT_NOTE', note});
        }
    }
}

export const closeModalCreated = () => {
    return (dispatch, getState, {getFirestore, getFirebase}) => {
        dispatch({type: 'CLOSE_MODAL_CREATED'});
    }
}

export const showHideToggleEditNoteFormAction = (is_show) => {
    return (dispatch, getState, {getFirestore, getFirebase}) => {
        dispatch({type: 'HIDE_SHOW_TOGGLE_EDIT_NODE_FORM', is_show: is_show});
    }
}