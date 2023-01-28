# React Waveform Audio Recorder

A simple component that helps you display a waveform visualization of microphone input while recording.

## Installation

Install the npm package with:

#### NPM

```
npm install waveform-audio-recorder --save
```

#### Yarn

```
yarn add waveform-audio-recorder --save
```

## Example

```
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
```

