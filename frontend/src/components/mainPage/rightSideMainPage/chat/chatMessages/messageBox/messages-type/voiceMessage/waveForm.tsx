import { useEffect, useRef, useState } from "react";

import WaveSurfer from "wavesurfer.js";
import { BsFillPlayCircleFill, BsFillPauseCircleFill } from 'react-icons/bs'

// @ts-ignore
const formWaveSurferOptions = (ref, dir) => ({
    container: ref,
    waveColor: dir === 'rtl' ? "#b7b7ef" : '#eaeaab',
    progressColor: dir === 'rtl' ? "#2563eb" : '#cccc5d',
    cursorColor: "transparent",
    barWidth: 2.7,
    barRadius: 2.7,
    responsive: true,
    height: 14,
    // If true, normalize by the maximum peak instead of 1.0.
    normalize: true
});

export default function Waveform({ dir, url, time }: { dir: string, url: string, time:string }) {
    const waveformRef = useRef(null);
    const wavesurfer = useRef(null);
    const [playing, setPlay] = useState(false);
    const Icon2 = playing ? BsFillPauseCircleFill : BsFillPlayCircleFill

    useEffect(() => {
        setPlay(false);
        const options = formWaveSurferOptions(waveformRef.current, dir);
        // @ts-ignore
        wavesurfer.current = WaveSurfer.create(options);
        // @ts-ignore
        wavesurfer.current.load(url);
        // @ts-ignore
        wavesurfer.current.on('finish', () => {
            setPlay(false)
        })
        // @ts-ignore
        return () => { wavesurfer.current.destroy(); }
    }, [url]);

    const handlePlayPause = () => {
        setPlay(!playing);
        // @ts-ignore
        wavesurfer.current.playPause();
    };
    const handelPlay = () => {
        setPlay(true)
        // @ts-ignore
        wavesurfer.current.play();
    }

    return (
        <div className=" flex items-center w-60 gap-2">
            <div className="controls">
                <div className={` control bg-[#fafafa] cursor-pointer w-12 h-12 rounded-full flex items-center justify-center transition duration-500 ${playing ? '' : 'rotate-90'} ease-in-out `} onClick={handlePlayPause}>
                    <Icon2 className={`w-14 h-14 text-blue-500 ${playing ? '' : 'rotate-[-90deg]'}`} />
                </div>
            </div>
            <div className=" flex flex-col justify-between w-full gap-1">
                <div id="waveform" ref={waveformRef} className="w-full cursor-pointer" onClick={handelPlay} />
                <p className={`date text-xs text-[#9a9a9a] whitespace-nowrap mt-1`}>{time}</p>
            </div>
        </div>
    );
}
