import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import Index from './page/Index';
import Home from './page/Home';
import Form from './page/Form';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/form" component={Form} />
      </Switch>
    </Router>
  );
}

export default App;
