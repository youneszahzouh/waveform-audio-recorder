import React, { useState } from 'react'
import { WaveformAudioRecorder } from 'waveform-audio-recorder'

function App() {
  const [recorderState, setRecorderState] = useState<any>(null)

  return (
    <div className='App'>
      <button onClick={recorderState?.initRecording ? recorderState?.saveRecording : recorderState?.startRecording}>
        Start
      </button>
      <WaveformAudioRecorder setRecorderState={setRecorderState} />

      {recorderState?.recordingDuration}
    </div>
  )
}

export default App
