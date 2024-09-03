import { belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Clinic from '#models/clinic'
import BaseUUIDModel from '#models/utils/base_uuid_model'

export default class PurchaseRequest extends BaseUUIDModel {
  @column()
  declare quantityNeeded: number

  @column()
  declare quantityBought: number | null

  @column()
  declare boughtUnitaryValue: number | null

  @column()
  declare itemId: string

  @column()
  declare clinicId: number

  @column()
  declare boughtById: number | null

  @belongsTo(() => Clinic)
  declare clinic: BelongsTo<typeof Clinic>
}
