'use client'

import { useForm, useFieldArray, useWatch } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { PlusIcon, MinusIcon, XIcon } from 'lucide-react'
import GenericModal from '../common/generic-submit-modal'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { tuyau } from '~/api/tuyau-client'
import { use, useEffect, useRef, useState } from 'react'
import { ItemDTO } from '#controllers/dto/item.dto'
import { ItemSupplierDTO } from '#controllers/dto/item_supplier.dto'

const schema = z.object({
  fornecedor: z.string().min(1, 'Selecione um fornecedor'),
  itens: z
    .array(
      z.object({
        id: z.string().min(1, 'Selecione um item'),
        quantidade: z.number().min(1, 'A quantidade deve ser maior que zero'),
      })
    )
    .min(1, 'Adicione pelo menos um item'),
})

export type NewPurchaseRequestFormValues = z.infer<typeof schema>

type NewPurchaseRequestModalProps = {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: NewPurchaseRequestFormValues) => void
}

export function NewPurchaseRequestModal({
  isOpen,
  onClose,
  onSubmit,
}: NewPurchaseRequestModalProps) {
  const [items, setItems] = useState<ItemDTO[]>([])
  const [suppliers, setSuppliers] = useState<ItemSupplierDTO[]>([])
  // const { data: items2 } = use(tuyau.$route('api.v1.inventory.getClinicItems', {}).$get())
  useEffect(() => {
    async function getClinicItems() {
      const { data, error } = await tuyau.$route('api.v1.inventory.getClinicItems', {}).$get()
      if (error) return
      setItems(data)
    }
    getClinicItems()
  }, [])

  useEffect(() => {
    async function getClinicSuppliers() {
      const { data, error } = await tuyau
        .$route('api.v1.itemSuppliers.getClinicSuppliers', {})
        .$get()
      if (error) return
      setSuppliers(data as any)
    }
    getClinicSuppliers()
  }, [])

  const form = useForm<NewPurchaseRequestFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      fornecedor: '',
      itens: [{ id: '', quantidade: 1 }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'itens',
  })

  const watchedItems = useWatch({
    control: form.control,
    name: 'itens',
  })

  async function handleSubmit(data: NewPurchaseRequestFormValues) {
    await onSubmit(data)
    onClose()
  }

  const selectedItemIds = watchedItems.map((item) => item.id).filter(Boolean)
  const availableItems = items?.filter((item) => !selectedItemIds.includes(item.id)) || []

  const handleRemove = (index: number) => {
    remove(index)
  }

  const isLastItemSelected = watchedItems[watchedItems.length - 1]?.id !== ''

  return (
    <GenericModal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={form.handleSubmit(handleSubmit)}
      title="Criar Solicitação de Compra"
      submitLabel="Criar Solicitação"
      closeLabel="Cancelar"
      isSubmitDisabled={!form.formState.isValid}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="fornecedor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fornecedor</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um fornecedor" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {suppliers?.map((supplier) => (
                      <SelectItem key={supplier.id} value={supplier.id}>
                        {supplier.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {fields.map((field, index) => (
            <div key={field.id} className="space-y-2">
              <div className="grid grid-cols-[1fr,auto,auto] gap-4 items-end">
                <FormField
                  control={form.control}
                  name={`itens.${index}.id`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Item {index + 1}</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={`w-full justify-between ${!field.value && 'text-muted-foreground'}`}
                            >
                              {field.value
                                ? items?.find((item) => item.id === field.value)?.name
                                : 'Selecione um item'}
                              <XIcon
                                className={`ml-2 h-4 w-4 opacity-50 ${!field.value && 'hidden'}`}
                                onClick={(e) => {
                                  e.stopPropagation()
                                  field.onChange('')
                                }}
                              />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            <CommandInput placeholder="Buscar item..." />
                            <CommandList>
                              <CommandEmpty>Nenhum item disponível.</CommandEmpty>
                              <CommandGroup>
                                {availableItems.map((item) => (
                                  <CommandItem
                                    key={item.id}
                                    value={item.name}
                                    onSelect={() => {
                                      field.onChange(item.id)
                                    }}
                                  >
                                    {item.name}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`itens.${index}.quantidade`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantidade</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                          className="w-20"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name={`itens.${index}.actions`}
                  render={() => (
                    <FormItem>
                      <div className="flex space-x-2">
                        {index === fields.length - 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => append({ id: '', quantidade: 1 })}
                            disabled={!isLastItemSelected || availableItems.length === 0}
                          >
                            <PlusIcon className="h-4 w-4" />
                          </Button>
                        )}
                        {index > 0 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => handleRemove(index)}
                          >
                            <MinusIcon className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          ))}
        </form>
      </Form>
    </GenericModal>
  )
}
