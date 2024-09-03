import User from '#models/user'
import { createUserValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  /**
   * @createUser
   * @requestBody <createUserValidator>
   */
  async createUser({ request }: HttpContext) {
    const payload = await request.validateUsing(createUserValidator)
    return User.create(payload)
  }
}
