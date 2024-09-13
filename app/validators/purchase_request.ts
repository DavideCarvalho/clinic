import vine from '@vinejs/vine'

export const clinicReceivedPurchaeRequestValidator = vine.compile(
  vine.object({
    arrivalDate: vine.date(),
    file: vine.string().minLength(1).optional(),
  })
)
