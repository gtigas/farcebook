import SignupForm from './signup_form'
import React from 'react';

const SplashMain = () => (
  <div className='main-body flex-col splash-main'>
    <div className='flex-row'>
      <div id='class-aside'>
        <h2>Connect with your friends and your world around you.</h2>
        <ul>
          <li><strong>See photos and updates</strong>   from friends in News Feed.</li>
          <li><strong>Share what's new</strong>   in your life on your Timeline.</li>
          <li><strong>Find more</strong>  of what you're looking for.</li>
        </ul>
      </div>
      <SignupForm />
    </div>
  </div>
);

export default SplashMain;
