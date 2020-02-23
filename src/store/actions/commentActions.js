export const createComment = (note_id, comment) => {
    return (dispatch, getState, {getFirestore, getFirebase}) => {
        //make async call database
        const firestore = getFirestore();
        firestore.collection('notes').doc(note_id).collection('comments').add({
            ...comment,
            created_at: new Date()
        }).then(() => {
            dispatch({type: 'CREATE_COMMENT', comment});
        }).catch((err) => {
            dispatch({type: 'CREATE_COMMENT_ERROR', err});
        })
    }
}

export const showHideToggleCommentFormAction = (is_show) => {
    return (dispatch, getState, {getFirestore, getFirebase}) => {
            dispatch({type: 'HIDE_SHOW_TOGGLE_COMMENT_FORM', is_show: is_show});
    }
}