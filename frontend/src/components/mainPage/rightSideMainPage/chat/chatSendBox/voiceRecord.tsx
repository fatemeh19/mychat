"use client"

import { Dispatch, FC, useEffect, useRef } from "react";
import { FiMic, FiStopCircle, FiSend } from 'react-icons/fi'

interface VoiceRecordProps {
  voice: any,
  setVoice: Dispatch<any>
  sendHandler: () => void
}
const VoiceRecord: FC<VoiceRecordProps> = ({ voice, setVoice, sendHandler }) => {
  const recordRef = useRef()
  const stopRef = useRef()
  const sendRef = useRef()

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      console.log("getUserMedia supported.");
      navigator.mediaDevices
        .getUserMedia(
          // constraints - only audio needed for this app
          {
            audio: true,
          },
        )

        // Success callback
        .then((stream) => {
          const mediaRecorder = new MediaRecorder(stream);
          console.log(recordRef.current)
          // @ts-ignore
          recordRef.current.onclick = () => recordHandler(mediaRecorder, stopRef.current, recordRef.current)
          let chunks: any[] = [];

          mediaRecorder.ondataavailable = (e: any) => {
            chunks.push(e.data);
            const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
            setVoice(blob)
          };
          // @ts-ignore
          stopRef.current.onclick = () => stopHandler(mediaRecorder, stopRef.current, sendRef.current)
          // @ts-ignore
          sendRef.current.onclick = () => send(sendRef.current, recordRef.current)

          mediaRecorder.onstop = (e) => {
            console.log("recorder stopped");
            chunks = [];
          };

        })
        .catch((err) => {
          console.error(`The following getUserMedia error occurred: ${err}`);
        });
    } else {
      console.log("getUserMedia not supported on your browser!");
    }
  }, [voice])


  const recordHandler = (mediaRecorder: MediaRecorder, stopRef: any, recordRef: any) => {
    mediaRecorder.start();
    console.log(mediaRecorder.state);
    console.log("recorder started");
    stopRef.style.display = 'block'
    recordRef.style.display = 'none'
  }
  const stopHandler = (mediaRecorder: MediaRecorder, stopRef: any, sendRef: any) => {
    sendRef.style.display = 'block'
    stopRef.style.display = 'none'
    mediaRecorder.stop();
    console.log(mediaRecorder.state);
    console.log("recorder stopped");
  }
  function send(sendRef: any, recordRef: any) {
    sendHandler()
    sendRef.style.display = 'none'
    recordRef.style.display = 'block'
  }

  return (
    <div>
      <div ref={recordRef} className='cursor-pointer' >
        <FiMic />
      </div>
      <div ref={stopRef} className="text-red-500 hidden" >
        <FiStopCircle />
      </div>
      <div ref={sendRef} className="text-blue-500 hidden">
        <FiSend />
      </div>
    </div>
  );
}

export default VoiceRecord;


