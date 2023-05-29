"use client"


import { BiSearch } from "react-icons/bi";
export default function SearchBox(){

    return (
            <div className="m-8 searchbox">
                <div className=" container-searchbox container w-full col-span-1 bg-[#f5f5f5] flex rounded-lg py-3 px-4">
                    <BiSearch className="text-xl text-gray-400 mr-2" />
                    <input type="text" className='outline-none bg-transparent w-full' placeholder='Search..' />
                </div>
            </div>

    )
}



