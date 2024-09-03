import { belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import BaseUUIDModel from './utils/base_uuid_model.js'
import PurchaseRequest from '#models/purchase_request'
import ItemBatch from './item_batch.js'

export default class ItemUnit extends BaseUUIDModel {
  @column()
  declare price: number

  // AVAILABLE | RESERVED | USED
  @column()
  declare status: string

  @belongsTo(() => ItemBatch)
  declare itemBatch: BelongsTo<typeof ItemBatch>

  public static async calculateInventoryValue(clinicId: string) {
    this.query()
      .join('item_batches', 'item_batches.item_id', '=', 'item_units.item_id')
      .where('item_batches.clinic_id', clinicId)
      .sum('item_units.price as total')
  }
}
