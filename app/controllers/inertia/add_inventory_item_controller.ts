import Item from '#models/item'
import ItemCategory from '#models/item_category'
import { HttpContext } from '@adonisjs/core/http'

export default class AddInventoryItemController {
  async handle(ctx: HttpContext) {
    const user = await ctx.auth.user
    const page = ctx.request.qs().page ? Number(ctx.request.qs().page) : 1
    const limit = ctx.request.qs().limit ? Number(ctx.request.qs().limit) : 10
    return ctx.inertia.render('inventario/novo_item', {
      items: async () =>
        await Item.itemsWithMostTransactionsWithinLast12Months(user!.clinicId, {
          page,
          limit,
        }),
      categories: async () =>
        await ItemCategory.findManyBy({
          clinicId: user!.clinicId,
        }),
    })
  }
}
