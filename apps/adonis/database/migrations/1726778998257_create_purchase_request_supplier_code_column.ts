import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'purchase_requests'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('supplier_code').nullable()
      table.datetime('supplier_code_expires_at').nullable()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('supplier_code')
      table.dropColumn('supplier_code_expires_at')
    })
  }
}
