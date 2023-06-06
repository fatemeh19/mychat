import Image from "next/image"



const ImageMessage = ({ isText }: { isText: boolean | undefined }) => {

    return (
        <>
            {
                isText
                    ? (
                        <div className="relative max-w-[32rem]">

                            <div className={"w-fit bg-gray-200 rounded-lg rounded-tl-sm"}>
                                <div className="flex flex-col ">
                                    <Image
                                        width={300}
                                        height={0}
                                        src={'/images/messageImage.jpg'}
                                        alt=""
                                        className="w-[32rem] rounded-t-lg "
                                    />
                                    <p className="px-2 py-1 pb-2 break-all">Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis autem quod amet, obcaecati illum porro, error quos repellat inventore sed ullam mollitia praesentium cumque corporis placeat animi iusto! Laboriosam, at?</p>
                                </div>
                            </div>
                        </div>

                    )
                    : (
                        <div className="relative max-w-[32rem]">

                            <div className={"w-fit bg-gray-200 rounded-lg rounded-tl-sm"}>
                                <div className="flex flex-col ">
                                    <Image
                                        width={300}
                                        height={0}
                                        src={'/images/messageImage.jpg'}
                                        alt=""
                                        className="w-[32rem] rounded-lg "
                                    />
                                </div>
                            </div>
                        </div>
                    )
            }
        </>

    )
}

export default ImageMessage