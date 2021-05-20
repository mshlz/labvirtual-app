import axios from 'axios'
import Router from 'next/router'
import { toast } from 'react-toastify'
import { BASE_URL } from '../../config/env'
import { LocalStorage } from '../../utils/LocalStorage'

const Axios = axios.create({
    baseURL: BASE_URL
})

Axios.interceptors.request.use(config => {
    const token = LocalStorage.get('app-token')
    config.headers['Authorization'] = `Bearer ${token}`
    return config
})

Axios.interceptors.response.use(res => res, error => {
    if (error.response.status == 401 && error.response.data.message.includes('token')) {
        LocalStorage.removeAll(['app-token', 'app-user'])
        Router.push('/auth')
    }
    if (error.response.data.message.includes('permission')) {
        toast("Erro: Você não tem permissão para acessar esse recurso", {type: 'error'});
    }
    return Promise.reject(error)
})

export default Axios
