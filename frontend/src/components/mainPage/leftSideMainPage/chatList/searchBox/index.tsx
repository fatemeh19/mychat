"use client"


import { SearchType } from "@/src/models/enum";
import { setIsSearch, setSearchType } from "@/src/redux/features/searchSlice";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
export default function SearchBox() {
    const [search, setSearch] = useState('')

    const dispatch = useAppDispatch()
    const socket = useAppSelector(state => state.socket).Socket
    const searchType = useAppSelector(state => state.search).searchType
    const chatId = useAppSelector(state => state.chat.Chat)._id

    const isSearch = useAppSelector(state => state.search).isSearch

    useEffect(() => {
        if (!isSearch) setSearch('')
    }, [isSearch])

    const searchChatHandler = (e: any) => {
        searchType === SearchType.chats && e.target.value === '' ? dispatch(setIsSearch(false)) : dispatch(setIsSearch(true))
        setSearch(e.target.value)
        // searchType === SearchType.chats && dispatch(setSearchType(SearchType.chats))
        searchType === SearchType.chats && socket.emit('searchChat', e.target.value)
        searchType === SearchType.messages && socket.emit('searchMessage', chatId, e.target.value)
    }

    return (
        <div className="
            m-8 searchbox
            lg:block
            hidden
            ">
            <div className=" container-searchbox container w-full col-span-1 bg-[#f5f5f5] flex rounded-lg py-3 px-4 dark:bg-[rgb(53,55,59)]">
                <BiSearch className="text-xl text-gray-400 mr-2 mt-[3px]" />
                <input type="text" className='outline-none bg-transparent w-full dark:text-white' placeholder='Search..' value={search} onChange={searchChatHandler} />
            </div>
        </div>

    )
}



