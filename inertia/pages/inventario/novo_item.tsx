import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Form } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { getQueryClient } from '~/lib/query_client'
import { ClinicLayout } from '~/layouts/clinic_layout'
import { Link } from '@inertiajs/react'
import { ArrowLeft } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { getClinicItemCategories } from '~/api/inventory.api'
import { SelectWithSearch } from '~/lib/common/select-with-search'

const schema = z.object({
  nome: z.string().min(1),
  categoryId: z.string().uuid(),
})

export default function NewItemPage() {
  const queryClient = getQueryClient()
  const { data: categories } = useQuery({
    queryKey: ['inventory', 'item-categories'],
    queryFn: () => getClinicItemCategories(),
  })
  const form = useForm<z.infer<typeof schema>>({
    defaultValues: {
      nome: '',
      categoryId: '',
    },
  })

  const options =
    categories?.map((category) => ({
      value: category.id,
      label: category.name,
    })) ?? []

  const categoryId = form.watch('categoryId')

  function handleSubmit(data: z.infer<typeof schema>) {
    // Aqui você pode adicionar a lógica para enviar os dados para o backend
    console.log('Dados do formulário:', data)
    // Resetar o formulário após o envio
    form.reset()
    queryClient.invalidateQueries()
  }

  return (
    <div className="flex w-full min-h-full flex-col items-center justify-center content-center">
      <div className="flex w-full justify-start">
        <Button>
          <Link href="/inventario" className="text-sm">
            <ArrowLeft className="ml-2 h-4 w-4" />
            Voltar
          </Link>
        </Button>
      </div>
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
                <SelectWithSearch
                  value={categoryId}
                  onChange={(value) => form.setValue('categoryId', value)}
                  placeholder="Selecione uma categoria"
                  options={options}
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
