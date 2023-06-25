

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
            if (res.Error.statusCode === 400 || res.Error.statusCode === 401) {
                console.log('throw')
                throw new ValidationError(res.data.Error)
            }


            Promise.reject(err)
        }
    )

    return axiosInstance

}

export default callApi