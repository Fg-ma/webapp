import {
  Entity,
  ImageContent,
  SheetContent,
  VideoContent,
} from "@FgTypes/types";
import express from "express";
const router = express.Router();

// Get collection names and ids from entity username
router.get("/collections_names", async (req, res) => {
  const entity_username = req.query.entity_username;

  try {
    if (!entity_username) return;

    const entity = await req.db.entities.findUnique({
      where: {
        entity_username: entity_username,
      },
    });

    const collections = await req.db.collections.findMany({
      where: {
        entity_id: entity.entity_id,
      },
      distinct: ["collection_id"],
    });

    res.send(collections);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Get collection from collection_id
router.get("/:collection_id", async (req, res) => {
  const collection_id = req.params.collection_id;

  try {
    const collections = await req.db.collections_content.findMany({
      where: {
        collection_id: collection_id,
      },
      include: {
        content: true,
      },
    });

    const collectionsData = [];

    for (const collection of collections) {
      if (collection.content.content_type === 1) {
        const contentData: SheetContent = await req.db.sheets.findUnique({
          where: {
            sheet_id: collection.content_id,
          },
        });

        const author: Entity = await req.db.entities.findUnique({
          where: {
            entity_id: contentData.sheet_author_id,
          },
        });

        const { sheet_author_id, ...safeContentData } = contentData;

        collectionsData.push({
          ...collection,
          content_data: {
            ...safeContentData,
            sheet_author_username: author.entity_username,
          },
        });
      } else if (collection.content.content_type === 2) {
        const contentData: ImageContent = await req.db.images.findUnique({
          where: {
            image_id: collection.content_id,
          },
        });

        const author: Entity = await req.db.entities.findUnique({
          where: {
            entity_id: contentData.image_creator_id,
          },
        });

        const { image_creator_id, ...safeContentData } = contentData;

        collectionsData.push({
          ...collection,
          content_data: {
            ...safeContentData,
            image_creator_username: author.entity_username,
          },
        });
      } else if (collection.content.content_type === 3) {
        const contentData: VideoContent = await req.db.videos.findUnique({
          where: {
            video_id: collection.content_id,
          },
        });

        const author: Entity = await req.db.entities.findUnique({
          where: {
            entity_id: contentData.video_creator_id,
          },
        });

        const { video_creator_id, ...safeContentData } = contentData;

        collectionsData.push({
          ...collection,
          content_data: {
            ...safeContentData,
            video_creator_username: author.entity_username,
          },
        });
      }
    }

    res.send(collectionsData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Set a collection's sheet as pinned or not pinned
router.put("/collections_content_pinned", async (req, res) => {
  const { relation_id, pinned, date_pinned } = req.body;

  try {
    const result = await req.db.collections_content.update({
      where: {
        collections_content_id: relation_id,
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

// Get a sheet by collections_content_id
router.get(
  "/collection_sheet_by_collections_content_id/:collections_content_id",
  async (req, res) => {
    const collections_content_id = req.params.collections_content_id;

    try {
      const collectionContent = await req.db.collections_content.findUnique({
        where: {
          collections_content_id: collections_content_id,
        },
        include: {
          content: true,
        },
      });

      const sheetContent: SheetContent = await req.db.sheets.findUnique({
        where: {
          sheet_id: collectionContent.content_id,
        },
      });

      const author: Entity = await req.db.entities.findUnique({
        where: {
          entity_id: sheetContent.sheet_author_id,
        },
      });

      const { sheet_author_id, ...safeSheetContent } = sheetContent;

      const collectionSheetData = {
        ...collectionContent,
        content_data: {
          ...safeSheetContent,
          sheet_author_username: author.entity_username,
        },
      };

      res.send(collectionSheetData);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
);

// Get a video by collections_content_id
router.get(
  "/collection_video_by_collections_content_id/:collections_content_id",
  async (req, res) => {
    const collections_content_id = req.params.collections_content_id;

    try {
      const collectionContent = await req.db.collections_content.findUnique({
        where: {
          collections_content_id: collections_content_id,
        },
        include: {
          content: true,
        },
      });

      const videoContent: VideoContent = await req.db.videos.findUnique({
        where: {
          video_id: collectionContent.content_id,
        },
      });

      const author: Entity = await req.db.entities.findUnique({
        where: {
          entity_id: videoContent.video_creator_id,
        },
      });

      const { video_creator_id, ...safeVideoContent } = videoContent;

      const collectionVideoData = {
        ...collectionContent,
        content_data: {
          ...safeVideoContent,
          video_creator_username: author.entity_username,
        },
      };

      res.send(collectionVideoData);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
);

// Get a image by collections_content_id
router.get(
  "/collection_image_by_collections_content_id/:collections_content_id",
  async (req, res) => {
    const collections_content_id = req.params.collections_content_id;

    try {
      const collectionContent = await req.db.collections_content.findUnique({
        where: {
          collections_content_id: collections_content_id,
        },
        include: {
          content: true,
        },
      });

      const imageContent: ImageContent = await req.db.images.findUnique({
        where: {
          image_id: collectionContent.content_id,
        },
      });

      const author: Entity = await req.db.entities.findUnique({
        where: {
          entity_id: imageContent.image_creator_id,
        },
      });

      const { image_creator_id, ...safeImageContent } = imageContent;

      const collectionImageData = {
        ...collectionContent,
        content_data: {
          ...safeImageContent,
          image_creator_username: author.entity_username,
        },
      };

      res.send(collectionImageData);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
);

export default router;
