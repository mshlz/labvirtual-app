import { setDataOrRef } from "../utils/model"
import { Class } from "./Class"

export class ClassTopic {
  _id: string
  name: string
  classId: string
  class: Class

  static create(data: Partial<ClassTopic>) {
    const obj = new ClassTopic()
    obj._id = data._id
    obj.name = data.name

    setDataOrRef(obj, "class", data, Class)

    return obj
  }
}
