import Axios from "../plugins/http/axios.instance"

interface ICreateReq {
  text: string
  classId: string
}
export class PostService {
  static async create(data: ICreateReq) {
    return (await Axios.post(`/posts`, data)).data.data
  }

  static async get(id: string) {
    return (await Axios.get(`/posts/${id}`)).data.data
  }

  static async list(page?: number) {
    return (await Axios.get(`/posts`, { params: { page } })).data
  }

  static async getFromClass(classId: string) {
    return (await Axios.post(`/posts/from/class`, { classId })).data
  }

  static async update(id: string, data) {
    return (await Axios.post(`/posts/${id}`, data)).data.data
  }

  static async delete(id: string) {
    return (await Axios.delete(`/posts/${id}`)).data.data
  }
}
