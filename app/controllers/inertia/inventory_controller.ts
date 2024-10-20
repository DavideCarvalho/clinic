import { ItemDTO } from '#controllers/dto/item.dto'
import Item from '#models/item'
import { ItemTransformer } from '#services/transformers/item.transformer'
import { HttpContext } from '@adonisjs/core/http'

export default class InventoryController {
  constructor(private readonly itemTransformer: ItemTransformer) {}

  async handle(ctx: HttpContext) {
    const user = await ctx.auth.user
    return ctx.inertia.render<InventoryControllerResponse>('inventario/itens', {
      items: async () => {
        const items = await Item.getClinicItems(user!.clinicId)
        return items.map((item) => {
          return {
            ...this.itemTransformer.toJSON(item),
            quantity: item.quantity,
            inventoryValue: item.inventoryValue,
          }
        })
      },
    })
  }
}

export interface InventoryControllerResponse {
  items: () => Promise<(ItemDTO & { quantity: number; inventoryValue: number })[]>
}
