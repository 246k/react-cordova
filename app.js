import React from 'react';
import {
  HashRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Search from './search';

export default function App() {
  return (
    <Router>
          <Switch>
            <Route exact={true} path="/" component={Search} />
          </Switch>
    </Router>
  );
}
