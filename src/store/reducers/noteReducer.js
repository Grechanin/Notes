const initialState = {
    show_modal_created: false,
    is_show_edit_node_form: false
}

const noteReducer = (state= initialState, action) => {
    switch (action.type) {
        case 'CREATE_NOTE':
            state = {...state, show_modal_created: true}
            return state;

        case 'CREATE_NOTE_ERROR':
            console.log('create note error', action.err)
            return state;

        case 'EDIT_NOTE':
            state = {...state, is_show_edit_node_form: false}
            return state;

        case 'CLOSE_MODAL_CREATED':
            state = {...state, show_modal_created: false}
            return state;

        case 'HIDE_SHOW_TOGGLE_EDIT_NODE_FORM':
            state = {...state, is_show_edit_node_form: action.is_show}
            return state;
        default:
            return state;

    }
}

export default noteReducer;