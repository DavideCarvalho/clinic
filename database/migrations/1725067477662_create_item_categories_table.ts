import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'item_categories'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary().notNullable()
      table.string('name').notNullable()
      table.string('clinic_id').notNullable()
      table.string('created_by_id').notNullable()
      table.string('updated_by_id').notNullable()
      table.timestamps(true, true)

      table.foreign('clinic_id').references('clinics.id')
      table.foreign('created_by_id').references('users.id')
      table.foreign('updated_by_id').references('users.id')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
