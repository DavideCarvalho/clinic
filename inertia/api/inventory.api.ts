import { InventoryQuantityResponse } from '#controllers/dto/inventory_quantity.response'
import Item from '#models/item'
import { InventoryValueResponse } from '#controllers/dto/inventory_value.response'
import { Pageable } from './utils/pageable.dto'

export type DeepNonFunctionAndNonDollarProperties<T> = {
  [K in keyof T as K extends `$${string}`
    ? never
    : T[K] extends Function
      ? never
      : K]: T[K] extends object ? DeepNonFunctionAndNonDollarProperties<T[K]> : T[K]
}

export function getItemsNeedingReplacement(): Promise<
  Pageable<DeepNonFunctionAndNonDollarProperties<Item[]>>
> {
  return fetch('/api/v1/inventory/items-needing-replacement').then((res) => {
    if (!res.ok) throw new Error(res.statusText)
    return res.json()
  })
}

export function getInventoryValue(): Promise<InventoryValueResponse> {
  return fetch('/api/v1/inventory/inventory-value').then((res) => {
    if (!res.ok) throw new Error(res.statusText)
    return res.json()
  })
}

export function getInventoryQuantity(): Promise<InventoryQuantityResponse> {
  return fetch('/api/v1/inventory/inventory-quantity').then((res) => {
    if (!res.ok) throw new Error(res.statusText)
    return res.json()
  })
}

export function getClinicItems(): Promise<DeepNonFunctionAndNonDollarProperties<Item>[]> {
  return fetch('/api/v1/inventory/clinic/items').then((res) => {
    if (!res.ok) throw new Error(res.statusText)
    return res.json()
  })
}
