import React from 'react'
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

import { useState } from 'react';
import { Document, Page } from 'react-pdf';

export default function PDFViewer({ pdf }) {
    const [pageNumber, setPageNumber] = useState(1);
    const [numPages, setNumPages] = useState();

    const onDocumentLoadSuccess = () => {
        setNumPages(numPages);
    };

    return (
        <div>
            <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess}>
                {Array.apply(null, Array(numPages))
                    .map((x, i) => i+1)
                    .map((page) => {
                        return (
                            <Page 
                                pageNumber={page} 
                                renderTextLayer={false}
                                renderAnnotationLayer={false}
                            />
                        )
                    })
                }
            </Document>
        </div>
    );
}
