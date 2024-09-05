import { useState, useMemo, useEffect } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ClinicLayout } from '~/layouts/clinic_layout'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-react'
import { DeepNonFunctionAndNonDollarProperties, getClinicItems } from '~/api/inventory.api'
import Item from '#models/item'
import { useQuery } from '@tanstack/react-query'

type InventoryItem = {
  id: number
  nome: string
  quantidade: number
  preco: number
  descricao: string
}

const inventoryData: InventoryItem[] = [
  { id: 1, nome: 'Laptop', quantidade: 50, preco: 999.99, descricao: 'Laptop de alta performance' },
  { id: 2, nome: 'Mouse', quantidade: 100, preco: 29.99, descricao: 'Mouse ergonômico' },
  { id: 3, nome: 'Teclado', quantidade: 75, preco: 59.99, descricao: 'Teclado mecânico' },
  {
    id: 4,
    nome: 'Monitor',
    quantidade: 30,
    preco: 299.99,
    descricao: 'Monitor 4K de 27 polegadas',
  },
  {
    id: 5,
    nome: 'Headset',
    quantidade: 60,
    preco: 89.99,
    descricao: 'Headset com cancelamento de ruído',
  },
  { id: 6, nome: 'Webcam', quantidade: 40, preco: 79.99, descricao: 'Webcam Full HD' },
  {
    id: 7,
    nome: 'Impressora',
    quantidade: 25,
    preco: 199.99,
    descricao: 'Impressora multifuncional',
  },
  {
    id: 8,
    nome: 'Roteador',
    quantidade: 35,
    preco: 69.99,
    descricao: 'Roteador Wi-Fi de alta velocidade',
  },
  { id: 9, nome: 'HD Externo', quantidade: 55, preco: 119.99, descricao: 'HD Externo 2TB' },
  { id: 10, nome: 'Pen Drive', quantidade: 150, preco: 19.99, descricao: 'Pen Drive 64GB' },
  {
    id: 11,
    nome: 'Carregador',
    quantidade: 80,
    preco: 39.99,
    descricao: 'Carregador USB-C rápido',
  },
  { id: 12, nome: 'Cabo HDMI', quantidade: 70, preco: 14.99, descricao: 'Cabo HDMI 2m' },
]

export default function ItemsPage() {
  const { data: items, status: itemsStatus } = useQuery({
    queryKey: ['inventory', 'items'],
    queryFn: () => getClinicItems(),
  })
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5)
  const [data, setData] = useState<DeepNonFunctionAndNonDollarProperties<Item>[]>([])
  const [sortConfig, setSortConfig] = useState<{
    key: keyof DeepNonFunctionAndNonDollarProperties<Item>
    direction: 'asc' | 'desc'
  } | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  // Função para ordenar os itens
  const sortItems = (key: keyof DeepNonFunctionAndNonDollarProperties<Item>) => {
    let direction: 'asc' | 'desc' = 'asc'
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ key, direction })
  }

  // Aplicar ordenação e filtro aos dados
  const sortedAndFilteredItems = useMemo(() => {
    let sortableItems = structuredClone(data)
    if (searchTerm) {
      sortableItems = sortableItems.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1
        }
        return 0
      })
    }
    return sortableItems
  }, [data, sortConfig, searchTerm])

  useEffect(() => {
    if (itemsStatus === 'success') {
      if (!items) return
      setData(items)
    }
  }, [items])

  const pageCount = Math.ceil(sortedAndFilteredItems.length / itemsPerPage)
  const paginatedItems = sortedAndFilteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-4">
        <Input
          placeholder="Pesquisar itens..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Select
          value={itemsPerPage.toString()}
          onValueChange={(value) => setItemsPerPage(Number(value))}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Itens por página" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5 por página</SelectItem>
            <SelectItem value="10">10 por página</SelectItem>
            <SelectItem value="20">20 por página</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">
              <Button variant="ghost" onClick={() => sortItems('name')}>
                Nome
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => sortItems('quantity')}>
                Quantidade
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => sortItems('name')}>
                Preço
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead className="w-[300px]">Descrição</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedItems.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>
                {(item.inventoryValue / 100).toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </TableCell>
              <TableCell>{item.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage((old) => Math.max(old - 1, 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
          Anterior
        </Button>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Página {currentPage} de {pageCount}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage((old) => Math.min(old + 1, pageCount))}
          disabled={currentPage === pageCount}
        >
          Próxima
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

// @ts-expect-error layout is only for inertia but there's no type for that
ItemsPage.layout = (page) => <ClinicLayout>{page}</ClinicLayout>
