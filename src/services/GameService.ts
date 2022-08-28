import Axios from "../plugins/http/axios.instance"

export class GameService {
  static async create(data) {
    return (await Axios.post(`/games`, data)).data.data
  }

  static async get(id: string) {
    return (await Axios.get(`/games/${id}`)).data.data
  }

  static async getByCode(code: string) {
    return (await Axios.get(`/games/code/${code}`)).data.data
  }

  static async list(page?: number) {
    return (await Axios.get(`/games`, { params: { page } })).data
  }

  static async update(id: string, data) {
    return (await Axios.post(`/games/${id}`, data)).data.data
  }

  static async delete(id: string) {
    return (await Axios.delete(`/games/${id}`)).data.data
  }

  static async getFromDisciplines(disciplines: string | string[]) {
    return (
      await Axios.post(`/games/from/disciplines`, {
        disciplines: Array.isArray(disciplines) ? disciplines : [disciplines],
      })
    ).data.data
  }

  static async getFromSubjects(subjects: string | string[]) {
    return (
      await Axios.post(`/games/from/subjects`, {
        subjects: Array.isArray(subjects) ? subjects : [subjects],
      })
    ).data.data
  }
}
