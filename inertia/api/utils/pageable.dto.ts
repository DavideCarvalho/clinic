export interface Pageable<T> {
  data?: T[]
  meta?: PaginationMeta
}

export interface PaginationMeta {
  total?: number
  perPage?: number
  currentPage?: number
  lastPage?: number
  firstPage?: number
  firstPageUrl?: string
  lastPageUrl?: string
  nextPageUrl?: null
  previousPageUrl?: null
}
