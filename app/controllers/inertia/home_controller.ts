import { ContractDTO } from '#controllers/dto/contract.dto'
import { Paginated } from '#controllers/dto/paginated.dto'
import { Propsify } from '#controllers/utils/propsify'
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
      contracts: () => contractsService.getContractsPaginated(user.clinicId, page, limit),
      contractsCreatedInLast12Months: () =>
        contractsService.getContractsCreatedInLast12Months(user.clinicId),
      inventoryValue: () => ItemUnit.calculateInventoryValue(user.clinicId),
      inventoryQuantity: async () => ({
        itemsQuantity: await ItemUnit.availableUnits(user.clinicId),
        categoriesQuantity: await ItemUnit.availableCategories(user.clinicId),
      }),
      itemsNeedingReplacement: () => Item.itemsNeedingReplacement(user.clinicId, { page, limit }),
    })
  }
}

export interface HomeControllerResponse {
  inventoryValue: () => Promise<number>
  contractsQuantityEndingIn30Days: () => Promise<{ ammount: number }>
  activeContractsQuantity: () => Promise<{ ammount: number }>
  inventoryQuantity: () => Promise<{ itemsQuantity: number; categoriesQuantity: number }>
  contracts: () => Promise<Paginated<ContractDTO>>
  contractsCreatedInLast12Months: () => Promise<{ year: number; month: number; count: number }[]>
  itemsNeedingReplacement: () => Promise<{
    meta: any
    data: any[]
  }>
}
