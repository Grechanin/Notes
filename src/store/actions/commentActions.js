export const createComment = (note_id, comment) => {
    const is_local_storage_provider = localStorage.getItem('is_local_storage_provider');
    comment.created_at = new Date();
    if (!is_local_storage_provider) {
        return (dispatch, getState, {getFirestore, getFirebase}) => {
            //make async call database
            const firestore = getFirestore();
            firestore.collection('notes').doc(note_id).collection('comments').add({
                ...comment,
            }).then(() => {
                dispatch({type: 'CREATE_COMMENT', comment});
            }).catch((err) => {
                dispatch({type: 'CREATE_COMMENT_ERROR', err});
            })
        }
    } else {
        return (dispatch) => {
            //generate id for local comment
            comment.id = `f${(+new Date).toString(16)}`;
            let notes = JSON.parse(localStorage.getItem('notes'))
            const checkNoteId = (note) => {
                return note.id === note_id && note
            }
            const note_index = notes.findIndex(checkNoteId);
            let comments = notes[note_index].comments
            if (comments) {
                comments.push(comment);
                notes[note_index].comments = comments;
            } else {
                notes[note_index].comments = [comment];
            }

            localStorage.setItem('notes', JSON.stringify(notes));
            dispatch({type: 'CREATE_COMMENT', comment});
        }
    }
}

export const showHideToggleCommentFormAction = (is_show) => {
    return (dispatch, getState, {getFirestore, getFirebase}) => {
            dispatch({type: 'HIDE_SHOW_TOGGLE_COMMENT_FORM', is_show: is_show});
    }
}