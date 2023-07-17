"use client"

import { Dispatch, FC, useEffect, useRef } from "react";
import { FiMic, FiStopCircle, FiSend, FiUpload } from 'react-icons/fi'

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
          // @ts-ignore
          recordRef.current.onclick = () => recordHandler(mediaRecorder, stopRef.current, recordRef.current)
          let chunks: any[] = [];

          mediaRecorder.ondataavailable = (e: any) => {
            chunks.push(e.data);
            const blob = new Blob(chunks, { type: "voice/ogg; codecs=opus" });
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
    // start record voice
    mediaRecorder.start();
    stopRef.style.display = 'block'
    recordRef.style.display = 'none'
  }
  const stopHandler = (mediaRecorder: MediaRecorder, stopRef: any, sendRef: any) => {
    // stop record voice
    sendRef.style.display = 'block'
    stopRef.style.display = 'none'
    mediaRecorder.stop();
  }
  function send(sendRef: any, recordRef: any) {
    // send record to server
    // sendHandler()
    sendRef.style.display = 'none'
    recordRef.style.display = 'block'
  }

  return (
    <div>
      <div ref={recordRef} className=' cursor-pointer transition-all duration-300' >
        <FiMic />
      </div>
      <div ref={stopRef} className=" cursor-pointer text-red-500 hidden transition-all duration-300" >
        <FiStopCircle />
      </div>
      <div ref={sendRef} className=" cursor-pointer text-blue-500 hidden transition-all duration-300">
        <FiUpload />
      </div>
    </div>
  );
}

export default VoiceRecord;


