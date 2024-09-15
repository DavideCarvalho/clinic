import PurchaseRequest from '#models/purchase_request'
import { clinicReceivedPurchaseRequestValidator } from '#validators/purchase_request'
import { Infer } from '@vinejs/vine/types'
import { BackendModel } from './utils/backend-model.dto'
import { fileToBase64 } from '~/lib/file-to-base64'

export type GetClinicPurchaseRequestsResponse = BackendModel<PurchaseRequest>[]

export function getClinicPurchaseRequests(): Promise<GetClinicPurchaseRequestsResponse> {
  return fetch('/api/v1/purchase-requests/clinic').then((res) => {
    if (!res.ok) throw new Error(res.statusText)
    return res.json()
  })
}

interface ClinicReceivedPurchaseRequestBody {
  purchaseRequestId: string
  arrivalDate: Date
  invoice: File
  items: {
    itemId: string
    askedQuantity: number
    receivedQuantity: number
  }[]
}

export async function clinicReceivedPurchaseRequest(
  data: ClinicReceivedPurchaseRequestBody
): Promise<void> {
  return fetch(`/api/v1/purchase-requests/${data.purchaseRequestId}/clinic/received`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...data,
      invoice: await fileToBase64(data.invoice),
    }),
  }).then((res) => {
    if (!res.ok) throw new Error(res.statusText)
  })
}

interface NewPurchaseRequestBody {
  supplier: string
  items: {
    id: string
    quantidade: number
  }[]
}

export function newPurchaseRequest(data: NewPurchaseRequestBody): Promise<void> {
  return fetch(`/api/v1/purchase-requests/clinic`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((res) => {
    if (!res.ok) throw new Error(res.statusText)
  })
}
