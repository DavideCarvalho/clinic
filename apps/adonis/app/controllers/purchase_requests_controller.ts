import PurchaseRequest from '../models/purchase_request.js'
import PurchaseRequestItem from '../models/purchase_request_item.js'
import {
  clinicDeletePurchaseRequestValidator,
  clinicReceivedPurchaseRequestValidator as clinicReceivedPurchaseRequestValidator,
  clinicUploadInvoiceValidator,
  getInvoiceSignedUrlValidator,
  newPurchaseRequestValidator,
} from '../validators/purchase_request.js'
import drive from '@adonisjs/drive/services/main'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'
import mail from '@adonisjs/mail/services/main'
import { fileTypeFromBuffer } from 'file-type'
import ItemSupplier from '../models/item_supplier.js'

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

  public async newPurchaseRequest({ request, auth }: HttpContext) {
    const clinic = auth.user!.clinic
    const payload = await request.validateUsing(newPurchaseRequestValidator)
    const supplier = await ItemSupplier.query().where('id', payload.supplier).first()
    if (!supplier) throw new Error('Supplier not found')
    let purchaseRequestId
    await db.transaction(async (trx) => {
      const purchaseRequest = await PurchaseRequest.create(
        {
          clinicId: clinic.id,
          itemSupplierId: payload.supplier,
          status: 'WAITING_SUPPLIER_INVOICE',
          createdById: auth.user!.id,
          updatedById: auth.user!.id,
        },
        { client: trx }
      )
      await purchaseRequest.save()
      purchaseRequestId = purchaseRequest.id
      for (const item of payload.items) {
        const purchaseRequestItem = await PurchaseRequestItem.create(
          {
            purchaseRequestId: purchaseRequest.id,
            itemId: item.id,
            quantityNeeded: item.quantidade,
          },
          { client: trx }
        )
        await purchaseRequestItem.save()
      }
    })
    if (!purchaseRequestId) throw new Error('Error creating purchase request')
    await mail.sendLater((message) => {
      message
        .to(supplier.responsibleEmail)
        .cc(clinic.email)
        .from('clinicare@gmail.com')
        .subject('Solicitação de Compra')
        .htmlView('emails/purchase_request_submitted_html', {
          clinicName: clinic.name,
          itemSupplierName: supplier.name,
        })
    })
    return PurchaseRequest.findBy('id', purchaseRequestId)
  }

  public async clinicUploadInvoice({ request, auth }: HttpContext) {
    const clinic = auth.user!.clinic
    const payload = await request.validateUsing(clinicUploadInvoiceValidator)
    const purchaseRequest = await PurchaseRequest.query()
      .where('id', payload.params.purchaseRequestId)
      .andWhere('clinicId', clinic.id)
      .first()
    if (!purchaseRequest) throw new Error('Purchase request not found')
    if (purchaseRequest.status !== 'WAITING_SUPPLIER_INVOICE') throw new Error('Invalid status')
    const disk = drive.use()
    let cleanedBase64Invoice = payload.invoice.split(',')[1]
    const buffer = Buffer.from(cleanedBase64Invoice, 'base64')
    const type = await fileTypeFromBuffer(buffer)
    const extension = type?.ext ?? 'pdf'
    const filePath = `${clinic.id}/purchase_requests/${payload.params.purchaseRequestId}/invoice.${extension}`
    purchaseRequest.invoiceFilePath = filePath
    await disk.put(filePath, buffer, {
      visibility: 'private',
      contentEncoding: 'base64',
      contentType: type?.mime ?? 'application/pdf',
    })
    purchaseRequest.status = 'WAITING_ARRIVAL'
    await purchaseRequest.save()
    return PurchaseRequest.findBy('id', purchaseRequest.id)
  }

  public async clinicReceivedPurchaseRequest({ request, auth }: HttpContext) {
    const clinic = auth.user!.clinic
    const payload = await request.validateUsing(clinicReceivedPurchaseRequestValidator)

    await db.transaction(async (trx) => {
      const purchaseRequest = await PurchaseRequest.query({ client: trx })
        .where('id', payload.params.purchaseRequestId)
        .andWhere('clinicId', clinic.id)
        .first()
      if (!purchaseRequest) throw new Error('Purchase request not found')
      if (payload.invoice) {
        let cleanedBase64Invoice = payload.invoice.split(',')[1]
        const buffer = Buffer.from(cleanedBase64Invoice, 'base64')
        const type = await fileTypeFromBuffer(buffer)
        const disk = drive.use()
        const extension = type?.ext ?? 'pdf'
        const filePath = `${clinic.id}/purchase_requests/${payload.params.purchaseRequestId}/invoice.${extension}`
        await disk.put(filePath, buffer, {
          visibility: 'private',
          contentEncoding: 'base64',
          contentType: type?.mime ?? 'application/pdf',
        })
        purchaseRequest.invoiceFilePath = `/purchase_requests/${payload.params.purchaseRequestId}/invoice.${type?.ext ?? 'pdf'}`
      }
      for (const item of payload.items) {
        const purchaseRequestItem = await PurchaseRequestItem.query({ client: trx })
          .where('purchaseRequestId', payload.params.purchaseRequestId)
          .where('itemId', item.itemId)
          .first()
        if (!purchaseRequestItem) continue
        purchaseRequestItem.quantityBought = item.receivedQuantity
        purchaseRequestItem.save()
      }
      if (!purchaseRequest) throw new Error('Purchase request not found')
      purchaseRequest.status = 'ARRIVED'
      purchaseRequest.receivedAt = payload.arrivalDate
      await purchaseRequest.save()
    })
  }

  public async clinicDeletePurchaseRequest({ request, auth }: HttpContext) {
    const clinic = auth.user!.clinic
    const payload = await request.validateUsing(clinicDeletePurchaseRequestValidator)
    const purchaseRequest = await PurchaseRequest.findBy('id', payload.params.purchaseRequestId)
    if (!purchaseRequest) throw new Error('Purchase request not found')
    if (purchaseRequest.status !== 'WAITING_SUPPLIER_INVOICE') throw new Error('Invalid status')
    await PurchaseRequestItem.query()
      .where('purchaseRequestId', payload.params.purchaseRequestId)
      .delete()
    await PurchaseRequest.query()
      .where('id', payload.params.purchaseRequestId)
      .andWhere('clinicId', clinic.id)
      .andWhere('status', 'WAITING_SUPPLIER_INVOICE')
      .delete()
  }

  public async getInvoiceSignedUrl({ request, auth }: HttpContext) {
    const disk = drive.use()
    const clinic = auth.user!.clinic
    const payload = await request.validateUsing(getInvoiceSignedUrlValidator)
    const purchaseRequest = await PurchaseRequest.query()
      .where('id', payload.params.purchaseRequestId)
      .andWhere('clinicId', clinic.id)
      .andWhere('status', 'WAITING_SUPPLIER_INVOICE')
      .first()
    if (!purchaseRequest) throw new Error('Purchase request not found')
    if (!purchaseRequest.invoiceFilePath) throw new Error('Invoice not found')
    const signedUrl = await disk.getSignedUrl(purchaseRequest.invoiceFilePath)
    return {
      signedUrl,
    }
  }
}
