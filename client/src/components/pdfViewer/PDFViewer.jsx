import React from 'react'
import { pdfjs } from 'react-pdf';
import pdf from "../../../public/L11.pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

import { useState } from 'react';
import { Document, Page } from 'react-pdf';

export default function PDFViewer() {
    const [numPages, setNumPages] = useState();
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
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
            <p>
                Page {pageNumber} of {numPages}
            </p>
        </div>
    );
}
