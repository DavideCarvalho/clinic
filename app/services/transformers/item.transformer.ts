import { inject } from '@adonisjs/core'
import Item from '#models/item'
import { ItemDTO } from '#controllers/dto/item.dto'
import { ItemCategoryTransformer } from './item_category.transformer.js'
import { UserTransformer } from './user.transformer.js'
import ItemCategory from '#models/item_category'

@inject()
export class ItemTransformer {
  constructor(
    private readonly itemCategoryTransformer: ItemCategoryTransformer,
    private readonly userTransformer: UserTransformer
  ) {}

  public async toJSON(item: Item): Promise<ItemDTO> {
    const itemCategory = item.itemCategory
      ? item.itemCategory
      : await ItemCategory.findOrFail(item.itemCategoryId)
    return {
      id: item.id,
      name: item.name,
      quantity: item.quantity,
      minimumQuantity: item.minimumQuantity,
      itemCategoryId: item.itemCategoryId,
      itemCategory: this.itemCategoryTransformer.toJSON(itemCategory),
      createdById: item.createdById,
      updatedById: item.updatedById,
      createdAt: item.createdAt.toISO()!,
      updatedAt: item.updatedAt.toISO()!,
      createdBy: this.userTransformer.toJSON(item.createdBy),
      updatedBy: this.userTransformer.toJSON(item.updatedBy),
    }
  }
}
