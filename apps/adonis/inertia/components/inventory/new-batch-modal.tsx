import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { Form, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '~/lib/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '~/lib/components/ui/dialog'
import { FormField } from '~/lib/components/ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '~/lib/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/lib/components/ui/select'
import { cn } from '~/lib/utils'
import { ptBR } from 'date-fns/locale'
import { Calendar } from '~/lib/components/ui/calendar'

export interface NewBatchModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

const schema = z.object({
  purchaseOrderId: z.string().uuid(),
  itemId: z.string().uuid(),
  arrivalDate: z.date(),
})

export function NewBatchModal(props: NewBatchModalProps) {
  const purchaseOrders = [
    {
      id: '1',
      nome: 'Item 1',
    },
  ]
  const purchaseOrderItems = [
    {
      id: '1',
      nome: 'Item 1',
    },
  ]
  const form = useForm<z.infer<typeof schema>>({
    defaultValues: {
      arrivalDate: new Date(),
    },
    resolver: zodResolver(schema),
  })
  function onSubmit(data: z.infer<typeof schema>) {
    console.log(data)
  }
  return (
    <Dialog open={props.isOpen} onOpenChange={props.onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Pacote</DialogTitle>
          <DialogDescription>
            Registre a chegada de um novo pacote de um item específico.
          </DialogDescription>
        </DialogHeader>
        <Form>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="purchaseOrderId"
              render={({ field }) => (
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="purchaseOrderId">Pedido de compra</label>
                  <Select value={field.value} onValueChange={(value) => field.onChange(value)}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Selecione um item" />
                    </SelectTrigger>
                    <SelectContent>
                      {purchaseOrders.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            />
            <FormField
              control={form.control}
              name="itemId"
              render={({ field }) => (
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="purchaseOrderId">Item</label>
                  <Select value={field.value} onValueChange={(value) => field.onChange(value)}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Selecione um item" />
                    </SelectTrigger>
                    <SelectContent>
                      {purchaseOrderItems.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            />
            <FormField
              control={form.control}
              name="arrivalDate"
              render={({ field }) => (
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="purchaseOrderId">Item</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'col-span-3 justify-start text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? (
                          format(field.value, 'PPP', { locale: ptBR })
                        ) : (
                          <span>Selecione uma data</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => field.onChange(date)}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              )}
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
