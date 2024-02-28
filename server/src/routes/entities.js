const express = require("express");
const router = express.Router();
const verifyToken = require("./verifyJWT.js");

// Get entity data from entity type and entity id
router.get("/entity", verifyToken, async (req, res) => {
  const entity_id = req.query.entity_id;

  try {
    const entities = await req.db.entities.findMany({
      where: {
        entity_id: entity_id === "user" ? req.user.user_id : entity_id,
      },
    });

    res.send(entities);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

/* 
  Get if a user can edit a certain entities page(NOTE THIS CAN ONLY FOR DISPLAY 
  PURPOSES AND ITS RESPONSE SHOULDN'T BE USED TO ALLOW USERS TO EDIT PAGES)
*/
router.get("/auth", verifyToken, async (req, res) => {
  const entity_id = req.query.entity_id;

  if (entity_id === "user") {
    res.send(true);
  } else {
    res.send(false);
  }
});

// Get all the sheets belonging to an entity
router.get("/entity_sheets/:entity_id", async (req, res) => {
  const entity_id = req.params.entity_id;

  try {
    const allEntityContent = await req.db.entities_content.findMany({
      where: {
        entity_id: entity_id,
      },
    });

    const sheetEntityContent = await req.db.content.findMany({
      where: {
        content_id: allEntityContent.content_id,
        content_type: 1,
      },
    });

    const sheetContent = await req.db.sheets.findMany({
      where: {
        content_id: sheetEntityContent.content_id,
      },
    });

    function mergeData(allEntityContent, sheetContent) {
      const mergedData = [];

      allEntityContent.forEach((entityContent) => {
        const matchingSheetContent = sheetContent.find(
          (sheet) => sheet.sheet_id === entityContent.content_id
        );
        if (matchingSheetContent) {
          const mergedObject = { ...entityContent, ...matchingSheetContent };
          mergedData.push(mergedObject);
        }
      });

      return mergedData;
    }

    res.send(mergeData(allEntityContent, sheetContent));
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Get all the videos belonging to an entity
router.get("/entity_videos/:entity_id", async (req, res) => {
  const entity_id = req.params.entity_id;

  try {
    const allEntityContent = await req.db.entities_content.findMany({
      where: {
        entity_id: entity_id,
      },
    });

    const videoEntityContent = await req.db.content.findMany({
      where: {
        content_id: allEntityContent.content_id,
        content_type: 3,
      },
    });

    const videoContent = await req.db.videos.findMany({
      where: {
        content_id: videoEntityContent.content_id,
      },
    });

    function mergeData(allEntityContent, videoContent) {
      const mergedData = [];

      allEntityContent.forEach((entityContent) => {
        const matchingVideoContent = videoContent.find(
          (video) => video.video_id === entityContent.content_id
        );
        if (matchingVideoContent) {
          const mergedObject = { ...entityContent, ...matchingVideoContent };
          mergedData.push(mergedObject);
        }
      });

      return mergedData;
    }

    res.send(mergeData(allEntityContent, videoContent));
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Get all the images belonging to an entity
router.get("/entity_images/:entity_id", async (req, res) => {
  const entity_id = req.params.entity_id;

  try {
    const allEntityContent = await req.db.entities_content.findMany({
      where: {
        entity_id: entity_id,
      },
    });

    const imageEntityContent = await req.db.content.findMany({
      where: {
        content_id: allEntityContent.content_id,
        content_type: 1,
      },
    });

    const imageContent = await req.db.images.findMany({
      where: {
        content_id: imageEntityContent.content_id,
      },
    });

    function mergeData(allEntityContent, imageContent) {
      const mergedData = [];

      allEntityContent.forEach((entityContent) => {
        const matchingImageContent = imageContent.find(
          (image) => image.image_id === entityContent.content_id
        );
        if (matchingImageContent) {
          const mergedObject = { ...entityContent, ...matchingImageContent };
          mergedData.push(mergedObject);
        }
      });

      return mergedData;
    }

    res.send(mergeData(allEntityContent, imageContent));
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Set an entity's content(sheets, images, and videos) as pinned or not pinned
router.put("/entity_content_pinned", verifyToken, async (req, res) => {
  const { relation_id, pinned, date_pinned } = req.body;
  console.log(relation_id, pinned, date_pinned);
  try {
    const searchResult = await req.db.entities_content.findUnique({
      where: {
        entities_content_id: relation_id,
      },
    });

    if (!searchResult) {
      return;
    }

    if (searchResult.entity_id !== req.user.user_id) {
      return;
    }

    const updateResult = await req.db.entities_content.update({
      where: {
        entities_content_id: relation_id,
      },
      data: {
        pinned: pinned,
        date_pinned: date_pinned,
      },
    });

    res.send(updateResult);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
