import { ReactNode, useState } from 'react'
import { PackageCheck, Receipt, XIcon, FileSymlink } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { ClinicLayout } from '~/layouts/clinic_layout'
import ExpandableTable, { Column } from '~/components/common/expandable-table'
import {
  PurchaseRequestArrivedModal,
  PurchaseRequestArrivedModalFormValues,
} from '~/components/purchase-request/purchase-request-arrived-modal'
import {
  getClinicPurchaseRequests,
  GetClinicPurchaseRequestsResponse,
  clinicReceivedPurchaseRequest,
  newPurchaseRequest,
  clinicUploadInvoice,
  clinicDeletePurchaseRequest,
  getInvoiceSignedUrl,
} from '~/api/purchase-request.api'
import { useMutation, useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { toast } from 'sonner'
import { getQueryClient } from '~/lib/query_client'
import {
  NewPurchaseRequestFormValues,
  NewPurchaseRequestModal,
} from '~/components/purchase-request/new-purchase-request-modal'
import { UploadInvoicePurchaseRequestModal } from '~/components/purchase-request/upload-invoice-purchase-request-modal'
import { ConfirmDeletionModal } from '~/components/common/confirm-deletion-modal'

export default function OrdemsDeCompraPage() {
  const queryClient = getQueryClient()
  const [isArrivalModalOpen, setIsArrivalModallOpen] = useState(false)
  const [isCancelPurchaseRequestModalOpen, setIsCancelPurchaseRequestModalOpen] = useState(false)
  const [isUploadInvoiceModalOpen, setIsUploadInvoiceModalOpen] = useState(false)
  const [isNewPurchaseRequestModalOpen, setIsNewPurchaseRequestModalOpen] = useState(false)
  const [selectedPurchaseRequest, setSelectedPurchaseRequest] = useState<
    GetClinicPurchaseRequestsResponse[0] | null
  >(null)
  const { data: solicitacoesCompra } = useQuery({
    queryKey: ['purchase-requests', 'clinic'],
    queryFn: () => getClinicPurchaseRequests(),
  })

  const newPurchaseRequestMutation = useMutation({
    mutationFn: newPurchaseRequest,
  })

  const clinicUploadInvoiceMutation = useMutation({
    mutationFn: clinicUploadInvoice,
  })

  const clinicDeletePurchaseRequestMutation = useMutation({
    mutationFn: clinicDeletePurchaseRequest,
  })

  const clinicReceivedPurchaseRequestMutation = useMutation({
    mutationFn: clinicReceivedPurchaseRequest,
  })

  async function handleNewPurchaseRequest(data: NewPurchaseRequestFormValues) {
    const toastId = toast.loading('Criando solicitação de compra...')
    try {
      await newPurchaseRequestMutation.mutateAsync({
        supplier: data.fornecedor,
        items: data.itens.map((item) => ({
          id: item.id,
          quantidade: item.quantidade,
        })),
      })
      toast.dismiss(toastId)
      toast.success('Solicitação de compra criada com sucesso!')
    } catch (e) {
      toast.dismiss(toastId)
      toast.error('Erro ao criar solicitação de compra!')
    } finally {
      queryClient.invalidateQueries()
    }
  }

  function handleOpenUploadInvoiceModal(purchaseRequest: GetClinicPurchaseRequestsResponse[0]) {
    setSelectedPurchaseRequest(purchaseRequest)
    setIsUploadInvoiceModalOpen(true)
  }

  async function handleOpenInvoice(purchaseRequest: GetClinicPurchaseRequestsResponse[0]) {
    try {
      const { signedUrl } = await getInvoiceSignedUrl({
        purchaseRequestId: purchaseRequest.id,
      })
      window.open(signedUrl, '_blank')
    } catch (e) {
      toast.error('Erro ao abrir nota fiscal!')
    }
  }

  const columns: Column<GetClinicPurchaseRequestsResponse[0]>[] = [
    { header: 'Quantidade de itens', accessorFn: (row) => row.purchaseRequestItems.length },
    {
      header: 'Criado em',
      accessorFn: (row) => format(row.createdAt, 'dd/MM/yyyy'),
    },
    {
      header: 'Status',
      accessorFn: (row) => {
        if (row.status === 'WAITING_SUPPLIER_INVOICE') {
          return 'Aguardando resposta do fornecedor'
        }
        if (row.status === 'WAITING_CLINIC_APPROVAL') {
          return 'Aguardando aprovação da clínica'
        }
        if (row.status === 'WAITING_SUPPLIER_SEND') {
          return 'Esperando envio do fornecedor'
        }
        if (row.status === 'WAITING_ARRIVAL') {
          return 'Esperando chegada'
        }
        if (row.status === 'ARRIVED') {
          return 'Chegou'
        }
        return undefined
      },
    },
    {
      header: 'Ações',
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            {row.original.status === 'WAITING_SUPPLIER_INVOICE' && (
              <>
                {!row.original.invoiceFilePath && (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleOpenUploadInvoiceModal(row.original)}
                  >
                    <Receipt className="mr-2 h-4 w-4" />
                    Importar Nota fiscal
                  </Button>
                )}
                {row.original.invoiceFilePath && (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleOpenInvoice(row.original)}
                  >
                    <FileSymlink className="mr-2 h-4 w-4" />
                    Ver Nota fiscal
                  </Button>
                )}
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleConfirmCancelPurchaseRequest(row.original)}
                >
                  <XIcon className="mr-2 h-4 w-4" />
                  Cancelar
                </Button>
              </>
            )}
            {row.original.status === 'WAITING_ARRIVAL' && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleRegistrarChegada(row.original)}
              >
                <PackageCheck className="mr-2 h-4 w-4" />
                Registrar chegada
              </Button>
            )}
          </div>
        )
      },
    },
  ]

  async function handleSubmitArrival(data: PurchaseRequestArrivedModalFormValues) {
    if (!selectedPurchaseRequest) return
    if (selectedPurchaseRequest.status !== 'WAITING_ARRIVAL') return
    const toastId = toast.loading('Registrando chegada...')
    try {
      await clinicReceivedPurchaseRequestMutation.mutateAsync({
        purchaseRequestId: selectedPurchaseRequest.id,
        arrivalDate: data.arrivalDate,
        invoice: data.invoice,
        items: data.items.map((item) => ({
          itemId: item.itemId,
          askedQuantity: item.askedQuantity,
          receivedQuantity: item.receivedQuantity,
        })),
      })
      toast.dismiss(toastId)
      toast.success('Chegada registrada com sucesso!')
    } catch (e) {
      console.log('Erro ao registrar chegada', e)
      toast.dismiss(toastId)
      toast.error('Erro ao registrar chegada!')
    } finally {
      queryClient.invalidateQueries()
    }
    setIsArrivalModallOpen(false)
  }

  function handleRegistrarChegada(purchaseRequest: GetClinicPurchaseRequestsResponse[0]) {
    setSelectedPurchaseRequest(purchaseRequest)
    setIsArrivalModallOpen(true)
  }

  function handleConfirmCancelPurchaseRequest(
    purchaseRequest: GetClinicPurchaseRequestsResponse[0]
  ) {
    setSelectedPurchaseRequest(purchaseRequest)
    setIsCancelPurchaseRequestModalOpen(true)
  }

  async function handleConfirmDeletion() {
    if (!selectedPurchaseRequest) return
    const toastId = toast.loading('Deletando solicitação de compra...')
    try {
      await clinicDeletePurchaseRequestMutation.mutateAsync({
        purchaseRequestId: selectedPurchaseRequest.id,
      })
      toast.dismiss(toastId)
      toast.success('Solicitação de compra deletada com sucesso!')
      setSelectedPurchaseRequest(null)
      setIsCancelPurchaseRequestModalOpen(false)
    } catch (e) {
      toast.dismiss(toastId)
      toast.error('Erro ao deletar solicitação de compra!')
    } finally {
      queryClient.invalidateQueries()
    }
  }

  async function handleUploadInvoiceSubmit(invoice: File) {
    if (!selectedPurchaseRequest) return
    const toastId = toast.loading('Enviando nota fiscal...')
    try {
      await clinicUploadInvoiceMutation.mutateAsync({
        purchaseRequestId: selectedPurchaseRequest.id,
        body: {
          invoice,
        },
      })
      toast.dismiss(toastId)
      toast.success('Nota fiscal enviada com sucesso!')
      setIsUploadInvoiceModalOpen(false)
      setSelectedPurchaseRequest(null)
      queryClient.invalidateQueries()
    } catch (e) {
      toast.dismiss(toastId)
      toast.error('Erro ao enviar nota fiscal!')
    }
  }

  const renderSubComponent = ({ row }: { row: GetClinicPurchaseRequestsResponse[0] }) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px]">Item</TableHead>
          <TableHead>Quantidade Necessária</TableHead>
          <TableHead>Quantidade Pedida</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {row.purchaseRequestItems.map((purchaseRequestItem) => (
          <TableRow key={purchaseRequestItem.id}>
            <TableCell>{purchaseRequestItem.item.name}</TableCell>
            <TableCell>{purchaseRequestItem.quantityNeeded}</TableCell>
            <TableCell>{purchaseRequestItem.quantityBought}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )

  const getRowCanExpand = (row: GetClinicPurchaseRequestsResponse[0]) =>
    row.purchaseRequestItems.length > 0

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-2xl font-bold mb-4">Solicitações de Compra</h2>
      <Button size="sm" onClick={() => setIsNewPurchaseRequestModalOpen(true)}>
        Nova Solicitação de Compra
      </Button>
      <ExpandableTable
        data={solicitacoesCompra ?? []}
        columns={columns}
        renderSubComponent={renderSubComponent}
        getRowCanExpand={getRowCanExpand}
      />
      {selectedPurchaseRequest && (
        <PurchaseRequestArrivedModal
          isOpen={isArrivalModalOpen}
          onClose={() => setIsArrivalModallOpen(false)}
          onSubmit={handleSubmitArrival}
          purchaseRequest={selectedPurchaseRequest}
        />
      )}
      <UploadInvoicePurchaseRequestModal
        isOpen={isUploadInvoiceModalOpen}
        onClose={() => setIsUploadInvoiceModalOpen(false)}
        onSubmit={handleUploadInvoiceSubmit}
      />
      <NewPurchaseRequestModal
        isOpen={isNewPurchaseRequestModalOpen}
        onClose={() => setIsNewPurchaseRequestModalOpen(false)}
        onSubmit={handleNewPurchaseRequest}
      />
      <ConfirmDeletionModal
        isOpen={isCancelPurchaseRequestModalOpen}
        onClose={() => setIsCancelPurchaseRequestModalOpen(false)}
        onConfirm={handleConfirmDeletion}
        title="Deletar Solicitação de Compra"
        description="Você tem certeza que deseja deletar esta solicitação de compra?"
      />
    </div>
  )
}

OrdemsDeCompraPage.layout = (page: ReactNode) => <ClinicLayout>{page}</ClinicLayout>
