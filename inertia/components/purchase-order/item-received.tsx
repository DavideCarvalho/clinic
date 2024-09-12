import { useForm } from 'react-hook-form'
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

type ModalChegadaProps = {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: FormValues) => void
  itemNome: string
}

type FormValues = {
  dataChegada: Date
}

export default function ModalChegada({ isOpen, onClose, onSubmit, itemNome }: ModalChegadaProps) {
  const form = useForm<FormValues>({
    defaultValues: {
      dataChegada: new Date(),
    },
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
      title={`Registrar Chegada - ${itemNome}`}
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
        </form>
      </Form>
    </GenericModal>
  )
}
