'use client'

import { useRouter } from 'next/navigation'
import byteSize from 'byte-size'

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
  return (
    <div className="flex flex-col w-64 h-80 rounded-xl bg-secondary drop-shadow-md justify-between p-4 transition-all transform hover:scale-105 hover:bg-slate-300 hover:text-primary-foreground cursor-pointer group border border-border">
      <div
        className="flex-1"
        onClick={() => {
          router.push(`/dashboard/files/${id}`)
        }}
      >
        <p className="font-semibold line-clamp-2">
          {name.replaceAll('-', ' ')}
        </p>
        <p className="text-sm text-secondary-foreground/50 group-hover:text-primary-foreground">
          {/* render size in kbs */}
          {byteSize(size).value} KB
        </p>
      </div>
    </div>
  )
}

export default Document
