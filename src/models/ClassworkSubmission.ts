import { setDataOrRef } from "../utils/model"
import { Class } from "./Class"
import { Classwork } from "./Classwork"

export class ClassworkSubmission {
    _id: string
    classId: string
    class: Class
    classworkId: string
    classwork: Classwork
    status: 'NEW' | 'SUBMITTED' | 'RETURNED'
    createdAt: string
    updatedAt: string
    grade: number

    static create(data: Partial<ClassworkSubmission>) {
        const obj = new ClassworkSubmission()
        obj._id = data._id
        obj.status = data.status
        obj.createdAt = data.createdAt
        obj.updatedAt = data.updatedAt
        obj.grade = data.grade

        setDataOrRef(obj, 'class', data, Class)
        setDataOrRef(obj, 'classwork', data, Classwork)

        return obj
    }
}