"use client"

import React, {FC, useState } from "react";

import Waveform from "./waveForm";

interface WaveSoundProps {

}


const tracks = [
    {
        id: 0,
        title: "Brahms: St Anthony Chorale - Theme, Two Pianos Op.56b",
        url:
            "/uploads/music/music-1.mp3"
    },
    {
        id: 1,
        title: "Franz Schubert's Ständchen - Voice (Clarinet) & Piano",
        url:
        "/uploads/music/music-2.mp3"
    }
];

const WaveSound: FC<WaveSoundProps> = () => {

    const [selectedTrack, setSelectedTrack] = useState(tracks[1]);


    console.log(Waveform)
    return (
        <>
            <div className="App">
                <Waveform url={selectedTrack.url} />
            </div>
        </>
    );
}

export default WaveSound;