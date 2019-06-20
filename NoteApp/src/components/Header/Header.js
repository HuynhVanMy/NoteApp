import React, { Component } from 'react';
import './header.css';
import { Redirect, Link } from "react-router-dom";

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            redirect : false
        }
    }
    

    handelOnclick = () => {
        localStorage.removeItem("token");
        console.log("logout");
        this.setState({
            redirect : true
        })
    }

    render() {
        let { redirect } = this.state;
        if(redirect) {
            return <Redirect to='/' />
        }
        return (
            <div className="header">
                <div className="col-12 col-s-12">
                        <div className="col-9 col-s-9 col-p-9 header-title">
                            <Link to='/'><span>NoteApp</span></Link>
                        </div>
                        <div className="col-3 col-s-3 col-p-3 header-logout">
                            <span><i className="fa fa-user-circle-o" aria-hidden="true"></i></span>
                            <span onClick={this.handelOnclick}><i className="fa fa-sign-out" aria-hidden="true"></i></span>
                        </div>
                </div>
            </div>
        );
    }
}

export default Header;