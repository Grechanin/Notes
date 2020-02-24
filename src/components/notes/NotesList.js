import React, {Component} from 'react';
import Note from './Note'
import {properComponentToDataProvider} from './utils'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from "redux";


const NotesList = (props) => {
    const is_local_storage_provider = localStorage.getItem('is_local_storage_provider');
    // const {is_local_storage_provider} = props;
    console.log('is_local_storage_provider',is_local_storage_provider)

    let notes;
    if (!is_local_storage_provider) {
        notes = props.notes
    } else {
        notes = JSON.parse(localStorage.getItem('notes'));
        notes && notes.reverse();
    }

    return (
        <div>
            <h1 className="text-center">Notes list</h1>
            {notes ?
                <div className="notes-list">
                    <div className="list-group">
                        {notes.map(note => <Note note={ note } is_local_storage_provider={is_local_storage_provider} key={note.id}/>)}
                    </div>
                </div>
                : <h2>Note list is empty</h2>
            }
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        'notes': state.firestore.ordered.notes
    }
}


export default properComponentToDataProvider(compose(
    firestoreConnect(() => [
        {
            collection: 'notes', orderBy: ['created_at', 'desc'], limit: 25
        }
    ]),
    connect(mapStateToProps)
    )(NotesList),
    NotesList
)