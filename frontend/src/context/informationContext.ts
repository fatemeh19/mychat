import { Dispatch, SetStateAction, createContext } from "react";
import { infoFace } from "../models/interface";

interface contextValue {
    info: infoFace,
    setInfo: Dispatch<SetStateAction<infoFace>>
}

const informationContext = createContext<contextValue>({
    info: {
        img: '',
        name: '',
        phone: ''
    },
    setInfo: () => { }
})


export default informationContext