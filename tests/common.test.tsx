import * as React from 'react'
import { render } from '@testing-library/react'

import 'jest-canvas-mock'

import { WaveformAudioRecorder } from '../src/components'

describe('Common render', () => {
  it('renders without crashing', () => {
    render(<WaveformAudioRecorder />)
  })
})
