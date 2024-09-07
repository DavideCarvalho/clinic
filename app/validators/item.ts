import vine from '@vinejs/vine'

export const createItemValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(1).trim(),
    minimumQuantity: vine.number().min(0),
    itemCategoryId: vine.string().uuid().trim(),
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
