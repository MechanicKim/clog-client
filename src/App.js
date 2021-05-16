import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import Home from './page/Home';
import Form from './page/Form';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/form" component={Form} />
      </Switch>
    </Router>
  );
}

export default App;
