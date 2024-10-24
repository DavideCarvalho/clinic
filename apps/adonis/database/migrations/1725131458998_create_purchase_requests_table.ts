import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'purchase_requests'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').notNullable().primary()

      table.string('clinic_id').notNullable()
      table.string('created_by_id').notNullable()
      table.string('updated_by_id').notNullable()

      table.foreign('item_id').references('items.id')
      table.foreign('clinic_id').references('clinics.id')
      table.foreign('created_by_id').references('users.id')
      table.foreign('updated_by_id').references('users.id')

      table.timestamps(true, true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}