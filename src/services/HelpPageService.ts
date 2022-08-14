import Axios from "../plugins/http/axios.instance"

export class HelpPageService {
  static async create(data) {
    return (await Axios.post(`/help-pages`, data)).data.data
  }

  static async get(id: string) {
    return (await Axios.get(`/help-pages/${id}`)).data.data
  }

  static async getByCode(code: string) {
    return (await Axios.get(`/help-pages/code/${code}`)).data.data
  }

  static async list(page?: number) {
    return (await Axios.get(`/help-pages`, { params: { page } })).data
  }

  static async update(id: string, data) {
    return (await Axios.post(`/help-pages/${id}`, data)).data.data
  }

  static async delete(id: string) {
    return (await Axios.delete(`/help-pages/${id}`)).data.data
  }

  static async getFromSections(sections: string | string[]) {
    return (
      await Axios.post(`/help-pages/from/sections`, {
        sections: Array.isArray(sections) ? sections : [sections],
      })
    ).data.data
  }

  static async getRouterInfo(): Promise<{ sections: any[]; pages: any[] }> {
    return (await Axios.get(`/help-pages/router-info`)).data.data
  }
}
