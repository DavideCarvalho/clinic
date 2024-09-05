import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Form } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { getQueryClient } from '~/lib/query_client'
import { ClinicLayout } from '~/layouts/clinic_layout'

const schema = z.object({
  nome: z.string().min(1),
  quantidade: z.number().min(0),
  valorUnitario: z.number().min(0).step(0.01),
})

export default function NewItemPage() {
  const queryClient = getQueryClient()
  const form = useForm<z.infer<typeof schema>>({
    defaultValues: {
      nome: '',
      quantidade: 0,
      valorUnitario: 1,
    },
  })

  function handleSubmit(data: z.infer<typeof schema>) {
    // Aqui você pode adicionar a lógica para enviar os dados para o backend
    console.log('Dados do formulário:', data)
    // Resetar o formulário após o envio
    form.reset()
    queryClient.invalidateQueries()
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center content-center">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Adicionar Novo Item ao Inventário
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome do Item</Label>
                <Input {...form.register('nome')} placeholder="Digite o nome do item" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="quantidade">Quantidade</Label>
                <Input
                  {...form.register('nome')}
                  type="number"
                  min="0"
                  placeholder="Digite a quantidade"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="preco">Valor unitário</Label>
                <Input
                  {...form.register('nome')}
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="Digite o valor unitário"
                />
              </div>
              <Button type="submit" className="w-full">
                Adicionar Item
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

// @ts-expect-error layout is only for inertia but there's no type for that
NewItemPage.layout = (page) => <ClinicLayout>{page}</ClinicLayout>
