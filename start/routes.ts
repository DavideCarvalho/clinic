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
import { getQueryClient, returnDehydratedState } from '#controllers/utils/return_dehydrated_state'
import app from '@adonisjs/core/services/app'
import ContractsService from '#services/contracts.service'
import AutoSwagger from 'adonis-autoswagger'
import swagger from '#config/swagger'
import Item from '#models/item'
import ItemUnit from '#models/item_unit'
import ItemCategory from '#models/item_category'

// API routes
router
  .group(() => {
    router
      .group(() => {
        router.get('/', '#controllers/contracts_controller.getContractsPaginated')
        router.post('/', '#controllers/contracts_controller.createContract')
        router.get(
          '/created-in-last-12-months',
          '#controllers/contracts_controller.getContractsCreatedInLast12Months'
        )
        router.get(
          '/ending-in-30-days/count',
          '#controllers/contracts_controller.getContractsQuantityEndingIn30Days'
        )
        router.get('/active/count', '#controllers/contracts_controller.getActiveContractsQuantity')
      })
      .prefix('/v1/contracts')
      .use(middleware.auth())

    router
      .group(() => {
        router.post('/clinic/', '#controllers/inventory_controller.createItem')
        router.post('/clinic/:id/add', '#controllers/inventory_controller.increaseItemQuantity')
        router.post(
          '/clinic/:id/withdraw',
          '#controllers/inventory_controller.decreaseItemQuantity'
        )
        router.post('/clinic/more-utilized', '#controllers/inventory_controller.moreUtilizedItems')
        router.get(
          '/items-needing-replacement',
          '#controllers/inventory_controller.itemsNeedingReplacement'
        )
        router.get('/clinic/inventory-value', '#controllers/inventory_controller.inventoryValue')
        router.get(
          '/clinic/inventory-quantity',
          '#controllers/inventory_controller.inventoryQuantity'
        )
        router.get('/clinic/items', '#controllers/inventory_controller.getClinicItems')
        router.get(
          '/clinic/items/most-used',
          '#controllers/inventory_controller.getItemsWithMostTransactionsWithinLast12Months'
        )
        router.get('/clinic/items/categories', '#controllers/inventory_controller.getCategories')
      })
      .prefix('/v1/inventory')
      .use(middleware.auth())

    router.post('/login', '#controllers/login_controller.login')
    router.post('/logout', '#controllers/login_controller.logout')
    router.post('/users', '#controllers/users_controller.createUser')
  })
  .prefix('/api')

// Inertia routes
router
  .on('/')
  .setHandler(async (ctx) => {
    const user = await ctx.auth.user
    if (!user) return ctx.inertia.render('login')
    const queryString = ctx.request.qs()
    const page = queryString.page ?? 1
    const limit = queryString.limit ?? 10
    const contractsService = await app.container.make(ContractsService)
    const queryClient = getQueryClient()
    await Promise.all([
      queryClient.prefetchQuery({
        queryKey: ['contracts', 'contractsQuantityEndingIn30Days'],
        queryFn: async () => ({
          ammount: await contractsService.getContractsQuantityEndingIn30Days(user.clinicId),
        }),
      }),
      queryClient.prefetchQuery({
        queryKey: ['contracts', 'activeContractsQuantity'],
        queryFn: async () => ({
          ammount: await contractsService.getActiveContractsQuantity(user.clinicId),
        }),
      }),
      queryClient.prefetchQuery({
        queryKey: ['contracts'],
        queryFn: () => contractsService.getContractsPaginated(user.clinicId, page, limit),
      }),
      queryClient.prefetchQuery({
        queryKey: ['contracts', 'contractsCreatedInLast12Months'],
        queryFn: () => contractsService.getContractsCreatedInLast12Months(user.clinicId),
      }),
      queryClient.prefetchQuery({
        queryKey: ['inventory', 'itemsNeedingReplacement'],
        queryFn: () => Item.itemsNeedingReplacement(user.clinicId, { page, limit }),
      }),
      queryClient.prefetchQuery({
        queryKey: ['inventory', 'inventory-value'],
        queryFn: async () => {
          const inventoryValue = await ItemUnit.calculateInventoryValue(user.clinicId)
          return {
            inventoryValue,
          }
        },
      }),
      queryClient.prefetchQuery({
        queryKey: ['inventory', 'inventory-quantity'],
        queryFn: async () => {
          const [itemsQuantity, categoriesQuantity] = await Promise.all([
            ItemUnit.availableUnits(user.clinicId),
            ItemUnit.availableCategories(user.clinicId),
          ])
          return {
            itemsQuantity,
            categoriesQuantity,
          }
        },
      }),
    ])
    return ctx.inertia.render('home', {
      ...returnDehydratedState(queryClient),
    })
  })
  .use(middleware.auth())
router
  .on('/inventario/novo-item')
  .setHandler(async (ctx) => {
    const user = await ctx.auth.user
    const queryClient = getQueryClient()
    const page = ctx.request.qs().page ? Number(ctx.request.qs().page) : 1
    const limit = ctx.request.qs().limit ? Number(ctx.request.qs().limit) : 10
    await Promise.all([
      queryClient.prefetchQuery({
        queryKey: ['inventory', 'items'],
        queryFn: async () =>
          Item.itemsWithMostTransactionsWithinLast12Months(user!.clinicId, {
            page,
            limit,
          }),
      }),
      queryClient.prefetchQuery({
        queryKey: ['inventory', 'item-categories'],
        queryFn: async () =>
          ItemCategory.findManyBy({
            clinicId: user!.clinicId,
          }),
      }),
    ])
    return ctx.inertia.render('inventario/novo_item', {
      ...returnDehydratedState(queryClient),
    })
  })
  .use(middleware.auth())
router.on('/inventario').renderInertia('inventario/itens').use(middleware.auth())
router.on('/login').renderInertia('login').use(middleware.guest())
router.on('/esqueci-minha-senha').renderInertia('esqueci-minha-senha').use(middleware.guest())

router.get('/swagger', async () => {
  return AutoSwagger.default.docs(router.toJSON(), swagger)
})

// Renders Swagger-UI and passes YAML-output of /swagger
router.get('/docs', async () => {
  return AutoSwagger.default.ui('/swagger', swagger)
  // return AutoSwagger.default.scalar("/swagger"); to use Scalar instead
  // return AutoSwagger.default.rapidoc("/swagger", "view"); to use RapiDoc instead (pass "view" default, or "read" to change the render-style)
})
