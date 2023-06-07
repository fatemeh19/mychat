import { FC } from "react"

interface strengthProps {
    text: string,
    d: string,
    color: string
}
const Strength: FC<strengthProps> = ({
    text, d, color
}) => {

    const textColor = `text-[${color}]`

    return (

        <span className='flex items-center w-full gap-2 mt-3'>
            <p className="text-gray-800">Password strenght : </p>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="w-[24px] h-[24px] min-w-[24px] nord-svg nord-svg--fill inline-block" focusable="false" ><path fill={color} fillRule="evenodd" d={d}></path></svg>
            <p className={`${textColor} $ text-sm`}>{text}</p>
        </span>

    )
}

export default Strength