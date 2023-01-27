import React from 'react'

import { render } from '@testing-library/react'

import 'jest-canvas-mock'

import { WaveformAudioRecorder } from '../components'

describe('Common render', () => {
  const setRecorderState = null
  it('renders without crashing', () => {
    render(<WaveformAudioRecorder setRecorderState={setRecorderState} />)
  })
})
