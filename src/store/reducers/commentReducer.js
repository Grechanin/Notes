const initialState = {
    is_show_create_comment_form: false
}

const commentReducer = (state= initialState, action) => {
    switch (action.type) {
        case 'CREATE_COMMENT':
            console.log('created comment', action.comment)
            state = {...state, is_show_create_comment_form: false}
            return state;

        case 'CREATE_COMMENT_ERROR':
            console.log('create comment error', action.err)
            return state;

        case 'HIDE_SHOW_TOGGLE_COMMENT_FORM':
            state = {...state, is_show_create_comment_form: action.is_show}
            return state;
        default:
            return state;

    }
}

export default commentReducer;