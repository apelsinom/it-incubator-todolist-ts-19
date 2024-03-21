export type FieldsErrorsType = {
  error: string
  field: string
}
export type BaseResponseType<D = {}> = {
  data: D
  messages: [string]
  fieldsErrors: FieldsErrorsType[]
  resultCode: number
}
