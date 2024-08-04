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
    <div className="w-full h-full grid grid-cols-1 items-center justify-center p-2">
      <div className="flex mx-auto sticky top-1 z-50 bg-background/50 backdrop-filter backdrop-blur-lg bg-opacity-50 p-2 rounded-lg border border-border">
        <div className="max-w-6xl px-2 grid grid-cols-6 gap-2">
          <Button
            variant="outline"
            disabled={pageNumber === 1}
            onClick={() => {
              if (pageNumber > 1) {
                setPageNumber(pageNumber - 1)
              }
            }}
          >
            Previous
          </Button>
          <p className="flex items-center justify-center text-foreground">
            {pageNumber} of {numPages}
          </p>
          <Button
            className="border-border border-2"
            variant="outline"
            disabled={pageNumber === numPages}
            onClick={() => {
              if (numPages) {
                if (pageNumber < numPages) {
                  setPageNumber(pageNumber + 1)
                }
              }
            }}
          >
            Next
          </Button>

          <Button
            variant="outline"
            onClick={() => setRotation((rotation + 90) % 360)}
          >
            <RotateCw />
          </Button>

          <Button
            variant="outline"
            disabled={scale >= 1.5}
            onClick={() => {
              setScale(scale * 1.2)
            }}
          >
            <ZoomInIcon />
          </Button>
          <Button
            variant="outline"
            disabled={scale <= 0.75}
            onClick={() => {
              setScale(scale / 1.2)
            }}
          >
            <ZoomOutIcon />
          </Button>
        </div>
      </div>

      {!file ? (
        <Loader2Icon className="h-20 w-20 animate-spin text-primary mt-20" />
      ) : (
        <Document
          loading={null}
          file={file}
          rotate={rotation}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page
            className="shadow-sm h-full w-full flex items-center justify-center mx-auto"
            scale={scale}
            pageNumber={pageNumber}
          />
        </Document>
      )}
    </div>
  )
}

export default PdfView
