import PurchaseRequest from '../../models/purchase_request.js'
import { HttpContext } from '@adonisjs/core/http'

export default class PurchaseRequestsController {
  async handle(ctx: HttpContext) {
    const user = await ctx.auth.user
    return ctx.inertia.render('solicitacoes_de_compra/solicitacoes_de_compra', {
      purchaseRequests: async () => {
        const purchaseRequests = await PurchaseRequest.query()
          .where('clinicId', user!.clinicId)
          .preload('purchaseRequestItems', (purchaseRequestItemsQuery) => {
            purchaseRequestItemsQuery.preload('item')
          })
          .preload('itemSupplier')
        return purchaseRequests.map((purchaseRequests) => purchaseRequests.toJSON())
      },
    })
  }
}
