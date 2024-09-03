import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { CartesianGrid, XAxis, Bar, BarChart } from 'recharts'
import { ChartTooltipContent, ChartTooltip, ChartContainer } from '@/components/ui/chart'
import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { Button } from '~/lib/components/ui/button'
import { NewContractModal } from './containers/new_contract_modal'
import { useState } from 'react'
import { Head, Link } from '@inertiajs/react'
import {
  getActiveContractsQuantity,
  getContractsCreatedInLast12Months,
  getContractsPaginated,
  getContractsQuantityEndingIn30Days,
} from '~/api/contract.api'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '~/lib/components/ui/carousel'

export default function Component() {
  const [openNewContractModal, setOpenNewContractModal] = useState(false)
  const { data: contractsQuantityEndingIn30Days } = useQuery({
    queryKey: ['contracts', 'contractsQuantityEndingIn30Days'],
    queryFn: getContractsQuantityEndingIn30Days,
  })

  const { data: activeContractsQuantity } = useQuery({
    queryKey: ['contracts', 'activeContractsQuantity'],
    queryFn: getActiveContractsQuantity,
  })

  const { data: contracts } = useQuery({
    queryKey: ['contracts'],
    queryFn: () => getContractsPaginated(1, 9),
  })
  const { data: contractsCreatedInLast12Months } = useQuery({
    queryKey: ['contracts', 'contractsCreatedInLast12Months'],
    queryFn: getContractsCreatedInLast12Months,
  })

  function getContractStatus(endDate: Date) {
    const now = new Date()
    const diff = now.getTime() - endDate.getTime()
    if (diff < 0) {
      return 'Em andamento'
    }
    return 'Terminado'
  }

  function getContractStatusColor(endDate: Date) {
    const now = new Date()
    const diff = now.getTime() - endDate.getTime()
    if (diff < 0) {
      return 'bg-green-500'
    }
    return 'bg-red-500'
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Clinicare - Dashboard</title>
        <meta name="description" content="Clinicare - Dashboard" />
      </Head>
      <header className="bg-primary text-primary-foreground py-4 px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <ContactIcon className="w-6 h-6" />
          <h1 className="text-xl font-bold">Clinicare</h1>
        </div>
        <nav className="flex items-center gap-4">
          <Link href="/" className="hover:underline">
            Dashboard
          </Link>
        </nav>
      </header>
      <main className="flex-1 p-6 grid gap-6">
        <Carousel>
          <CarouselContent>
            <CarouselItem className="basis-1/6">
              <Card>
                <CardHeader>
                  <CardTitle>Contratos ativos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold">{activeContractsQuantity?.ammount}</div>
                </CardContent>
              </Card>
            </CarouselItem>
            <CarouselItem className="basis-1/6">
              <Card>
                <CardHeader>
                  <CardTitle>Contratos Acabando em 30 dias</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold">
                    {contractsQuantityEndingIn30Days?.ammount}
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
            <CarouselPrevious />
            <CarouselNext />
          </CarouselContent>
        </Carousel>
        <div className="grid grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Contratos nos ultimos 12 meses</CardTitle>
            </CardHeader>
            <CardContent>
              <BarchartChart
                className="w-full aspect-[16/9]"
                data={contractsCreatedInLast12Months ?? []}
              />
            </CardContent>
          </Card>
          <Card>
            <Button className="w-full" onClick={() => setOpenNewContractModal(true)}>
              Novo Contrato
            </Button>
            <NewContractModal
              isOpen={openNewContractModal}
              onSubmit={() => setOpenNewContractModal(false)}
              onClose={() => setOpenNewContractModal(false)}
            />

            <CardHeader>
              <CardTitle>Contratos</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Paciente</TableHead>
                    <TableHead>Início</TableHead>
                    <TableHead>Término</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contracts?.data?.map((contract) => (
                    <TableRow key={contract.id}>
                      <TableCell>{contract.client.fullName}</TableCell>
                      <TableCell>{format(contract.startDate, 'dd/MM/yyyy')}</TableCell>
                      <TableCell>{format(contract.endDate, 'dd/MM/yyyy')}</TableCell>
                      <TableCell>
                        <Badge className={getContractStatusColor(new Date(contract.endDate))}>
                          {getContractStatus(new Date(contract.endDate))}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

interface BarchartChartProps {
  className?: string
  data: {
    month: string
    year: string
    count: number
  }[]
}

function BarchartChart(props: BarchartChartProps) {
  return (
    <div {...props}>
      <ChartContainer
        config={{
          desktop: {
            label: 'Desktop',
            color: 'hsl(var(--chart-1))',
          },
        }}
        className="min-h-[300px]"
      >
        <BarChart
          accessibilityLayer
          data={props.data?.map((contract) => ({
            month: `${contract.month}/${contract.year}`,
            Contratos: contract.count,
          }))}
        >
          <CartesianGrid vertical={false} />
          <XAxis dataKey="month" />
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Bar dataKey="Contratos" fill="var(--color-desktop)" radius={8} />
        </BarChart>
      </ChartContainer>
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
