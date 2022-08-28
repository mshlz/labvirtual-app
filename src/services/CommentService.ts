import Axios from "../plugins/http/axios.instance"

interface ICreateReq {
  text: string
  postId: string
}
export class CommentService {
  static async create(data: ICreateReq) {
    return (await Axios.post(`/comments`, data)).data.data
  }

  static async get(id: string) {
    return (await Axios.get(`/comments/${id}`)).data.data
  }

  static async list(page?: number) {
    return (await Axios.get(`/comments`, { params: { page } })).data
  }

  static async update(id: string, data: Pick<ICreateReq, "text">) {
    return (await Axios.post(`/comments/${id}`, data)).data.data
  }

  static async delete(id: string) {
    return (await Axios.delete(`/comments/${id}`)).data.data
  }
}
