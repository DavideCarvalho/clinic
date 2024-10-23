import { ItemDTO } from '#controllers/dto/item.dto'
import Item from '#models/item'
import { ItemTransformer } from '#services/transformers/item.transformer'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class InventoryController {
  constructor(private readonly itemTransformer: ItemTransformer) {}

  async handle(ctx: HttpContext) {
    const user = await ctx.auth.user
    return ctx.inertia.render<InventoryControllerResponse>('inventario/itens', {
      items: async () => {
        const items = await Item.getClinicItems(user!.clinicId)
        const itemsWithQuantityAndInventoryValue = await Promise.all(
          items.map(async (item) => {
            const foundItem = await Item.query().where('id', item.id).firstOrFail()
            const transformedItem = await this.itemTransformer.toJSON(foundItem)

            return {
              ...transformedItem,
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

type ItemDTOWithQuantityAndInventoryValue = ItemDTO & { quantity: number; inventoryValue: number }

export interface InventoryControllerResponse {
  items: () => Promise<ItemDTOWithQuantityAndInventoryValue[]>
}
