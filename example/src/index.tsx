import React from 'react'
import ReactDOM from 'react-dom/client'
import { WaveformAudioRecorder } from 'waveform-audio-recorder'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <div>
      <h2>Default counter</h2>
      <WaveformAudioRecorder />
    </div>
    <hr />
  </React.StrictMode>,
)
