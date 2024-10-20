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
}
const routes = [
  {
    params: [],
    name: 'purchaseRequests.getClinicPurchaseRequests',
    path: '/api/v1/purchase-requests/clinic',
    method: ["GET","HEAD"],
    types: {} as ApiV1PurchaserequestsClinicGetHead,
  },
  {
    params: [],
    name: 'purchaseRequests.newPurchaseRequest',
    path: '/api/v1/purchase-requests/clinic',
    method: ["POST"],
    types: {} as ApiV1PurchaserequestsClinicPost,
  },
  {
    params: ["purchaseRequestId"],
    name: 'purchaseRequests.clinicReceivedPurchaseRequest',
    path: '/api/v1/purchase-requests/:purchaseRequestId/clinic/received',
    method: ["POST"],
    types: {} as ApiV1PurchaserequestsIdClinicReceivedPost,
  },
  {
    params: ["purchaseRequestId"],
    name: 'purchaseRequests.clinicUploadInvoice',
    path: '/api/v1/purchase-requests/:purchaseRequestId/clinic/upload-invoice',
    method: ["POST"],
    types: {} as ApiV1PurchaserequestsIdClinicUploadinvoicePost,
  },
  {
    params: ["purchaseRequestId"],
    name: 'purchaseRequests.clinicDeletePurchaseRequest',
    path: '/api/v1/purchase-requests/:purchaseRequestId/clinic',
    method: ["DELETE"],
    types: {} as ApiV1PurchaserequestsIdClinicDelete,
  },
  {
    params: ["purchaseRequestId"],
    name: 'purchaseRequests.getInvoiceSignedUrl',
    path: '/api/v1/purchase-requests/:purchaseRequestId/clinic/invoice-signed-url',
    method: ["GET","HEAD"],
    types: {} as ApiV1PurchaserequestsIdClinicInvoicesignedurlGetHead,
  },
] as const;
export const api = {
  routes,
  definition: {} as ApiDefinition
}
