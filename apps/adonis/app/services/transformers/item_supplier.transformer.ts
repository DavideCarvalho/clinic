import { inject } from '@adonisjs/core'
import ItemSupplier from '../../models/item_supplier.js'
import { ClinicTransformer } from './clinic.transformer.js'
import { ItemSupplierDTO } from '../../controllers/dto/item_supplier.dto.js'

@inject()
export class ItemSupplierTransformer {
  constructor(private clinicTransformer: ClinicTransformer) {}

  public toJSON(itemSupplier: ItemSupplier): ItemSupplierDTO {
    return {
      id: itemSupplier.id,
      name: itemSupplier.name,
      responsibleEmail: itemSupplier.responsibleEmail,
      clinicId: itemSupplier.clinicId,
      clinic: this.clinicTransformer.toJSON(itemSupplier.clinic),
      createdAt: itemSupplier.createdAt.toISO()!,
      updatedAt: itemSupplier.updatedAt.toISO()!,
    }
  }
}
