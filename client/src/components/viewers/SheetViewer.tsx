import React, { useState, useEffect } from "react";
import { pdfjs, Document, Page } from "react-pdf";
import Axios from "axios";
import config from "@config";
import SheetHeader from "./SheetHeader";

const isDevelopment = process.env.NODE_ENV === "development";
const serverUrl = isDevelopment
  ? config.development.serverUrl
  : config.production.serverUrl;

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url,
).toString();

interface SheetViewerProps {
  sheet_id: number;
}

export default function SheetViewer({ sheet_id }: SheetViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [sheetData, setSheetData] = useState({
    sheet_url: "",
    sheet_title: "",
    sheet_subject: "",
    sheet_author: "",
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
            response.data.sheets_data.sheet_data.data,
          );
          const url = URL.createObjectURL(
            new Blob([blobData], { type: "application/pdf" }),
          );

          setSheetData({
            sheet_url: url,
            sheet_title: response.data.sheet_title,
            sheet_subject: response.data.sheet_subject,
            sheet_author: response.data.entities.individuals
              ? response.data.entities.individuals.individual_name
              : response.data.entities.groups
                ? response.data.entities.groups.group_name
                : response.data.entities.organizations
                  ? response.data.entities.organizations.organization_name
                  : "",
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
          <SheetHeader sheetData={sheetData} />
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
        </>
      )}
    </div>
  );
}
