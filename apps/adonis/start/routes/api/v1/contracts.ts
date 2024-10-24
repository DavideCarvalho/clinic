import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const ContractsController = () => import('#controllers/contracts_controller')

router
  .group(() => {
    router.get('/', [ContractsController, 'getContractsPaginated']).as('getContracts')
    router.post('/', [ContractsController, 'createContract']).as('createContract')
    router
      .get('/created-in-last-12-months', [ContractsController, 'getContractsCreatedInLast12Months'])
      .as('getContractsCreatedInLast12Months')
    router
      .get('/ending-in-30-days/count', [ContractsController, 'getContractsQuantityEndingIn30Days'])
      .as('getContractsQuantityEndingIn30Days')
    router
      .get('/active/count', [ContractsController, 'getActiveContractsQuantity'])
      .as('getActiveContractsQuantity')
  })
  .prefix('/v1/contracts')
  .use(middleware.auth())
  .as('api.v1.contracts')
