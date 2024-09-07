import { belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import BaseUUIDModel from './utils/base_uuid_model.js'
import ItemCategory from './item_category.js'
import db from '@adonisjs/lucid/services/db'
import ItemUnit from './item_unit.js'
import ItemBatch from './item_batch.js'
import { RawQueryResponse } from './utils/raw-query-response.js'
import ItemTransaction from './item_transaction.js'

export default class Item extends BaseUUIDModel {
  @column()
  declare name: string

  @column()
  declare quantity: number

  @column()
  declare minimumQuantity: number

  @column()
  declare itemCategoryId: string

  @belongsTo(() => ItemCategory)
  declare itemCategory: BelongsTo<typeof ItemCategory>

  public static async getClinicItems(clinicId: string): Promise<
    {
      id: string
      name: string
      quantity: number
      clinicId: string
      minimumQuantity: number
      itemCategoryId: string
      createdById: string
      updatedById: string
      createdAt: string
      updatedAt: string
      itemCategoryName: string
    }[]
  > {
    // TODO: Contar apenas os itens que estão disponíveis
    // TODO: No ItemUnit
    const [response]: [
      {
        id: string
        name: string
        quantity: number
        clinic_id: string
        minimum_quantity: number
        item_category_id: string
        created_by_id: string
        updated_by_id: string
        created_at: string
        updated_at: string
        item_category_name: string
        inventory_value: string
      }[],
    ] = await db.rawQuery(
      `
      SELECT
        ${this.table}.*,
        ${ItemCategory.table}.${ItemCategory.$getColumn('name')!.columnName} AS item_category_name,
        COUNT(${ItemUnit.table}.${ItemUnit.$getColumn('id')!.columnName}) AS quantity,
        SUM(${ItemUnit.table}.${ItemUnit.$getColumn('price')!.columnName}) AS inventory_value
      FROM
        ${this.table}
      INNER JOIN
        ${ItemCategory.table} ON ${ItemCategory.table}.${ItemCategory.$getColumn('id')!.columnName} = ${this.table}.${this.$getColumn('itemCategoryId')!.columnName}
      LEFT JOIN
        ${ItemBatch.table} ON ${ItemBatch.table}.${ItemBatch.$getColumn('itemId')!.columnName} = ${this.table}.${this.$getColumn('id')!.columnName}
      LEFT JOIN
        ${ItemUnit.table} ON ${ItemUnit.table}.${ItemUnit.$getColumn('itemBatchId')!.columnName} = ${ItemBatch.table}.${ItemBatch.$getColumn('id')!.columnName}
      WHERE
        ${ItemCategory.table}.${ItemCategory.$getColumn('clinicId')!.columnName} = ?
      GROUP BY
        ${this.table}.${this.$getColumn('id')!.columnName},
        ${ItemCategory.table}.${ItemCategory.$getColumn('name')!.columnName}
      ORDER BY
        ${this.table}.${this.$getColumn('name')!.columnName}
    `,
      [clinicId]
    )
    return response.map((item) => ({
      id: item.id,
      name: item.name,
      quantity: item.quantity,
      clinicId: item.clinic_id,
      minimumQuantity: item.minimum_quantity,
      itemCategoryId: item.item_category_id,
      createdById: item.created_by_id,
      updatedById: item.updated_by_id,
      createdAt: item.created_at,
      updatedAt: item.updated_at,
      itemCategoryName: item.item_category_name,
      inventoryValue: item.inventory_value,
    }))
  }

  public static async itemsNeedingReplacement(
    clinicId: string,
    { page = 1, limit = 10 }: { page?: number; limit?: number }
  ) {
    const data = await this.query()
      .join(
        ItemCategory.table,
        `${ItemCategory.table}.${ItemCategory.$getColumn('id')!.columnName}`,
        '=',
        this.$getColumn('itemCategoryId')!.columnName
      )
      .where(`${ItemCategory.table}.${ItemCategory.$getColumn('clinicId')!.columnName}`, clinicId)
      .whereRaw('?? < ??', [
        this.$getColumn('quantity')!.columnName,
        this.$getColumn('minimumQuantity')!.columnName,
      ])
      .orderByRaw('(??  / ??)', [
        this.$getColumn('quantity')!.columnName,
        this.$getColumn('minimumQuantity')!.columnName,
      ])
      .preload('itemCategory')
      .paginate(page, limit)
    return data.toJSON()
  }

  public static async itemsWithMostTransactionsWithinLast12Months(
    clinicId: string,
    { page = 1, limit = 10 }: { page?: number; limit?: number }
  ): Promise<
    {
      id: string
      name: string
      quantity: number
      clinicId: string
      minimumQuantity: number
      itemCategoryId: string
      createdById: string
      updatedById: string
      createdAt: Date
      updatedAt: Date
      total: number
      ammountOut: number
    }[]
  > {
    const [response] = await db.rawQuery<
      RawQueryResponse<{
        id: string
        name: string
        quantity: number
        clinic_id: string
        minimum_quantity: number
        item_category_id: string
        created_by_id: string
        updated_by_id: string
        created_at: Date
        updated_at: Date
        total: number
        ammount_out: number | null
      }>
    >(
      `
        SELECT
          ${this.table}.*,
          COUNT(${ItemUnit.table}.${this.$getColumn('id')!.columnName}) AS total,
          (
            SELECT
              SUM(${ItemTransaction.table}.${ItemTransaction.$getColumn('amount')!.columnName}) AS amount
            FROM
              ${ItemTransaction.table}
            WHERE
              ${ItemTransaction.table}.${ItemTransaction.$getColumn('itemId')!.columnName} = ${this.table}.${this.$getColumn('id')!.columnName}
            AND
              ${ItemTransaction.table}.${ItemTransaction.$getColumn('createdAt')!.columnName} >= DATE_SUB(NOW(), INTERVAL 12 MONTH)
            AND
              ${ItemTransaction.table}.${ItemTransaction.$getColumn('type')!.columnName} = 'OUT'
          ) as ammount_out
        FROM
          ${this.table}
        INNER JOIN
          ${ItemBatch.table} ON ${ItemBatch.table}.${ItemBatch.$getColumn('itemId')!.columnName} = ${this.table}.${this.$getColumn('id')!.columnName}
        INNER JOIN
          ${ItemUnit.table} ON ${ItemUnit.table}.${ItemUnit.$getColumn('itemBatchId')!.columnName} = ${ItemBatch.table}.${ItemBatch.$getColumn('id')!.columnName}
        INNER JOIN
          ${ItemCategory.table} ON ${ItemCategory.table}.${ItemCategory.$getColumn('id')!.columnName} = ${Item.table}.${Item.$getColumn('itemCategoryId')!.columnName}
        WHERE
          ${ItemCategory.table}.${ItemCategory.$getColumn('clinicId')!.columnName} = ?
        AND
          MONTH(${ItemUnit.table}.${ItemUnit.$getColumn('createdAt')!.columnName}) >= MONTH(DATE_SUB(NOW(), INTERVAL 12 MONTH))
        AND
          YEAR(${ItemUnit.table}.${ItemUnit.$getColumn('createdAt')!.columnName}) >= YEAR(DATE_SUB(NOW(), INTERVAL 12 MONTH))
        GROUP BY
          ${this.table}.${this.$getColumn('id')!.columnName}
        ORDER BY
          total DESC
        LIMIT
          ?
        OFFSET
          ?
      `,
      [clinicId, limit, limit * (page - 1)]
    )
    return response.map((item) => ({
      id: item.id,
      name: item.name,
      quantity: item.quantity,
      clinicId: item.clinic_id,
      minimumQuantity: item.minimum_quantity,
      itemCategoryId: item.item_category_id,
      createdById: item.created_by_id,
      updatedById: item.updated_by_id,
      createdAt: item.created_at,
      updatedAt: item.updated_at,
      total: item.total,
      ammountOut: Number(item.ammount_out) ?? 0,
    }))
  }
}
