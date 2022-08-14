import Axios from "../plugins/http/axios.instance"

export class PageService {
  static async create(data) {
    return (await Axios.post(`/pages`, data)).data.data
  }

  static async get(id: string) {
    return (await Axios.get(`/pages/${id}`)).data.data
  }

  static async getByCode(code: string) {
    return (await Axios.get(`/pages/code/${code}`)).data.data
  }

  static async list(page?: number) {
    return (await Axios.get(`/pages`, { params: { page } })).data
  }

  static async update(id: string, data) {
    return (await Axios.post(`/pages/${id}`, data)).data.data
  }

  static async delete(id: string) {
    return (await Axios.delete(`/pages/${id}`)).data.data
  }

  static async getFromSections(sections: string | string[]) {
    return (
      await Axios.post(`/pages/from/sections`, {
        sections: Array.isArray(sections) ? sections : [sections],
      })
    ).data.data
  }
}
