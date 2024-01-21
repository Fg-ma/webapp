import React from 'react'
import { useSelector } from 'react-redux';
import PDFViewer from '../../../components/pdfViewer/PDFViewer';

export default function ContentPage() {

    const sheet_id = useSelector((state) => state.page.main.pagePayload.ids.sheet_id);

    return (
        <div className="h-full mr-3 overflow-y-auto">
            <div className="ml-8 mr-5 my-8">
                <PDFViewer sheet_id={sheet_id} />
            </div>
        </div>
    )
};
