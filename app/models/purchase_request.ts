import { belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Clinic from '#models/clinic'
import BaseUUIDModel from '#models/utils/base_uuid_model'
import ItemSupplier from './item_supplier.js'
import PurchaseRequestItem from './purchase_request_item.js'
import { DateTime } from 'luxon'

export default class PurchaseRequest extends BaseUUIDModel {
  @column()
  declare itemId: string

  @column()
  declare clinicId: string

  // WAITING_SUPPLIER_INVOICE | WAITING_CLINIC_INVOICE_APPROVAL | WAITING_SUPPLIER_SEND | WAITING_ARRIVAL | ARRIVED
  @column()
  declare status: string

  @column()
  declare itemSupplierId: string

  @column()
  declare invoiceFilePath: string | null

  @column.dateTime()
  declare receivedAt: DateTime | null

  @belongsTo(() => Clinic)
  declare clinic: BelongsTo<typeof Clinic>

  @belongsTo(() => ItemSupplier)
  declare itemSupplier: BelongsTo<typeof ItemSupplier>

  @hasMany(() => PurchaseRequestItem)
  declare purchaseRequestItems: HasMany<typeof PurchaseRequestItem>
}
