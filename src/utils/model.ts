abstract class Model {
  static create(data: Partial<{}>) {
    return null
  }
}

/**
 * Helper to set `target[key]` instance and/or `target[keyId]` property
 *
 * If data[key] be a string then only the `keyId` will be filled with the reference
 *
 * If data[key] be an object, the `target[keyId]` key will be filled with data[key]['_id']
 * and the `target[key]` receive an instance of `new model(data[key])`
 *
 * @param target Object that will be populated
 * @param key Property that will be populated
 * @param data Object from the data come
 * @param model Contructor of the data, it must implements a static method `create` that receive as parameter a partial object of self and returns an instance
 *
 * @example
 *
 *  ```
 *  class Animal {
 *      //...
 *      static create(obj: Partial<Animal>): Animal { ... }
 *  }
 *
 *  const data = { animal: { _id: 'animal_1', name: 'Bob' } }
 *
 *  const target = { animal: null }
 *  setDataOrRef(taget, 'animal', data, Animal)
 *
 *  target['animal']    // Animal { _id: 'animal_1', name: 'Bob' }
 *  target['animalId']  // 'animal_1'
 *  ```
 */
export function setDataOrRef<T>(
  target: T,
  key: keyof T,
  data: Partial<T>,
  model: typeof Model
) {
  if (typeof data[key] === "string") {
    target[`${key}Id`] = data[key]
  } else if (typeof data[key] === "object" && data[key]["_id"]) {
    target[key] = model.create(data[key])
    target[`${key}Id`] = data[key]["_id"]
  }
}
