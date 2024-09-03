import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'item_transactions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary().notNullable()
      table.string('item_id').notNullable()
      table.string('type').notNullable()
      table.integer('amount').notNullable()
      table.integer('from').notNullable()
      table.integer('to').notNullable()
      table.string('created_by_id').notNullable()
      table.string('updated_by_id').notNullable()
      table.timestamps(true, true)

      table.foreign('item_id').references('items.id')
      table.foreign('created_by_id').references('users.id')
      table.foreign('updated_by_id').references('users.id')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
