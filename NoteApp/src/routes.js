import React from 'react';
import Home from './components/Home/Home';
import Edit from './components/Edit/Edit';
import Login from './components/Login/Login';
import NotFound from './components/NotFound/NotFound';

const routes = [
    {
        path    : "/",
        exact   : true,
        main    : (props) => {
            return <Home {...props}/>
        }
    },
    {
        path    : "/edit",
        exact   : false,
        main    : (props) => {
            return <Edit {...props}/>
        }
    },
    {
        path    : "/add",
        exact   : false,
        main    : (props) => {
            return <Edit {...props}/>
        }
    },
    {
        path    : "/login",
        exact   : false,
        main    : (props) => {
            return <Login {...props}/>
        }
    },
    {
        path    : "",
        exact   : false,
        main    : (props) => {
            return <NotFound {...props}/>
        }
    }
];

export default routes;