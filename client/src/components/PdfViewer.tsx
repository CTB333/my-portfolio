import React, { useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";

type PdfViewerProps = {
  url: File;
  scale?: number;
};

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   "pdfjs-dist/build/pdf.worker.min.js",
//   import.meta.url
// ).toString();

// pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js"

const url = `//cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
pdfjs.GlobalWorkerOptions.workerSrc = url;

export const PdfViewer = ({ url, scale = 1 }: PdfViewerProps) => {
  const ref = useRef<Element>(null);

  return (
    <Document ref={ref} file={url}>
      <Page scale={scale} pageNumber={1} />
    </Document>
  );
};
