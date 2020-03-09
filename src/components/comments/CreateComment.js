import React, {Component} from 'react';
import { connect } from 'react-redux'
import { createComment } from "../../store/actions/commentActions";

class CreateComment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            author: '',
            content: '',
            is_validate_author_err: false,
            is_validate_content_err: false
        }
    }

    handleChange = (e) => {
        this.setState(
            {[e.target.name]: e.target.value}
        );
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const [is_form_valid, author] = this.isFormValid();
        if (is_form_valid) {
            this.props.CreateComment(this.props.note_id, {author: author, content: this.state.content});
            this.props.handleCloseButton();
        }
    }

    isFormValid = () => {
        let is_form_valid = true;
        let author = null;

        const cleaned_author_str = this.state.author.trim().replace(/ +(?= )/g,'');
        let [first_name, last_name, is_extra_word] = cleaned_author_str.split(' ');
        if (first_name && last_name && !is_extra_word) {
            first_name = first_name.charAt(0).toUpperCase() + first_name.slice(1);
            last_name = last_name.charAt(0).toUpperCase() + last_name.slice(1);
            author = `${first_name} ${last_name}`
            this.setState({
                author: author,
                is_validate_author_err: false
            });
        } else {
            this.setState({
                is_validate_author_err: true
            })
            is_form_valid = false
        }

        const content = this.state.content;
        if (!content) {
            this.setState({
                is_validate_content_err: true
            })
            is_form_valid = false;
        } else {
            this.setState({is_validate_content_err: false})
        }
        return [is_form_valid, author]
    }

    render() {
        const {is_validate_author_err, is_validate_content_err} =this.state;
        return (
            <div>
                <h3>Create new comment</h3>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="author">Author</label>
                        <input type="text" className="form-control" name="author" required onChange={this.handleChange} value={this.state.author}/>
                        <div className={is_validate_author_err ? 'd-block invalid-feedback' : 'd-none'}>
                            Please provide only your first and last names.
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="content">Content</label>
                        <textarea className="form-control" name="content" required rows="3"  onChange={this.handleChange} ></textarea>
                        <div className={is_validate_content_err ? 'd-block invalid-feedback' : 'd-none'}>
                            Please provide content.
                        </div>
                    </div>
                    <button type="submit" className="btn btn-success">Create</button>
                    <button type="button" className="btn btn-primary ml-2" onClick={()=>this.props.handleCloseButton()}>Close</button>
                </form>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        CreateComment: (note_id, comment) => dispatch(createComment(note_id, comment))
    }
}

export default connect(null, mapDispatchToProps)(CreateComment);