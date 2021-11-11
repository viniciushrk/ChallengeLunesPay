import React from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom'
import Bitcoin from './pages/Bitcoin/Bitcoin';
import Litecoin from './pages/Litecoin/Litecoin';

function App() {
  return (
    <BrowserRouter >
        <Switch>
            <Route exact path="/" component={Bitcoin} />
            <Route exact path="/litecoin" component={Litecoin} />
        </Switch>
    </BrowserRouter>
  );
}

export default App;
