import * as Yup from "yup"
export { Yup }
import { ObjectShape } from "yup/lib/object"

export const ValidateForm = async (
  schema: ObjectShape,
  data: any,
  formRef: any
): Promise<boolean> => {
  const yupSchema = Yup.object().shape(schema)

  try {
    await yupSchema.validate(data, { abortEarly: false })
    return true
  } catch (error) {
    const validationErrors = {}
    if (error instanceof Yup.ValidationError) {
      error.inner.forEach((error) => {
        validationErrors[error.path] = error.message
      })
      formRef.current.setErrors(validationErrors)
    }
    return false
  }
}
