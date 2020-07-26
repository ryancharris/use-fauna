export interface Ref {
  id: string
}

export interface Collection {
  data: object
  history_days: number
  name: string
  ref: Ref
  ts: number
}

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

export interface Function {
  body: object
  data: object
  name: string
  ref: Ref
  ts: number
}

export interface Index {
  active: boolean
  data: object
  name: string
  partitions: number
  ref: Ref
  serialized: boolean
  source: object
  ts: number
  unique: boolean
}

export type DataItem = Collection | Database | Document | Function | Index
