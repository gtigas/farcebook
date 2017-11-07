import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import SplashHeader from './session/splash_header';
import SplashMain from './session/splash_main';
import MainHeader from './main_header';
import ProfileMain from './profile/profile_main';
import ShowOnePost from './show_one_post'
import Feed from './feed/feed';
import NotFoundPage from './not-found'
import { AuthRoute, ProtectedRoute } from '../util/route_util';

const App = () => (
  <div>
    <AuthRoute exact path='/' component={SplashHeader}/>
    <ProtectedRoute path='/' component={MainHeader}/>
    <main id='main-container'>
      <Switch>
        <AuthRoute exact path='/' component={SplashMain}/>
        <ProtectedRoute path='/users/:userId' component={ProfileMain}/>
        <ProtectedRoute path='/posts/:postId' component={ShowOnePost}/>
        <ProtectedRoute exact path='/feed' component={Feed} />
        <Route path='*' component={NotFoundPage} />
      </Switch>
      <Route exact path='/' render={ () => {
        return <div className='splash-footer'></div>
      }} />
    </main>
  </div>
);


export default App;
