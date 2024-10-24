import { ClinicDTO } from './clinic.dto.js'

export class ItemSupplierDTO {
  declare id: string
  declare name: string
  declare responsibleEmail: string
  declare clinicId: string
  declare clinic: ClinicDTO
  declare createdAt: string
  declare updatedAt: string
}
