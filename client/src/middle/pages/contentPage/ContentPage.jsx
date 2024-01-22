import React from 'react'
import { useSelector } from 'react-redux';
import SheetViewer from '../../../components/viewers/SheetViewer';
import VideoViewer from '../../../components/viewers/VideoViewer';
import ImageViewer from '../../../components/viewers/ImageViewer';

export default function ContentPage({ contentType }) {

    let content_id;
    if (contentType == "sheets") {
        content_id = useSelector((state) => state.page.main.pagePayload.ids.sheet_id);
    } else if (contentType == "videos") {
        content_id = useSelector((state) => state.page.main.pagePayload.ids.video_id);
    } else if (contentType == "images") {
        content_id = useSelector((state) => state.page.main.pagePayload.ids.image_id);
    };

    const renderContent = () => {
        if (contentType == "sheets") {
            return <SheetViewer sheet_id={content_id} />;
        } else if (contentType == "videos") {
            return <VideoViewer video_id={content_id} />;
        } else if (contentType == "images") {
            return <ImageViewer image_id={content_id} />;
        };
    };

    return (
        <div className="h-full mr-3 overflow-y-auto">
            <div className="ml-8 mr-5 my-8">
                {renderContent()}
            </div>
        </div>
    )
};
