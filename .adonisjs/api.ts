import type { MakeTuyauRequest, MakeTuyauResponse } from '@tuyau/utils/types'
import type { InferInput } from '@vinejs/vine/types'

type V1ContractsGetHead = {
  request: unknown
  response: MakeTuyauResponse<import('../app/controllers/contracts_controller.ts').default['getContractsPaginated']>
}
type V1ContractsPost = {
  request: MakeTuyauRequest<InferInput<typeof import('../app/validators/contract.ts')['createContractValidator']>>
  response: MakeTuyauResponse<import('../app/controllers/contracts_controller.ts').default['createContract']>
}
type V1ContractsCreatedinlast12monthsGetHead = {
  request: unknown
  response: MakeTuyauResponse<import('../app/controllers/contracts_controller.ts').default['getContractsCreatedInLast12Months']>
}
type V1ContractsEndingin30daysCountGetHead = {
  request: unknown
  response: MakeTuyauResponse<import('../app/controllers/contracts_controller.ts').default['getContractsQuantityEndingIn30Days']>
}
type V1ContractsActiveCountGetHead = {
  request: unknown
  response: MakeTuyauResponse<import('../app/controllers/contracts_controller.ts').default['getActiveContractsQuantity']>
}
type V1InventoryClinicItemsPost = {
  request: MakeTuyauRequest<InferInput<typeof import('../app/validators/item.ts')['createItemValidator']>>
  response: MakeTuyauResponse<import('../app/controllers/inventory_controller.ts').default['createItem']>
}
type V1InventoryClinicItemsIdAddPost = {
  request: MakeTuyauRequest<InferInput<typeof import('../app/validators/item.ts')['changeItemQuantityValidator']>>
  response: MakeTuyauResponse<import('../app/controllers/inventory_controller.ts').default['increaseItemQuantity']>
}
type V1InventoryClinicItemsIdWithdrawPost = {
  request: MakeTuyauRequest<InferInput<typeof import('../app/validators/item.ts')['changeItemQuantityValidator']>>
  response: MakeTuyauResponse<import('../app/controllers/inventory_controller.ts').default['decreaseItemQuantity']>
}
type V1InventoryClinicItemsMoreutilizedPost = {
  request: unknown
  response: MakeTuyauResponse<import('../app/controllers/inventory_controller.ts').default['moreUtilizedItems']>
}
type V1InventoryClinicItemsNeedingreplacementGetHead = {
  request: unknown
  response: MakeTuyauResponse<import('../app/controllers/inventory_controller.ts').default['itemsNeedingReplacement']>
}
type V1InventoryClinicInventoryvalueGetHead = {
  request: unknown
  response: MakeTuyauResponse<import('../app/controllers/inventory_controller.ts').default['inventoryValue']>
}
type V1InventoryClinicInventoryquantityGetHead = {
  request: unknown
  response: MakeTuyauResponse<import('../app/controllers/inventory_controller.ts').default['inventoryQuantity']>
}
type V1InventoryClinicItemsGetHead = {
  request: unknown
  response: MakeTuyauResponse<import('../app/controllers/inventory_controller.ts').default['getClinicItems']>
}
type V1InventoryClinicItemsMostusedGetHead = {
  request: unknown
  response: MakeTuyauResponse<import('../app/controllers/inventory_controller.ts').default['getItemsWithMostTransactionsWithinLast12Months']>
}
type V1InventoryClinicItemsCategoriesGetHead = {
  request: unknown
  response: MakeTuyauResponse<import('../app/controllers/inventory_controller.ts').default['getCategories']>
}
type V1PurchaserequestsClinicGetHead = {
  request: unknown
  response: MakeTuyauResponse<import('../app/controllers/purchase_requests_controller.ts').default['getClinicPurchaseRequests']>
}
type V1PurchaserequestsClinicPost = {
  request: MakeTuyauRequest<InferInput<typeof import('../app/validators/purchase_request.ts')['newPurchaseRequestValidator']>>
  response: MakeTuyauResponse<import('../app/controllers/purchase_requests_controller.ts').default['newPurchaseRequest']>
}
type V1PurchaserequestsIdClinicReceivedPost = {
  request: MakeTuyauRequest<InferInput<typeof import('../app/validators/purchase_request.ts')['clinicReceivedPurchaseRequestValidator']>>
  response: MakeTuyauResponse<import('../app/controllers/purchase_requests_controller.ts').default['clinicReceivedPurchaseRequest']>
}
type V1PurchaserequestsIdClinicUploadinvoicePost = {
  request: MakeTuyauRequest<InferInput<typeof import('../app/validators/purchase_request.ts')['clinicUploadInvoiceValidator']>>
  response: MakeTuyauResponse<import('../app/controllers/purchase_requests_controller.ts').default['clinicUploadInvoice']>
}
type V1PurchaserequestsIdClinicDelete = {
  request: MakeTuyauRequest<InferInput<typeof import('../app/validators/purchase_request.ts')['clinicDeletePurchaseRequestValidator']>>
  response: MakeTuyauResponse<import('../app/controllers/purchase_requests_controller.ts').default['clinicDeletePurchaseRequest']>
}
type V1PurchaserequestsIdClinicInvoicesignedurlGetHead = {
  request: MakeTuyauRequest<InferInput<typeof import('../app/validators/purchase_request.ts')['getInvoiceSignedUrlValidator']>>
  response: MakeTuyauResponse<import('../app/controllers/purchase_requests_controller.ts').default['getInvoiceSignedUrl']>
}
type V1ItemsuppliersClinicGetHead = {
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
  'v1': {
    'contracts': {
      '$url': {
      };
      '$get': V1ContractsGetHead;
      '$head': V1ContractsGetHead;
      '$post': V1ContractsPost;
      'created-in-last-12-months': {
        '$url': {
        };
        '$get': V1ContractsCreatedinlast12monthsGetHead;
        '$head': V1ContractsCreatedinlast12monthsGetHead;
      };
      'ending-in-30-days': {
        'count': {
          '$url': {
          };
          '$get': V1ContractsEndingin30daysCountGetHead;
          '$head': V1ContractsEndingin30daysCountGetHead;
        };
      };
      'active': {
        'count': {
          '$url': {
          };
          '$get': V1ContractsActiveCountGetHead;
          '$head': V1ContractsActiveCountGetHead;
        };
      };
    };
    'inventory': {
      'clinic': {
        'items': {
          '$url': {
          };
          '$post': V1InventoryClinicItemsPost;
          ':id': {
            'add': {
              '$url': {
              };
              '$post': V1InventoryClinicItemsIdAddPost;
            };
            'withdraw': {
              '$url': {
              };
              '$post': V1InventoryClinicItemsIdWithdrawPost;
            };
          };
          'more-utilized': {
            '$url': {
            };
            '$post': V1InventoryClinicItemsMoreutilizedPost;
          };
          'needing-replacement': {
            '$url': {
            };
            '$get': V1InventoryClinicItemsNeedingreplacementGetHead;
            '$head': V1InventoryClinicItemsNeedingreplacementGetHead;
          };
          '$get': V1InventoryClinicItemsGetHead;
          '$head': V1InventoryClinicItemsGetHead;
          'most-used': {
            '$url': {
            };
            '$get': V1InventoryClinicItemsMostusedGetHead;
            '$head': V1InventoryClinicItemsMostusedGetHead;
          };
          'categories': {
            '$url': {
            };
            '$get': V1InventoryClinicItemsCategoriesGetHead;
            '$head': V1InventoryClinicItemsCategoriesGetHead;
          };
        };
        'inventory-value': {
          '$url': {
          };
          '$get': V1InventoryClinicInventoryvalueGetHead;
          '$head': V1InventoryClinicInventoryvalueGetHead;
        };
        'inventory-quantity': {
          '$url': {
          };
          '$get': V1InventoryClinicInventoryquantityGetHead;
          '$head': V1InventoryClinicInventoryquantityGetHead;
        };
      };
    };
    'purchase-requests': {
      'clinic': {
        '$url': {
        };
        '$get': V1PurchaserequestsClinicGetHead;
        '$head': V1PurchaserequestsClinicGetHead;
        '$post': V1PurchaserequestsClinicPost;
      };
      ':purchaseRequestId': {
        'clinic': {
          'received': {
            '$url': {
            };
            '$post': V1PurchaserequestsIdClinicReceivedPost;
          };
          'upload-invoice': {
            '$url': {
            };
            '$post': V1PurchaserequestsIdClinicUploadinvoicePost;
          };
          '$url': {
          };
          '$delete': V1PurchaserequestsIdClinicDelete;
          'invoice-signed-url': {
            '$url': {
            };
            '$get': V1PurchaserequestsIdClinicInvoicesignedurlGetHead;
            '$head': V1PurchaserequestsIdClinicInvoicesignedurlGetHead;
          };
        };
      };
    };
    'item-suppliers': {
      'clinic': {
        '$url': {
        };
        '$get': V1ItemsuppliersClinicGetHead;
        '$head': V1ItemsuppliersClinicGetHead;
      };
    };
  };
  'api': {
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
    path: '/v1/contracts',
    method: ["GET","HEAD"],
    types: {} as V1ContractsGetHead,
  },
  {
    params: [],
    name: 'api.v1.contracts.createContract',
    path: '/v1/contracts',
    method: ["POST"],
    types: {} as V1ContractsPost,
  },
  {
    params: [],
    name: 'api.v1.contracts.getContractsCreatedInLast12Months',
    path: '/v1/contracts/created-in-last-12-months',
    method: ["GET","HEAD"],
    types: {} as V1ContractsCreatedinlast12monthsGetHead,
  },
  {
    params: [],
    name: 'api.v1.contracts.getContractsQuantityEndingIn30Days',
    path: '/v1/contracts/ending-in-30-days/count',
    method: ["GET","HEAD"],
    types: {} as V1ContractsEndingin30daysCountGetHead,
  },
  {
    params: [],
    name: 'api.v1.contracts.getActiveContractsQuantity',
    path: '/v1/contracts/active/count',
    method: ["GET","HEAD"],
    types: {} as V1ContractsActiveCountGetHead,
  },
  {
    params: [],
    name: 'api.v1.inventory.createItem',
    path: '/v1/inventory/clinic/items',
    method: ["POST"],
    types: {} as V1InventoryClinicItemsPost,
  },
  {
    params: ["id"],
    name: 'api.v1.inventory.increaseItemQuantity',
    path: '/v1/inventory/clinic/items/:id/add',
    method: ["POST"],
    types: {} as V1InventoryClinicItemsIdAddPost,
  },
  {
    params: ["id"],
    name: 'api.v1.inventory.decreaseItemQuantity',
    path: '/v1/inventory/clinic/items/:id/withdraw',
    method: ["POST"],
    types: {} as V1InventoryClinicItemsIdWithdrawPost,
  },
  {
    params: [],
    name: 'api.v1.inventory.moreUtilizedItems',
    path: '/v1/inventory/clinic/items/more-utilized',
    method: ["POST"],
    types: {} as V1InventoryClinicItemsMoreutilizedPost,
  },
  {
    params: [],
    name: 'api.v1.inventory.itemsNeedingReplacement',
    path: '/v1/inventory/clinic/items/needing-replacement',
    method: ["GET","HEAD"],
    types: {} as V1InventoryClinicItemsNeedingreplacementGetHead,
  },
  {
    params: [],
    name: 'api.v1.inventory.inventoryValue',
    path: '/v1/inventory/clinic/inventory-value',
    method: ["GET","HEAD"],
    types: {} as V1InventoryClinicInventoryvalueGetHead,
  },
  {
    params: [],
    name: 'api.v1.inventory.inventoryQuantity',
    path: '/v1/inventory/clinic/inventory-quantity',
    method: ["GET","HEAD"],
    types: {} as V1InventoryClinicInventoryquantityGetHead,
  },
  {
    params: [],
    name: 'api.v1.inventory.getClinicItems',
    path: '/v1/inventory/clinic/items',
    method: ["GET","HEAD"],
    types: {} as V1InventoryClinicItemsGetHead,
  },
  {
    params: [],
    name: 'api.v1.inventory.getItemsWithMostTransactionsWithinLast12Months',
    path: '/v1/inventory/clinic/items/most-used',
    method: ["GET","HEAD"],
    types: {} as V1InventoryClinicItemsMostusedGetHead,
  },
  {
    params: [],
    name: 'api.v1.inventory.getCategories',
    path: '/v1/inventory/clinic/items/categories',
    method: ["GET","HEAD"],
    types: {} as V1InventoryClinicItemsCategoriesGetHead,
  },
  {
    params: [],
    name: 'api.v1.purchaseRequests.getClinicPurchaseRequests',
    path: '/v1/purchase-requests/clinic',
    method: ["GET","HEAD"],
    types: {} as V1PurchaserequestsClinicGetHead,
  },
  {
    params: [],
    name: 'api.v1.purchaseRequests.newPurchaseRequest',
    path: '/v1/purchase-requests/clinic',
    method: ["POST"],
    types: {} as V1PurchaserequestsClinicPost,
  },
  {
    params: ["purchaseRequestId"],
    name: 'api.v1.purchaseRequests.clinicReceivedPurchaseRequest',
    path: '/v1/purchase-requests/:purchaseRequestId/clinic/received',
    method: ["POST"],
    types: {} as V1PurchaserequestsIdClinicReceivedPost,
  },
  {
    params: ["purchaseRequestId"],
    name: 'api.v1.purchaseRequests.clinicUploadInvoice',
    path: '/v1/purchase-requests/:purchaseRequestId/clinic/upload-invoice',
    method: ["POST"],
    types: {} as V1PurchaserequestsIdClinicUploadinvoicePost,
  },
  {
    params: ["purchaseRequestId"],
    name: 'api.v1.purchaseRequests.clinicDeletePurchaseRequest',
    path: '/v1/purchase-requests/:purchaseRequestId/clinic',
    method: ["DELETE"],
    types: {} as V1PurchaserequestsIdClinicDelete,
  },
  {
    params: ["purchaseRequestId"],
    name: 'api.v1.purchaseRequests.getInvoiceSignedUrl',
    path: '/v1/purchase-requests/:purchaseRequestId/clinic/invoice-signed-url',
    method: ["GET","HEAD"],
    types: {} as V1PurchaserequestsIdClinicInvoicesignedurlGetHead,
  },
  {
    params: [],
    name: 'api.v1.itemSuppliers.getClinicSuppliers',
    path: '/v1/item-suppliers/clinic',
    method: ["GET","HEAD"],
    types: {} as V1ItemsuppliersClinicGetHead,
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
