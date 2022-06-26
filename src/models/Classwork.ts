import { setDataOrRef } from "../utils/model"
import { Class } from "./Class"
import { ClassTopic } from "./ClassTopic"
import { Question } from "./Question"
import { User } from "./User"

export class Classwork {
    _id: string
    name: string
    description: string
    authorId: string
    author: User
    classId: string
    class: Class
    topicId: string
    topic: ClassTopic
    questions: Question[]
    status: 'DRAFT' | 'PUBLISHED'
    value: number
    weight: number
    dueDate: string
    createdAt: string
    updatedAt: string

    static create(data: Partial<Classwork>) {
        const obj = new Classwork()
        obj._id = data._id
        obj.name = data.name
        obj.description = data.description
        obj.status = data.status
        obj.value = data.value
        obj.weight = data.weight
        obj.dueDate = data.dueDate
        obj.createdAt = data.createdAt
        obj.updatedAt = data.updatedAt

        const questions: Question[] = []
        data.questions?.forEach(question => questions.push(Question.create(question)))
        obj.questions = questions

        setDataOrRef(obj, 'author', data, User)
        setDataOrRef(obj, 'class', data, Class)
        setDataOrRef(obj, 'topic', data, ClassTopic)

        return obj
    }
}