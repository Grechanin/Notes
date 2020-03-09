const initialState = {}

const commentReducer = (state= initialState, action) => {
    switch (action.type) {
        case 'CREATE_COMMENT':
            state = {...state, is_show_create_comment_form: false}
            return state;

        case 'CREATE_COMMENT_ERROR':
            console.log('create comment error', action.err)
            return state;

        case 'COMMENT_DELETE_ERROR':
            console.log('comment comment error', action.err)
            return state;

        default:
            return state;

    }
}

export default commentReducer;