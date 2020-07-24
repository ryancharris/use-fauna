export interface Database {
  ref: Ref
  ts: number
  name: string
  global_id: string
}

export interface Document {
  ref: Ref
  ts: number
  data?: object
}

export interface Ref {
  id: string
}
