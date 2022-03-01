import { setDataOrRef } from "../utils/model"
import { Class } from "./Class"
import { ClassTopic } from "./ClassTopic"

export class Classwork {
    _id: string
    name: string
    description: string
    classId: string
    class: Class
    topicId: string
    topic: ClassTopic
    status: 'DRAFT' | 'PUBLISHED'
    createdAt: string
    updatedAt: string

    static create(data: Partial<Classwork>) {
        const obj = new Classwork()
        obj._id = data._id
        obj.name = data.name
        obj.description = data.description
        obj.status = data.status
        obj.createdAt = data.createdAt
        obj.updatedAt = data.updatedAt

        setDataOrRef(obj, 'class', data, Class)
        setDataOrRef(obj, 'topic', data, ClassTopic)

        return obj
    }
}