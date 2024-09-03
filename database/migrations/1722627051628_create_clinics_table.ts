import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'clinics'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary().notNullable()
      table.string('name').notNullable()
      table.string('email').unique().notNullable()
      table.string('clinic_chain_id').nullable()
      table.timestamps(true, true)

      table.foreign('clinic_chain_id').references('clinic_chains.id')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
