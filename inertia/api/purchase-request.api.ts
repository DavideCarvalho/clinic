import PurchaseRequest from '#models/purchase_request'
import { BackendModel } from './utils/backend-model.dto'

export type GetClinicPurchaseRequestsResponse = BackendModel<PurchaseRequest>[]

export function getClinicPurchaseRequests(): Promise<GetClinicPurchaseRequestsResponse> {
  return fetch('/api/v1/purchase-requests/clinic').then((res) => {
    if (!res.ok) throw new Error(res.statusText)
    return res.json()
  })
}
