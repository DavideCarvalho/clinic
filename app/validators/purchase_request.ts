import vine from '@vinejs/vine'
import { DateTime } from 'luxon'

export const clinicReceivedPurchaseRequestValidator = vine.compile(
  vine.object({
    params: vine.object({
      purchaseRequestId: vine.string(),
    }),
    arrivalDate: vine.string().transform((value) => DateTime.fromJSDate(new Date(value))),
    invoice: vine.string().minLength(1).optional(),
    items: vine.array(
      vine.object({
        itemId: vine.string(),
        askedQuantity: vine.number(),
        receivedQuantity: vine.number(),
      })
    ),
  })
)

export const clinicUploadInvoiceValidator = vine.compile(
  vine.object({
    params: vine.object({
      purchaseRequestId: vine.string(),
    }),
    invoice: vine.string().minLength(1),
  })
)

export const newPurchaseRequestValidator = vine.compile(
  vine.object({
    supplier: vine.string().minLength(1).trim(),
    items: vine.array(
      vine.object({
        id: vine.string().minLength(1).trim(),
        quantidade: vine.number().min(1),
      })
    ),
  })
)

export const clinicDeletePurchaseRequestValidator = vine.compile(
  vine.object({
    params: vine.object({
      purchaseRequestId: vine.string(),
    }),
  })
)
