import React from 'react'
import { useSelector } from 'react-redux';
import PDFViewer from '../../../components/pdfViewer/PDFViewer';

export default function ContentPage() {

    const sheet_id = useSelector((state) => state.page.main.pagePayload.ids.sheet_id);

    return (
        <div className="mr-3 overflow-y-auto" style={{ height: `calc(100% - 2.5rem)` }}>
            <div className="ml-8 mr-5 my-8">
                <div className='h-10 mb-8 bg-fg-white-90'>
                </div>
                <PDFViewer sheet_id={sheet_id} />
            </div>
        </div>
    )
};
