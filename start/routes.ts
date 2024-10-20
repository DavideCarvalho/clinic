/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
import AutoSwagger from 'adonis-autoswagger'
import swagger from '#config/swagger'
import transmit from '@adonisjs/transmit/services/main'
import { throttle } from './limiter.js'
import mail from '@adonisjs/mail/services/main'
import SendEmail from '#jobs/send_email'

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
        router
          .get('/', '#controllers/contracts_controller.getContractsPaginated')
          .as('api.v1.contracts.getContracts')
        router
          .post('/', '#controllers/contracts_controller.createContract')
          .as('api.v1.contracts.createContract')
        router
          .get(
            '/created-in-last-12-months',
            '#controllers/contracts_controller.getContractsCreatedInLast12Months'
          )
          .as('api.v1.contracts.getContractsCreatedInLast12Months')
        router
          .get(
            '/ending-in-30-days/count',
            '#controllers/contracts_controller.getContractsQuantityEndingIn30Days'
          )
          .as('api.v1.contracts.getContractsQuantityEndingIn30Days')
        router
          .get('/active/count', '#controllers/contracts_controller.getActiveContractsQuantity')
          .as('api.v1.contracts.getActiveContractsQuantity')
      })
      .prefix('/v1/contracts')
      .use(middleware.auth())
      .as('api.v1.contracts')

    router
      .group(() => {
        router
          .post('/clinic/items', '#controllers/inventory_controller.createItem')
          .as('api.v1.inventory.createItem')
        router
          .post('/clinic/items/:id/add', '#controllers/inventory_controller.increaseItemQuantity')
          .as('api.v1.inventory.increaseItemQuantity')
        router
          .post(
            '/clinic/items/:id/withdraw',
            '#controllers/inventory_controller.decreaseItemQuantity'
          )
          .as('api.v1.inventory.decreaseItemQuantity')
        router
          .post(
            '/clinic/items/more-utilized',
            '#controllers/inventory_controller.moreUtilizedItems'
          )
          .as('api.v1.inventory.moreUtilizedItems')
        router
          .get(
            '/clinic/items/needing-replacement',
            '#controllers/inventory_controller.itemsNeedingReplacement'
          )
          .as('api.v1.inventory.itemsNeedingReplacement')
        router
          .get('/clinic/inventory-value', '#controllers/inventory_controller.inventoryValue')
          .as('api.v1.inventory.inventoryValue')
        router
          .get('/clinic/inventory-quantity', '#controllers/inventory_controller.inventoryQuantity')
          .as('api.v1.inventory.inventoryQuantity')
        router
          .get('/clinic/items', '#controllers/inventory_controller.getClinicItems')
          .as('api.v1.inventory.getClinicItems')
        router
          .get(
            '/clinic/items/most-used',
            '#controllers/inventory_controller.getItemsWithMostTransactionsWithinLast12Months'
          )
          .as('api.v1.inventory.getItemsWithMostTransactionsWithinLast12Months')
        router
          .get('/clinic/items/categories', '#controllers/inventory_controller.getCategories')
          .as('api.v1.inventory.getCategories')
      })
      .prefix('/v1/inventory')
      .use(middleware.auth())
      .as('api.v1.inventory')

    router
      .group(() => {
        router
          .get('/clinic', '#controllers/purchase_requests_controller.getClinicPurchaseRequests')
          .as('getClinicPurchaseRequests')
        router
          .post('/clinic', '#controllers/purchase_requests_controller.newPurchaseRequest')
          .as('newPurchaseRequest')
        router
          .post(
            ':purchaseRequestId/clinic/received',
            '#controllers/purchase_requests_controller.clinicReceivedPurchaseRequest'
          )
          .as('clinicReceivedPurchaseRequest')
        router
          .post(
            ':purchaseRequestId/clinic/upload-invoice',
            '#controllers/purchase_requests_controller.clinicUploadInvoice'
          )
          .as('clinicUploadInvoice')
        router
          .delete(
            ':purchaseRequestId/clinic',
            '#controllers/purchase_requests_controller.clinicDeletePurchaseRequest'
          )
          .as('clinicDeletePurchaseRequest')
        router
          .get(
            ':purchaseRequestId/clinic/invoice-signed-url',
            '#controllers/purchase_requests_controller.getInvoiceSignedUrl'
          )
          .as('getInvoiceSignedUrl')
      })
      .prefix('/v1/purchase-requests')
      .use(middleware.auth())
      .as('purchaseRequests')

    router
      .group(() => {
        router
          .get('/clinic', '#controllers/item_suppliers_controller.getClinicSuppliers')
          .as('api.v1.itemSuppliers.getClinicSuppliers')
      })
      .prefix('/v1/item-suppliers')
      .use(middleware.auth())
      .as('api.v1.itemSuppliers')

    router.post('/login', '#controllers/login_controller.login').as('api.login')
    router.post('/logout', '#controllers/login_controller.logout').as('api.logout')
    router.post('/users', '#controllers/users_controller.createUser').as('api.users.createUser')
  })
  .prefix('/api')

router.get('/', '#controllers/inertia/home_controller.handle').use(middleware.auth()).as('home')

router
  .get('/inventario', '#controllers/inertia/inventory_controller.handle')
  .use(middleware.auth())
  .as('inventory')

router
  .get('/inventario/novo-item', '#controllers/inertia/add_inventory_item_controller.handle')
  .use(middleware.auth())
  .as('addInventoryItem')

router
  .get('/solicitacoes-de-compra', '#controllers/inertia/purchase_requests_controller.handle')
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
