import { DateTime } from 'luxon'
import vine from '@vinejs/vine'

export const createContractValidator = vine.compile(
  vine.object({
    clientEmail: vine.string().email(),
    startDate: vine.string().transform((value) => DateTime.fromJSDate(new Date(value))),
    endDate: vine.string().transform((value) => DateTime.fromJSDate(new Date(value))),
    files: vine.array(vine.string()),
  })
)
