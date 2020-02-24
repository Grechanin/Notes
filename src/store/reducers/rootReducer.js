import noteReducer from "./noteReducer";
import commentReducer from "./commentReducer";
import { combineReducers } from "redux";
import { firestoreReducer } from 'redux-firestore'

const rootReducer = combineReducers({
    note: noteReducer,
    comment: commentReducer,
    firestore: firestoreReducer
})

export default rootReducer;