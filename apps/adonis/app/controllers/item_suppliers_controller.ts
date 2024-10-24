import ItemSupplier from '../models/item_supplier.js'
import type { HttpContext } from '@adonisjs/core/http'

export default class ItemSuppliersController {
  public async getClinicSuppliers({ auth }: HttpContext) {
    return ItemSupplier.query().where('clinicId', auth.user!.clinicId)
  }
}
