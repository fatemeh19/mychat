import React, { useEffect, useRef, useState } from "react";

import WaveSurfer from "wavesurfer.js";

// @ts-ignore
const formWaveSurferOptions = ref => ({
    container: ref,
    waveColor: "#eae",
    progressColor: "blue",
    cursorColor: "transparent",
    barWidth: 3,
    barRadius: 3,
    responsive: true,
    height: 15,
    // If true, normalize by the maximum peak instead of 1.0.
    normalize: true,
    // Use the PeakCache to improve rendering speed of large waveforms.
    partialRender: true
});

export default function Waveform({ url }: { url: string }) {
    const waveformRef = useRef(null);
    const wavesurfer = useRef(null);
    const [playing, setPlay] = useState(false);
    const [volume, setVolume] = useState(0.5);

    // create new WaveSurfer instance
    // On component mount and when url changes
    useEffect(() => {
        setPlay(false);

        const options = formWaveSurferOptions(waveformRef.current);
        // @ts-ignore
        wavesurfer.current = WaveSurfer.create(options);
        // @ts-ignore
        wavesurfer.current.load(url);
        // @ts-ignore
        wavesurfer.current.on("ready", function () {
            // https://wavesurfer-js.org/docs/methods.html
            // wavesurfer.current.play();
            // setPlay(true);

            // make sure object stillavailable when file loaded
            if (wavesurfer.current) {
                // @ts-ignore
                wavesurfer.current.setVolume(volume);
                setVolume(volume);
            }

            console.log(wavesurfer.current)
        });

        // @ts-ignore
        return () => wavesurfer.current.destroy();
    }, [url]);

    const handlePlayPause = () => {
        setPlay(!playing);
        // @ts-ignore
        wavesurfer.current.playPause();
    };

    const onVolumeChange = (e: any) => {
        const { target } = e;
        const newVolume = +target.value;

        if (newVolume) {
            setVolume(newVolume);
            // @ts-ignore
            wavesurfer.current.setVolume(newVolume || 1);
        }
    };

    return (
        <div>
            <div id="waveform" ref={waveformRef} className="w-full"/>
            <div className="controls">
                <button onClick={handlePlayPause}>{!playing ? "Play" : "Pause"}</button>
            </div>
        </div>
    );
}
