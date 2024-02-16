const express = require("express");
const router = express.Router();

// Get entity data from entity type and entity id
router.get("/entity", async (req, res) => {
  const id = req.query.id;

  try {
    let entities;

    entities = await req.db.entities.findMany({
      where: {
        entity_id: id,
      },
    });

    res.send(entities);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Get all the sheets belonging to an entity
router.get("/entity_sheets/:entity_id", async (req, res) => {
  const entity_id = req.params.entity_id;

  try {
    const result = await req.db.entities_sheets.findMany({
      where: {
        entity_id: entity_id,
      },
      include: {
        sheets: true,
      },
    });

    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Get all the videos belonging to an entity
router.get("/entity_videos/:entity_id", async (req, res) => {
  const entity_id = req.params.entity_id;

  try {
    const result = await req.db.entities_videos.findMany({
      where: {
        entity_id: entity_id,
      },
      include: {
        videos: true,
      },
    });

    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Get all the images belonging to an entity
router.get("/entity_images/:entity_id", async (req, res) => {
  const entity_id = req.params.entity_id;

  try {
    const result = await req.db.entities_images.findMany({
      where: {
        entity_id: entity_id,
      },
      include: {
        images: true,
      },
    });

    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Set an entity's sheet as pinned or not pinned
router.put("/entity_sheets_pinned", async (req, res) => {
  const { relation_id, pinned, date_pinned } = req.body;

  try {
    const result = await req.db.entities_sheets.update({
      where: {
        entities_sheets_id: relation_id,
      },
      data: {
        pinned: pinned,
        date_pinned: date_pinned,
      },
    });

    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Set an entity's video as pinned or not pinned
router.put("/entity_videos_pinned", async (req, res) => {
  const { relation_id, pinned, date_pinned } = req.body;

  try {
    const result = await req.db.entities_videos.update({
      where: {
        entities_videos_id: relation_id,
      },
      data: {
        pinned: pinned,
        date_pinned: date_pinned,
      },
    });

    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Set an entity's image as pinned or not pinned
router.put("/entity_images_pinned", async (req, res) => {
  const { relation_id, pinned, date_pinned } = req.body;

  try {
    const result = await req.db.entities_images.update({
      where: {
        entities_images_id: relation_id,
      },
      data: {
        pinned: pinned,
        date_pinned: date_pinned,
      },
    });

    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
