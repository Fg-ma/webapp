import React, { useState, useEffect } from 'react'
import { pdfjs, Document, Page } from 'react-pdf';
import Axios from "axios";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

export default function PDFViewer({ sheet_id }) {
    const [numPages, setNumPages] = useState();
    const [pdfUrl, setPdfUrl] = useState(null);
  
    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };
    
    useEffect(() => {
        Axios.get(`http://localhost:5042/get_sheet/${sheet_id}`).then((response) => {
            const pdfData = response.data[0] ? new Uint8Array(response.data[0].sheet_data.data) : null;
            const url = pdfData ? URL.createObjectURL(new Blob([pdfData], { type: 'application/pdf' })) : null;
            setPdfUrl(url);
        });
    }, [sheet_id]); 
  
    return (
        <div className='w-full'>
            {pdfUrl && 
                <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
                    {Array.from({ length: numPages }, (_, index) => (
                        <div key={`page${index + 1}`} className='mb-6 rounded-md overflow-hidden'>
                            <Page
                                pageNumber={index + 1}
                                renderTextLayer={false}
                                renderAnnotationLayer={false}
                            />
                        </div>
                    ))}
                </Document>
            }
        </div>
    );
  }