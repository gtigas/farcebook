import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import SplashHeader from './session/splash_header';
import SplashMain from './session/splash_main';
import MainHeader from './main_header'
import ProfileMain from './profile/profile_main'
import { AuthRoute, ProtectedRoute } from '../util/route_util';

const App = () => (
  <div>
    <Switch>
      <ProtectedRoute path='/feed' component={MainHeader}/>
      <AuthRoute path='/' component={SplashHeader}/>
    </Switch>
    <main id='main-container'>
      <AuthRoute exact path='/' component={SplashMain}/>
      <ProtectedRoute exact path={`users/:userId`} component={ProfileMain}/>
    </main>
  </div>
);


export default App;
