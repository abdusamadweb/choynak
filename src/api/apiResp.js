import axios from "axios"
import {API} from "./apiConfig"
import {toast} from "react-hot-toast"

export const userLang = navigator.language || navigator.userLanguage

export const $resp = axios.create({
    baseURL: API,
    headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem('token'),
        Lang: userLang,
        "Accept-Language": userLang
    }
})


// img
export const postAttachment = (url, files) => {
    const toastId = toast.loading('Uploading . . .')

    console.log(files)
    const file = files[0]
    const formData = new FormData()
    formData.append('file', file, file?.name)

    return $resp
        .post(url, formData, {
            headers: {
                "Content-type": "multipart/form-data",
                Authorization: 'Bearer OuaeLM2a2OuPJqutOOS40kFSjqmKPd4cj5g5tj84'
            }
        })
        .then(res => {
            toast.success('Uploaded !', {
                id: toastId
            })
            setTimeout(() => toast.dismiss(toastId), 2000)

            return res.data
        })
        .catch(err => {
            toast.error(err?.response?.data?.message)
            toast.error('File didnt upload !', {
                id: toastId
            })
            setTimeout(() => toast.dismiss(toastId), 2000)

            return err
        })
}