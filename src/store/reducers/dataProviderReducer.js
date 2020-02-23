const initialState = {
    data_provider: 'firebase'
}

const dataProviderReducer = (state= initialState, action) => {
    switch (action.type) {
        case 'CHANGE_DATA_PROVIDER':
            state = {...state, data_provider: action.provider}
            return state;

        default:
            return state;

    }
}

export default dataProviderReducer;