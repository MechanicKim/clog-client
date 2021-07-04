import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './page/Home';
import View from './page/View';
import Form from './page/Form';

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" render={(props) => <Home {...props} />} />
                <Route
                    exact
                    path="/view/:id"
                    render={(props) => <View {...props} />}
                />
                <Route exact path="/form" component={Form} />
                <Route exact path="/form/:id" component={Form} />
            </Switch>
        </Router>
    );
}

export default App;
