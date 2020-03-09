import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux'
import { createNoteAction, editNoteAction, closeModalCreated, showHideToggleEditNoteFormAction } from "../../store/actions/noteActions";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";


const CreateEditNote = (props) => {
    const [name, setName] = useState('');
    const [content, setContent] = useState('');
    const [is_validate_name_err, setIsValidateNameErr] = useState(false);
    const [is_validate_content_err, setIsValidateContentErr] = useState(false);


    const handleSubmit = (e) => {
        e.preventDefault();
        if (isFormValid()) {
            if (!props.is_edit_mode) {
                props.createNote({name, content})
            } else {
                const {note_id} = props;
                props.editNote(note_id, {name, content})
            }
        }
    }

    const isFormValid = () => {
        let is_form_valid = true;

        if (!name) {
            setIsValidateNameErr(true)
            is_form_valid = false;
        } else {
            setIsValidateNameErr(false)
        }

        if (!content) {
            setIsValidateContentErr(true)
            is_form_valid = false;
        } else {
            setIsValidateContentErr(false)
        }
        return is_form_valid
    }

    const onclickCloseBtnHandler = (e) => {
        e.preventDefault();
        props.showHideToggleEditNoteFormAction(false);
    }

    const handleClose = () => {
        setName('');
        setContent('');
        props.closeModalCreated();
    }

    useEffect(() => {
        const { note } = props;
        if (note) {
            setName(note.name);
            setContent(note.content)
        };
    }, []);

    const {show_modal_created, note} = props;
    return (
        <div>
            {!props.is_edit_mode ?
                <h1>Create new note</h1>
                :
                <h1>Edit note</h1>
            }
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" id="name" value={name}  onChange={e => setName(e.target.value)} />
                    <div className={is_validate_name_err ? 'd-block invalid-feedback' : 'd-none'}>
                        Please provide name.
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="content">Content</label>
                    <textarea className="form-control" id="content" rows="3" value={content}  onChange={e => setContent(e.target.value)}></textarea>
                    <div className={is_validate_content_err ? 'd-block invalid-feedback' : 'd-none'}>
                        Please provide content.
                    </div>
                </div>
                {!props.is_edit_mode ?
                    <button type="submit" className="btn btn-success">Create</button>
                    :
                    <div>
                        <button type="submit" className="btn btn-success">Edit</button>
                        <button type="button" className="btn btn-primary ml-2" onClick={ onclickCloseBtnHandler }>Close</button>
                    </div>

                }
            </form>
            <Modal show={show_modal_created} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, your note successfully created!</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Ok
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        show_modal_created: state.note.show_modal_created
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createNote: (note) => dispatch(createNoteAction(note)),
        editNote: (note_id, note) => dispatch(editNoteAction(note_id, note)),
        closeModalCreated: () => dispatch(closeModalCreated()),
        showHideToggleEditNoteFormAction: (is_show) => dispatch(showHideToggleEditNoteFormAction(is_show))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateEditNote);