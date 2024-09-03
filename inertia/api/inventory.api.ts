import Item from '#models/item'
import { Pageable } from './utils/pageable.dto'

type DeepNonFunctionAndNonDollarProperties<T> = {
  [K in keyof T as K extends `$${string}`
    ? never
    : T[K] extends Function
      ? never
      : K]: T[K] extends object ? DeepNonFunctionAndNonDollarProperties<T[K]> : T[K]
}

// export interface Item {
//   id?: string
//   name?: string
//   quantity?: number
//   clinicId?: string
//   minimumQuantity?: number
//   createdById?: number
//   updatedById?: number
//   createdAt?: Date
//   updatedAt?: Date
// }

export function getItemsNeedingReplacement(): Promise<
  Pageable<DeepNonFunctionAndNonDollarProperties<Item>>
> {
  return fetch('/api/v1/inventory/items-needing-replacement').then((res) => {
    if (!res.ok) throw new Error(res.statusText)
    return res.json()
  })
}
