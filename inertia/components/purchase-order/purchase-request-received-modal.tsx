import { useFieldArray, useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import GenericModal from '../common/generic-submit-modal'
import { z } from 'zod'
import { GetClinicPurchaseRequestsResponse } from '~/api/purchase-request.api'
import { useEffect } from 'react'

const schema = z.object({
  dataChegada: z.date(),
  invoice: z.instanceof(File),
  items: z.array(
    z.object({
      itemId: z.string(),
      askedQuantity: z.number(),
      receivedQuantity: z.number(),
    })
  ),
})

export type ModalChegadaFormValues = z.infer<typeof schema>

type ModalChegadaProps = {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: ModalChegadaFormValues) => void
  purchaseRequest: GetClinicPurchaseRequestsResponse[0]
}

export function ModalChegada({ isOpen, onClose, onSubmit, purchaseRequest }: ModalChegadaProps) {
  const form = useForm<ModalChegadaFormValues>({
    defaultValues: {
      dataChegada: new Date(),
    },
  })

  const fieldArray = useFieldArray({
    control: form.control,
    name: 'items',
  })

  useEffect(() => {
    fieldArray.remove()
    for (let index = 0; index < purchaseRequest.purchaseRequestItems.length; index++) {
      const purchaseRequestItem = purchaseRequest.purchaseRequestItems[index]
      fieldArray.insert(index, {
        itemId: purchaseRequestItem.item.id,
        askedQuantity: purchaseRequestItem.quantityNeeded,
        receivedQuantity: purchaseRequestItem.quantityNeeded,
      })
    }
  }, [purchaseRequest])

  const handleSubmit = (data: ModalChegadaFormValues) => {
    onSubmit(data)
    onClose()
  }

  return (
    <GenericModal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={form.handleSubmit(handleSubmit)}
      title={'Registrar Chegada'}
      submitLabel="Salvar"
      closeLabel="Cancelar"
      isSubmitDisabled={!form.formState.isValid}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="dataChegada"
            rules={{ required: 'Data de chegada é obrigatória' }}
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Data de Chegada</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={`w-full pl-3 text-left font-normal ${!field.value && 'text-muted-foreground'}`}
                      >
                        {field.value ? (
                          format(field.value, 'PPP', { locale: ptBR })
                        ) : (
                          <span>Selecione uma data</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="invoice"
            rules={{ required: 'Nota fiscal é obrigatória' }}
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel htmlFor="invoice">Nota fiscal</FormLabel>
                <Input
                  id="invoice"
                  type="file"
                  accept="application/pdf"
                  className="hover:border-primary cursor-pointer"
                  onChange={(event) => {
                    if (!event.target.files?.length) return
                    field.onChange(event.target.files[0])
                  }}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="space-y-2 border p-3 rounded-md">
            {fieldArray.fields.map((field, index) => {
              const purchaseRequestItem = purchaseRequest.purchaseRequestItems.find(
                (i) => i.item.id === field.itemId
              )
              if (!purchaseRequestItem) return null
              const { item } = purchaseRequestItem
              return (
                <div key={field.id} className="py-2 border-b last:border-b-0">
                  <FormLabel className="mb-1 block">{item.name}</FormLabel>
                  <div className="flex items-center justify-between space-x-4">
                    <span className="text-sm text-muted-foreground whitespace-nowrap">
                      Pedido: {field.askedQuantity}
                    </span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">Recebido:</span>
                      <FormField
                        control={form.control}
                        name={`items.${index}.receivedQuantity`}
                        rules={{ required: 'Obrigatório' }}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="number"
                                {...field}
                                onChange={(e) => field.onChange(Number(e.target.value))}
                                className="w-20"
                                placeholder="Qtd."
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </form>
      </Form>
    </GenericModal>
  )
}
