import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import routes from "./routes";
import Header from "./components/Header/Header";

class App extends Component {

  showContentMenus = (routes) => {
    let result = null
    result = routes.map((route, index) => {
      return (
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          component={route.main}
        />
      );
    });
    return result;
  }

  render() {
    return (
      <Router>
        <div>
          <Header />
          <Switch>
            {this.showContentMenus(routes)}
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
