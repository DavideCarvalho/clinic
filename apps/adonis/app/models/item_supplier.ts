import { belongsTo, column } from '@adonisjs/lucid/orm'
import BaseUUIDModel from './utils/base_uuid_model.js'
import Clinic from './clinic.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class ItemSupplier extends BaseUUIDModel {
  @column()
  declare name: string

  @column()
  declare responsibleEmail: string

  @column()
  declare clinicId: string

  @belongsTo(() => Clinic)
  declare clinic: BelongsTo<typeof Clinic>
}
