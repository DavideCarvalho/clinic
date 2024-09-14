'use client'

import { useForm, useFieldArray } from 'react-hook-form'
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
import { PlusIcon, MinusIcon } from 'lucide-react'
import GenericModal from '../common/generic-submit-modal'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useQuery } from '@tanstack/react-query'
import { getClinicItems } from '~/api/inventory.api'
import { getClinicSuppliers } from '~/api/item-supplier.api'

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

type FormValues = z.infer<typeof schema>

type NewPurchaseRequestModalProps = {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: FormValues) => void
}

export function NewPurchaseRequestModal({
  isOpen,
  onClose,
  onSubmit,
}: NewPurchaseRequestModalProps) {
  const { data: items } = useQuery({
    queryKey: ['inventory', 'items'],
    queryFn: () => getClinicItems(),
  })
  const { data: suppliers } = useQuery({
    queryKey: ['item-suppliers', 'clinic'],
    queryFn: () => getClinicSuppliers(),
  })

  const form = useForm<FormValues>({
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

  const handleSubmit = (data: FormValues) => {
    onSubmit(data)
    onClose()
  }

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
            <div key={field.id} className="flex items-end">
              <FormField
                control={form.control}
                name={`itens.${index}.id`}
                render={({ field }) => (
                  <FormItem className="flex-grow">
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={`w-full justify-between ${!field.value && 'text-muted-foreground'}`}
                          >
                            {field.value
                              ? items?.find((item) => item.id === field.value)?.id
                              : 'Selecione um item'}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput placeholder="Buscar item..." />
                          <CommandEmpty>Nenhum item encontrado.</CommandEmpty>
                          <CommandGroup>
                            {items?.map((item) => (
                              <CommandItem
                                key={item.id}
                                value={item.name}
                                onSelect={() => {
                                  form.setValue(`itens.${index}.id`, item.id)
                                }}
                              >
                                {item.name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
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
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => append({ id: '', quantidade: 1 })}
              >
                <PlusIcon className="h-4 w-4" />
              </Button>
              {index > 0 && (
                <Button type="button" variant="outline" size="icon" onClick={() => remove(index)}>
                  <MinusIcon className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </form>
      </Form>
    </GenericModal>
  )
}
