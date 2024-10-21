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
        const itemsWithQuantityAndInventoryValue = await Promise.all(
          items.map(async (item) => {
            const foundItem = await Item.query()
              .where('id', item.id)
              .preload('itemCategory')
              .preload('createdBy')
              .preload('updatedBy')
              .preload('purchaseRequestItems')
              .firstOrFail()

            return {
              ...this.itemTransformer.toJSON(foundItem),
              quantity: Number(item.quantity),
              inventoryValue: Number(item.inventoryValue),
            }
          }) as Promise<ItemDTO & { quantity: number; inventoryValue: number }>[]
        )
        return itemsWithQuantityAndInventoryValue
      },
    })
  }
}

export interface InventoryControllerResponse {
  items: () => Promise<(ItemDTO & { quantity: number; inventoryValue: number })[]>
}
