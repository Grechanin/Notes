export const changeDataProviderAction = (provider) => {
    return (dispatch, getState, {getFirestore, getFirebase}) => {
            dispatch({type: 'CHANGE_DATA_PROVIDER', provider: provider});
    }
}