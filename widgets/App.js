import React, { useState } from 'react'
import { PhrasalExtractor } from  './PhrasalExtractor'

function App() {

  const [video, setVideo] = useState('file:///home/bruno/Downloads/Pitch Atomon.mp4')
  const [subtitle, setSubtitle] = useState([])

  window.on.openSrt(setSubtitle)
  window.on.openVideo(setVideo)

  return (
    <div className="App">
      <PhrasalExtractor videoPlayer={{
        autoplay: true,
        controls: true,
        sources: [{
          src: video,
          type: 'video/mp4'
        }],
        balance: 500,
        subtitle: subtitle
      }} save={(_phrase, status) => {
      setTimeout(() => {
        if (Math.floor((Math.random() * 10) + 1) < 4 ? 1 : 0) {
          status.saved()
        } else {
          status.failed()
        }
      }, 3000)}} />
    </div>
  );
}

export default App;
