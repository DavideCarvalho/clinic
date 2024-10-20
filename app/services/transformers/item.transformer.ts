import { inject } from '@adonisjs/core'
import Item from '#models/item'
import { ItemDTO } from '#controllers/dto/item.dto'
import { ItemCategoryTransformer } from './item_category.transformer.js'
import { UserTransformer } from './user.transformer.js'

@inject()
export class ItemTransformer {
  constructor(
    private readonly itemCategoryTransformer: ItemCategoryTransformer,
    private readonly userTransformer: UserTransformer
  ) {}

  public toJSON(item: Item): ItemDTO {
    return {
      id: item.id,
      name: item.name,
      quantity: item.quantity,
      minimumQuantity: item.minimumQuantity,
      itemCategoryId: item.itemCategoryId,
      itemCategory: this.itemCategoryTransformer.toJSON(item.itemCategory),
      createdById: item.createdById,
      updatedById: item.updatedById,
      createdAt: item.createdAt.toISO()!,
      updatedAt: item.updatedAt.toISO()!,
      createdBy: this.userTransformer.toJSON(item.createdBy),
      updatedBy: this.userTransformer.toJSON(item.updatedBy),
    }
  }
}
