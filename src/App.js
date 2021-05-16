import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { get } from './util/Storage';

import Index from './page/Index';
import Home from './page/Home';
import Form from './page/Form';

function App() {
  const cLogs = get('cLogs');
  const hasLogs = cLogs && cLogs.length > 0;

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={hasLogs ? Home : Index} />
        <Route path="/form" component={Form} />
      </Switch>
    </Router>
  );
}

export default App;
