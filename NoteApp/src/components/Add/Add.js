import React, { Component } from 'react';
import './add.css';
import { Route, Link } from "react-router-dom";

class Add extends Component {

    render() {
        return (
            <Route>
                <div className="col-3 col-l-4 col-s-6">
                    <div className="note">
                        <div className="add">
                            <Link to="/add">
                                <i className="fa fa-plus-circle" aria-hidden="true"></i>
                            </Link>
                        </div>
                    </div>
                </div>
            </Route>
        );
    }
}

export default Add;