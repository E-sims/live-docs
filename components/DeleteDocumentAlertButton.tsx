'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { deleteDocument } from '@/actions/deleteDocument'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'

export function DeleteDocumentAlertButton({
  alertMessage,
  isDeleting,
  hasActiveMembership,
  id,
  startTransaction,
}: {
  alertMessage: string
  isDeleting: boolean
  hasActiveMembership: boolean
  id: string
  startTransaction: any
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className="text-destructive"
          disabled={isDeleting || !hasActiveMembership}
          variant="outline"
        >
          <Trash2 className="h-6 w-6" />
          {!hasActiveMembership && <span className="ml-2">PRO Feature</span>}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>{alertMessage}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              startTransaction(async () => {
                await deleteDocument(id)
              })
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
