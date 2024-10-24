import { ItemCategoryDTO } from '../dto/item_category.dto.js'
import Item from '../../models/item.js'
import ItemCategory from '../../models/item_category.js'
import { ItemCategoryTransformer } from '../../services/transformers/item_category.transformer.js'
import { HttpContext } from '@adonisjs/core/http'

export default class AddInventoryItemController {
  constructor(private readonly temCategoryTransformer: ItemCategoryTransformer) {}

  async handle(ctx: HttpContext) {
    const user = await ctx.auth.user
    const page = ctx.request.qs().page ? Number(ctx.request.qs().page) : 1
    const limit = ctx.request.qs().limit ? Number(ctx.request.qs().limit) : 10
    return ctx.inertia.render<AddInventoryItemControllerResponse>('inventario/novo_item', {
      items: () =>
        Item.itemsWithMostTransactionsWithinLast12Months(user!.clinicId, {
          page,
          limit,
        }),
      categories: async () => {
        const categories = await ItemCategory.findManyBy({
          clinicId: user!.clinicId,
        })
        return categories.map((category) => this.temCategoryTransformer.toJSON(category))
      },
    })
  }
}

export interface AddInventoryItemControllerResponse {
  items: () => Promise<
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
  >
  categories: () => Promise<ItemCategoryDTO[]>
}
