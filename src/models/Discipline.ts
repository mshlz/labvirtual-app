export class Discipline {
  _id: string
  name: string
  icon: string

  static create(data: Partial<Discipline>) {
    const obj = new Discipline()
    obj._id = data._id
    obj.name = data.name
    obj.icon = data.icon

    return obj
  }
}
