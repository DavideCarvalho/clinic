import vine from '@vinejs/vine'

export const createItemValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(1),
    quantity: vine.number().min(0),
  })
)

export const changeItemQuantityValidator = vine.compile(
  vine.object({
    params: vine.object({
      id: vine.number(),
    }),
    quantity: vine.number().min(0),
  })
)
