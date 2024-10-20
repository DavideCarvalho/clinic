// File: start/routes/api/v1/purchase-requests.js

import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const PurchaseRequestsController = () => import('#controllers/purchase_requests_controller')

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
