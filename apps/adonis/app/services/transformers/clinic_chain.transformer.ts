import { inject } from '@adonisjs/core'
import ClinicChain from '../../models/clinic_chain.js'
import { ClinicChainDTO } from '../../controllers/dto/clinic_chain.dto.js'

@inject()
export class ClinicChainTransformer {
  constructor() {}

  public toJSON(clinicChain: ClinicChain): ClinicChainDTO {
    return {
      id: clinicChain.id,
      name: clinicChain.name,
      createdAt: clinicChain.createdAt.toISO()!,
      updatedAt: clinicChain.updatedAt.toISO()!,
    }
  }
}
