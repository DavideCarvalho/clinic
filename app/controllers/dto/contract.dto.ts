import { UserDTO } from './user.dto.js'

export class ContractDTO {
  declare id: string
  declare startDate: string
  declare endDate: string
  declare status: string
  declare description: string
  declare clinicId: string
  declare clientId: string
  declare createdById: string
  declare updatedById: string
  declare createdAt: string
  declare updatedAt: string
  declare client: UserDTO
}
