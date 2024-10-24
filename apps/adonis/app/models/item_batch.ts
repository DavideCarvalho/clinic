import { belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import BaseUUIDModel from './utils/base_uuid_model.js'
import PurchaseRequest from './purchase_request.js'
import Item from './item.js'

export default class ItemBatch extends BaseUUIDModel {
  @column()
  declare itemId: string

  @column()
  declare purchaseOrderId: string

  @belongsTo(() => PurchaseRequest)
  declare purchaseOrder: BelongsTo<typeof PurchaseRequest>

  @belongsTo(() => Item)
  declare item: BelongsTo<typeof Item>
}
