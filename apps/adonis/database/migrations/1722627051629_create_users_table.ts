import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').notNullable().primary()
      table.string('full_name').nullable()
      table.string('email').notNullable().unique()
      table.string('password').notNullable()
      table.string('phone').nullable()
      table.string('address').nullable()
      table.string('city').nullable()
      table.string('state').nullable()
      table.string('zip').nullable()
      table.string('country').nullable()
      table.string('clinic_id').notNullable()
      table.foreign('clinic_id').references('clinics.id')

      table.timestamps(true, true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
