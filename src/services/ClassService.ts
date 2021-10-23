import Axios from "../plugins/http/axios.instance"

interface ICreateReq {
    name: string
    discipline: string
}
class ClassService {
    static async create(data: ICreateReq) {
        return (await Axios.post(`/classes`, data)).data.data
    }

    static async get(id: string) {
        return (await Axios.get(`/classes/${id}`)).data.data
    }

    static async getPeople(id: string) {
        return (await Axios.get(`/classes/${id}/people`)).data.data
    }

    static async list(page?: number) {
        return (await Axios.get(`/classes`, { params: { page } })).data
    }

    static async update(id: string, data: ICreateReq) {
        return (await Axios.post(`/classes/${id}`, data)).data.data
    }

    static async delete(id: string) {
        return (await Axios.delete(`/classes/${id}`)).data.data
    }

    static async getMyClasses() {
        return (await Axios.get(`/classes/my-classes`)).data.data
    }

    static async enroll(code: string) {
        return (await Axios.post(`/classes/enroll`, { code })).data.data
    }
    
    static async unenroll(classId: string) {
        return (await Axios.post(`/classes/unenroll`, { classId })).data.data
    }
}

export { ClassService }