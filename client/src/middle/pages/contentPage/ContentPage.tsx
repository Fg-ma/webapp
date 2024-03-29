import React from "react";
import { useSelector } from "react-redux";
import { ContentPageProps, ContentIDState } from "@FgTypes/middleTypes";
import SheetViewer from "@components/viewers/sheetViewer/SheetViewer";
import VideoViewer from "@components/viewers/videoViewer/VideoViewer";
import ImageViewer from "@components/viewers/imageViewer/ImageViewer";

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
    <div
      className="h-full overflow-y-auto"
      style={{
        scrollbarGutter: "stable",
      }}
    >
      <div className="ml-8 my-8">{renderContent()}</div>
    </div>
  );
}
