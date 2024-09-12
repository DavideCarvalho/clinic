import { belongsTo, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import Clinic from '#models/clinic'
import BaseUUIDModel from '#models/utils/base_uuid_model'
import Item from './item.js'
import ItemSupplier from './supplier.js'
import PurchaseRequestItem from './purchase_request_item.js'

export default class PurchaseRequest extends BaseUUIDModel {
  @column()
  declare itemId: string

  @column()
  declare clinicId: number

  // PENDING | WAITING_SUPPLIER_SUBMISSION | WAITING_CLINIC_APPROVAL | WAITING_SUPPLIER_SEND | WAITING_ARRIVAL | ARRIVED
  @column()
  declare status: string

  @column()
  declare itemSupplierId: string

  @column()
  declare boughtById: number | null

  @belongsTo(() => Clinic)
  declare clinic: BelongsTo<typeof Clinic>

  @belongsTo(() => ItemSupplier)
  declare itemSupplier: BelongsTo<typeof ItemSupplier>

  @hasMany(() => PurchaseRequestItem)
  declare purchaseRequestItems: HasMany<typeof PurchaseRequestItem>
}
