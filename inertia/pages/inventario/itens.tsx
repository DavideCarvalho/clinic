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
import { getClinicItems, GetClinicItemsResponse } from '~/api/inventory.api'
import { useQuery } from '@tanstack/react-query'
import { Link } from '@inertiajs/react'

export default function ItemsPage() {
  const { data: items, status: itemsStatus } = useQuery({
    queryKey: ['inventory', 'items'],
    queryFn: () => getClinicItems(),
  })
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5)
  const [data, setData] = useState<GetClinicItemsResponse>(items ?? [])
  const [sortConfig, setSortConfig] = useState<{
    key: keyof GetClinicItemsResponse[0]
    direction: 'asc' | 'desc'
  } | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  const sortItems = (key: keyof GetClinicItemsResponse[0]) => {
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
      <div className="flex justify-end">
        <Link href="/inventario/novo-item">
          <Button>+ Adicionar Item</Button>
        </Link>
      </div>

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
                Valor de inventário
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => sortItems('name')}>
                Ações
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
              <TableCell>
                <Button variant="ghost">
                  Editar
                </Button>
                <Button variant="ghost">
                  Excluir
                </Button>
                <Button variant="ghost">
                  Pedir item
                </Button>
              </TableCell>
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
