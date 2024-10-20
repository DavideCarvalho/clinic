import Item from '#models/item'
import { HttpContext } from '@adonisjs/core/http'

export default class AddInventoryItemController {
  async handle(ctx: HttpContext) {
    const user = await ctx.auth.user
    return ctx.inertia.render('inventario/itens', {
      items: async () => await Item.getClinicItems(user!.clinicId),
    })
  }
}
