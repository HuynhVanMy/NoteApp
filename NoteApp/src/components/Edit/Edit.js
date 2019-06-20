import React, { Component } from 'react';
import './edit.css';
import { Route, Redirect } from "react-router-dom";
import * as actions from '../../actions/index';
import { connect } from 'react-redux';
import * as api from '../../api/api';
import * as url from '../../api/url';

class Edit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: "",
            content: "",
            redirect: false
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleKeyEnter = (event) => {
        var { title, content } = this.state;
        let { location } = this.props;
        if (event.key === "Enter") {
            console.log("Enter");
            if (title === "") {
                alert("Chủ đề rỗng!!!");
            }

            if (content === "") {
                alert("Nội dung rỗng!!!");
            } else {

                if (location.pathname === "/add") {
                    // this.props.addNote(this.state);
                    api.post(url.POST, this.state);
                }
                if (location.pathname === "/edit") {
                    let note = {
                        id: location.state.note.id,
                        title,
                        content
                    }
                    console.log(note);
                    api.put(url.PUT, note);
                    // this.props.editNote(note);

                }
                this.setState({
                    redirect: true
                });
            }

        }
    }

    componentDidMount() {

        let { location } = this.props;
        if (location.pathname === "/edit") {
            this.setState({
                title: location.state.note.title,
                content: location.state.note.content
            })
        }
    }

    render() {
        var { title, content } = this.state;
        console.log(title, content);

        if (!localStorage.getItem('token') || localStorage.getItem('token') === "undefined") {
            return <Redirect to='/login' />
        }

        if (this.state.redirect) {
            return <Redirect to="/" />
        }


        return (
            <Route>
                <div className="col-xs-12 col-sm-6 col-md-12 col-lg-12">
                    <div className="main">
                        <div className="note note-add">
                            <div className="title">
                                <input type="text" name="title" value={title} onChange={this.handleChange} placeholder="Nhập chủ đề..." />
                            </div>
                            <div className="content">
                                <textarea rows="11" name="content" value={content} onChange={this.handleChange} onKeyDown={(event) => this.handleKeyEnter(event)} placeholder="Nhập công việc..." />
                            </div>
                        </div>
                    </div>
                </div>
            </Route>
        );
    }
}

const mapStateToProps = state => {
    return {
        notes: state.notes
    }

};

const mapDispatchToProps = (dispatch, props) => {
    return {
        addNote: (note) => {
            dispatch(actions.addNote(note));
        },

        editNote: (note) => {
            dispatch(actions.editNote(note));
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Edit);