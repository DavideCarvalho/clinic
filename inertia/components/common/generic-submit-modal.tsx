import { ReactNode } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

type GenericModalProps = {
  isOpen: boolean
  onClose: () => void
  onSubmit: () => void
  title: string
  children: ReactNode
  submitLabel?: string
  closeLabel?: string
  isSubmitDisabled?: boolean
}

export default function GenericModal({
  isOpen,
  onClose,
  onSubmit,
  title,
  children,
  submitLabel = 'Submeter',
  closeLabel = 'Fechar',
  isSubmitDisabled = false,
}: GenericModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="py-4">{children}</div>
        <DialogFooter className="sm:justify-end">
          <Button variant="outline" onClick={onClose}>
            {closeLabel}
          </Button>
          <Button onClick={onSubmit} disabled={isSubmitDisabled}>
            {submitLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
