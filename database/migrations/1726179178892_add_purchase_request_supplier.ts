import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'purchase_requests'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('item_supplier_id').references('item_suppliers.id')
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('item_supplier_id')
    })
  }
}
