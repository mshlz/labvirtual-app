import { setDataOrRef } from "../utils/model"
import { User } from "./User"

export class Comment {
  text: string
  authorId: string
  author: User
  createdAt?: string

  static create(data: Partial<Comment>) {
    const obj = new Comment()
    obj.text = data.text
    obj.createdAt = data.createdAt

    setDataOrRef(obj, "author", data, User)

    return obj
  }
}
