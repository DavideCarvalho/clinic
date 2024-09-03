import type { DateTime } from 'luxon'
import { belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import Item from './item.js'
import BaseUUIDModel from './utils/base_uuid_model.js'

export default class ItemTransaction extends BaseUUIDModel {
  @column()
  declare itemId: string

  // INCREASE | DECREASE
  @column()
  declare type: string

  @column()
  declare amount: number

  @column()
  declare from: number

  @column()
  declare to: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Item)
  declare item: BelongsTo<typeof Item>
}
