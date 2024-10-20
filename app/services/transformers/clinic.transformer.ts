import { inject } from '@adonisjs/core'
import Clinic from '#models/clinic'
import { ClinicDTO } from '#controllers/dto/clinic.dto'
import { ClinicChainTransformer } from './clinic_chain.transformer.js'

@inject()
export class ClinicTransformer {
  constructor(private clinicChainTransformer: ClinicChainTransformer) {}

  public toJSON(clinic: Clinic): ClinicDTO {
    return {
      id: clinic.id,
      name: clinic.name,
      email: clinic.email,
      clinicChain: this.clinicChainTransformer.toJSON(clinic.clinicChain),
      createdAt: clinic.createdAt.toISO()!,
      updatedAt: clinic.updatedAt.toISO()!,
    }
  }
}
