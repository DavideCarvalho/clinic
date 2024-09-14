import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'purchase_requests'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('invoice_file_path').nullable()
      table.dateTime('received_at').nullable()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('invoice_file_path')
      table.dropColumn('received_at')
    })
  }
}
