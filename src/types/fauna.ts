export interface Ref {
  id: string
}

export interface Document {
  ref: Ref
  ts: number
  data?: object
}
