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
  const video_id = parseInt(req.params.video_id);

  try {
    const fullVideo = await req.db.videos.findUnique({
      where: {
        video_id: video_id,
      },
      include: {
        videos_data: true,
        entities: {
          include: {
            individuals: true,
            groups: true,
            organizations: true,
          },
        },
      },
    });

    if (!fullVideo || fullVideo.length === 0) {
      res.status(404).send("Video not found");
      return;
    }

    res.send(fullVideo);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
