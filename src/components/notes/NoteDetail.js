import CreateComment from "../comments/CreateComment"
import Comment from "../comments/Comment";
import React  from "react";
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from "redux";
import { showHideToggleCommentFormAction } from "../../store/actions/commentActions";
import { showHideToggleEditNoteFormAction, deleteNoteAction } from '../../store/actions/noteActions'
import CreateEditNote from "./CreateEditNote";
import {properComponentToDataProvider} from "./utils";

const NoteDetail = (props) => {
    const {note, comments, is_show_create_comment_form, is_show_edit_node_form, is_local_storage_provider} = props;

    const handleAddCommentButton = (e) => {
        e.preventDefault();
        props.showHideToggleCommentFormAction(!is_show_create_comment_form);
    }

    const handleEditNoteButton = (e) => {
        e.preventDefault();
        props.showHideToggleEditNoteForm(!props.is_show_edit_node_form);
    }

    const handleDeleteNote = (e) => {
        e.preventDefault();
        const noteId = props.match.params.id
        props.deleteNote(noteId, comments);
    }

    if (note){
        return (
            <div>
                <h2>Note</h2>
                <div className="card w-100">
                    <div className="card-body">
                        <button onClick={handleDeleteNote} className="close" title='delete note'>
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h5 className="card-title">{ note.name }</h5>
                        <p className="card-text">{ note.content }</p>
                        <button onClick={handleAddCommentButton} className="btn btn-primary">Add comment</button>
                        <button onClick={handleEditNoteButton}  className="btn btn-primary ml-2">Edit note</button>
                    </div>
                </div>
                {is_show_create_comment_form ? <CreateComment note_id={props.match.params.id} /> : ''}
                {is_show_edit_node_form ? <CreateEditNote note={note} note_id={props.match.params.id} is_edit_mode={true} /> : ''}
                { comments && comments.length ?
                    <div>
                        <h2>Comments</h2>
                        { comments.map((comment) => {
                            return <Comment comment={comment} is_local_storage_provider={is_local_storage_provider} key={comment.id} />
                        }) }
                    </div>
                    : <h3>No comments</h3>
                }
            </div>
        )
    }else {
        return <p>Note loading....</p>
    }
}

const mapStateToProps = (state, props) => {
    const note_id = props.match.params.id;
    return {
        note: state.firestore.data.notes && state.firestore.data.notes[note_id],
        comments: state.firestore.ordered.comments,
        is_show_create_comment_form: state.comment.is_show_create_comment_form,
        is_show_edit_node_form: state.note.is_show_edit_node_form,
    }
}

const mapStateToPropsFromLocalStore = (state, props) => {
    const note_id = props.match.params.id;
    const notes = JSON.parse(localStorage.getItem('notes'));

    const checkNoteId = (note) => {
        return note.id === note_id && note
    }
    const note_index = notes.findIndex(checkNoteId);
    const note = notes[note_index];
    const comments = note && note.comments && note.comments.reverse();

    return {
        note: note,
        comments: comments,
        is_local_storage_provider: 1,
        is_show_create_comment_form: state.comment.is_show_create_comment_form,
        is_show_edit_node_form: state.note.is_show_edit_node_form,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        showHideToggleCommentFormAction: (is_show_create_comment_form) => dispatch(showHideToggleCommentFormAction(is_show_create_comment_form)),
        showHideToggleEditNoteForm: (is_show_edit_node_form) => dispatch(showHideToggleEditNoteFormAction(is_show_edit_node_form)),
        deleteNote: (noteId, comments) => dispatch(deleteNoteAction(noteId, comments))
    }
}


export default properComponentToDataProvider(compose(
    firestoreConnect((props) => [
        {
            collection: 'notes',
            doc: props.match.params.id
        },
        {
            collection: `notes/${props.match.params.id}/comments`,
            limit: 20,
            orderBy: ['created_at', 'desc'],
            storeAs: 'comments'
        }
    ]),
    connect(mapStateToProps, mapDispatchToProps)
    )(NoteDetail),
    connect(mapStateToPropsFromLocalStore, mapDispatchToProps)(NoteDetail)
)