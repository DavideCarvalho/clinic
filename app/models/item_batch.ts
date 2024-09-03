import { belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import BaseUUIDModel from '#models/utils/base_uuid_model'
import PurchaseRequest from '#models/purchase_request'
import Item from '#models/item'

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
