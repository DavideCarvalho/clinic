import PurchaseRequest from '#models/purchase_request'
import type { HttpContext } from '@adonisjs/core/http'
import mail from '@adonisjs/mail/services/main'

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
    const purchaseRequest = await PurchaseRequest.query()
      .where('id', payload.params.id)
      .andWhere('clinicId', clinic.id)
      .first()
    if (!purchaseRequest) throw new Error('Purchase request not found')
    if (purchaseRequest.status !== 'WAITING_SUPPLIER_SUBMISSION') throw new Error('Invalid status')
    purchaseRequest.status = 'WAITING_CLINIC_APPROVAL'
    await purchaseRequest.save()
    return purchaseRequest
  }
}
