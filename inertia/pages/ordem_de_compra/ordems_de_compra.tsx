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
import ModalChegada from '~/components/purchase-order/item-received'

type Item = {
  id: number
  nome: string
  quantidadeSolicitada: number
  quantidadeRecebida: number
}

type SolicitacaoCompra = {
  id: number
  numero: string
  data: string
  status: string
  itens: Item[]
}

const solicitacoesCompra: SolicitacaoCompra[] = [
  {
    id: 1,
    numero: 'SC001',
    data: '2023-05-15',
    status: 'Pendente',
    itens: [
      { id: 1, nome: 'Laptop', quantidadeSolicitada: 5, quantidadeRecebida: 3 },
      { id: 2, nome: 'Mouse', quantidadeSolicitada: 10, quantidadeRecebida: 10 },
    ],
  },
  {
    id: 2,
    numero: 'SC002',
    data: '2023-05-16',
    status: 'Parcialmente Recebido',
    itens: [
      { id: 3, nome: 'Teclado', quantidadeSolicitada: 8, quantidadeRecebida: 5 },
      { id: 4, nome: 'Monitor', quantidadeSolicitada: 3, quantidadeRecebida: 0 },
    ],
  },
]

export default function OrdemsDeCompraPage() {
  const [modalChegadaAberto, setModalChegadaAberto] = useState(false)
  const [itemSelecionado, setItemSelecionado] = useState<Item | null>(null)
  const [solicitacaoSelecionada, setSolicitacaoSelecionada] = useState<SolicitacaoCompra | null>(
    null
  )
  const columns: Column<SolicitacaoCompra>[] = [
    {
      header: 'Número',
      accessorKey: 'numero',
    },
    {
      header: 'Data',
      accessorKey: 'data',
    },
    {
      header: 'Status',
      accessorKey: 'status',
    },
  ]

  const handleSubmitChegada = (data: { quantidade: number; dataChegada: Date }) => {
    if (solicitacaoSelecionada && itemSelecionado) {
      console.log('Chegada registrada', {
        solicitacao: solicitacaoSelecionada.numero,
        item: itemSelecionado.nome,
        quantidade: data.quantidade,
        dataChegada: data.dataChegada,
      })
      // Aqui você implementaria a lógica para atualizar o estado da aplicação
      // e possivelmente enviar os dados para o backend
    }
    setModalChegadaAberto(false)
  }

  const handleRegistrarChegada = (solicitacao: SolicitacaoCompra, item: Item) => {
    setSolicitacaoSelecionada(solicitacao)
    setItemSelecionado(item)
    setModalChegadaAberto(true)
  }

  const handleRegistrarErro = (solicitacao: SolicitacaoCompra, item: Item) => {
    console.log('Registrar erro', solicitacao.numero, item.nome)
  }

  const renderSubComponent = ({ row }: { row: SolicitacaoCompra }) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px]">Item</TableHead>
          <TableHead>Quantidade Solicitada</TableHead>
          <TableHead>Quantidade Recebida</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {row.itens.map((subItem) => (
          <TableRow key={subItem.id}>
            <TableCell>{subItem.nome}</TableCell>
            <TableCell>{subItem.quantidadeSolicitada}</TableCell>
            <TableCell>{subItem.quantidadeRecebida}</TableCell>
            <TableCell>
              {subItem.quantidadeRecebida >= subItem.quantidadeSolicitada
                ? 'Completo'
                : subItem.quantidadeRecebida > 0
                  ? 'Parcial'
                  : 'Pendente'}
            </TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleRegistrarChegada(row, subItem)}
                >
                  <PackageCheck className="mr-2 h-4 w-4" />
                  Chegou
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleRegistrarErro(row, subItem)}
                  className="bg-red-500 text-white hover:bg-red-600"
                >
                  <PackageX className="mr-2 h-4 w-4" />
                  Errado
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )

  const getRowCanExpand = (row: SolicitacaoCompra) => row.itens.length > 0

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-2xl font-bold mb-4">Solicitações de Compra</h2>
      <ExpandableTable
        data={solicitacoesCompra}
        columns={columns}
        renderSubComponent={renderSubComponent}
        getRowCanExpand={getRowCanExpand}
      />
      {itemSelecionado && (
        <ModalChegada
          isOpen={modalChegadaAberto}
          onClose={() => setModalChegadaAberto(false)}
          onSubmit={handleSubmitChegada}
          itemNome={itemSelecionado.nome}
          quantidadeMaxima={
            itemSelecionado.quantidadeSolicitada - itemSelecionado.quantidadeRecebida
          }
        />
      )}
    </div>
  )
}

OrdemsDeCompraPage.layout = (page: ReactNode) => <ClinicLayout>{page}</ClinicLayout>
