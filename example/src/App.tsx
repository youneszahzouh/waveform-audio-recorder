import React, { useState } from 'react'
import { WaveformAudioRecorder, WaveformAudioRecorderType } from 'waveform-audio-recorder'

function App() {
  const [recorderState, setRecorderState] = useState<WaveformAudioRecorderType | null>(null)

  return (
    <div className='App'>
      <button onClick={recorderState?.initRecording ? recorderState?.saveRecording : recorderState?.startRecording}>
        {recorderState?.initRecording ? 'Stop' : 'Start'}
      </button>
      <WaveformAudioRecorder setRecorderState={setRecorderState} />

      {recorderState?.recordingDuration}
    </div>
  )
}

export default App
