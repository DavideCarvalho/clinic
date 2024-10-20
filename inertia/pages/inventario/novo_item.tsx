import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Form } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { ClinicLayout } from '~/layouts/clinic_layout'
import { Link } from '@inertiajs/react'
import { ArrowLeft } from 'lucide-react'
import { SelectWithSearch } from '~/lib/common/select-with-search'

const schema = z.object({
  name: z.string().min(1),
  minimumQuantity: z.number().min(0),
  itemCategoryId: z.string().uuid(),
})

export default function NewItemPage({ categories }) {
  // const saveNewItemMutation = useMutation({
  //   mutationFn: async ({ name, minimumQuantity, itemCategoryId }: z.infer<typeof schema>) => {
  //     const toastId = toast.loading('Criando item...')
  //     try {
  //       await createItem({
  //         name,
  //         minimumQuantity,
  //         itemCategoryId,
  //       })
  //       toast.dismiss(toastId)
  //       toast.success('Item criado com sucesso!')
  //       router.visit('/inventario')
  //     } catch (e) {
  //       toast.dismiss(toastId)
  //       toast.error('Erro ao criar o item!')
  //     }
  //   },
  // })

  const form = useForm<z.infer<typeof schema>>({
    defaultValues: {
      name: '',
      itemCategoryId: '',
    },
  })

  const options =
    categories?.map((category) => ({
      value: category.id,
      label: category.name,
    })) ?? []

  const itemCategoryId = form.watch('itemCategoryId')

  function handleSubmit(data: z.infer<typeof schema>) {
    // if (saveNewItemMutation.isPending) return
    // saveNewItemMutation
    //   .mutateAsync(data)
    //   .then(() => {
    //     form.reset()
    //   })
    //   .finally(() => {
    //     router.reload()
    //     saveNewItemMutation.reset()
    //   })
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
                {/* {saveNewItemMutation.isPending && (
                  <LoaderIcon className="ml-2 h-4 w-4 animate-spin" />
                )} */}
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
