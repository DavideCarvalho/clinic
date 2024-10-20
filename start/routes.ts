import router from '@adonisjs/core/services/router'
import transmit from '@adonisjs/transmit/services/main'
import mail from '@adonisjs/mail/services/main'
import SendEmail from '#jobs/send_email'
import { middleware } from './kernel.js'
import { throttle } from './limiter.js'

import './routes/api/v1/contracts.js'
import './routes/api/v1/inventory.js'
import './routes/api/v1/purchase-requests.js'
import './routes/api/v1/item-suppliers.js'

const ApiLoginController = () => import('#controllers/login_controller')
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

router
  .group(() => {
    router.post('/login', [ApiLoginController, 'login']).as('login')
    router.post('/logout', [ApiLoginController, 'logout']).as('logout')
    router.post('/users', [UsersController, 'createUser']).as('users.createUser')
  })
  .prefix('/api')
  .as('api')

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
  if (route.getPattern() === '__transmit/events') {
    route.middleware(middleware.auth())
    return
  }
  route.use(throttle)
})

router.jobs().use(middleware.auth())
