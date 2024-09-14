import PurchaseRequest from '#models/purchase_request'
import PurchaseRequestItem from '#models/purchase_request_item'
import { clinicReceivedPurchaseRequestValidator as clinicReceivedPurchaseRequestValidator } from '#validators/purchase_request'
import drive from '@adonisjs/drive/services/main'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'
import mail from '@adonisjs/mail/services/main'
import { fileTypeFromBuffer } from 'file-type'

export default class PurchaseRequestsController {
  public getClinicPurchaseRequests({ auth }: HttpContext) {
    const clinicId = auth.user!.clinicId
    return PurchaseRequest.query()
      .where('clinicId', clinicId)
      .preload('purchaseRequestItems', (purchaseRequestItemsQuery) => {
        purchaseRequestItemsQuery.preload('item')
      })
      .preload('itemSupplier')
  }

  public async createPurchaseRequest({ request, auth }: HttpContext) {
    const clinic = auth.user!.clinic
    const payload = await request.validateUsing(createPurchaseRequestValidator)
    const purchaseRequest = await PurchaseRequest.create({
      clinicId: clinic.id,
      itemSupplierId: payload.itemSupplierId,
      status: 'WAITING_SUPPLIER_SUBMISSION',
    })
    await mail.sendLater((message) => {
      message
        .to(payload.itemSupplierEmail)
        .cc(clinic.email)
        .from('clinicare@gmail.com')
        .subject('Solicitação de Compra')
        .htmlView('emails/purchase_request_submitted_html', {
          clinicName: clinic.name,
          itemSupplierName: payload.itemSupplierName,
          purchaseRequestId: purchaseRequest.id,
        })
    })
    return purchaseRequest
  }

  public async clinicReceivedPurchaseRequest({ request, auth }: HttpContext) {
    const clinic = auth.user!.clinic
    const payload = await request.validateUsing(clinicReceivedPurchaseRequestValidator)
    if (payload.invoice) {
      const buffer = Buffer.from(payload.invoice, 'base64')
      const type = await fileTypeFromBuffer(buffer)
      const disk = drive.use()
      try {
        await disk.put(
          `/${clinic.id}/purchase_requests/${payload.params.purchaseRequestId}/invoice.${type?.ext ?? 'pdf'}`,
          payload.invoice,
          {
            visibility: 'private',
          }
        )
      } catch (e) {
        console.log('Erro ao enviar arquivo', JSON.stringify(e))
        throw e
      }
    }
    await db.transaction(async (trx) => {
      for (const item of payload.items) {
        const purchaseRequestItem = await PurchaseRequestItem.query({ client: trx })
          .where('purchaseRequestId', payload.params.purchaseRequestId)
          .where('itemId', item.itemId)
          .first()
        if (!purchaseRequestItem) continue
        purchaseRequestItem.quantityBought = item.receivedQuantity
        purchaseRequestItem.save()
      }
      const purchaseRequest = await PurchaseRequest.query({ client: trx })
        .where('id', payload.params.purchaseRequestId)
        .andWhere('clinicId', clinic.id)
        .first()
      if (!purchaseRequest) throw new Error('Purchase request not found')
      purchaseRequest.status = 'ARRIVED'
      await purchaseRequest.save()
    })
  }
}
