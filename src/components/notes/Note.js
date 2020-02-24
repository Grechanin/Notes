import React from 'react';
import {Link} from "react-router-dom";
import moment from "moment";

const Note = ({note, is_local_storage_provider}) => {
    return (
        <Link to={ "/note_detail/" + note.id } className="list-group-item list-group-item-action">
            <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{ note.name }</h5>
                {!is_local_storage_provider ?
                    <small>{moment(note.created_at.toDate().toString()).calendar()}</small>
                    :
                    <small>{moment(note.created_at).calendar()}</small>
                }
            </div>
            <p className="mb-1">{ note.content }</p>
        </Link>
    )
}

export default Note;