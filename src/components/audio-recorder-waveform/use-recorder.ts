import { useState, useEffect } from 'react'
import { saveRecording, startRecording } from './recorder-controls'
import { Recorder, Interval, AudioTrack, MediaRecorderEvent } from './types'

const initialState: Recorder = {
  recordingMinutes: 0,
  recordingSeconds: 0,
  initRecording: false,
  mediaStream: null,
  mediaRecorder: null,
  audio: null,
}

export default function useRecorder(canvasRef: any, draw: any) {
  const [recorderState, setRecorderState] = useState<Recorder>(initialState)
  const [processor, setProcessor] = useState<any>(null)

  useEffect(() => {
    const MAX_RECORDER_TIME = 5
    let recordingInterval: Interval = null

    if (recorderState.initRecording)
      recordingInterval = setInterval(() => {
        setRecorderState((prevState: Recorder) => {
          if (prevState.recordingMinutes === MAX_RECORDER_TIME && prevState.recordingSeconds === 0) {
            typeof recordingInterval === 'number' && clearInterval(recordingInterval)
            return prevState
          }

          if (prevState.recordingSeconds >= 0 && prevState.recordingSeconds < 59)
            return {
              ...prevState,
              recordingSeconds: prevState.recordingSeconds + 1,
            }
          else if (prevState.recordingSeconds === 59)
            return {
              ...prevState,
              recordingMinutes: prevState.recordingMinutes + 1,
              recordingSeconds: 0,
            }
          else return prevState
        })
      }, 1000)
    else typeof recordingInterval === 'number' && clearInterval(recordingInterval)

    return () => {
      typeof recordingInterval === 'number' && clearInterval(recordingInterval)
    }
  })

  useEffect(() => {
    setRecorderState((prevState) => {
      if (prevState.mediaStream)
        return {
          ...prevState,
          mediaRecorder: new MediaRecorder(prevState.mediaStream),
        }
      else return prevState
    })
  }, [recorderState.mediaStream])

  useEffect(() => {
    const recorder = recorderState.mediaRecorder
    let chunks: Blob[] = []

    if (recorder && recorder.state === 'inactive') {
      recorder.start()

      recorder.ondataavailable = (e: MediaRecorderEvent) => {
        chunks.push(e.data)
      }

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/ogg; codecs=opus' })
        chunks = []

        setRecorderState((prevState: Recorder) => {
          if (prevState.mediaRecorder)
            return {
              ...initialState,
              mediaStream: prevState.mediaStream,
              audio: window.URL.createObjectURL(blob),
            }
          else return { ...initialState, mediaStream: prevState.mediaStream }
        })
      }
    }

    return () => {
      if (recorder) recorder.stream.getAudioTracks().forEach((track: AudioTrack) => track.stop())
    }
  }, [recorderState.mediaRecorder])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    canvas.width = 500
    canvas.height = 50

    if (recorderState.mediaStream) {
      const audioContext = new AudioContext()
      const analyser = audioContext.createAnalyser()
      const microphone = audioContext.createMediaStreamSource(recorderState.mediaStream)
      const scriptProcessor = audioContext.createScriptProcessor(0, 1, 1)
      if (processor === null) setProcessor(scriptProcessor)

      if (recorderState.initRecording) {
        analyser.smoothingTimeConstant = 0.8
        analyser.fftSize = 128
        microphone.connect(analyser)
        analyser.connect(scriptProcessor)
        scriptProcessor.connect(audioContext.destination)
        const chunks: any = []
        scriptProcessor.onaudioprocess = function () {
          const array = new Uint8Array(analyser.frequencyBinCount)
          analyser.getByteFrequencyData(array)

          const arraySum = array.reduce((a, value) => a + value, 0)
          const average = arraySum / array.length / 4
          chunks.push(Math.floor(average))

          draw(ctx, chunks)
        }
      } else {
        processor.onaudioprocess = null
        setProcessor(null)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recorderState.initRecording])

  return {
    recorderState,
    // eslint-disable-next-line @typescript-eslint/promise-function-async
    startRecording: () => startRecording(setRecorderState),
    cancelRecording: () => setRecorderState(initialState),
    saveRecording: () => saveRecording(recorderState.mediaRecorder),
  }
}
