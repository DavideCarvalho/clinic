import { ReactNode, useState } from 'react'
import { PackageCheck, PackageX } from 'lucide-react'
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
import { ModalChegada } from '~/components/purchase-order/purchase-request-received'
import {
  getClinicPurchaseRequests,
  GetClinicPurchaseRequestsResponse,
} from '~/api/purchase-request.api'
import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'

export default function OrdemsDeCompraPage() {
  const [modalChegadaAberto, setModalChegadaAberto] = useState(false)
  const [solicitacaoSelecionada, setSolicitacaoSelecionada] = useState<
    GetClinicPurchaseRequestsResponse[0] | null
  >(null)
  const { data: solicitacoesCompra } = useQuery({
    queryKey: ['purchase-requests', 'clinic'],
    queryFn: () => getClinicPurchaseRequests(),
  })
  const columns: Column<GetClinicPurchaseRequestsResponse[0]>[] = [
    { header: 'Quantidade de itens', accessorFn: (row) => row.purchaseRequestItems.length },
    {
      header: 'Criado em',
      accessorFn: (row) => format(row.createdAt, 'dd/MM/yyyy'),
    },
    {
      header: 'Status',
      accessorFn: (row) => {
        if (row.status === 'WAITING_SUPPLIER_SUBMISSION') {
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
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleRegistrarChegada(row.original)}
            >
              <PackageCheck className="mr-2 h-4 w-4" />
              Registrar chegada
            </Button>
          </div>
        )
      },
    },
  ]

  const handleSubmitChegada = (data: { dataChegada: Date }) => {
    if (solicitacaoSelecionada) {
      console.log('Chegada registrada', {
        dataChegada: data.dataChegada,
      })
      // Aqui você implementaria a lógica para atualizar o estado da aplicação
      // e possivelmente enviar os dados para o backend
    }
    setModalChegadaAberto(false)
  }

  const handleRegistrarChegada = (solicitacao: GetClinicPurchaseRequestsResponse[0]) => {
    setSolicitacaoSelecionada(solicitacao)
    setModalChegadaAberto(true)
  }

  const handleRegistrarErro = (solicitacao: GetClinicPurchaseRequestsResponse[0]) => {
    // console.log('Registrar erro', solicitacao.numero, item.nome)
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
      <ExpandableTable
        data={solicitacoesCompra ?? []}
        columns={columns}
        renderSubComponent={renderSubComponent}
        getRowCanExpand={getRowCanExpand}
      />
      {solicitacaoSelecionada && (
        <ModalChegada
          isOpen={modalChegadaAberto}
          onClose={() => setModalChegadaAberto(false)}
          onSubmit={handleSubmitChegada}
          purchaseRequest={solicitacaoSelecionada}
        />
      )}
    </div>
  )
}

OrdemsDeCompraPage.layout = (page: ReactNode) => <ClinicLayout>{page}</ClinicLayout>
