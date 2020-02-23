import React, {Component} from 'react';
import {Link} from "react-router-dom";
import moment from "moment";

const Comment = ({comment}) => {
    return (
        <a className="list-group-item list-group-item-action">
            <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{ comment.author }</h5>
                <small>{ moment(comment.created_at.toDate().toString()).calendar() }</small>
            </div>
            <p className="mb-1">{ comment.content }</p>
        </a>
    )
}

export default Comment;