import React from 'react';
import { Provider } from 'react-redux';
import '../styles/globals.scss';
import store from '/redux/store';
import VideoPlayer from '../components/VideoPlayer';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <React.Fragment>
        <Component {...pageProps}/>
        <VideoPlayer/>
      </React.Fragment>
    </Provider>
  );
};

export default MyApp;
