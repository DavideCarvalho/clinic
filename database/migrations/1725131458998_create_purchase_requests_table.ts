import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'purchase_requests'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').notNullable().primary()

      table.string('item_id').notNullable()
      table.integer('quantity_needed').notNullable()
      table.integer('quantity_bought').nullable()
      table.integer('bought_unitary_value').nullable()

      table.string('clinic_id').notNullable()
      table.string('created_by_id').notNullable()
      table.string('updated_by_id').notNullable()
      table.string('bought_by_id').nullable()

      table.foreign('item_id').references('items.id')
      table.foreign('clinic_id').references('clinics.id')
      table.foreign('created_by_id').references('users.id')
      table.foreign('updated_by_id').references('users.id')
      table.foreign('bought_by_id').references('users.id')

      table.timestamps(true, true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
