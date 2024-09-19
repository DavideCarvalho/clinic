import PurchaseRequest from '#models/purchase_request'
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
  invoice?: File
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
      invoice: data.invoice ? await fileToBase64(data.invoice) : undefined,
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

interface ClinicUploadInvoiceParams {
  purchaseRequestId: string
  body: {
    invoice: File
  }
}

export async function clinicUploadInvoice(data: ClinicUploadInvoiceParams): Promise<void> {
  return fetch(`/api/v1/purchase-requests/${data.purchaseRequestId}/clinic/upload-invoice`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      invoice: await fileToBase64(data.body.invoice),
    }),
  }).then((res) => {
    if (!res.ok) throw new Error(res.statusText)
  })
}

interface ClinicDeletePurchaseRequestParams {
  purchaseRequestId: string
}

export async function clinicDeletePurchaseRequest(
  data: ClinicDeletePurchaseRequestParams
): Promise<void> {
  return fetch(`/api/v1/purchase-requests/${data.purchaseRequestId}/clinic`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => {
    if (!res.ok) throw new Error(res.statusText)
  })
}
