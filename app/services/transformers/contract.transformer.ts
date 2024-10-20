import { ContractDTO } from '#controllers/dto/contract.dto'
import Contract from '#models/contract'
import { inject } from '@adonisjs/core'
import { UserTransformer } from './user.transformer.js'

@inject()
export class ContractTransformer {
  constructor(private readonly userTransformer: UserTransformer) {}

  public toJSON(contract: Contract): ContractDTO {
    return {
      id: contract.id,
      startDate: contract.startDate.toISO()!,
      endDate: contract.endDate.toISO()!,
      status: contract.status,
      description: contract.description,
      clinicId: contract.clinicId,
      clientId: contract.clientId,
      createdById: contract.createdById,
      updatedById: contract.updatedById,
      createdAt: contract.createdAt.toISO()!,
      updatedAt: contract.updatedAt.toISO()!,
      client: this.userTransformer.toJSON(contract.client),
    }
  }
}
