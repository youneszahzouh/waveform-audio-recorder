import React, { useEffect, useRef } from "react";
import { UseRecorder } from "./types";
import useRecorder from "./use-recorder";

const WaveformAudioRecorder = ({ setRecordedAudio }: any) => {
  const canvasRef = useRef(null);

  const draw = (ctx: any, chunks: any) => {
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.fillStyle = "#2cbcbe";
    chunks
      .slice(chunks.length > 50 ? chunks.length - 50 : 0, -1)
      .map((height: any, index: number) => {
        const drawHeight = height + 3;
        const x = index * 10 + 10;

        ctx.strokeStyle = "#d5d5d5";

        ctx.beginPath();
        ctx.roundRect(x, ctx.canvas.height / 2 - drawHeight / 2, 3, drawHeight, 8);
        ctx.stroke();
        ctx.fill();

        return height;
      });
  };

  const { recorderState }: UseRecorder = useRecorder(canvasRef, draw);
  // const { recordingMinutes, recordingSeconds, initRecording } = recorderState;
  // const { startRecording, saveRecording } = handlers;

  useEffect(() => {
    setRecordedAudio(recorderState.audio);
  }, [recorderState.audio, setRecordedAudio]);

  useEffect(() => {
    const canvas = canvasRef.current as any;
    const ctx = canvas?.getContext("2d");
    canvas.width = 500;
    canvas.height = 50;

    draw(ctx, []);
  }, []);

  return <canvas id="audio-recorder-canvas" width={200} height="200" ref={canvasRef} />;
};

export default React.memo(WaveformAudioRecorder);
