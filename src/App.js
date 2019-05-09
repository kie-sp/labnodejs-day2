import React from 'react';
import { BrowserRouter,Route,Switch,Redirect } from 'react-router-dom';
import Detail from './Screens/Detail'
import Landing from './Screens/Landing'

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
      <div>
        <Switch>
          <Route exact path="/" component={Landing}/>
          <Route path="/detail/:id" component={Detail}/>
          <Redirect to='/'/>
        </Switch>
      </div>
    </BrowserRouter>
    );
  }
}

export default App;

