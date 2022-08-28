import { setDataOrRef } from "../utils/model"
import { Discipline } from "./Discipline"
import { User } from "./User"

export class Class {
  _id: string
  name: string
  description: string
  code: string
  teacherId: string
  teacher: string | User
  disciplineId: string
  discipline: string | Discipline
  // students: User[]

  static create(data: Partial<Class>) {
    const obj = new Class()
    obj._id = data._id
    obj.name = data.name
    obj.description = data.description
    obj.code = data.code
    // obj.students = data.students

    setDataOrRef(obj, "teacher", data, User)
    setDataOrRef(obj, "discipline", data, Discipline)

    return obj
  }
}
