import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '~/lib/components/ui/button'
import { Calendar } from '~/lib/components/ui/calendar'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '~/lib/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/lib/components/ui/form'
import { Input } from '~/lib/components/ui/input'
import { Label } from '~/lib/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '~/lib/components/ui/popover'
import { toast } from 'sonner'
import { DateTime } from 'luxon'

const schema = z.object({
  clientEmail: z
    .string({ required_error: 'Email do paciente é obrigatório' })
    .email('Email inválido'),
  startDate: z.date({ required_error: 'Data de início é obrigatória' }),
  endDate: z.date({ required_error: 'Data de término é obrigatória' }),
  files: z.array(z.instanceof(File)).min(1, { message: 'Nenhum arquivo selecionado' }),
})

interface NewContractModalProps {
  isOpen: boolean
  onSubmit: () => void
  onClose: () => void
}

export function NewContractModal({ isOpen, onSubmit, onClose }: NewContractModalProps) {
  const queryClient = useQueryClient()
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  })

  const { mutateAsync: createContract } = useMutation({
    mutationFn: async ({ startDate, endDate, clientEmail, files }: z.infer<typeof schema>) => {
      const filesInBase64: string[] = []
      for (const file of files) {
        filesInBase64.push(await getBase64(file))
      }
      return fetch('/api/v1/contracts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          startDate: DateTime.fromJSDate(startDate),
          endDate: DateTime.fromJSDate(endDate),
          description: '',
          clientEmail,
          files: filesInBase64,
        }),
      }).then((res) => {
        if (!res.ok) throw new Error(res.statusText)
        return res.json()
      })
    },
  })

  function getBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = reject
    })
  }

  const startDate = form.watch('startDate')
  const endDate = form.watch('endDate')

  async function onSubmitForm(data: z.infer<typeof schema>) {
    toast.loading('Criando contrato...')
    try {
      await createContract({
        startDate: data.startDate,
        endDate: data.endDate,
        clientEmail: data.clientEmail,
        files: data.files,
      })
      toast.dismiss()
      toast.success('Contrato criado com sucesso!')
      onSubmit()
    } catch (e) {
      toast.dismiss()
      toast.error('Erro ao criar o contrato!')
    } finally {
      queryClient.invalidateQueries()
    }
  }
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmitForm)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Novo Contrato</DialogTitle>
            </DialogHeader>
            <FormField
              control={form.control}
              name="clientEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email do paciente</FormLabel>
                  <FormControl>
                    <Input placeholder="meu@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data de início</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start font-normal">
                          {field.value ? (
                            format(field.value, 'dd/MM/yyyy')
                          ) : (
                            <span>Escolha uma data</span>
                          )}
                          <div className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={(date) => field.onChange(date)}
                          toDate={endDate ?? undefined}
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data de término</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start font-normal">
                          {field.value ? (
                            format(field.value, 'dd/MM/yyyy')
                          ) : (
                            <span>Escolha uma data</span>
                          )}
                          <div className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={(date) => field.onChange(date)}
                          fromDate={startDate ?? undefined}
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="space-y-2">
              <Label htmlFor="contract-file">Contrato escaneado</Label>
              <Input
                id="contract-file"
                type="file"
                accept="image/png, image/jpeg"
                multiple
                onChange={(e) => {
                  if (!e.target.files?.length) return
                  const files: File[] = []
                  for (const file of e.target.files) {
                    files.push(file)
                  }
                  form.setValue('files', files)
                }}
              />
            </div>
            <DialogFooter>
              <Button
                onClick={() => form.handleSubmit(onSubmitForm)()}
                disabled={form.formState.isSubmitting}
                type="submit"
                className="w-full"
              >
                Enviar
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Form>
    </Dialog>
  )
}
