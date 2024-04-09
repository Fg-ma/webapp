import express from "express";
const router = express.Router();
import verifyToken from "./verifyJWT";
import type {
  EntityContent,
  Sheet,
  MergedSheetData,
  Video,
  MergedVideoData,
  Image,
  MergedImageData,
  Entity,
  Content,
} from "@FgTypes/types";

// Get entity data from entity type and entity username
router.get("/entity", verifyToken, async (req, res) => {
  const entity_username = req.query.entity_username;

  try {
    const entity: Entity = await req.db.entities.findUnique({
      where: {
        entity_username: entity_username,
      },
    });

    const returningEntity = {
      entity_username: entity.entity_username,
      entity_type: entity.entity_type,
    };

    res.send(returningEntity);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

/* 
  Get if a user can edit a certain entities page(NOTE THIS IS ONLY FOR DISPLAY 
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

    const allEntityContent: EntityContent[] =
      await req.db.entities_content.findMany({
        where: {
          entity_id: entity.entity_id,
        },
      });

    const allEntityContentIds: string[] = allEntityContent.map(
      (content) => content.content_id
    );

    const entitySheetContent: Content[] = await req.db.content.findMany({
      where: {
        content_id: {
          in: allEntityContentIds,
        },
        content_type: 1,
      },
    });

    const entitySheetIds: string[] = entitySheetContent.map(
      (content) => content.content_id
    );

    const sheetContent: Sheet[] = await req.db.sheets.findMany({
      where: {
        sheet_id: {
          in: entitySheetIds,
        },
      },
    });

    function mergeData(
      allEntityContent: EntityContent[],
      sheetContent: Sheet[]
    ) {
      const mergedData: MergedSheetData[] = [];

      allEntityContent.forEach((entityContent: EntityContent) => {
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

    const mergedData = mergeData(allEntityContent, sheetContent);

    const returningMergedData = mergedData.map((item) => ({
      entities_content_id: item.entities_content_id,
      content_id: item.content_id,
      date_added: item.date_added,
      pinned: item.pinned,
      date_pinned: item.date_pinned,
      sheet_id: item.sheet_id,
      sheet_title: item.sheet_title,
      sheet_subject: item.sheet_subject,
      sheet_filename: item.sheet_filename,
      sheet_data_id: item.sheet_data_id,
      sheet_thumbnail_id: item.sheet_thumbnail_id,
      sheet_likes: item.sheet_likes,
      sheet_dislikes: item.sheet_dislikes,
      sheet_views: item.sheet_views,
      sheet_date_posted: item.sheet_date_posted,
    }));

    res.send(returningMergedData);
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
      const entityContent: EntityContent =
        await req.db.entities_content.findUnique({
          where: {
            entities_content_id: entities_content_id,
          },
        });

      const sheetContent: Sheet = await req.db.sheets.findUnique({
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

    const allEntityContent: EntityContent[] =
      await req.db.entities_content.findMany({
        where: {
          entity_id: entity.entity_id,
        },
      });

    const allEntityContentIds: string[] = allEntityContent.map(
      (content) => content.content_id
    );

    const entityVideoContent: Content[] = await req.db.content.findMany({
      where: {
        content_id: {
          in: allEntityContentIds,
        },
        content_type: 3,
      },
    });

    const entityVideoIds: string[] = entityVideoContent.map(
      (content) => content.content_id
    );

    const videoContent: Video[] = await req.db.videos.findMany({
      where: {
        video_id: { in: entityVideoIds },
      },
    });

    function mergeData(
      allEntityContent: EntityContent[],
      videoContent: Video[]
    ) {
      const mergedData: MergedVideoData[] = [];

      allEntityContent.forEach((entityContent: EntityContent) => {
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

    const mergedData = mergeData(allEntityContent, videoContent);

    const returningMergedData = mergedData.map((item) => ({
      entities_content_id: item.entities_content_id,
      content_id: item.content_id,
      date_added: item.date_added,
      pinned: item.pinned,
      date_pinned: item.date_pinned,
      video_id: item.video_id,
      video_title: item.video_title,
      video_description: item.video_description,
      video_filename: item.video_filename,
      video_data_id: item.video_data_id,
      video_thumbnail_id: item.video_thumbnail_id,
      video_likes: item.video_likes,
      video_dislikes: item.video_dislikes,
      video_views: item.video_views,
      video_date_posted: item.video_date_posted,
    }));

    res.send(returningMergedData);
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
      const entityContent: EntityContent =
        await req.db.entities_content.findUnique({
          where: {
            entities_content_id: entities_content_id,
          },
        });

      const videoContent: Video = await req.db.videos.findUnique({
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

    const allEntityContent: EntityContent[] =
      await req.db.entities_content.findMany({
        where: {
          entity_id: entity.entity_id,
        },
      });

    const allEntityContentIds: string[] = allEntityContent.map(
      (content) => content.content_id
    );

    const entityImageContent: Content[] = await req.db.content.findMany({
      where: {
        content_id: { in: allEntityContentIds },
        content_type: 2,
      },
    });

    const entityImageIds: string[] = entityImageContent.map(
      (content) => content.content_id
    );

    const imageContent: Image[] = await req.db.images.findMany({
      where: {
        image_id: { in: entityImageIds },
      },
    });

    function mergeData(
      allEntityContent: EntityContent[],
      imageContent: Image[]
    ) {
      const mergedData: MergedImageData[] = [];

      allEntityContent.forEach((entityContent: EntityContent) => {
        const matchingImageContent = imageContent.find(
          (image: Image) => image.image_id === entityContent.content_id
        );
        if (matchingImageContent) {
          const mergedObject = { ...entityContent, ...matchingImageContent };
          mergedData.push(mergedObject);
        }
      });

      return mergedData;
    }

    const mergedData = mergeData(allEntityContent, imageContent);

    const returningMergedData = mergedData.map((item) => ({
      entities_content_id: item.entities_content_id,
      content_id: item.content_id,
      date_added: item.date_added,
      pinned: item.pinned,
      date_pinned: item.date_pinned,
      image_id: item.image_id,
      image_title: item.image_title,
      image_description: item.image_description,
      image_filename: item.image_filename,
      image_data_id: item.image_data_id,
      image_likes: item.image_likes,
      image_dislikes: item.image_dislikes,
      image_views: item.image_views,
      image_date_posted: item.image_date_posted,
    }));

    res.send(returningMergedData);
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
      const entityContent: EntityContent =
        await req.db.entities_content.findUnique({
          where: {
            entities_content_id: entities_content_id,
          },
        });

      const imageContent: Image = await req.db.images.findUnique({
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
    const searchResult: EntityContent =
      await req.db.entities_content.findUnique({
        where: {
          entities_content_id: relation_id,
        },
      });

    if (!searchResult || searchResult.entity_id !== req.user?.user_id) {
      return;
    }

    const updateResult: EntityContent = await req.db.entities_content.update({
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
