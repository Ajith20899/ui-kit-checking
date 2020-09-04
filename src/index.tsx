import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import { TextEditor } from './App';
import { VideoPlayer } from "./video/VideoPlayer";
import * as serviceWorker from './serviceWorker';


ReactDOM.render(
  <React.StrictMode>
    {/* <TextEditor boxed={true} /> */}
    <VideoPlayer
      videoSrc={"https://www.radiantmediaplayer.com/media/big-buck-bunny-360p.mp4#t=2"}
      videoType={"video/mp4"}
    />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
