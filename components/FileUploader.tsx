'use client'

import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import {
  CheckCircleIcon,
  CircleArrowDown,
  HammerIcon,
  RocketIcon,
  SaveIcon,
} from 'lucide-react'

function FileUploader() {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Do something with the files
    console.log(acceptedFiles)
  }, [])
  const { getRootProps, getInputProps, isDragActive, isFocused, isDragAccept } =
    useDropzone({
      onDrop,
    })
  return (
    <div className="flex flex-col gap-4 items-center max-w-7xl mx-auto">
      <div
        {...getRootProps()}
        className={`p-10 border-2 border-border border-dashed rounded-lg flex flex-col items-center justify-center gap-y-2 mt-10 w-[90%] h-96 text-primary cursor-pointer ${
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
              <CircleArrowDown className="h-16 w-16 animate-bounce" />
              <p className="text-center">
                Drag &apos;n&apos; drop some files here, or click to select
                files
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default FileUploader
