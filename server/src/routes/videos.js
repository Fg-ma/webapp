const express = require("express");
const router = express.Router();

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
    const fullVideo = await req.db.videos.findUnique({
      where: {
        video_id: video_id,
      },
      include: {
        videos_data: true,
        entities: true,
      },
    });

    const getVideoCreator = async (fullVideo) => {
      if (fullVideo.entities.entity_type === 1) {
        return await req.db.individuals.findUnique({
          where: {
            individual_id: fullVideo.entities.entity_id,
          },
        });
      } else if (fullVideo.entities.entity_type === 2) {
        return await req.db.groups.findUnique({
          where: {
            group_id: fullVideo.entities.entity_id,
          },
        });
      } else if (fullVideo.entities.entity_type === 3) {
        return await req.db.organizations.findUnique({
          where: {
            organization_id: fullVideo.entities.entity_id,
          },
        });
      }
    };

    const videoCreator = await getVideoCreator(fullVideo);

    if (!fullVideo || fullVideo.length === 0) {
      res.status(404).send("Video not found");
      return;
    } else if (!videoCreator) {
      res.status(404).send("Creator not found");
      return;
    }

    res.send({ fullVideo, videoCreator });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
