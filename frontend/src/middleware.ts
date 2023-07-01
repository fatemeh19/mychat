// "use client"

import { NextResponse } from "next/server"
import type { NextRequest } from 'next/server'
import { useAppSelector } from "./redux/hooks"



export function middleware(request: NextRequest) {
    // console.log(request)
    // console.log('this is middle ware')

    // const url = request.nextUrl.pathname

    // console.log('type of window im middleware : ', typeof window)

    // console.log(token)


    // const isAuth = token
    // console.log(url)

    // let f = 'fatemeh'

    // console.log(token)
    // if (f === 'fatemeh') {
    //     console.log('token is exist')
    //     console.log(token)
    //     return NextResponse.redirect(new URL('/home', request.url))
    // }


}

export const config = {
    matcher: ['/', '/home']
}