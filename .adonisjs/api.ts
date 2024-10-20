import type { MakeTuyauRequest, MakeTuyauResponse } from '@tuyau/utils/types'
import type { InferInput } from '@vinejs/vine/types'

type ApiV1ContractsGetHead = {
  request: unknown
  response: MakeTuyauResponse<import('../app/controllers/contracts_controller.ts').default['getContractsPaginated']>
}
type ApiV1ContractsPost = {
  request: MakeTuyauRequest<InferInput<typeof import('../app/validators/contract.ts')['createContractValidator']>>
  response: MakeTuyauResponse<import('../app/controllers/contracts_controller.ts').default['createContract']>
}
type ApiV1ContractsCreatedinlast12monthsGetHead = {
  request: unknown
  response: MakeTuyauResponse<import('../app/controllers/contracts_controller.ts').default['getContractsCreatedInLast12Months']>
}
type ApiV1ContractsEndingin30daysCountGetHead = {
  request: unknown
  response: MakeTuyauResponse<import('../app/controllers/contracts_controller.ts').default['getContractsQuantityEndingIn30Days']>
}
type ApiV1ContractsActiveCountGetHead = {
  request: unknown
  response: MakeTuyauResponse<import('../app/controllers/contracts_controller.ts').default['getActiveContractsQuantity']>
}
type ApiV1InventoryClinicItemsPost = {
  request: MakeTuyauRequest<InferInput<typeof import('../app/validators/item.ts')['createItemValidator']>>
  response: MakeTuyauResponse<import('../app/controllers/inventory_controller.ts').default['createItem']>
}
type ApiV1InventoryClinicItemsIdAddPost = {
  request: MakeTuyauRequest<InferInput<typeof import('../app/validators/item.ts')['changeItemQuantityValidator']>>
  response: MakeTuyauResponse<import('../app/controllers/inventory_controller.ts').default['increaseItemQuantity']>
}
type ApiV1InventoryClinicItemsIdWithdrawPost = {
  request: MakeTuyauRequest<InferInput<typeof import('../app/validators/item.ts')['changeItemQuantityValidator']>>
  response: MakeTuyauResponse<import('../app/controllers/inventory_controller.ts').default['decreaseItemQuantity']>
}
type ApiV1InventoryClinicItemsMoreutilizedPost = {
  request: unknown
  response: MakeTuyauResponse<import('../app/controllers/inventory_controller.ts').default['moreUtilizedItems']>
}
type ApiV1InventoryClinicItemsNeedingreplacementGetHead = {
  request: unknown
  response: MakeTuyauResponse<import('../app/controllers/inventory_controller.ts').default['itemsNeedingReplacement']>
}
type ApiV1InventoryClinicInventoryvalueGetHead = {
  request: unknown
  response: MakeTuyauResponse<import('../app/controllers/inventory_controller.ts').default['inventoryValue']>
}
type ApiV1InventoryClinicInventoryquantityGetHead = {
  request: unknown
  response: MakeTuyauResponse<import('../app/controllers/inventory_controller.ts').default['inventoryQuantity']>
}
type ApiV1InventoryClinicItemsGetHead = {
  request: unknown
  response: MakeTuyauResponse<import('../app/controllers/inventory_controller.ts').default['getClinicItems']>
}
type ApiV1InventoryClinicItemsMostusedGetHead = {
  request: unknown
  response: MakeTuyauResponse<import('../app/controllers/inventory_controller.ts').default['getItemsWithMostTransactionsWithinLast12Months']>
}
type ApiV1InventoryClinicItemsCategoriesGetHead = {
  request: unknown
  response: MakeTuyauResponse<import('../app/controllers/inventory_controller.ts').default['getCategories']>
}
type ApiV1PurchaserequestsClinicGetHead = {
  request: unknown
  response: MakeTuyauResponse<import('../app/controllers/purchase_requests_controller.ts').default['getClinicPurchaseRequests']>
}
type ApiV1PurchaserequestsClinicPost = {
  request: MakeTuyauRequest<InferInput<typeof import('../app/validators/purchase_request.ts')['newPurchaseRequestValidator']>>
  response: MakeTuyauResponse<import('../app/controllers/purchase_requests_controller.ts').default['newPurchaseRequest']>
}
type ApiV1PurchaserequestsIdClinicReceivedPost = {
  request: MakeTuyauRequest<InferInput<typeof import('../app/validators/purchase_request.ts')['clinicReceivedPurchaseRequestValidator']>>
  response: MakeTuyauResponse<import('../app/controllers/purchase_requests_controller.ts').default['clinicReceivedPurchaseRequest']>
}
type ApiV1PurchaserequestsIdClinicUploadinvoicePost = {
  request: MakeTuyauRequest<InferInput<typeof import('../app/validators/purchase_request.ts')['clinicUploadInvoiceValidator']>>
  response: MakeTuyauResponse<import('../app/controllers/purchase_requests_controller.ts').default['clinicUploadInvoice']>
}
type ApiV1PurchaserequestsIdClinicDelete = {
  request: MakeTuyauRequest<InferInput<typeof import('../app/validators/purchase_request.ts')['clinicDeletePurchaseRequestValidator']>>
  response: MakeTuyauResponse<import('../app/controllers/purchase_requests_controller.ts').default['clinicDeletePurchaseRequest']>
}
type ApiV1PurchaserequestsIdClinicInvoicesignedurlGetHead = {
  request: MakeTuyauRequest<InferInput<typeof import('../app/validators/purchase_request.ts')['getInvoiceSignedUrlValidator']>>
  response: MakeTuyauResponse<import('../app/controllers/purchase_requests_controller.ts').default['getInvoiceSignedUrl']>
}
type ApiV1ItemsuppliersClinicGetHead = {
  request: unknown
  response: MakeTuyauResponse<import('../app/controllers/item_suppliers_controller.ts').default['getClinicSuppliers']>
}
type ApiLoginPost = {
  request: unknown
  response: MakeTuyauResponse<import('../app/controllers/login_controller.ts').default['login']>
}
type ApiLogoutPost = {
  request: unknown
  response: MakeTuyauResponse<import('../app/controllers/login_controller.ts').default['logout']>
}
type ApiUsersPost = {
  request: MakeTuyauRequest<InferInput<typeof import('../app/validators/user.ts')['createUserValidator']>>
  response: MakeTuyauResponse<import('../app/controllers/users_controller.ts').default['createUser']>
}
type InventarioGetHead = {
  request: unknown
  response: MakeTuyauResponse<import('../app/controllers/inertia/inventory_controller.ts').default['handle']>
}
type InventarioNovoitemGetHead = {
  request: unknown
  response: MakeTuyauResponse<import('../app/controllers/inertia/add_inventory_item_controller.ts').default['handle']>
}
type SolicitacoesDeCompraGetHead = {
  request: unknown
  response: MakeTuyauResponse<import('../app/controllers/inertia/purchase_requests_controller.ts').default['handle']>
}
export interface ApiDefinition {
  'api': {
    'v1': {
      'contracts': {
        '$url': {
        };
        '$get': ApiV1ContractsGetHead;
        '$head': ApiV1ContractsGetHead;
        '$post': ApiV1ContractsPost;
        'created-in-last-12-months': {
          '$url': {
          };
          '$get': ApiV1ContractsCreatedinlast12monthsGetHead;
          '$head': ApiV1ContractsCreatedinlast12monthsGetHead;
        };
        'ending-in-30-days': {
          'count': {
            '$url': {
            };
            '$get': ApiV1ContractsEndingin30daysCountGetHead;
            '$head': ApiV1ContractsEndingin30daysCountGetHead;
          };
        };
        'active': {
          'count': {
            '$url': {
            };
            '$get': ApiV1ContractsActiveCountGetHead;
            '$head': ApiV1ContractsActiveCountGetHead;
          };
        };
      };
      'inventory': {
        'clinic': {
          'items': {
            '$url': {
            };
            '$post': ApiV1InventoryClinicItemsPost;
            ':id': {
              'add': {
                '$url': {
                };
                '$post': ApiV1InventoryClinicItemsIdAddPost;
              };
              'withdraw': {
                '$url': {
                };
                '$post': ApiV1InventoryClinicItemsIdWithdrawPost;
              };
            };
            'more-utilized': {
              '$url': {
              };
              '$post': ApiV1InventoryClinicItemsMoreutilizedPost;
            };
            'needing-replacement': {
              '$url': {
              };
              '$get': ApiV1InventoryClinicItemsNeedingreplacementGetHead;
              '$head': ApiV1InventoryClinicItemsNeedingreplacementGetHead;
            };
            '$get': ApiV1InventoryClinicItemsGetHead;
            '$head': ApiV1InventoryClinicItemsGetHead;
            'most-used': {
              '$url': {
              };
              '$get': ApiV1InventoryClinicItemsMostusedGetHead;
              '$head': ApiV1InventoryClinicItemsMostusedGetHead;
            };
            'categories': {
              '$url': {
              };
              '$get': ApiV1InventoryClinicItemsCategoriesGetHead;
              '$head': ApiV1InventoryClinicItemsCategoriesGetHead;
            };
          };
          'inventory-value': {
            '$url': {
            };
            '$get': ApiV1InventoryClinicInventoryvalueGetHead;
            '$head': ApiV1InventoryClinicInventoryvalueGetHead;
          };
          'inventory-quantity': {
            '$url': {
            };
            '$get': ApiV1InventoryClinicInventoryquantityGetHead;
            '$head': ApiV1InventoryClinicInventoryquantityGetHead;
          };
        };
      };
      'purchase-requests': {
        'clinic': {
          '$url': {
          };
          '$get': ApiV1PurchaserequestsClinicGetHead;
          '$head': ApiV1PurchaserequestsClinicGetHead;
          '$post': ApiV1PurchaserequestsClinicPost;
        };
        ':purchaseRequestId': {
          'clinic': {
            'received': {
              '$url': {
              };
              '$post': ApiV1PurchaserequestsIdClinicReceivedPost;
            };
            'upload-invoice': {
              '$url': {
              };
              '$post': ApiV1PurchaserequestsIdClinicUploadinvoicePost;
            };
            '$url': {
            };
            '$delete': ApiV1PurchaserequestsIdClinicDelete;
            'invoice-signed-url': {
              '$url': {
              };
              '$get': ApiV1PurchaserequestsIdClinicInvoicesignedurlGetHead;
              '$head': ApiV1PurchaserequestsIdClinicInvoicesignedurlGetHead;
            };
          };
        };
      };
      'item-suppliers': {
        'clinic': {
          '$url': {
          };
          '$get': ApiV1ItemsuppliersClinicGetHead;
          '$head': ApiV1ItemsuppliersClinicGetHead;
        };
      };
    };
    'login': {
      '$url': {
      };
      '$post': ApiLoginPost;
    };
    'logout': {
      '$url': {
      };
      '$post': ApiLogoutPost;
    };
    'users': {
      '$url': {
      };
      '$post': ApiUsersPost;
    };
  };
  'inventario': {
    '$url': {
    };
    '$get': InventarioGetHead;
    '$head': InventarioGetHead;
    'novo-item': {
      '$url': {
      };
      '$get': InventarioNovoitemGetHead;
      '$head': InventarioNovoitemGetHead;
    };
  };
  'solicitacoes-de-compra': {
    '$url': {
    };
    '$get': SolicitacoesDeCompraGetHead;
    '$head': SolicitacoesDeCompraGetHead;
  };
}
const routes = [
  {
    params: [],
    name: 'api.v1.contracts.getContracts',
    path: '/api/v1/contracts',
    method: ["GET","HEAD"],
    types: {} as ApiV1ContractsGetHead,
  },
  {
    params: [],
    name: 'api.v1.contracts.createContract',
    path: '/api/v1/contracts',
    method: ["POST"],
    types: {} as ApiV1ContractsPost,
  },
  {
    params: [],
    name: 'api.v1.contracts.getContractsCreatedInLast12Months',
    path: '/api/v1/contracts/created-in-last-12-months',
    method: ["GET","HEAD"],
    types: {} as ApiV1ContractsCreatedinlast12monthsGetHead,
  },
  {
    params: [],
    name: 'api.v1.contracts.getContractsQuantityEndingIn30Days',
    path: '/api/v1/contracts/ending-in-30-days/count',
    method: ["GET","HEAD"],
    types: {} as ApiV1ContractsEndingin30daysCountGetHead,
  },
  {
    params: [],
    name: 'api.v1.contracts.getActiveContractsQuantity',
    path: '/api/v1/contracts/active/count',
    method: ["GET","HEAD"],
    types: {} as ApiV1ContractsActiveCountGetHead,
  },
  {
    params: [],
    name: 'api.v1.inventory.createItem',
    path: '/api/v1/inventory/clinic/items',
    method: ["POST"],
    types: {} as ApiV1InventoryClinicItemsPost,
  },
  {
    params: ["id"],
    name: 'api.v1.inventory.increaseItemQuantity',
    path: '/api/v1/inventory/clinic/items/:id/add',
    method: ["POST"],
    types: {} as ApiV1InventoryClinicItemsIdAddPost,
  },
  {
    params: ["id"],
    name: 'api.v1.inventory.decreaseItemQuantity',
    path: '/api/v1/inventory/clinic/items/:id/withdraw',
    method: ["POST"],
    types: {} as ApiV1InventoryClinicItemsIdWithdrawPost,
  },
  {
    params: [],
    name: 'api.v1.inventory.moreUtilizedItems',
    path: '/api/v1/inventory/clinic/items/more-utilized',
    method: ["POST"],
    types: {} as ApiV1InventoryClinicItemsMoreutilizedPost,
  },
  {
    params: [],
    name: 'api.v1.inventory.itemsNeedingReplacement',
    path: '/api/v1/inventory/clinic/items/needing-replacement',
    method: ["GET","HEAD"],
    types: {} as ApiV1InventoryClinicItemsNeedingreplacementGetHead,
  },
  {
    params: [],
    name: 'api.v1.inventory.inventoryValue',
    path: '/api/v1/inventory/clinic/inventory-value',
    method: ["GET","HEAD"],
    types: {} as ApiV1InventoryClinicInventoryvalueGetHead,
  },
  {
    params: [],
    name: 'api.v1.inventory.inventoryQuantity',
    path: '/api/v1/inventory/clinic/inventory-quantity',
    method: ["GET","HEAD"],
    types: {} as ApiV1InventoryClinicInventoryquantityGetHead,
  },
  {
    params: [],
    name: 'api.v1.inventory.getClinicItems',
    path: '/api/v1/inventory/clinic/items',
    method: ["GET","HEAD"],
    types: {} as ApiV1InventoryClinicItemsGetHead,
  },
  {
    params: [],
    name: 'api.v1.inventory.getItemsWithMostTransactionsWithinLast12Months',
    path: '/api/v1/inventory/clinic/items/most-used',
    method: ["GET","HEAD"],
    types: {} as ApiV1InventoryClinicItemsMostusedGetHead,
  },
  {
    params: [],
    name: 'api.v1.inventory.getCategories',
    path: '/api/v1/inventory/clinic/items/categories',
    method: ["GET","HEAD"],
    types: {} as ApiV1InventoryClinicItemsCategoriesGetHead,
  },
  {
    params: [],
    name: 'api.v1.purchaseRequests.getClinicPurchaseRequests',
    path: '/api/v1/purchase-requests/clinic',
    method: ["GET","HEAD"],
    types: {} as ApiV1PurchaserequestsClinicGetHead,
  },
  {
    params: [],
    name: 'api.v1.purchaseRequests.newPurchaseRequest',
    path: '/api/v1/purchase-requests/clinic',
    method: ["POST"],
    types: {} as ApiV1PurchaserequestsClinicPost,
  },
  {
    params: ["purchaseRequestId"],
    name: 'api.v1.purchaseRequests.clinicReceivedPurchaseRequest',
    path: '/api/v1/purchase-requests/:purchaseRequestId/clinic/received',
    method: ["POST"],
    types: {} as ApiV1PurchaserequestsIdClinicReceivedPost,
  },
  {
    params: ["purchaseRequestId"],
    name: 'api.v1.purchaseRequests.clinicUploadInvoice',
    path: '/api/v1/purchase-requests/:purchaseRequestId/clinic/upload-invoice',
    method: ["POST"],
    types: {} as ApiV1PurchaserequestsIdClinicUploadinvoicePost,
  },
  {
    params: ["purchaseRequestId"],
    name: 'api.v1.purchaseRequests.clinicDeletePurchaseRequest',
    path: '/api/v1/purchase-requests/:purchaseRequestId/clinic',
    method: ["DELETE"],
    types: {} as ApiV1PurchaserequestsIdClinicDelete,
  },
  {
    params: ["purchaseRequestId"],
    name: 'api.v1.purchaseRequests.getInvoiceSignedUrl',
    path: '/api/v1/purchase-requests/:purchaseRequestId/clinic/invoice-signed-url',
    method: ["GET","HEAD"],
    types: {} as ApiV1PurchaserequestsIdClinicInvoicesignedurlGetHead,
  },
  {
    params: [],
    name: 'api.v1.itemSuppliers.getClinicSuppliers',
    path: '/api/v1/item-suppliers/clinic',
    method: ["GET","HEAD"],
    types: {} as ApiV1ItemsuppliersClinicGetHead,
  },
  {
    params: [],
    name: 'api.login',
    path: '/api/login',
    method: ["POST"],
    types: {} as ApiLoginPost,
  },
  {
    params: [],
    name: 'api.logout',
    path: '/api/logout',
    method: ["POST"],
    types: {} as ApiLogoutPost,
  },
  {
    params: [],
    name: 'api.users.createUser',
    path: '/api/users',
    method: ["POST"],
    types: {} as ApiUsersPost,
  },
  {
    params: [],
    name: 'home',
    path: '/',
    method: ["GET","HEAD"],
    types: {} as unknown,
  },
  {
    params: [],
    name: 'inventory',
    path: '/inventario',
    method: ["GET","HEAD"],
    types: {} as InventarioGetHead,
  },
  {
    params: [],
    name: 'addInventoryItem',
    path: '/inventario/novo-item',
    method: ["GET","HEAD"],
    types: {} as InventarioNovoitemGetHead,
  },
  {
    params: [],
    name: 'purchaseRequests',
    path: '/solicitacoes-de-compra',
    method: ["GET","HEAD"],
    types: {} as SolicitacoesDeCompraGetHead,
  },
  {
    params: [],
    name: 'forgotPassword',
    path: '/esqueci-minha-senha',
    method: ["GET","HEAD"],
    types: {} as unknown,
  },
] as const;
export const api = {
  routes,
  definition: {} as ApiDefinition
}
declare module '@tuyau/inertia/types' {
  type InertiaApi = typeof api
  export interface Api extends InertiaApi {}
}
