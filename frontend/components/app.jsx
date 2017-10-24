import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import SplashHeader from './session/splash_header';
import MainHeader from './main_header'
import SignupForm from './session/signup_form'
import { AuthRoute, ProtectedRoute } from '../util/route_util';

const App = () => (
  <div>
    <AuthRoute exact path='/' component={SplashHeader}/>
    <ProtectedRoute path='/feed' component={MainHeader}/>
    <AuthRoute exact path='/' component={SignupForm}/>
  </div>
);


export default App;
