import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'item_batches'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').notNullable().primary()
      table.string('item_id').notNullable()
      table.timestamps(true, true)

      table.string('purchase_request_id').notNullable()

      table.foreign('item_id').references('items.id')
      table.foreign('purchase_request_id').references('purchase_requests.id')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
