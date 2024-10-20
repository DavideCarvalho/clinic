import { InventoryQuantityResponse } from '#controllers/dto/inventory_quantity.response'
import Item from '#models/item'
import { InventoryValueResponse } from '#controllers/dto/inventory_value.response'
import { Pageable } from './utils/pageable.dto'
import ItemCategory from '#models/item_category'
import { ItemDTO } from '#controllers/dto/item.dto'

export type DeepNonFunctionAndNonDollarProperties<T> = {
  [K in keyof T as K extends `$${string}`
    ? never
    : T[K] extends Function
      ? never
      : K]: T[K] extends object ? DeepNonFunctionAndNonDollarProperties<T[K]> : T[K]
}

export function getItemsNeedingReplacement(): Promise<
  Pageable<DeepNonFunctionAndNonDollarProperties<Item>>
> {
  return fetch('/api/v1/clinic/inventory/items/needing-replacement').then((res) => {
    if (!res.ok) throw new Error(res.statusText)
    return res.json()
  })
}

export function getInventoryValue(): Promise<InventoryValueResponse> {
  return fetch('/api/v1/clinic/inventory/inventory-value').then((res) => {
    if (!res.ok) throw new Error(res.statusText)
    return res.json()
  })
}

export function getInventoryQuantity(): Promise<InventoryQuantityResponse> {
  return fetch('/api/v1/clinic/inventory/inventory-quantity').then((res) => {
    if (!res.ok) throw new Error(res.statusText)
    return res.json()
  })
}

export type GetClinicItemsResponse = DeepNonFunctionAndNonDollarProperties<
  ItemDTO & { quantity: number; inventoryValue: number }
>[]

export function getClinicItems(): Promise<GetClinicItemsResponse> {
  return fetch('/api/v1/inventory/clinic/items').then((res) => {
    if (!res.ok) throw new Error(res.statusText)
    return res.json()
  })
}

export type GetClinicItemCategoriesResponse = DeepNonFunctionAndNonDollarProperties<ItemCategory>[]

export function getClinicItemCategories(): Promise<GetClinicItemCategoriesResponse> {
  return fetch('/api/v1/inventory/clinic/items/categories').then((res) => {
    if (!res.ok) throw new Error(res.statusText)
    return res.json()
  })
}

export interface CreateItemBody {
  name: string
  minimumQuantity: number
  itemCategoryId: string
}

export function createItem(
  data: CreateItemBody
): Promise<DeepNonFunctionAndNonDollarProperties<Item>> {
  return fetch('/api/v1/inventory/clinic/items', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((res) => {
    if (!res.ok) throw new Error(res.statusText)
    return res.json()
  })
}
