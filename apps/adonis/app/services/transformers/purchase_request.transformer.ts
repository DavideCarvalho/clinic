import { inject } from '@adonisjs/core'
import PurchaseRequest from '../../models/purchase_request.js'
import { ClinicTransformer } from './clinic.transformer.js'
import {
  PurchaseRequestDTO,
  PurchaseRequestDTOStatus,
} from '../../controllers/dto/purchase_request.dto.js'
import { ItemSupplierTransformer } from './item_supplier.transformer.js'

@inject()
export class PurchaseRequestTransformer {
  constructor(
    private clinicTransformer: ClinicTransformer,
    private itemSupplierTransformer: ItemSupplierTransformer
  ) {}

  public async toJSON(purchaseRequest: PurchaseRequest): Promise<PurchaseRequestDTO> {
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
      createdAt: purchaseRequest.createdAt.toISO()!,
      updatedAt: purchaseRequest.updatedAt.toISO()!,
    }
  }
}
