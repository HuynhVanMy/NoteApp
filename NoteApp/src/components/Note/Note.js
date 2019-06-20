import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import * as actions from './../../actions/index';
import * as api from './../../api/api';
import * as url from './../../api/url';


class Note extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rd: false
        }
    }


    deleteNote = (note) => {
        api.del(url.DELETE, note.id);
    }


    render() {
        if (this.state.rd) {
            return <Redirect to='/' />
        }
        var { note } = this.props;
        return (
            <div className="col-3 col-l-4 col-s-6">
                <div className="note">
                    <Link to="/" onClick={() => this.deleteNote(note)}><span className="close-note"><i className="fa fa-times-circle" aria-hidden="true"></i></span></Link>
                    <Link to={{
                        pathname: "/edit",
                        state: { note: note }
                    }}>
                        <span className="edit-note"><i className="fas fa-edit"></i></span>
                    </Link>
                    <div className="note-title">
                        <h3>{note.title}</h3>
                    </div>
                    <div className="note-content">
                        {note.content}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {

    }

};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onDeleteNote: (note) => {
            dispatch(actions.deleteNote(note));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Note);