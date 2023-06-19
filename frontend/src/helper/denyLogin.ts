// "use client"

import UseLocalStorage from "./useLocalStorate" 



export function denyLogin() {
    console.log('this is denyLogin')


    // const l = localStorage
    // console.log(l)

    // console.log('type of window im middleware : ', typeof window)

    const { token } = UseLocalStorage()
    console.log(token)


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