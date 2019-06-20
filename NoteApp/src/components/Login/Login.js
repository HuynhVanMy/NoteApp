import React, { Component } from 'react';
import './login.css';
import { Redirect } from "react-router-dom";
import * as url from '../../api/url';


class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username : '',
            password : '',
            redirect : false
        }
    }
    

    handleOnClick = () => {
        let {username, password} = this.state;
        console.log(username, password);

        fetch(url.POST_LOGIN, {
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: {
                'Content-Type': 'application/json',
                 Accept: 'application/json'
            }
        }).then(res => res.json())
        .then(res => {
            localStorage.setItem("token", res.id);
            var tmp = localStorage.getItem("token");
            console.log(tmp, typeof tmp);
            this.setState({
                redirect : true
            })
        })
        .catch(error => {
            console.error('Error:', error);
        });


     
       
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        console.log(this.state.redirect);
        if(this.state.redirect){
            return <Redirect to="/"/>
        }
        return (
            <div className="main login">
                <div className="form-group">
                    <label htmlFor="email">Username:</label>
                    <input type="text" className="form-control" id="username" onChange={this.handleChange} placeholder="User Name" name="username" />
                </div>
                <div className="form-group">
                    <label htmlFor="pwd">Password:</label>
                    <input type="password" className="form-control" id="pwd" onChange={this.handleChange} placeholder="Password" name="password" />
                </div>
                <div className="checkbox">
                    <label><input type="checkbox" name="remember" /> Remember me</label>
                </div>
                <button onClick={this.handleOnClick} className="btn">Đăng nhập</button>
            </div>
        );
    }
}

export default Login;