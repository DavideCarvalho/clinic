import { inject } from '@adonisjs/core'
import ItemCategory from '../../models/item_category.js'
import { ItemCategoryDTO } from '../../controllers/dto/item_category.dto.js'

@inject()
export class ItemCategoryTransformer {
  constructor() {}

  public toJSON(itemCategory: ItemCategory): ItemCategoryDTO {
    return {
      id: itemCategory.id,
      name: itemCategory.name,
      description: itemCategory.description,
      clinicId: itemCategory.clinicId,
      createdAt: itemCategory.createdAt.toISO()!,
      updatedAt: itemCategory.updatedAt.toISO()!,
    }
  }
}
