import React, {Component} from 'react';
import {Link} from "react-router-dom";
import moment from "moment";

const Comment = ({comment, is_local_storage_provider}) => {
    return (
        <a className="list-group-item list-group-item-action">
            <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{ comment.author }</h5>
                {!is_local_storage_provider ?
                    <small>{moment(comment.created_at.toDate().toString()).calendar()}</small>
                    :
                    <small>{moment(comment.created_at).calendar()}</small>
                }
            </div>
            <p className="mb-1">{ comment.content }</p>
        </a>
    )
}

export default Comment;