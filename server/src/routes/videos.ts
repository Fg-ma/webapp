import express from "express";
const router = express.Router();
import type { FullVideo } from "@FgTypes/types";

// Route to get a video thumbnail by video_id
router.get("/get_video_thumbnail", async (req, res) => {
  const video_id = req.query.video_id;

  try {
    const video = await req.db.videos.findUnique({
      where: { video_id: video_id },
    });

    const videoThumbnail = await req.db.videos_thumbnails.findUnique({
      where: {
        video_thumbnail_id: video.video_thumbnail_id,
      },
    });

    res.send(videoThumbnail);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Route to get a video by ID
router.get("/:video_id", async (req, res) => {
  const video_id = req.params.video_id;

  try {
    const video = await req.db.videos.findUnique({
      where: {
        video_id: video_id,
      },
    });

    if (!video) {
      res.status(404).send("Video not found");
      return;
    }

    res.send(video);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Gets all the data needed to display a video's contents
router.get("/get_full_video/:video_id", async (req, res) => {
  const video_id = req.params.video_id;

  try {
    const fullVideo: FullVideo = await req.db.videos.findUnique({
      where: {
        video_id: video_id,
      },
      include: {
        videos_data: true,
        entities: true,
      },
    });

    if (!fullVideo) {
      res.status(404).send("Video not found");
      return;
    }

    const returningFullVideo = {
      video_id: fullVideo.video_id,
      video_title: fullVideo.video_title,
      video_description: fullVideo.video_description,
      video_filename: fullVideo.video_filename,
      video_data_id: fullVideo.video_data_id,
      video_thumbnail_id: fullVideo.video_thumbnail_id,
      video_likes: fullVideo.video_likes,
      video_dislikes: fullVideo.video_dislikes,
      video_views: fullVideo.video_views,
      video_date_posted: fullVideo.video_date_posted,
      videos_data: {
        video_data_id: fullVideo.videos_data.video_data_id,
        video_data: fullVideo.videos_data.video_data,
      },
      entities: {
        entity_username: fullVideo.entities.entity_username,
        entity_type: fullVideo.entities.entity_type,
      },
    };

    res.send(returningFullVideo);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
