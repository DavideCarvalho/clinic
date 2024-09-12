import { column } from '@adonisjs/lucid/orm'
import BaseUUIDModel from './utils/base_uuid_model.js'

export default class ItemSupplier extends BaseUUIDModel {
  @column()
  declare name: string

  @column()
  declare responsibleEmail: string
}
