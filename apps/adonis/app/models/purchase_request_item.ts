import { belongsTo, column } from '@adonisjs/lucid/orm'
import BaseUUIDModel from './utils/base_uuid_model.js'
import Item from './item.js'
import PurchaseRequest from './purchase_request.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class PurchaseRequestItem extends BaseUUIDModel {
  @column()
  declare quantityNeeded: number

  @column()
  declare quantityBought: number | null

  @column()
  declare unitaryValue: number | null

  // PENDING | RECEIVED | ERROR
  @column()
  declare status: string

  @column()
  declare purchaseRequestId: string

  @column()
  declare itemId: string

  @belongsTo(() => Item)
  declare item: BelongsTo<typeof Item>

  @belongsTo(() => PurchaseRequest)
  declare purchaseRequest: BelongsTo<typeof PurchaseRequest>
}
