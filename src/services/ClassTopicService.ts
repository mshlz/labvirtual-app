import Axios from "../plugins/http/axios.instance"

export class ClassTopicService {
  static async create(data) {
    return (await Axios.post(`/class-topics`, data)).data.data
  }

  static async get(id: string) {
    return (await Axios.get(`/class-topics/${id}`)).data.data
  }

  static async list(page?: number) {
    return (await Axios.get(`/class-topics`, { params: { page } })).data
  }

  static async update(id: string, data) {
    return (await Axios.post(`/class-topics/${id}`, data)).data.data
  }

  static async delete(id: string) {
    return (await Axios.delete(`/class-topics/${id}`)).data.data
  }

  static async getFromClasses(classes: string | string[]) {
    return (
      await Axios.post(`/class-topics/from/classes`, {
        classes: Array.isArray(classes) ? classes : [classes],
      })
    ).data.data
  }
}
