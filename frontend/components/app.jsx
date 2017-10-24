import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import SplashHeader from './session/splash_header';
import MainHeader from './main_header'
import { AuthRoute, ProtectedRoute } from '../util/route_util';

const App = () => (
  <div>
    <AuthRoute exact path='/' component={SplashHeader}/>
    <ProtectedRoute path='/feed' component={MainHeader}/>
  </div>
);


export default App;
