import Axios from "../plugins/http/axios.instance"

export class SimulatorService {
  static async create(data) {
    return (await Axios.post(`/simulators`, data)).data.data
  }

  static async get(id: string) {
    return (await Axios.get(`/simulators/${id}`)).data.data
  }

  static async getByCode(code: string) {
    return (await Axios.get(`/simulators/code/${code}`)).data.data
  }

  static async list(page?: number) {
    return (await Axios.get(`/simulators`, { params: { page } })).data
  }

  static async update(id: string, data) {
    return (await Axios.post(`/simulators/${id}`, data)).data.data
  }

  static async delete(id: string) {
    return (await Axios.delete(`/simulators/${id}`)).data.data
  }

  static async getFromDisciplines(disciplines: string | string[]) {
    return (
      await Axios.post(`/simulators/from/disciplines`, {
        disciplines: Array.isArray(disciplines) ? disciplines : [disciplines],
      })
    ).data.data
  }

  static async getFromSubjects(subjects: string | string[]) {
    return (
      await Axios.post(`/simulators/from/subjects`, {
        subjects: Array.isArray(subjects) ? subjects : [subjects],
      })
    ).data.data
  }
}
