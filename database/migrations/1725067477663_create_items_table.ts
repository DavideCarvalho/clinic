import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'items'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary().notNullable()
      table.string('name').notNullable()
      table.integer('quantity').notNullable()
      table.string('clinic_id').notNullable()
      table.integer('minimum_quantity').unsigned().notNullable().defaultTo(0)
      table.string('item_category_id').notNullable()
      table.string('created_by_id').notNullable()
      table.string('updated_by_id').notNullable()
      table.timestamps(true, true)

      table.foreign('clinic_id').references('clinics.id')
      table.foreign('created_by_id').references('users.id')
      table.foreign('updated_by_id').references('users.id')
      table.foreign('item_category_id').references('item_categories.id')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
