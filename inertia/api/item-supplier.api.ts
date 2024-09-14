import ItemSupplier from '#models/item_supplier'
import { BackendModel } from './utils/backend-model.dto'

export type GetClinicSuppliers = BackendModel<ItemSupplier>[]

export function getClinicSuppliers(): Promise<GetClinicSuppliers> {
  return fetch('/api/v1/item-suppliers/clinic').then((res) => {
    if (!res.ok) throw new Error(res.statusText)
    return res.json()
  })
}
