import React, {Component} from 'react';
import { connect } from 'react-redux'
import { createNoteAction, editNoteAction, showHideToggleEditNoteFormAction } from "../../store/actions/noteActions";

class CreateEditNote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'name': '',
            'content': ''
        }
    }

    handleChange = (e) => {
        this.setState(
            {[e.target.id]: e.target.value}
        )
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (!this.props.is_edit_mode) {
            this.props.createNote(this.state)
        }else {
            const {note_id} = this.props;
            this.props.editNote(note_id, this.state)
        }
    }

    onclickCloseBtnHandler = (e) => {
        e.preventDefault();
        this.props.showHideToggleEditNoteFormAction(false);
    }

    render() {
        return (
            <div>
                {!this.props.is_edit_mode ?
                    <h1>Create new note</h1>
                    :
                    <h1>Edit note</h1>
                }
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" className="form-control" id="name" required onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="content">Content</label>
                        <textarea className="form-control" id="content" rows="3" required onChange={this.handleChange} ></textarea>
                    </div>
                    {!this.props.is_edit_mode ?
                        <button type="submit" className="btn btn-success">Create</button>
                        :
                        <div>
                            <button type="submit" className="btn btn-success">Edit</button>
                            <button type="button" className="btn btn-primary ml-2" onClick={ this.onclickCloseBtnHandler }>Close</button>
                        </div>

                    }
                </form>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createNote: (note) => dispatch(createNoteAction(note)),
        editNote: (note_id, note) => dispatch(editNoteAction(note_id, note)),
        showHideToggleEditNoteFormAction: (is_show) => dispatch(showHideToggleEditNoteFormAction(is_show))
    }
}

export default connect(null, mapDispatchToProps)(CreateEditNote);