import { inject } from '@adonisjs/core'
import PurchaseRequest from '#models/purchase_request'
import { PurchaseRequestItemTransformer } from './purchase_request_item.transformer.js'
import { ClinicTransformer } from './clinic.transformer.js'
import { PurchaseRequestDTO, PurchaseRequestDTOStatus } from '#controllers/dto/purchase_request.dto'
import { ItemSupplierTransformer } from './item_supplier.transformer.js'

@inject()
export class PurchaseRequestTransformer {
  constructor(
    private clinicTransformer: ClinicTransformer,
    private itemSupplierTransformer: ItemSupplierTransformer,
    private purchaseRequestItemTransformer: PurchaseRequestItemTransformer
  ) {}

  public toJSON(purchaseRequest: PurchaseRequest): PurchaseRequestDTO {
    return {
      id: purchaseRequest.id,
      itemId: purchaseRequest.itemId,
      clinicId: purchaseRequest.clinicId,
      status: purchaseRequest.status as PurchaseRequestDTOStatus,
      itemSupplierId: purchaseRequest.itemSupplierId,
      invoiceFilePath: purchaseRequest.invoiceFilePath,
      receivedAt: purchaseRequest.receivedAt?.toISO() ?? null,
      clinic: this.clinicTransformer.toJSON(purchaseRequest.clinic),
      itemSupplier: this.itemSupplierTransformer.toJSON(purchaseRequest.itemSupplier),
      purchaseRequestItems: purchaseRequest.purchaseRequestItems.map((item) =>
        this.purchaseRequestItemTransformer.toJSON(item)
      ),
      createdAt: purchaseRequest.createdAt.toISO()!,
      updatedAt: purchaseRequest.updatedAt.toISO()!,
    }
  }
}
