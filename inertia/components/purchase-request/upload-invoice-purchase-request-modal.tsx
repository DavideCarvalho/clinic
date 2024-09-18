import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Upload } from 'lucide-react'

const formSchema = z.object({
  invoiceFile: z.instanceof(File, { message: 'Invoice file is required' }),
})

type UploadInvoicePurchaseRequestModalFormValues = z.infer<typeof formSchema>

interface UploadInvoicePurchaseRequestModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (invoice: File) => Promise<void>
}

export function UploadInvoicePurchaseRequestModal({
  isOpen,
  onClose,
  onSubmit,
}: UploadInvoicePurchaseRequestModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UploadInvoicePurchaseRequestModalFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      invoiceFile: undefined,
    },
  })

  const onSubmitForm = async (data: UploadInvoicePurchaseRequestModalFormValues) => {
    setIsSubmitting(true)
    try {
      await onSubmit(data.invoiceFile)
      reset()
      onClose()
    } catch (error) {
      console.error('Error uploading invoice:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          reset()
          onClose()
        }
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload Nota Fiscal</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="invoice-file">Nota fiscal</Label>
            <Controller
              name="invoiceFile"
              control={control}
              render={({ field: { onChange, value, ...field } }) => (
                <Input
                  id="invoice-file"
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      onChange(file)
                    }
                  }}
                  accept=".pdf,.jpg,.jpeg,.png"
                  {...field}
                />
              )}
            />
            {errors.invoiceFile && (
              <p className="text-sm text-red-500">{errors.invoiceFile.message}</p>
            )}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Uploading...' : 'Upload'}
              <Upload className="ml-2 h-4 w-4" />
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
