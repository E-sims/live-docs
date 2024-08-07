'use client'

import { useRouter } from 'next/navigation'
import byteSize from 'byte-size'
import useSubscription from '@/hooks/useSubscription'
import { useTransition } from 'react'
import { DownloadCloudIcon, TrashIcon } from 'lucide-react'
import { Button } from './ui/button'
import { DeleteDocumentAlertButton } from './DeleteDocumentAlertButton'

function Document({
  id,
  name,
  size,
  downloadUrl,
}: {
  id: string
  name: string
  size: number
  downloadUrl: string
}) {
  const router = useRouter()
  const [isDeleting, startTransaction] = useTransition()
  const { hasActiveMembership } = useSubscription()

  return (
    <div className="flex flex-col w-64 h-80 rounded-xl drop-shadow-md justify-between p-4 transition-all transform bg-card text-card-foreground hover:scale-[1.02] hover:bg-gradient-to-br hover:from-card hover:via-primary/30 hover:to-primary/40 cursor-pointer group border border-border">
      <div
        className="flex-1"
        onClick={() => {
          router.push(`/dashboard/files/${id}`)
        }}
      >
        <p className="font-semibold line-clamp-2">
          {name.replaceAll('-', ' ')}
        </p>
        <p className="text-sm text-card-foreground/70">
          {/* render size in kbs */}
          {byteSize(size).value} KB
        </p>
      </div>

      {/* Actions */}
      <div className="flex space-x-2 justify-end">
        <Button variant="outline" asChild className="group-hover:text-primary">
          <a href={downloadUrl} target="_blank" download>
            <DownloadCloudIcon className="h-6 w-6" />
          </a>
        </Button>
        <DeleteDocumentAlertButton
          alertMessage={`Deleting this document will be permenant`}
          isDeleting={isDeleting}
          hasActiveMembership={hasActiveMembership!}
          id={id}
          startTransaction={startTransaction}
        />
      </div>
    </div>
  )
}

export default Document
