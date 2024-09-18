import { useState } from 'react'
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

interface UploadInvoicePurchaseRequestModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (invoiceData: { file: File; invoiceNumber: string }) => Promise<void>
  purchaseRequestId: string
}

export function UploadInvoicePurchaseRequestModal({
  isOpen,
  onClose,
  onSubmit,
  purchaseRequestId,
}: UploadInvoicePurchaseRequestModalProps) {
  const [file, setFile] = useState<File | null>(null)
  const [invoiceNumber, setInvoiceNumber] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file || !invoiceNumber) return

    setIsSubmitting(true)
    try {
      await onSubmit({ file, invoiceNumber })
      onClose()
    } catch (error) {
      console.error('Error uploading invoice:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload Invoice</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="invoice-number">Invoice Number</Label>
            <Input
              id="invoice-number"
              value={invoiceNumber}
              onChange={(e) => setInvoiceNumber(e.target.value)}
              placeholder="Enter invoice number"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="invoice-file">Invoice File</Label>
            <Input
              id="invoice-file"
              type="file"
              onChange={handleFileChange}
              accept=".pdf,.jpg,.jpeg,.png"
              required
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting || !file || !invoiceNumber}>
              {isSubmitting ? 'Uploading...' : 'Upload'}
              <Upload className="ml-2 h-4 w-4" />
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
