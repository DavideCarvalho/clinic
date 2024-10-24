import User from '../models/user.js'
import { createUserValidator } from '../validators/user.js'
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
