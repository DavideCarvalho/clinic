import { inject } from '@adonisjs/core'
import PurchaseRequestItem from '#models/purchase_request_item'
import { ItemTransformer } from './item.transformer.js'
import { PurchaseRequestItemDTO } from '#controllers/dto/purchase_request_item.dto'
import { PurchaseRequestTransformer } from './purchase_request.transformer.js'
import Item from '#models/item'
import app from '@adonisjs/core/services/app'

@inject()
export class PurchaseRequestItemTransformer {
  constructor(private readonly purchaseRequestTransformer: PurchaseRequestTransformer) {}

  public async toJSON(purchaseRequestItem: PurchaseRequestItem): Promise<PurchaseRequestItemDTO> {
    const itemTransformer = await app.container.make(ItemTransformer)
    const item = purchaseRequestItem.item
      ? purchaseRequestItem.item
      : await Item.findOrFail(purchaseRequestItem.itemId)
    return {
      id: purchaseRequestItem.id,
      quantityNeeded: purchaseRequestItem.quantityNeeded,
      quantityBought: purchaseRequestItem.quantityBought,
      unitaryValue: purchaseRequestItem.unitaryValue,
      status: purchaseRequestItem.status,
      purchaseRequestId: purchaseRequestItem.purchaseRequestId,
      itemId: purchaseRequestItem.itemId,
      item: await itemTransformer.toJSON(item),
      createdAt: purchaseRequestItem.createdAt.toISO()!,
      updatedAt: purchaseRequestItem.updatedAt.toISO()!,
      purchaseRequest: await this.purchaseRequestTransformer.toJSON(
        purchaseRequestItem.purchaseRequest
      ),
    }
  }
}
