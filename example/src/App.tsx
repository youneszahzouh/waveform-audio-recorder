import React, { useState } from 'react'

const App = () => {
  const [recordedAudio, setRecordedAudio] = useState(null)

  return (
    <div className={'container'}>
      {/* <div className={classNames(styles['recorder'], initRecording ? styles['recording'] : '')}>
        <button onClick={initRecording ? saveRecording : startRecording} size='32' variant='Bold' />
        <div className={styles['waveform-container']}>
          <WaveformAudioRecorder setRecordedAudio={setRecordedAudio} />
        </div>
        <span>{formatAudioDuration(recordingMinutes * 60 + recordingSeconds)}</span>
      </div> */}
    </div>
  )
}

export default App
