import Item from '#models/item'
import ItemUnit from '#models/item_unit'
import ContractsService from '#services/contracts.service'
import { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'

export default class HomeController {
  async handle(ctx: HttpContext) {
    const user = await ctx.auth.user
    if (!user) {
      return ctx.inertia.render('login') as any
    }
    const queryString = ctx.request.qs()
    const page = queryString.page ?? 1
    const limit = queryString.limit ?? 10
    // TODO: Injetar sem usar app.container.make
    const contractsService = await app.container.make(ContractsService)
    return ctx.inertia.render<HomeControllerResponse>('home', {
      contractsQuantityEndingIn30Days: async () => ({
        ammount: await contractsService.getContractsQuantityEndingIn30Days(user.clinicId),
      }),
      activeContractsQuantity: async () => ({
        ammount: await contractsService.getActiveContractsQuantity(user.clinicId),
      }),
      contracts: async () => ({
        data: await contractsService.getContractsPaginated(user.clinicId, page, limit),
      }),
      contractsCreatedInLast12Months: async () => ({
        data: await contractsService.getContractsCreatedInLast12Months(user.clinicId),
      }),
      inventoryValue: () => ItemUnit.calculateInventoryValue(user.clinicId),
      inventoryQuantity: async () => ({
        itemsQuantity: await ItemUnit.availableUnits(user.clinicId),
        categoriesQuantity: await ItemUnit.availableCategories(user.clinicId),
      }),
      itemsNeedingReplacement: () => Item.itemsNeedingReplacement(user.clinicId, { page, limit }),
    })
  }
}

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T

type SimplifyControllerResponse<T> = {
  [K in keyof T]: T[K] extends () => Promise<infer R>
    ? UnwrapPromise<R>
    : T[K] extends () => infer R
      ? R
      : T[K]
}

export interface HomeControllerResponse {
  inventoryValue: () => Promise<number>
  inventoryQuantity: any
  itemsNeedingReplacement: () => Promise<{
    meta: any
    data: any[]
  }>
}

export type HomePageProps = SimplifyControllerResponse<HomeControllerResponse>
