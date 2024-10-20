import { inject } from '@adonisjs/core'
import PurchaseRequestItem from '#models/purchase_request_item'
import { ItemTransformer } from './item.transformer.js'
import { PurchaseRequestItemDTO } from '#controllers/dto/purchase_request_item.dto'
import { PurchaseRequestTransformer } from './purchase_request.transformer.js'

@inject()
export class PurchaseRequestItemTransformer {
  constructor(
    private readonly itemTransformer: ItemTransformer,
    private readonly purchaseRequestTransformer: PurchaseRequestTransformer
  ) {}

  public toJSON(purchaseRequestItem: PurchaseRequestItem): PurchaseRequestItemDTO {
    return {
      id: purchaseRequestItem.id,
      quantityNeeded: purchaseRequestItem.quantityNeeded,
      quantityBought: purchaseRequestItem.quantityBought,
      unitaryValue: purchaseRequestItem.unitaryValue,
      status: purchaseRequestItem.status,
      purchaseRequestId: purchaseRequestItem.purchaseRequestId,
      itemId: purchaseRequestItem.itemId,
      item: this.itemTransformer.toJSON(purchaseRequestItem.item),
      createdAt: purchaseRequestItem.createdAt.toISO()!,
      updatedAt: purchaseRequestItem.updatedAt.toISO()!,
      purchaseRequest: this.purchaseRequestTransformer.toJSON(purchaseRequestItem.purchaseRequest),
    }
  }
}
