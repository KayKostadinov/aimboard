import React, { Fragment, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//components
import Navbar from './components/layout/Navbar.component';
import Landing from './components/layout/Landing.component';
import Register from './components/auth/Register.component';
import Login from './components/auth/Login.component';
import Boards from './components/pages/boards/Boards.component';
import Aim from './components/pages/aim/Aim.component';
import PrivateRoute from './components/routing/PrivateRoute.component';
import EditProfile from './components/pages/profile/EditProfile.component';
//redux
import { Provider } from 'react-redux';
import store from './store';
import setToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';

//handle token on load
if (localStorage.token) {
  setToken(localStorage.token);
}

function App() {

  // componentDidMount
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <Switch>
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/boards' component={Boards} />
            <PrivateRoute exact path='/aim' component={Aim} />
            <PrivateRoute exact path='/profile' component={EditProfile} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
