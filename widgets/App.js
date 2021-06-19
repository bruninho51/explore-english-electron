import React, { useState } from 'react'
import { PhrasalExtractor } from  './PhrasalExtractor'
import { saveSentence } from '../services/save-sentence'

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
      }} save={(phrase, status) => {

        console.log(phrase.status)

        if (phrase.status !== 'saved') {
          saveSentence(phrase)
          .then(() => {
            status.saved()
          })
          .catch((error) => {
            console.log(error)
            status.failed()
          })
        }
          
      }} />
    </div>
  );
}

export default App;
