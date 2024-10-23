import { ClinicChainDTO } from './clinic_chain.dto.js'

export class ClinicDTO {
  declare id: string
  declare name: string
  declare email: string
  declare clinicChainId: string
  declare createdAt: string
  declare updatedAt: string
  declare clinicChain: ClinicChainDTO
}
