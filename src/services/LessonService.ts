import Axios from "../plugins/http/axios.instance"

export class LessonService {
  static async create(data) {
    return (await Axios.post(`/lessons`, data)).data.data
  }

  static async get(id: string) {
    return (await Axios.get(`/lessons/${id}`)).data.data
  }

  static async getByCode(code: string) {
    return (await Axios.get(`/lessons/code/${code}`)).data.data
  }

  static async list(page?: number) {
    return (await Axios.get(`/lessons`, { params: { page } })).data
  }

  static async update(id: string, data) {
    return (await Axios.post(`/lessons/${id}`, data)).data.data
  }

  static async delete(id: string) {
    return (await Axios.delete(`/lessons/${id}`)).data.data
  }

  static async getFromDisciplines(disciplines: string | string[]) {
    return (
      await Axios.post(`/lessons/from/disciplines`, {
        disciplines: Array.isArray(disciplines) ? disciplines : [disciplines],
      })
    ).data.data
  }

  static async getFromSubjects(subjects: string | string[]) {
    return (
      await Axios.post(`/lessons/from/subjects`, {
        subjects: Array.isArray(subjects) ? subjects : [subjects],
      })
    ).data.data
  }
}
