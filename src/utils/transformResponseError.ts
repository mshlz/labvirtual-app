import { FieldData } from "rc-field-form/es/interface"

export const transformResponseError = (apiResponse): FieldData[] =>
  Object.entries(apiResponse.errors).map(([key, value]) => ({
    name: key,
    errors: Array.isArray(value) ? value : [value],
  }))
