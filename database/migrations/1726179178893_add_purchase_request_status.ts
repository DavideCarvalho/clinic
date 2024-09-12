import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'purchase_requests'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('status').notNullable().defaultTo('WAITING_SUPPLIER_SUBMISSION')
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('status')
    })
  }
}
