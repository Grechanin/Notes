
export const createNoteAction = (note) => {
    const is_local_storage_provider = localStorage.getItem('is_local_storage_provider');
    note.created_at = new Date();
    if (!is_local_storage_provider) {
        return (dispatch, getState, {getFirestore, getFirebase}) => {
            const firestore = getFirestore();
            firestore.collection('notes').add({
                ...note,
                // created_at: new Date()
            }).then(() => {
                dispatch({type: 'CREATE_NOTE', note});
            }).catch((err) => {
                dispatch({type: 'CREATE_NOTE_ERROR', err});
            })
        }
    } else {
        return (dispatch, getState, {getFirestore, getFirebase}) => {
            let notes = JSON.parse(localStorage.getItem('notes'))
            let id = `f${(+new Date).toString(16)}`
            if (notes) {
                while (notes.id) {
                    id = `f${(+new Date).toString(16)}`
                }
                // notes[id] = note
                note.id = id
                notes.push(note)
            } else {
                // notes = {[id]: note}
                note.id = id
                notes = [note]
            }
            localStorage.setItem('notes', JSON.stringify(notes));
            dispatch({type: 'CREATE_NOTE', note});
        }
    }
}

export const editNoteAction = (note_id, note) => {
    return (dispatch, getState, {getFirestore, getFirebase}) => {
        const firestore = getFirestore();
        firestore.collection('notes').doc(note_id).update({
            ...note,
            updated_at: new Date()
        }).then(() => {
            dispatch({type: 'EDIT_NOTE', note});
        }).catch((err) => {
            dispatch({type: 'CREATE_NOTE_ERROR', err});
        })
    }
}

export const showHideToggleEditNoteFormAction = (is_show) => {
    return (dispatch, getState, {getFirestore, getFirebase}) => {
        dispatch({type: 'HIDE_SHOW_TOGGLE_EDIT_NODE_FORM', is_show: is_show});
    }
}