import { column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import BaseUUIDModel from './utils/base_uuid_model.js'
import Item from '#models/item'
import db from '@adonisjs/lucid/services/db'
import { RawQueryResponse } from './utils/raw-query-response.js'

export default class ItemCategory extends BaseUUIDModel {
  @column()
  declare name: string

  @column()
  declare description: string

  @column()
  declare clinicId: string

  @hasMany(() => Item)
  declare items: HasMany<typeof Item>

  public static async categoriesQuantity(clinicId: string): Promise<number> {
    const [response] = await db.rawQuery<RawQueryResponse<{ total: string }>>(
      `
      SELECT
        COUNT(*) as total
      FROM
        ${this.table}
      WHERE
        ${this.$getColumn('clinicId')?.columnName} = ?
      `,
      [clinicId]
    )
    return Number(response?.[0]?.total ?? 0)
  }
}
