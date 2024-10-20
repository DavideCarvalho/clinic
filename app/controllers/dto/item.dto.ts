import { ItemCategoryDTO } from './item_category.dto.js'
import { UserDTO } from './user.dto.js'

export class ItemDTO {
  declare id: string
  declare name: string
  declare quantity: number
  declare minimumQuantity: number
  declare itemCategoryId: string
  declare itemCategory: ItemCategoryDTO
  declare createdById: string
  declare updatedById: string
  declare createdAt: string
  declare updatedAt: string
  declare createdBy: UserDTO
  declare updatedBy: UserDTO
}
