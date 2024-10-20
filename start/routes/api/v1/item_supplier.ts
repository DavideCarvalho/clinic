import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const ItemSuppliersController = () => import('#controllers/item_suppliers_controller')

router
  .group(() => {
    router.get('/clinic', [ItemSuppliersController, 'getClinicSuppliers']).as('getClinicSuppliers')
  })
  .prefix('/v1/item-suppliers')
  .use(middleware.auth())
  .as('v1.itemSuppliers')
