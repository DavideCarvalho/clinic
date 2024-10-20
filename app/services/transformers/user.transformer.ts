import { UserDTO } from '#controllers/dto/user.dto'
import User from '#models/user'
import { inject } from '@adonisjs/core'

@inject()
export class UserTransformer {
  public toJSON(user: User): UserDTO {
    return {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      address: user.address,
      city: user.city,
      state: user.state,
      zip: user.zip,
      clinicId: user.clinicId,
      createdAt: user.createdAt.toISO()!,
      updatedAt: user.updatedAt.toISO()!,
    }
  }
}
