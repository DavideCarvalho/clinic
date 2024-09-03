import { column } from '@adonisjs/lucid/orm'
import BaseUUIDModel from './utils/base_uuid_model.js'

export default class ClinicChain extends BaseUUIDModel {
  @column()
  declare name: string
}
