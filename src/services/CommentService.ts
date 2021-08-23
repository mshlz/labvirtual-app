import Axios from "../plugins/http/axios.instance"

class CommentService {
    static async create(data) {
        return (await Axios.post(`/comments`, data)).data.data
    }

    static async get(id: string) {
        return (await Axios.get(`/comments/${id}`)).data.data
    }

    static async list(page?: number) {
        return (await Axios.get(`/comments`, { params: { page } })).data
    }

    static async update(id: string, data) {
        return (await Axios.post(`/comments/${id}`, data)).data.data
    }

    static async delete(id: string) {
        return (await Axios.delete(`/comments/${id}`)).data.data
    }
}

export { CommentService }