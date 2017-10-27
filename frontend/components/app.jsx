import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import SplashHeader from './session/splash_header';
import SplashMain from './session/splash_main';
import MainHeader from './main_header';
import ProfileMain from './profile/profile_main';
import Feed from './feed/feed';
import NotFoundPage from './not-found'
import { AuthRoute, ProtectedRoute } from '../util/route_util';

const App = () => (
  <div>
    <AuthRoute exact path='/' component={SplashHeader}/>
    <ProtectedRoute path='/' component={MainHeader}/>
    <main id='main-container'>
      <AuthRoute exact path='/' component={SplashMain}/>
      <Switch>
        <ProtectedRoute exact path='/users/:userId' component={ProfileMain}/>
        <ProtectedRoute exact path='/feed' component={Feed} />
        <Route path='*' component={NotFoundPage} />
      </Switch>
    </main>
  </div>
);


export default App;
