'use client'

import { useCallback, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import {
  CheckCircleIcon,
  CircleArrowDown,
  HammerIcon,
  RocketIcon,
  SaveIcon,
} from 'lucide-react'
import useUpload, { StatusText } from '@/hooks/useUpload'
import useSubscription from '@/hooks/useSubscription'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'
import UpgradeButton from './UpgradeButton'

function FileUploader() {
  const { progress, status, fileId, handleUpload } = useUpload()
  const { isOverFileLimit, filesLoading } = useSubscription()
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    if (fileId) {
      router.push(`/dashboard/files/${fileId}`)
    }
  }, [fileId, router])

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      // Do something with the files

      const file = acceptedFiles[0]
      if (file) {
        if (!isOverFileLimit && !filesLoading) {
          await handleUpload(file)
        } else {
          toast({
            variant: 'default',
            title: '😬 Free Plan File Limit Reached',
            description: 'Please upgrade to add more documents',
            action: <UpgradeButton />,
          })
        }
      } else {
        // do nothing...
        // toast...
      }
    },
    [handleUpload, isOverFileLimit, filesLoading, toast]
  )

  const statusIcons: {
    [key in StatusText]: JSX.Element
  } = {
    [StatusText.UPLOADING]: <RocketIcon className="h-20 w-20 text-primary" />,
    [StatusText.UPLOADED]: (
      <CheckCircleIcon className="h-20 w-20 text-primary" />
    ),
    [StatusText.SAVING]: <SaveIcon className="h-20 w-20 text-primary" />,
    [StatusText.GENERATING]: <HammerIcon className="h-20 w-20 text-primary" />,
  }

  const { getRootProps, getInputProps, isDragActive, isFocused, isDragAccept } =
    useDropzone({
      onDrop,
      maxFiles: 1,
      accept: {
        'application/pdf': ['.pdf'],
      },
    })

  const uploadInProgress = progress != null && progress >= 0 && progress <= 100

  return (
    <div className="flex flex-col gap-4 items-center max-w-7xl mx-auto">
      {uploadInProgress && (
        <div className="mt-32 flex flex-col items-center justify-center gap-5">
          <div
            className={`radial-progress bg-secondary border-border border-4 ${
              progress === 100 && 'hidden'
            }`}
            role="progressbar"
            style={{
              // @ts-ignore
              '--value': progress,
              '--size': '12rem',
              '--thickness': '1.3rem',
            }}
          >
            {progress} %
          </div>

          {/* Render Status Icon */}
          {
            // @ts-ignore
            statusIcons[status!]
          }

          {/* @ts-ignore */}
          <p className="text-primary animate-pulse">{status}</p>
        </div>
      )}

      {!uploadInProgress && (
        <div
          {...getRootProps()}
          className={`p-10 border-2 border-border border-dashed rounded-lg flex flex-col items-center justify-center gap-y-2 mt-10 w-[90%] h-96 cursor-pointer ${
            isFocused || isDragAccept ? 'bg-secondary' : 'bg-secondary/20'
          }`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center gap-y-2">
            {isDragActive ? (
              <>
                <RocketIcon className="h-16 w-16 animate-ping" />
                <p>Drop the files here ...</p>
              </>
            ) : (
              <>
                <CircleArrowDown
                  strokeWidth={1}
                  className="h-16 w-16 animate-bounce text-primary"
                />
                <p className="text-center text-foreground/70">
                  Drag &apos;n&apos; drop some files here, or click to select
                  files
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default FileUploader
