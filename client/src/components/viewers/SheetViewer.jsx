import React, { useState, useEffect } from 'react';
import { pdfjs, Document, Page } from 'react-pdf';
import Axios from "axios";
import SheetHeader from './SheetHeader';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

export default function SheetViewer({ sheet_id }) {
    const [numPages, setNumPages] = useState();
    const [sheetData, setSheetData] = useState({
        sheet_url: null,
        sheet_title: null,
        sheet_subject: null,
        sheet_author: null,
    });
  
    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    useEffect(() => {
        Axios.get(`http://localhost:5042/get_sheet/${sheet_id}`).then((response) => {
            if (response.data[0]) {
                const blobData = new Uint8Array(response.data[0].sheet_data.data);
                const url = URL.createObjectURL(new Blob([blobData], { type: 'application/pdf' }));
                
                setSheetData({
                    sheet_url: url,
                    sheet_title: response.data[0].sheet_title,
                    sheet_subject: response.data[0].sheet_subject,
                    sheet_author: response.data[0].individual_name,
                });
            };
        });
    }, [sheet_id]);
    
    return (
        <div className='w-full'>
            {sheetData.sheet_url && 
                <>
                    <SheetHeader sheetData={sheetData} />
                    <Document file={sheetData.sheet_url} onLoadSuccess={onDocumentLoadSuccess}>
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
                </>
            }
        </div>
    );
  }