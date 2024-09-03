import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table'
import { Head, Link } from '@inertiajs/react'
import { Progress } from '~/lib/components/ui/progress'
import { AlertTriangle, DollarSign, Package } from 'lucide-react'

export default function InventaryPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Clinicare - Dashboard</title>
        <meta name="description" content="Clinicare - Dashboard" />
      </Head>
      <header className="bg-primary text-primary-foreground py-4 px-6 flex items-center justify-between">
        <div className="flex items-center gap-4 ">
          <ContactIcon className="w-6 h-6 text-purple-400" />
          <h1 className="text-xl font-bold text-purple-400">Clinicare</h1>
        </div>
        <nav className="flex items-center gap-4">
          <Link href="/" className="hover:underline">
            Dashboard
          </Link>
        </nav>
      </header>
      <main className="flex-1 p-6 gap-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-purple-600 mb-4">Visão Geral do Inventário</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Itens</CardTitle>
                <Package className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,543</div>
                <p className="text-xs text-muted-foreground">Em 5 categorias diferentes</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Itens com Estoque Baixo</CardTitle>
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">23</div>
                <p className="text-xs text-muted-foreground">Precisam de reabastecimento</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Valor Total do Inventário</CardTitle>
                <DollarSign className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ 287.650</div>
                <p className="text-xs text-muted-foreground">Atualizado diariamente</p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Itens Mais Utilizados</CardTitle>
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
                  <TableRow>
                    <TableCell>Álcool 70%</TableCell>
                    <TableCell>Limpeza</TableCell>
                    <TableCell className="text-red-500">5 litros</TableCell>
                    <TableCell>20 litros</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Esparadrapo</TableCell>
                    <TableCell>Suprimentos</TableCell>
                    <TableCell className="text-yellow-500">10 rolos</TableCell>
                    <TableCell>15 rolos</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Agulhas</TableCell>
                    <TableCell>Suprimentos</TableCell>
                    <TableCell className="text-yellow-500">200 unidades</TableCell>
                    <TableCell>250 unidades</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

function ContactIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <title>Icon</title>
      <path d="M17 18a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <circle cx="12" cy="10" r="2" />
      <line x1="8" x2="8" y1="2" y2="4" />
      <line x1="16" x2="16" y1="2" y2="4" />
    </svg>
  )
}
