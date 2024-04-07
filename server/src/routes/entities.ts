import express from "express";
const router = express.Router();
import verifyToken from "./verifyJWT";
import type {
  EntityContent,
  SheetContent,
  MergedSheetData,
  VideoContent,
  MergedVideoData,
  ImageContent,
  MergedImageData,
  Entity,
} from "@FgTypes/types";

// Get entity data from entity type and entity username
router.get("/entity", verifyToken, async (req, res) => {
  const entity_username = req.query.entity_username;

  try {
    const entity = await req.db.entities.findUnique({
      where: {
        entity_username: entity_username,
      },
    });

    delete entity["entity_id"];

    res.send(entity);
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
  const entity_username = req.query.entity_username;

  if (entity_username === req.user.username) {
    res.send(true);
  } else {
    res.send(false);
  }
});

// Get all the sheets belonging to an entity
router.get("/entity_sheets/:entity_username", async (req, res) => {
  const entity_username = req.params.entity_username;

  try {
    const entity: Entity = await req.db.entities.findUnique({
      where: {
        entity_username: entity_username,
      },
    });

    const allEntityContent = await req.db.entities_content.findMany({
      where: {
        entity_id: entity.entity_id,
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
        sheet_id: sheetEntityContent.content_id,
      },
    });

    function mergeData(
      allEntityContent: EntityContent[],
      sheetContent: SheetContent[]
    ) {
      const mergedData: MergedSheetData[] = [];

      allEntityContent.forEach((entityContent: EntityContent) => {
        const matchingSheetContent = sheetContent.find(
          (sheet: SheetContent) => sheet.sheet_id === entityContent.content_id
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

// Get a sheet by entities_content_id
router.get(
  "/entity_sheet_by_entities_content_id/:entities_content_id",
  async (req, res) => {
    const entities_content_id = req.params.entities_content_id;

    try {
      const entityContent = await req.db.entities_content.findUnique({
        where: {
          entities_content_id: entities_content_id,
        },
      });

      const sheetContent = await req.db.sheets.findUnique({
        where: {
          sheet_id: entityContent.content_id,
        },
      });

      const mergedObject = { ...entityContent, ...sheetContent };

      res.send(mergedObject);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
);

// Get all the videos belonging to an entity
router.get("/entity_videos/:entity_username", async (req, res) => {
  const entity_username = req.params.entity_username;

  try {
    const entity: Entity = await req.db.entities.findUnique({
      where: {
        entity_username: entity_username,
      },
    });

    const allEntityContent = await req.db.entities_content.findMany({
      where: {
        entity_id: entity.entity_id,
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
        video_id: videoEntityContent.content_id,
      },
    });

    function mergeData(
      allEntityContent: EntityContent[],
      videoContent: VideoContent[]
    ) {
      const mergedData: MergedVideoData[] = [];

      allEntityContent.forEach((entityContent: EntityContent) => {
        const matchingVideoContent = videoContent.find(
          (video: VideoContent) => video.video_id === entityContent.content_id
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

// Get a video by entities_content_id
router.get(
  "/entity_video_by_entities_content_id/:entities_content_id",
  async (req, res) => {
    const entities_content_id = req.params.entities_content_id;

    try {
      const entityContent = await req.db.entities_content.findUnique({
        where: {
          entities_content_id: entities_content_id,
        },
      });

      const videoContent = await req.db.videos.findUnique({
        where: {
          video_id: entityContent.content_id,
        },
      });

      const mergedObject = { ...entityContent, ...videoContent };

      res.send(mergedObject);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
);

// Get all the images belonging to an entity
router.get("/entity_images/:entity_username", async (req, res) => {
  const entity_username = req.params.entity_username;

  try {
    const entity: Entity = await req.db.entities.findUnique({
      where: {
        entity_username: entity_username,
      },
    });

    const allEntityContent = await req.db.entities_content.findMany({
      where: {
        entity_id: entity.entity_id,
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
        image_id: imageEntityContent.content_id,
      },
    });

    function mergeData(
      allEntityContent: EntityContent[],
      imageContent: ImageContent[]
    ) {
      const mergedData: MergedImageData[] = [];

      allEntityContent.forEach((entityContent: EntityContent) => {
        const matchingImageContent = imageContent.find(
          (image: ImageContent) => image.image_id === entityContent.content_id
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

// Get a image by entities_content_id
router.get(
  "/entity_image_by_entities_content_id/:entities_content_id",
  async (req, res) => {
    const entities_content_id = req.params.entities_content_id;

    try {
      const entityContent = await req.db.entities_content.findUnique({
        where: {
          entities_content_id: entities_content_id,
        },
      });

      const imageContent = await req.db.images.findUnique({
        where: {
          image_id: entityContent.content_id,
        },
      });

      const mergedObject = { ...entityContent, ...imageContent };

      res.send(mergedObject);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
);

// Set an entity's content(sheets, images, and videos) as pinned or not pinned
router.put("/entity_content_pinned", verifyToken, async (req, res) => {
  const { relation_id, pinned, date_pinned } = req.body;

  try {
    const searchResult = await req.db.entities_content.findUnique({
      where: {
        entities_content_id: relation_id,
      },
    });

    if (!searchResult) {
      return;
    }

    if (searchResult.entity_id !== req.user?.user_id) {
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

export default router;
