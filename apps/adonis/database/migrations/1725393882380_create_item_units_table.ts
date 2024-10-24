import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'item_units'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').notNullable().primary()
      table.float('price').notNullable()
      table.string('status').notNullable()
      table.timestamps(true, true)

      table.string('item_batch_id').notNullable()

      table.foreign('item_batch_id').references('item_batches.id')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
