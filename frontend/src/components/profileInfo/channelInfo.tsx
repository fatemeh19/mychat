"use client"

import { FC } from "react";
import CustomizedDialogs from "../popUp";

interface ChannelInfoProps {

}

const ChannelInfo: FC<ChannelInfoProps> = () => {

    let open = false
    let clickHandler = () => {
        open = true
    }

    return (
        <>
            channer Info

        </>
    );
}

export default ChannelInfo;