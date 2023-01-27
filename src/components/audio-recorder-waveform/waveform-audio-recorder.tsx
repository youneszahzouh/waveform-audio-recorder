import React, { useEffect, useRef } from 'react'
import { UseRecorder } from './types'
import useRecorder from './use-recorder'

const defaultOptions = {
  backgroundColor: '#fff',
  fillStyle: '#2cbcbe',
  strokeStyle: '#d5d5d5',
  width: 200,
  height: 200,
}

interface Props {
  setRecorderState: any
  options?: any
}
const WaveformAudioRecorder = ({ setRecorderState, options }: Props) => {
  const canvasRef = useRef(null)

  const draw = (ctx: any, chunks: any) => {
    ctx.fillStyle = options?.backgroundColor ?? defaultOptions.backgroundColor
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    ctx.fillStyle = options?.fillStyle ?? defaultOptions.fillStyle
    chunks.slice(chunks.length > 50 ? chunks.length - 50 : 0, -1).map((height: any, index: number) => {
      const drawHeight = height + 3
      const x = index * 10 + 10

      ctx.strokeStyle = options?.strokeStyle ?? defaultOptions.strokeStyle

      ctx.beginPath()
      ctx.roundRect(x, ctx.canvas.height / 2 - drawHeight / 2, 3, drawHeight, 8)
      ctx.stroke()
      ctx.fill()

      return height
    })
  }

  const recorderState: UseRecorder = useRecorder(canvasRef, draw)

  useEffect(() => {
    if (setRecorderState) {
      setRecorderState(recorderState)
    }
  }, [recorderState, setRecorderState])

  useEffect(() => {
    const canvas = canvasRef.current as any
    const ctx = canvas?.getContext('2d')

    draw(ctx, [])
  }, [])

  return (
    <canvas
      id='audio-recorder-canvas'
      width={options?.width ?? defaultOptions.width}
      height={options?.height ?? defaultOptions.height}
      ref={canvasRef}
    />
  )
}

export default React.memo(WaveformAudioRecorder)
