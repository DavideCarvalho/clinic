// File: start/routes/api/v1/inventory.js

import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const InventoryController = () => import('#controllers/inventory_controller')

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
      .get('/clinic/items/needing-replacement', [InventoryController, 'itemsNeedingReplacement'])
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
