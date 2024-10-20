import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Form } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { ClinicLayout } from '~/layouts/clinic_layout'
import { Link, router } from '@inertiajs/react'
import { ArrowLeft, LoaderIcon } from 'lucide-react'
import { SelectWithSearch } from '~/lib/common/select-with-search'
import { tuyau } from '~/api/tuyau-client'
import { toast } from 'sonner'
import { AddInventoryItemControllerResponse } from '#controllers/inertia/add_inventory_item_controller'
import { Propsify } from '#controllers/utils/propsify'
import { ReactNode, useState } from 'react'

const schema = z.object({
  name: z.string().min(1),
  minimumQuantity: z.number().min(0),
  itemCategoryId: z.string().uuid(),
})

type NewItemPageProps = Propsify<AddInventoryItemControllerResponse>

export default function NewItemPage({ categories }: NewItemPageProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const form = useForm<z.infer<typeof schema>>({
    defaultValues: {
      name: '',
      itemCategoryId: '',
    },
  })

  const options = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }))

  const itemCategoryId = form.watch('itemCategoryId')

  async function handleSubmit(data: z.infer<typeof schema>) {
    setIsSubmitting(true)
    const toastId = toast.loading('Criando item...')
    try {
      await tuyau.$route('api.v1.inventory.createItem').$post(data)
      toast.dismiss(toastId)
      toast.success('Item criado com sucesso!')
      router.visit('/inventario')
    } catch (e) {
      toast.dismiss(toastId)
      toast.error('Erro ao criar o item!')
    } finally {
      setIsSubmitting(false)
    }
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
                <Input {...form.register('name')} placeholder="Digite o nome do item" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nome">Quantidade mínima</Label>
                <Input
                  {...form.register('minimumQuantity')}
                  type="number"
                  placeholder="Digite a quantidade mínima"
                />
              </div>
              <div className="space-y-2">
                <SelectWithSearch
                  value={itemCategoryId}
                  onChange={(value) => form.setValue('itemCategoryId', value)}
                  placeholder="Selecione uma categoria"
                  options={options}
                />
              </div>
              <Button type="submit" className="w-full">
                Adicionar Item
                {isSubmitting ? <LoaderIcon className="ml-2 h-4 w-4 animate-spin" /> : null}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

NewItemPage.layout = (page: ReactNode) => <ClinicLayout>{page}</ClinicLayout>
