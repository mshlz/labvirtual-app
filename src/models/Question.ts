export type QuestionType = "DISSERTATIVE" | "SINGLE_CHOICE" | "MULTIPLE_CHOICE"
export class Question {
  _id: string

  name: string
  text: string
  type: QuestionType
  alternatives: Alternative[]
  // value: number
  // classwork: Classwork | string
  // parent: IQuestion | string

  // students: User[]

  static create(data: Partial<Question>) {
    const obj = new Question()
    obj._id = data._id
    obj.name = data.name
    obj.text = data.text
    obj.type = data.type

    data.alternatives.map(Alternative.create)
    // obj.students = data.students

    return obj
  }
}

class Alternative {
  code: string
  correct: boolean
  text: string

  static create(data: Partial<Alternative>) {
    const obj = new Alternative()
    obj.code = data.code
    obj.text = data.text

    return obj
  }
}
