

import axios from "axios";
import ValidationError from "../errors/validationError";

const callApi = () => {


    const axiosInstance = axios.create({
        baseURL: 'http://localhost:3000/api/v1'
    })

    axiosInstance.interceptors.request.use(
        (config) => {

            return config
        },
        err => Promise.reject(err)
    )

    axiosInstance.interceptors.response.use(
        res => {
            return res
        },
        err => {
            const res = err.response
            console.log('error res : ', res)
            if(res === undefined) {
                throw 'network error : connect to server ...'
            } else if (res.status === 400 || res.status === 401) {
                throw new ValidationError(res.data.Error)
            }


            Promise.reject(err)
        }
    )

    return axiosInstance

}

export default callApi