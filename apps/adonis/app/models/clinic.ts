import { belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import Contract from './contract.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import ClinicChain from './clinic_chain.js'
import BaseUUIDModel from './utils/base_uuid_model.js'

export default class Clinic extends BaseUUIDModel {
  @column()
  declare name: string

  @column()
  declare email: string

  @column()
  declare clinicChainId: string

  @belongsTo(() => ClinicChain)
  declare clinicChain: BelongsTo<typeof ClinicChain>

  @hasMany(() => Contract)
  declare contracts: HasMany<typeof Contract>

  @hasMany(() => User)
  declare users: HasMany<typeof User>
}
