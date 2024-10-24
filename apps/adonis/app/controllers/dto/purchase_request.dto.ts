import { ClinicDTO } from './clinic.dto.js'
import { ItemSupplierDTO } from './item_supplier.dto.js'

export class PurchaseRequestDTO {
  declare id: string
  declare itemId: string
  declare clinicId: string
  declare status: PurchaseRequestDTOStatus
  declare itemSupplierId: string
  declare invoiceFilePath: string | null
  declare receivedAt: string | null
  declare createdAt: string
  declare updatedAt: string
  declare clinic: ClinicDTO
  declare itemSupplier: ItemSupplierDTO
}

export type PurchaseRequestDTOStatus =
  | 'WAITING_SUPPLIER_INVOICE'
  | 'WAITING_CLINIC_INVOICE_APPROVAL'
  | 'WAITING_SUPPLIER_SEND'
  | 'WAITING_ARRIVAL'
  | 'ARRIVED'
