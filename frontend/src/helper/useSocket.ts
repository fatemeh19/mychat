// import { useEffect, useRef } from 'react'
// import io, { Socket } from 'socket.io-client'


// const useSocket = (): Socket => {
//     const token = localStorage.getItem('token')
//     let barearToken = 'Barear ' + token

//     const { current: socket } = useRef(io('https://localhost:3000', {
//         auth: {
//             toket: barearToken
//         }
//     }))

//     useEffect(() => {
//         return () => {
//             if (socket) socket.close()
//         }

//     }, [socket])

//     return socket
// }


// export default useSocket