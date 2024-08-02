'use client'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

import { Document, Page, pdfjs } from 'react-pdf'
import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Loader2Icon, RotateCw, ZoomInIcon, ZoomOutIcon } from 'lucide-react'

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

function PdfView({ url }: { url: string }) {
  const [numPages, setNumPages] = useState<number>()
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [file, setFile] = useState<Blob | null>(null)
  const [rotation, setRotation] = useState<number>(0)
  const [scale, setScale] = useState<number>(1)

  useEffect(() => {
    const fetchFile = async () => {
      const response = await fetch(url)
      const file = await response.blob()
      setFile(file)
    }
    fetchFile()
  }, [url])

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }): void => {
    setNumPages(numPages)
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      {!file ? (
        <Loader2Icon className="h-20 w-20 animate-spin text-primary mt-20" />
      ) : (
        <Document
          loading={null}
          file={file}
          rotate={rotation}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page className="shadow-sm" scale={scale} pageNumber={pageNumber} />
        </Document>
      )}
    </div>
  )
}

export default PdfView
