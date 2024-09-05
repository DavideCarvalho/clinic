import { belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import db from '@adonisjs/lucid/services/db'
import BaseUUIDModel from '#models/utils/base_uuid_model'
import ItemBatch from '#models/item_batch'

export default class ItemUnit extends BaseUUIDModel {
  @column()
  declare price: number

  // AVAILABLE | RESERVED | USED
  @column()
  declare status: string

  @column()
  declare itemBatchId: string

  @belongsTo(() => ItemBatch)
  declare itemBatch: BelongsTo<typeof ItemBatch>

  public static async calculateInventoryValue(clinicId: string): Promise<number> {
    const [response]: [[{ total: string }]] = await db.rawQuery(
      `
      SELECT
        SUM(purchase_requests.bought_unitary_value) as total
      FROM
        item_units
      INNER JOIN
        item_batches ON item_batches.id = item_units.item_batch_id
      INNER JOIN
        purchase_requests ON purchase_requests.id = item_batches.purchase_request_id
      WHERE
        purchase_requests.clinic_id = ?
      `,
      [clinicId]
    )
    return Number(response[0].total)
  }

  public static async availableUnits(clinicId: string): Promise<number> {
    const [response]: [[{ total: string }]] = await db.rawQuery(
      `
      SELECT
        COUNT(*) as total
      FROM
        item_units
      INNER JOIN
        item_batches ON item_batches.id = item_units.item_batch_id
      INNER JOIN
        purchase_requests ON purchase_requests.id = item_batches.purchase_request_id
      WHERE
        purchase_requests.clinic_id = ?
      AND
        purchase_requests.bought_unitary_value IS NOT NULL
      AND
        item_units.status = 'AVAILABLE'
      `,
      [clinicId]
    )
    return Number(response[0].total)
  }

  public static async availableCategories(clinicId: string): Promise<number> {
    const [response]: [[{ total: string }]] = await db.rawQuery(
      `
      SELECT
        COUNT(item_categories.id) as total
      FROM
        item_units
      INNER JOIN
        item_batches ON item_batches.id = item_units.item_batch_id
      INNER JOIN
        purchase_requests ON purchase_requests.id = item_batches.purchase_request_id
      INNER JOIN
        items ON items.id = item_batches.item_id
      INNER JOIN
        item_categories ON item_categories.id = items.item_category_id
      WHERE
        purchase_requests.clinic_id = ?
      AND
        purchase_requests.bought_unitary_value IS NOT NULL
      AND
        item_units.status = 'AVAILABLE'
      `,
      [clinicId]
    )
    return Number(response[0].total)
  }
}
