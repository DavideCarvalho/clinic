/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import transmit from '@adonisjs/transmit/services/main'
import mail from '@adonisjs/mail/services/main'
import SendEmail from '#jobs/send_email'
import { middleware } from './kernel.js'
import { throttle } from './limiter.js'

const ApiLoginController = () => import('#controllers/login_controller')
const ContractsController = () => import('#controllers/contracts_controller')
const InventoryController = () => import('#controllers/inventory_controller')
const PurchaseRequestsController = () => import('#controllers/purchase_requests_controller')
const ItemSuppliersController = () => import('#controllers/item_suppliers_controller')
const UsersController = () => import('#controllers/users_controller')
const InertiaHomeController = () => import('#controllers/inertia/home_controller')
const InertiaInventoryController = () => import('#controllers/inertia/inventory_controller')
const InertiaAddInventoryItemController = () =>
  import('#controllers/inertia/add_inventory_item_controller')
const InertiaPurchaseRequestsController = () =>
  import('#controllers/inertia/purchase_requests_controller')

mail.setMessenger((mailer) => {
  return {
    async queue(mailMessage, config) {
      SendEmail.dispatch({
        mailMessage,
        config,
        mailerName: mailer.name,
      })
    },
  }
})

// API routes
router
  .group(() => {
    router
      .group(() => {
        router.get('/', [ContractsController, 'getContractsPaginated']).as('getContracts')
        router.post('/', [ContractsController, 'createContract']).as('createContract')
        router
          .get('/created-in-last-12-months', [
            ContractsController,
            'getContractsCreatedInLast12Months',
          ])
          .as('getContractsCreatedInLast12Months')
        router
          .get('/ending-in-30-days/count', [
            ContractsController,
            'getContractsQuantityEndingIn30Days',
          ])
          .as('getContractsQuantityEndingIn30Days')
        router
          .get('/active/count', [ContractsController, 'getActiveContractsQuantity'])
          .as('getActiveContractsQuantity')
      })
      .prefix('/v1/contracts')
      .use(middleware.auth())
      .as('api.v1.contracts')

    router
      .group(() => {
        router.post('/clinic/items', [InventoryController, 'createItem']).as('createItem')
        router
          .post('/clinic/items/:id/add', [InventoryController, 'increaseItemQuantity'])
          .as('increaseItemQuantity')
        router
          .post('/clinic/items/:id/withdraw', [InventoryController, 'decreaseItemQuantity'])
          .as('decreaseItemQuantity')
        router
          .post('/clinic/items/more-utilized', [InventoryController, 'moreUtilizedItems'])
          .as('moreUtilizedItems')
        router
          .get('/clinic/items/needing-replacement', [
            InventoryController,
            'itemsNeedingReplacement',
          ])
          .as('itemsNeedingReplacement')
        router
          .get('/clinic/inventory-value', [InventoryController, 'inventoryValue'])
          .as('inventoryValue')
        router
          .get('/clinic/inventory-quantity', [InventoryController, 'inventoryQuantity'])
          .as('inventoryQuantity')
        router.get('/clinic/items', [InventoryController, 'getClinicItems']).as('getClinicItems')
        router
          .get('/clinic/items/most-used', [
            InventoryController,
            'getItemsWithMostTransactionsWithinLast12Months',
          ])
          .as('getItemsWithMostTransactionsWithinLast12Months')
        router
          .get('/clinic/items/categories', [InventoryController, 'getCategories'])
          .as('getCategories')
      })
      .prefix('/v1/inventory')
      .use(middleware.auth())
      .as('api.v1.inventory')

    router
      .group(() => {
        router
          .get('/clinic', [PurchaseRequestsController, 'getClinicPurchaseRequests'])
          .as('getClinicPurchaseRequests')
        router
          .post('/clinic', [PurchaseRequestsController, 'newPurchaseRequest'])
          .as('newPurchaseRequest')
        router
          .post(':purchaseRequestId/clinic/received', [
            PurchaseRequestsController,
            'clinicReceivedPurchaseRequest',
          ])
          .as('clinicReceivedPurchaseRequest')
        router
          .post(':purchaseRequestId/clinic/upload-invoice', [
            PurchaseRequestsController,
            'clinicUploadInvoice',
          ])
          .as('clinicUploadInvoice')
        router
          .delete(':purchaseRequestId/clinic', [
            PurchaseRequestsController,
            'clinicDeletePurchaseRequest',
          ])
          .as('clinicDeletePurchaseRequest')
        router
          .get(':purchaseRequestId/clinic/invoice-signed-url', [
            PurchaseRequestsController,
            'getInvoiceSignedUrl',
          ])
          .as('getInvoiceSignedUrl')
      })
      .prefix('/v1/purchase-requests')
      .use(middleware.auth())
      .as('api.v1.purchaseRequests')

    router
      .group(() => {
        router
          .get('/clinic', [ItemSuppliersController, 'getClinicSuppliers'])
          .as('getClinicSuppliers')
      })
      .prefix('/v1/item-suppliers')
      .use(middleware.auth())
      .as('api.v1.itemSuppliers')

    router.post('/login', [ApiLoginController, 'login']).as('api.login')
    router.post('/logout', [ApiLoginController, 'logout']).as('api.logout')
    router.post('/users', [UsersController, 'createUser']).as('api.users.createUser')
  })
  .prefix('/api')

router.get('/', [InertiaHomeController]).use(middleware.auth()).as('home')

router.get('/inventario', [InertiaInventoryController]).use(middleware.auth()).as('inventory')

router
  .get('/inventario/novo-item', [InertiaAddInventoryItemController, 'handle'])
  .use(middleware.auth())
  .as('addInventoryItem')

router
  .get('/solicitacoes-de-compra', [InertiaPurchaseRequestsController, 'handle'])
  .use(middleware.auth())
  .as('purchaseRequests')

router.on('/login').renderInertia('login').use(middleware.guest())
router
  .on('/esqueci-minha-senha')
  .renderInertia('esqueci-minha-senha')
  .use(middleware.guest())
  .as('forgotPassword')

transmit.registerRoutes((route) => {
  // Ensure you are authenticated to register your client
  if (route.getPattern() === '__transmit/events') {
    route.middleware(middleware.auth())
    return
  }

  // Add a throttle middleware to other transmit routes
  route.use(throttle)
})

router.jobs().use(middleware.auth())
