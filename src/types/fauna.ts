export interface Document {
  ref: Ref
  ts: number
  data?: object
}

export interface Ref {
  id: string
}
