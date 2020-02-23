import noteReducer from "./noteReducer";
import commentReducer from "./commentReducer";
import dataProviderReducer from "./dataProviderReducer";
import { combineReducers } from "redux";
import { firestoreReducer } from 'redux-firestore'

const rootReducer = combineReducers({
    note: noteReducer,
    comment: commentReducer,
    firestore: firestoreReducer,
    data_provider: dataProviderReducer
})

export default rootReducer;