import { ItemCategoryDTO } from '#controllers/dto/item_category.dto'
import Item from '#models/item'
import ItemCategory from '#models/item_category'
import { ItemCategoryTransformer } from '#services/transformers/item_category.transformer'
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

interface AddInventoryItemControllerResponse {
  items: () => Promise<Item[]>
  categories: () => Promise<ItemCategoryDTO[]>
}
