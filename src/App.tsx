import React from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom'
import Bitcoin from './pages/Bitcoin/Bitcoin';

function App() {
  return (
    <BrowserRouter >
        <Switch>
            <Route exact path="/" component={Bitcoin} />
        </Switch>
    </BrowserRouter>
  );
}

export default App;
