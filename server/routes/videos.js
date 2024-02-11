const express = require("express");
const router = express.Router();

// Route to get a video by ID
router.get("/:video_id", async (req, res) => {
  const video_id = req.params.video_id;

  try {
    const video = await req.db.videos.findUnique({
      where: {
        video_id: parseInt(video_id),
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
    const fullVideoData = await req.db.videos.findMany({
      where: {
        video_id: parseInt(video_id),
      },
      include: {
        individuals: true,
        videos_data: true,
      },
    });

    if (!fullVideoData || fullVideoData.length === 0) {
      res.status(404).send("Video not found");
      return;
    }

    res.send(fullVideoData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
