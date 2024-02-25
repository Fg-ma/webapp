import React from "react";
import { useSelector } from "react-redux";
import SheetViewer from "@components/viewers/sheetViewer/SheetViewer";
import VideoViewer from "@components/viewers/videoViewer/VideoViewer";
import ImageViewer from "@components/viewers/imageViewer/ImageViewer";

interface ContentPageProps {
  contentType: string;
}

interface ContentIDState {
  page: {
    main: {
      pagePayload: {
        ids: {
          sheet_id: string;
          video_id: string;
          image_id: string;
        };
      };
    };
  };
}

export default function ContentPage({ contentType }: ContentPageProps) {
  const content_id: string = useSelector((state: ContentIDState) => {
    if (contentType === "sheets")
      return state.page.main.pagePayload.ids.sheet_id;
    else if (contentType === "videos")
      return state.page.main.pagePayload.ids.video_id;
    else if (contentType === "images")
      return state.page.main.pagePayload.ids.image_id;
    else return "";
  });

  const renderContent = () => {
    if (contentType == "sheets") {
      return <SheetViewer sheet_id={content_id} />;
    } else if (contentType == "videos") {
      return <VideoViewer video_id={content_id} />;
    } else if (contentType == "images") {
      return <ImageViewer image_id={content_id} />;
    }
  };

  return (
    <div className="h-full mr-3 overflow-y-auto">
      <div className="ml-8 mr-5 my-8">{renderContent()}</div>
    </div>
  );
}
