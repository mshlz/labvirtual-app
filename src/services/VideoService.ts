import Axios from "../plugins/http/axios.instance"

export class VideoService {
  static async create(data) {
    return (await Axios.post(`/videos`, data)).data.data
  }

  static async get(id: string) {
    return (await Axios.get(`/videos/${id}`)).data.data
  }

  static async getByCode(code: string) {
    return (await Axios.get(`/videos/code/${code}`)).data.data
  }

  static async list(page?: number) {
    return (await Axios.get(`/videos`, { params: { page } })).data
  }

  static async update(id: string, data) {
    return (await Axios.post(`/videos/${id}`, data)).data.data
  }

  static async delete(id: string) {
    return (await Axios.delete(`/videos/${id}`)).data.data
  }

  static async getFromDisciplines(disciplines: string | string[]) {
    return (
      await Axios.post(`/videos/from/disciplines`, {
        disciplines: Array.isArray(disciplines) ? disciplines : [disciplines],
      })
    ).data.data
  }

  static async getFromSubjects(subjects: string | string[]) {
    return (
      await Axios.post(`/videos/from/subjects`, {
        subjects: Array.isArray(subjects) ? subjects : [subjects],
      })
    ).data.data
  }
}
