import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './page/Home';
import View from './page/View';
import Form from './page/Form';

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/view/:id" component={View} />
                <Route exact path="/form" component={Form} />
                <Route exact path="/form/:id" component={Form} />
            </Switch>
        </Router>
    );
}

export default App;
