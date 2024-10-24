import type { DateTime } from 'luxon'
import { belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import Clinic from './clinic.js'
import BaseUUIDModel from './utils/base_uuid_model.js'

export default class Contract extends BaseUUIDModel {
  @column({ isPrimary: true })
  declare id: string

  @column.dateTime()
  declare startDate: DateTime

  @column.dateTime()
  declare endDate: DateTime

  @column()
  declare status: string

  @column()
  declare description: string

  @column()
  declare clinicId: string

  @column()
  declare clientId: string

  @belongsTo(() => Clinic)
  declare clinic: BelongsTo<typeof Clinic>

  @belongsTo(() => User, {
    foreignKey: 'clientId',
  })
  declare client: BelongsTo<typeof User>
}
