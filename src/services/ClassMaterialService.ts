import Axios from "../plugins/http/axios.instance"

export class ClassMaterialService {
  static async create(data) {
    return (await Axios.post(`/class-materials`, data)).data.data
  }

  static async get(id: string) {
    return (await Axios.get(`/class-materials/${id}`)).data.data
  }

  static async list(page?: number, per_page?: number) {
    return (await Axios.get(`/class-materials`, { params: { page, per_page } }))
      .data
  }

  static async delete(id: string) {
    return (await Axios.delete(`/class-materials/${id}`)).data.data
  }

  static async getFromClassId(classId: string) {
    return (
      await Axios.post(`/class-materials/from/class`, {
        classId,
      })
    ).data.data
  }

  static async getFromClassTopicId(topicId: string) {
    return (
      await Axios.post(`/class-materials/from/class-topic`, {
        topicId,
      })
    ).data.data
  }
}
