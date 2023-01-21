import { Dispatch, SetStateAction } from 'react'

export interface Recorder {
  recordingMinutes: number
  recordingSeconds: number
  initRecording: boolean
  mediaStream: MediaStream | null
  mediaRecorder: MediaRecorder | null
  audio: string | null
}

export interface UseRecorder {
  recorderState: Recorder
  startRecording: () => void
  cancelRecording: () => void
  saveRecording: () => void
}

export interface RecorderControlsProps {
  recorderState: Recorder
  handlers: {
    startRecording: () => void
    cancelRecording: () => void
    saveRecording: () => void
  }
}

export interface RecordingsListProps {
  audio: string | null
}

export interface Audio {
  key: string
  audio: string
}

export type Interval = null | number | ReturnType<typeof setInterval>
export type SetRecorder = Dispatch<SetStateAction<Recorder>>
export type SetRecordings = Dispatch<SetStateAction<Audio[]>>
export type AudioTrack = MediaStreamTrack
export interface MediaRecorderEvent {
  data: Blob
}
