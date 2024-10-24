import { inject } from '@adonisjs/core'
import Item from '../../models/item.js'
import { ItemDTO } from '../../controllers/dto/item.dto.js'
import { ItemCategoryTransformer } from './item_category.transformer.js'
import { UserTransformer } from './user.transformer.js'
import ItemCategory from '../../models/item_category.js'
import User from '../../models/user.js'

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
    const createdBy = item.createdBy ? item.createdBy : await User.findOrFail(item.createdById)
    const updatedBy = item.updatedBy ? item.updatedBy : await User.findOrFail(item.updatedById)
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
      createdBy: this.userTransformer.toJSON(createdBy),
      updatedBy: this.userTransformer.toJSON(updatedBy),
    }
  }
}
