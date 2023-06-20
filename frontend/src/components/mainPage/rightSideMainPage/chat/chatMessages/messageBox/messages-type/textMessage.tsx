


const TextMessage = ({ dir }: { dir: string }) => {

    console.log(dir)

    return (
        <div className="relative max-w-lg">
            <div className={`bg-gray-200 w-fit rounded-lg ${dir === 'rtl' ? 'rounded-tr-sm bg-blue-400' : 'rounded-tl-sm bg-yellow-300'} dark:bg-bgColorDark3 dark:text-white`}>
                <p className="break-all px-2 py-1 pb-2">
                    hiiiiiiggggggggggggggggggggggggggggggggggfffffffffffffffffffffffffdddddddddddddddddddddgggggggggggggggggggggggggggg
                </p>
            </div>
        </div>
    )
}

export default TextMessage