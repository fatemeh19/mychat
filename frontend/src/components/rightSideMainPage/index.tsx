"use client"

export default function RightSideMainPage() {

    return (
        <div className="grid grid-cols-4 bg-yellow-300">
            full
            <div className="col-span-1 bg-red-400">
                one
            </div>
            <div className="col-span-3 bg-green-600 ">
                two
            </div>
        </div>
    )
}
