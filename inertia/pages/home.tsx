import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table'
import { Progress } from '~/lib/components/ui/progress'
import { AlertTriangle, DollarSign, Package } from 'lucide-react'
import { ClinicLayout } from '~/layouts/clinic_layout'
import { formatCurrency } from '~/lib/format-currency'
import { Head } from '@inertiajs/react'

export default function HomePage({ inventoryQuantity, inventoryValue, itemsNeedingReplacement }) {
  const value = inventoryValue ? inventoryValue?.inventoryValue / 100 : 0
  return (
    <>
      <Head>
        <title>Clinicare - Dashboard</title>
        <meta name="description" content="Clinicare - Dashboard" />
      </Head>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Visão Geral do Inventário</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Itens</CardTitle>
              <Package className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{inventoryQuantity?.itemsQuantity}</div>
              <p className="text-xs text-muted-foreground">
                {inventoryQuantity?.categoriesQuantity} categorias diferentes
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Itens com Estoque Baixo</CardTitle>
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{itemsNeedingReplacement?.meta?.total}</div>
              <p className="text-xs text-muted-foreground">Precisam de reabastecimento</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Valor Total do Inventário</CardTitle>
              <DollarSign className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(value)}</div>
              <p className="text-xs text-muted-foreground">Atualizado diariamente</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Itens Mais Utilizados (12 meses)</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Uso Mensal</TableHead>
                  <TableHead>Estoque</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Luvas de Látex</TableCell>
                  <TableCell>Suprimentos</TableCell>
                  <TableCell>1000 unidades</TableCell>
                  <TableCell>
                    <Progress value={70} className="w-[60px]" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Seringas Descartáveis</TableCell>
                  <TableCell>Suprimentos</TableCell>
                  <TableCell>800 unidades</TableCell>
                  <TableCell>
                    <Progress value={55} className="w-[60px]" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Gaze Estéril</TableCell>
                  <TableCell>Suprimentos</TableCell>
                  <TableCell>600 pacotes</TableCell>
                  <TableCell>
                    <Progress value={40} className="w-[60px]" />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Itens que Precisam de Reposição</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Estoque Atual</TableHead>
                  <TableHead>Estoque Mínimo</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {itemsNeedingReplacement.data.data.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.itemCategory.name}</TableCell>
                    <TableCell className="text-red-500">{item.quantity}</TableCell>
                    <TableCell>{item.minimumQuantity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

// @ts-expect-error layout is only for inertia but there's no type for that
HomePage.layout = (page) => <ClinicLayout>{page}</ClinicLayout>
