export type UserType = 'TEACHER' | 'STUDENT' | 'ADMIN'

export class User {
    _id: string
    name: string
    email: string
    birthdate: string
    type: UserType

    static create(data: Partial<User>) {
        const obj = new User()
        obj._id = data._id
        obj.name = data.name
        obj.email = data.email
        obj.birthdate = data.birthdate
        obj.type = data.type

        return obj
    }
}