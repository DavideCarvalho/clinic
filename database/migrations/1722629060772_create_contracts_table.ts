import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'contracts'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary().notNullable()
      table.dateTime('start_date').notNullable()
      table.dateTime('end_date').notNullable()
      table.string('status').notNullable()
      table.string('description').notNullable()

      table.string('clinic_id').notNullable()
      table.string('client_id').notNullable()
      table.string('created_by_id').notNullable()
      table.string('updated_by_id').notNullable()

      table.foreign('clinic_id').references('clinics.id')
      table.foreign('client_id').references('users.id')
      table.foreign('created_by_id').references('users.id')
      table.foreign('updated_by_id').references('users.id')

      table.timestamps(true, true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
