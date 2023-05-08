import axios from "axios";




const request = async (options) => {

    const onSuccess = res => {
        return res
    }

    const onError = err => {
        return err
    }

    const client = axios.create({
        method: options.method,
        baseURL: options.baseURL,
        data: options.data,
        params: options.params,
    })
    return client(options).then(onSuccess).catch(onError)



}

export default request;