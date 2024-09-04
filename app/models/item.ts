import { belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import BaseUUIDModel from './utils/base_uuid_model.js'
import ItemCategory from './item_category.js'

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
}
