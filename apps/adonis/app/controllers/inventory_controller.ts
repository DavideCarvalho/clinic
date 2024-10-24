import Item from '../models/item.js'
import ItemTransaction from '../models/item_transaction.js'
import ItemUnit from '../models/item_unit.js'
import { createItemValidator, changeItemQuantityValidator } from '../validators/item.js'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'
import { InventoryValueResponse } from './dto/inventory_value.response.js'
import { InventoryQuantityResponse } from './dto/inventory_quantity.response.js'
import { GetItemsWithMostTransactionsWithinLast12MonthsResponse } from './dto/get_items_with_most_transactions_within_last_12_months.response.js'
import ItemCategory from '../models/item_category.js'
import { ItemTransformer } from '../services/transformers/item.transformer.js'

@inject()
export default class ItemsController {
  constructor(private readonly itemTransformer: ItemTransformer) {}

  /**
   *
   * @createItem
   * @requestBody <createItemValidator>
   */
  async createItem({ request, auth }: HttpContext) {
    const payload = await request.validateUsing(createItemValidator)
    return Item.create({
      name: payload.name,
      quantity: 0,
      minimumQuantity: payload.minimumQuantity,
      itemCategoryId: payload.itemCategoryId,
      createdById: auth.user!.id,
      updatedById: auth.user!.id,
    })
  }

  async decreaseItemQuantity({ request, auth }: HttpContext) {
    if (!auth.user) throw new Error('Unauthorized')
    const userClinic = auth.user.clinic
    const payload = await request.validateUsing(changeItemQuantityValidator)
    await db.transaction(async (trx) => {
      const item = await Item.query()
        .where('id', payload.params.id)
        .andWhere('clinicId', userClinic.id)
        .first()
      if (!item) throw new Error('Item not found')
      if (item.quantity <= 0) throw new Error('Item quantity must be greater than 0')
      trx.table(ItemTransaction.table).insert({
        itemId: item.id,
        type: 'DECREASE',
        amount: payload.quantity,
        createdById: userClinic.id,
        from: item.quantity,
        to: item.quantity - payload.quantity,
      })
      trx
        .from(Item.table)
        .where('id', payload.params.id)
        .andWhere('clinicId', userClinic.id)
        .decrement('quantity', payload.quantity)
    })
    return Item.find(payload.params.id)
  }

  async increaseItemQuantity({ request, auth }: HttpContext) {
    if (!auth.user) throw new Error('Unauthorized')
    const userClinic = auth.user.clinic
    const payload = await request.validateUsing(changeItemQuantityValidator)
    await db.transaction(async (trx) => {
      const item = await Item.query()
        .where('id', payload.params.id)
        .andWhere('clinicId', userClinic.id)
        .first()
      if (!item) throw new Error('Item not found')
      if (item.quantity <= 0) throw new Error('Item quantity must be greater than 0')
      trx.table(ItemTransaction.table).insert({
        itemId: item.id,
        type: 'INCREASE',
        amount: payload.quantity,
        createdById: userClinic.id,
        from: item.quantity,
        to: item.quantity - payload.quantity,
      })
      trx
        .from(Item.table)
        .where('id', payload.params.id)
        .andWhere('clinicId', userClinic.id)
        .decrement('quantity', payload.quantity)
    })
    return Item.find(payload.params.id)
  }

  async moreUtilizedItems({ request, auth }: HttpContext) {
    const userClinic = auth.user!.clinic
    const page = request.qs().page ? Number(request.qs().page) : 1
    const limit = request.qs().limit ? Number(request.qs().limit) : 10
    return await ItemTransaction.query()
      .join(
        'clinic_items',
        `${ItemTransaction.$getColumn('itemId')!.columnName}`,
        '=',
        `${Item.$getColumn('id')!.columnName}`
      )
      .groupBy(`${ItemTransaction.table}.id`)
      .where(`${Item.table}.clinic_id`, userClinic.id)
      .paginate(page, limit)
  }

  /**
   * @itemsNeedingReplacement
   */
  async itemsNeedingReplacement({ request, auth }: HttpContext) {
    const userClinic = auth.user!.clinic
    const page = request.qs().page ? Number(request.qs().page) : 1
    const limit = request.qs().limit ? Number(request.qs().limit) : 10
    return Item.itemsNeedingReplacement(userClinic.id, { page, limit })
  }

  /**
   * @inventoryValue
   *
   * @responseBody 200 - {"inventoryValue": number}
   */
  async inventoryValue({ auth }: HttpContext): Promise<InventoryValueResponse> {
    const userClinic = auth.user!.clinic
    const inventoryValue = await ItemUnit.calculateInventoryValue(userClinic.id)
    return {
      inventoryValue,
    }
  }

  /**
   * @inventoryQuantity
   *
   * @responseBody 200 - {"itemsQuantity": number, "categoriesQuantity": number}
   */

  async inventoryQuantity({ auth }: HttpContext): Promise<InventoryQuantityResponse> {
    const userClinic = auth.user!.clinic
    const [itemsQuantity, categoriesQuantity] = await Promise.all([
      ItemUnit.availableUnits(userClinic.id),
      ItemUnit.availableCategories(userClinic.id),
    ])
    return {
      itemsQuantity,
      categoriesQuantity,
    }
  }

  /**
   * @getClinicItems
   *
   * @responseBody 200 - [{"id": number, "name": string, "quantity": number, "clinicId": string, "minimumQuantity": number, "itemCategoryId": string, "createdById": number, "updatedById": number, "createdAt": string, "updatedAt": string}]
   */
  public async getClinicItems({ auth }: HttpContext) {
    const userClinic = auth.user!.clinic
    const items = await Item.getClinicItems(userClinic.id)
    return await Promise.all(items.map((item) => this.itemTransformer.toJSON(item)))
  }

  /**
   * @getItemsWithMostTransactionsWithinLast12Months
   *
   * @responseBody 200 - [{"id": number, "itemId": number, "type": string, "amount": number, "createdById": number, "updatedById": number, "createdAt": string, "updatedAt": string, "itemCategoryName": string}]
   */
  async getItemsWithMostTransactionsWithinLast12Months({
    request,
    auth,
  }: HttpContext): Promise<GetItemsWithMostTransactionsWithinLast12MonthsResponse> {
    const userClinic = auth.user!.clinic
    const page = request.qs().page ? Number(request.qs().page) : 1
    const limit = request.qs().limit ? Number(request.qs().limit) : 10
    return Item.itemsWithMostTransactionsWithinLast12Months(userClinic.id, {
      page,
      limit,
    })
  }

  async getCategories({ auth }: HttpContext) {
    const userClinic = auth.user!.clinic
    return ItemCategory.findManyBy({
      clinicId: userClinic.id,
    })
  }
}
