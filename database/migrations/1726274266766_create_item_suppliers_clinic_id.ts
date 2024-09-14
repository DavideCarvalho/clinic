import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'item_suppliers'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('clinic_id').references('clinics.id')
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('clinic_id')
    })
  }
}
