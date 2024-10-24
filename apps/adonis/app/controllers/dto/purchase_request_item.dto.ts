import { ItemDTO } from './item.dto.js'
import { PurchaseRequestDTO } from './purchase_request.dto.js'

export class PurchaseRequestItemDTO {
  declare id: string
  declare quantityNeeded: number
  declare quantityBought: number | null
  declare unitaryValue: number | null
  declare status: string
  declare purchaseRequestId: string
  declare itemId: string
  declare item: ItemDTO
  declare purchaseRequest: PurchaseRequestDTO
  declare createdAt: string
  declare updatedAt: string
}
