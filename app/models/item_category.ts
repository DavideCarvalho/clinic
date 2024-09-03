import { column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import BaseUUIDModel from './utils/base_uuid_model.js'
import Item from '#models/item'

export default class ItemCategory extends BaseUUIDModel {
  @column()
  declare name: string

  @column()
  declare description: string

  @column()
  declare clinicId: string

  @hasMany(() => Item)
  declare items: HasMany<typeof Item>
}
