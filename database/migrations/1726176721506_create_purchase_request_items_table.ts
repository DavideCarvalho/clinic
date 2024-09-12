import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'purchase_request_items'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary().notNullable()

      table.integer('quantity_needed').notNullable()
      table.integer('quantity_bought').nullable()
      table.integer('unitary_value').nullable()

      table.string('purchase_request_id').references('purchase_requests.id')
      table.string('item_id').references('items.id')
      table.unique(['purchase_request_id', 'item_id'])
      table.timestamps(true, true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
