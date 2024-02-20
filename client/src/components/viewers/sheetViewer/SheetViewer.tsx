import React, { useState, useEffect } from "react";
import { pdfjs, Document, Page } from "react-pdf";
import Axios from "axios";
import config from "@config";
import SheetHeader from "../sheetViewer/SheetHeader";

const isDevelopment = process.env.NODE_ENV === "development";
const serverUrl = isDevelopment
  ? config.development.serverUrl
  : config.production.serverUrl;

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url,
).toString();

interface SheetViewerProps {
  sheet_id: string;
}

interface SheetData {
  sheet_url: string;
  sheet_title: string;
  sheet_subject: string;
  entity_type: number;
  sheet_author: any;
}

export default function SheetViewer({ sheet_id }: SheetViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [sheetData, setSheetData] = useState<SheetData>({
    sheet_url: "",
    sheet_title: "",
    sheet_subject: "",
    entity_type: 0,
    sheet_author: null,
  });

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  useEffect(() => {
    const fetchSheetData = async () => {
      try {
        const response = await Axios.get(
          `${serverUrl}/sheets/get_full_sheet/${sheet_id}`,
        );

        if (response.data) {
          const blobData = new Uint8Array(
            response.data.fullSheet.sheets_data.sheet_data.data,
          );
          const url = URL.createObjectURL(
            new Blob([blobData], { type: "application/pdf" }),
          );

          setSheetData({
            sheet_url: url,
            sheet_title: response.data.fullSheet.sheet_title,
            sheet_subject: response.data.fullSheet.sheet_subject,
            entity_type: response.data.fullSheet.entities.entity_type,
            sheet_author: response.data.sheetAuthor,
          });
        }
      } catch (error) {
        console.error("Error fetching sheet data:", error);
      }
    };

    if (sheet_id) {
      fetchSheetData();
    }
  }, [sheet_id]);

  return (
    <div className="w-full">
      {sheetData.sheet_url && (
        <>
          <Document
            file={sheetData.sheet_url}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            {Array.from({ length: numPages }, (_, index) => (
              <div
                key={`page${index + 1}`}
                className="mb-6 rounded-md overflow-hidden"
              >
                <Page
                  pageNumber={index + 1}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                />
              </div>
            ))}
          </Document>
          <SheetHeader sheetData={sheetData} />
        </>
      )}
    </div>
  );
}
